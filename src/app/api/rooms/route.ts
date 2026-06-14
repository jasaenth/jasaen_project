import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import cloudinary from "@/lib/cloudinary";
import Room from "@/models/Room";

export async function GET() {
  try {
    await connectDB();

    const rooms = await Room.find().sort({
      createdAt: -1,
    });

    return NextResponse.json(
      {
        success: true,
        data: rooms,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch rooms",
      },
      { status: 500 },
    );
  }
}

function generateSlug(name: string) {
  return name.toLowerCase().trim().replace(/\s+/g, "-");
}

function toNumberFromMixedSize(value: string): number | null {
  const normalized = value.trim().replace(",", ".");
  const match = normalized.match(/\d+(\.\d+)?/);

  if (!match) {
    return null;
  }

  const parsed = Number(match[0]);
  return Number.isFinite(parsed) ? parsed : null;
}

const ROOM_TYPE_ALIAS_TO_CATEGORY: Record<string, string> = {
  standard: "Standard",
  deluxe: "Deluxe",
  dormitory: "Dormitory",
  suite: "Suite",
  "standard single": "Standard",
  "standard twin": "Standard",
  "standard double": "Standard",
  "deluxe single": "Deluxe",
  "deluxe double a (bottle)": "Deluxe",
  "deluxe double b (car)": "Deluxe",
  "deluxe double c (jackson pollock)": "Deluxe",
  "deluxe double d (slum)": "Deluxe",
  "deluxe double e (circle)": "Deluxe",
  "deluxe double f": "Deluxe",
  "bunks for 4": "Dormitory",
  "mix dorm room": "Dormitory",
  "bunks for 6": "Dormitory",
  "bed for 2": "Dormitory",
  "executive suite": "Suite",
};

