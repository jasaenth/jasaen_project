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
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch rooms",
      },
      { status: 500 }
    );
  }
}


function generateSlug(name: string) {
  return name.toLowerCase().trim().replace(/\s+/g, "-");
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();

    const roomName = formData.get("roomName") as string;
    const roomType = formData.get("roomType") as string;
    const description = formData.get("description") as string;
    const shortDescription = formData.get("shortDescription") as string;
    const pricePerNight = Number(formData.get("pricePerNight"));
    const discountPrice = Number(formData.get("discountPrice") || 0);
    const maxAdults = Number(formData.get("maxAdults"));
    const maxChildren = Number(formData.get("maxChildren"));
    const bedType = formData.get("bedType") as string;
    const roomSize = Number(formData.get("roomSize"));
    const totalUnits = Number(formData.get("totalUnits"));
    const amenities = JSON.parse((formData.get("amenities") as string) || "[]");
    const files = formData.getAll("images") as File[];

    if (
      !roomName ||
      !roomType ||
      !description ||
      !shortDescription ||
      !pricePerNight ||
      !bedType ||
      !roomSize ||
      !totalUnits ||
      files.length === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "All required fields are missing",
        },
        { status: 400 },
      );
    }

    // check existing room slug
    const slug = generateSlug(roomName);

    const existingRoom = await Room.findOne({
      slug,
    });

    if (existingRoom) {
      return NextResponse.json(
        {
          success: false,
          message: "Room already exists",
        },
        { status: 400 },
      );
    }

    // upload images
    const uploadedImages = [];

    for (const file of files) {
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

    // generate units
    const units = [];

    for (let i = 1; i <= totalUnits; i++) {
      units.push({
        unitNumber: `${roomType}-${i}`,
        status: "AVAILABLE",
      });
    }

    const newRoom = await Room.create({
      roomName,
      slug,
      roomType,
      description,
      shortDescription,
      pricePerNight,
      discountPrice,
      maxAdults,
      maxChildren,
      bedType,
      roomSize,
      amenities,
      images: uploadedImages,
      totalUnits,
      availableUnits: totalUnits,
      units,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Room created successfully",
        data: newRoom,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Room creation failed",
      },
      { status: 500 },
    );
  }
}
