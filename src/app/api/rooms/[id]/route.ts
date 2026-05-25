import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Room from "@/models/Room";
import cloudinary from "@/lib/cloudinary";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

/* GET SINGLE ROOM */
export async function GET(
  req: Request,
  context: RouteContext
) {
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
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: room,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch room",
      },
      { status: 500 }
    );
  }
}

/* UPDATE ROOM */
export async function PUT(
  req: Request,
  context: RouteContext
) {
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
        { status: 404 }
      );
    }

    const formData = await req.formData();

    const roomName = formData.get("roomName") as string;
    const roomType = formData.get("roomType") as string;
    const description = formData.get("description") as string;
    const shortDescription =
      formData.get("shortDescription") as string;

    const pricePerNight = Number(
      formData.get("pricePerNight")
    );

    const discountPrice = Number(
      formData.get("discountPrice") || 0
    );

    const maxAdults = Number(
      formData.get("maxAdults")
    );

    const maxChildren = Number(
      formData.get("maxChildren")
    );

    const bedType = formData.get("bedType") as string;

    const roomSize = Number(
      formData.get("roomSize")
    );

    const totalUnits = Number(
      formData.get("totalUnits")
    );

    const amenities = JSON.parse(
      (formData.get("amenities") as string) || "[]"
    );

    const isFeatured =
      formData.get("isFeatured") === "true";

    const keptImages = JSON.parse(
      (formData.get("existingImages") as string) || "[]"
    );

    const newFiles = formData.getAll(
      "images"
    ) as File[];

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
        { status: 400 }
      );
    }

    // delete removed images
    const removedImages =
      existingRoom.images.filter(
        (img: any) =>
          !keptImages.some(
            (k: any) =>
              k.publicId === img.publicId
          )
      );

    for (const img of removedImages) {
      await cloudinary.uploader.destroy(
        img.publicId
      );
    }

    // upload new images
    const uploadedImages = [];

    for (const file of newFiles) {
      if (file.size > 2 * 1024 * 1024) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Each image must be less than 2MB",
          },
          { status: 400 }
        );
      }

      const bytes =
        await file.arrayBuffer();

      const buffer =
        Buffer.from(bytes);

      const base64 =
        `data:${file.type};base64,${buffer.toString("base64")}`;

      const uploadResponse =
        await cloudinary.uploader.upload(
          base64,
          {
            folder: "jasaen/rooms",
          }
        );

      uploadedImages.push({
        url: uploadResponse.secure_url,
        publicId:
          uploadResponse.public_id,
      });
    }

    const finalImages = [
      ...keptImages,
      ...uploadedImages,
    ];

    if (finalImages.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message:
            "At least one image required",
        },
        { status: 400 }
      );
    }

    if (finalImages.length > 5) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Maximum 5 images allowed",
        },
        { status: 400 }
      );
    }

    // regenerate units
    let units = existingRoom.units;

    if (
      totalUnits !== existingRoom.totalUnits
    ) {
      units = [];

      for (
        let i = 1;
        i <= totalUnits;
        i++
      ) {
        units.push({
          unitNumber: `${roomType}-${i}`,
          status: "AVAILABLE",
        });
      }
    }

    const updatedRoom =
      await Room.findByIdAndUpdate(
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
          availableUnits:
            totalUnits,
          amenities,
          isFeatured,
          images: finalImages,
          units,
        },
        {
          returnDocument: "after",
        }
      );

    return NextResponse.json(
      {
        success: true,
        message:
          "Room updated successfully",
        data: updatedRoom,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Update failed",
      },
      { status: 500 }
    );
  }
}

/* DELETE ROOM */
export async function DELETE(
  req: Request,
  context: RouteContext
) {
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
        { status: 404 }
      );
    }

    for (const img of room.images) {
      await cloudinary.uploader.destroy(
        img.publicId
      );
    }

    await Room.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message:
        "Room deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Delete failed",
      },
      { status: 500 }
    );
  }
}