function normalizeRoomTypeBySchema(
  input: string,
  roomName?: string,
): string | null {
  const roomTypePath = Room.schema.path("roomType") as unknown as {
    enumValues?: string[];
  };

  const allowedTypes = roomTypePath?.enumValues ?? [];
  const inputKey = input.trim().toLowerCase();
  const roomNameKey = (roomName || "").trim().toLowerCase();

  const normalizedCategory =
    ROOM_TYPE_ALIAS_TO_CATEGORY[inputKey] ||
    ROOM_TYPE_ALIAS_TO_CATEGORY[roomNameKey] ||
    input.trim();

  if (allowedTypes.length === 0) {
    return normalizedCategory;
  }

  const directMatch = allowedTypes.find(
    (type) =>
      type.toLowerCase() === normalizedCategory.toLowerCase() ||
      type.toLowerCase() === normalizedCategory.toUpperCase().toLowerCase(),
  );

  return directMatch ?? null;
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();

    // Basic Room Information
    const roomName = formData.get("roomName") as string;
    const roomTypeRaw = String(formData.get("roomType") || "");
    const description = formData.get("description") as string;
    const shortDescription = formData.get("shortDescription") as string;
    const pricePerNight = Number(formData.get("pricePerNight"));
    const discountPrice = Number(formData.get("discountPrice") || 0);
    const maxAdults = Number(formData.get("maxAdults"));
    const maxChildren = Number(formData.get("maxChildren") || 0);
    const bedType = formData.get("bedType") as string;
    const roomSizeRaw = String(formData.get("roomSize") || ""); // Might include unit (e.g., "45 sqm")
    const totalUnits = Number(formData.get("totalUnits"));
    const amenities = JSON.parse((formData.get("amenities") as string) || "[]");
    const roomNumbers = JSON.parse(
      (formData.get("roomNumbers") as string) || "[]",
    );
    const files = formData.getAll("images") as File[];

    // Validation
    if (
      !roomName ||
      !roomTypeRaw ||
      !description ||
      !shortDescription ||
      !pricePerNight ||
      !bedType ||
      !roomSizeRaw ||
      !totalUnits ||
      files.length === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "All required fields are missing",
          missingFields: {
            roomName: !roomName,
            roomType: !roomTypeRaw,
            description: !description,
            shortDescription: !shortDescription,
            pricePerNight: !pricePerNight,
            bedType: !bedType,
            roomSize: !roomSizeRaw,
            totalUnits: !totalUnits,
            images: files.length === 0,
          },
        },
        { status: 400 },
      );
    }

    // Validate room numbers if provided
    if (roomNumbers.length > 0) {
      if (roomNumbers.length !== totalUnits) {
        return NextResponse.json(
          {
            success: false,
            message: `Number of room numbers (${roomNumbers.length}) does not match total units (${totalUnits})`,
          },
          { status: 400 },
        );
      }

      // Check for empty room numbers
      const hasEmptyNumbers = roomNumbers.some(
        (num: string) => !num || !num.trim(),
      );
      if (hasEmptyNumbers) {
        return NextResponse.json(
          {
            success: false,
            message: "All room numbers must be filled",
          },
          { status: 400 },
        );
      }

      // Check for duplicate room numbers
      const uniqueNumbers = new Set(roomNumbers);
      if (uniqueNumbers.size !== roomNumbers.length) {
        return NextResponse.json(
          {
            success: false,
            message: "Duplicate room numbers found. Please use unique numbers.",
          },
          { status: 400 },
        );
      }
    }

    const roomType = normalizeRoomTypeBySchema(roomTypeRaw, roomName);
    if (!roomType) {
      const roomTypePath = Room.schema.path("roomType") as unknown as {
        enumValues?: string[];
      };

      return NextResponse.json(
        {
          success: false,
          message: "Invalid room type",
          allowedRoomTypes: roomTypePath?.enumValues ?? [],
        },
        { status: 400 },
      );
    }

    const roomSizePath = Room.schema.path("roomSize") as unknown as {
      instance?: string;
    };

    const roomSize =
      roomSizePath?.instance === "Number"
        ? toNumberFromMixedSize(roomSizeRaw)
        : roomSizeRaw.trim();

    if (roomSize === null || roomSize === "") {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid room size",
        },
        { status: 400 },
      );
    }

    // Generate slug from room name
    const slug = generateSlug(roomName);

    // Check if room already exists
    const existingRoom = await Room.findOne({ slug });
    if (existingRoom) {
      return NextResponse.json(
        {
          success: false,
          message: "Room with this name already exists",
        },
        { status: 400 },
      );
    }

    // Upload images to Cloudinary
    const uploadedImages = [];

    for (const file of files) {
      // Check file size (2MB limit)
      if (file.size > 2 * 1024 * 1024) {
        return NextResponse.json(
          {
            success: false,
            message: "Each image must be less than 2MB",
          },
          { status: 400 },
        );
      }

      try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

        const uploadResponse = await cloudinary.uploader.upload(base64, {
          folder: "jasaen/rooms",
          transformation: [{ quality: "auto", fetch_format: "auto" }],
        });

        uploadedImages.push({
          url: uploadResponse.secure_url,
          publicId: uploadResponse.public_id,
        });
      } catch (uploadError) {
        console.error("Image upload error:", uploadError);
        return NextResponse.json(
          {
            success: false,
            message: "Failed to upload images. Please try again.",
          },
          { status: 500 },
        );
      }
    }

    // Generate units based on room numbers or auto-generate
    const units = [];

    if (roomNumbers.length > 0) {
      // Use custom room numbers provided by admin
      for (let i = 0; i < roomNumbers.length; i++) {
        units.push({
          unitNumber: roomNumbers[i].trim(),
          status: "AVAILABLE",
          isCustomNumber: true,
        });
      }
    } else {
      // Auto-generate unit numbers if not provided
      for (let i = 1; i <= totalUnits; i++) {
        units.push({
          unitNumber: `${roomType}-${String(i).padStart(2, "0")}`,
          status: "AVAILABLE",
          isCustomNumber: false,
        });
      }
    }

    // Calculate available units (all units start as available)
    const availableUnits = units.length;

    // Create the room
    const newRoom = await Room.create({
      roomName,
      slug,
      roomType,
      description,
      shortDescription,
      pricePerNight,
      discountPrice: discountPrice || 0,
      maxAdults,
      maxChildren: maxChildren || 0,
      bedType,
      roomSize, // Now includes unit (e.g., "45 sqm")
      amenities,
      images: uploadedImages,
      totalUnits,
      availableUnits,
      units,
      isFeatured: false, // Default value
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Room created successfully",
        data: {
          ...newRoom.toObject(),
          totalUnits: units.length,
          availableUnits: units.filter((u: any) => u.status === "AVAILABLE")
            .length,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Room creation error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Room creation failed",
      },
      { status: 500 },
    );
  }
}
