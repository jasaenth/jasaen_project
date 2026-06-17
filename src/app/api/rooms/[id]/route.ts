import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Room from "@/models/Room";
import cloudinary from "@/lib/cloudinary";

function toNumberFromMixedSize(value: string): number | null {
  const normalized = value.trim().replace(",", ".");
  const match = normalized.match(/\d+(\.\d+)?/);

  if (!match) return null;

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
    (type) => type.toLowerCase() === normalizedCategory.toLowerCase(),
  );

  return directMatch ?? null;
}

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

/* GET SINGLE ROOM */
export async function GET(req: Request, context: RouteContext) {
  try {
    await connectDB();

    const { id } = await context.params;

    const room = await Room.findById(id);

    if (!room) {
      return NextResponse.json(
        {
          success: false,
          message: "Room not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: room,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch room",
      },
      { status: 500 },
    );
  }
}

/* UPDATE ROOM */
export async function PUT(req: Request, context: RouteContext) {
  try {
    await connectDB();

    const { id } = await context.params;

    const existingRoom = await Room.findById(id);

    if (!existingRoom) {
      return NextResponse.json(
        {
          success: false,
          message: "Room not found",
        },
        { status: 404 },
      );
    }

    const formData = await req.formData();

    const roomName = formData.get("roomName") as string;
    const roomTypeRaw = String(formData.get("roomType") || "");
    const description = formData.get("description") as string;
    const shortDescription = formData.get("shortDescription") as string;

    const pricePerNight = Number(formData.get("pricePerNight"));

    const discountPrice = Number(formData.get("discountPrice") || 0);

    const maxAdults = Number(formData.get("maxAdults"));

    const maxChildren = Number(formData.get("maxChildren"));

    const bedType = formData.get("bedType") as string;

    const roomSizeRaw = String(formData.get("roomSize") || "");

    const totalUnits = Number(formData.get("totalUnits"));

    const amenities = JSON.parse((formData.get("amenities") as string) || "[]");

    const roomNumbers = JSON.parse(
      (formData.get("roomNumbers") as string) || "[]",
    ) as string[];

    const keptImages = JSON.parse(
      (formData.get("existingImages") as string) || "[]",
    );

    const preuploadedImages = JSON.parse(
      (formData.get("uploadedImages") as string) || "[]",
    ) as { url: string; publicId: string }[];

    const newFiles = formData.getAll("images") as File[];

    // Normalize and validate roomType against schema
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

    // Parse roomSize similarly to POST (support mixed strings)
    const roomSizePath = Room.schema.path("roomSize") as unknown as {
      instance?: string;
    };

    const roomSize =
      roomSizePath?.instance === "Number"
        ? toNumberFromMixedSize(roomSizeRaw)
        : roomSizeRaw.trim();

    if (
      !roomName ||
      !roomType ||
      !description ||
      !shortDescription ||
      !pricePerNight ||
      !bedType ||
      !roomSize ||
      !totalUnits
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Required fields missing",
        },
        { status: 400 },
      );
    }

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

      const hasEmptyNumbers = roomNumbers.some((num) => !num || !num.trim());
      if (hasEmptyNumbers) {
        return NextResponse.json(
          {
            success: false,
            message: "All room numbers must be filled",
          },
          { status: 400 },
        );
      }

      const uniqueNumbers = new Set(roomNumbers.map((num) => num.trim()));
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

    // delete removed images
    const removedImages = existingRoom.images.filter(
      (img: any) => !keptImages.some((k: any) => k.publicId === img.publicId),
    );

    for (const img of removedImages) {
      await cloudinary.uploader.destroy(img.publicId);
    }

    // upload new images
    const uploadedImages = [...preuploadedImages];

    for (const file of newFiles) {
      if (file.size > 2 * 1024 * 1024) {
        return NextResponse.json(
          {
            success: false,
            message: "Each image must be less than 2MB",
          },
          { status: 400 },
        );
      }

      const bytes = await file.arrayBuffer();

      const buffer = Buffer.from(bytes);

      const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

      const uploadResponse = await cloudinary.uploader.upload(base64, {
        folder: "jasaen/rooms",
      });

      uploadedImages.push({
        url: uploadResponse.secure_url,
        publicId: uploadResponse.public_id,
      });
    }

    const finalImages = [...keptImages, ...uploadedImages];

    if (finalImages.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "At least one image required",
        },
        { status: 400 },
      );
    }

    if (finalImages.length > 5) {
      return NextResponse.json(
        {
          success: false,
          message: "Maximum 5 images allowed",
        },
        { status: 400 },
      );
    }

    const units =
      roomNumbers.length > 0
        ? roomNumbers.map((unitNumber, index) => ({
            unitNumber: unitNumber.trim(),
            status: existingRoom.units?.[index]?.status || "AVAILABLE",
          }))
        : Array.from({ length: totalUnits }, (_, index) => ({
            unitNumber:
              existingRoom.units?.[index]?.unitNumber ||
              `${roomType}-${index + 1}`,
            status: existingRoom.units?.[index]?.status || "AVAILABLE",
          }));

    const availableUnits = units.filter(
      (unit) => unit.status === "AVAILABLE",
    ).length;

    const updatedRoom = await Room.findByIdAndUpdate(
      id,
      {
        roomName,
        roomType,
        description,
        shortDescription,
        pricePerNight,
        discountPrice,
        maxAdults,
        maxChildren,
        bedType,
        roomSize,
        totalUnits,
        availableUnits,
        amenities,
        images: finalImages,
        units,
      },
      {
        returnDocument: "after",
      },
    );

    return NextResponse.json(
      {
        success: true,
        message: "Room updated successfully",
        data: updatedRoom,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Update failed",
      },
      { status: 500 },
    );
  }
}

/* DELETE ROOM */
export async function DELETE(req: Request, context: RouteContext) {
  try {
    await connectDB();

    const { id } = await context.params;

    const room = await Room.findById(id);

    if (!room) {
      return NextResponse.json(
        {
          success: false,
          message: "Room not found",
        },
        { status: 404 },
      );
    }

    for (const img of room.images) {
      await cloudinary.uploader.destroy(img.publicId);
    }

    await Room.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Room deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Delete failed",
      },
      { status: 500 },
    );
  }
}
