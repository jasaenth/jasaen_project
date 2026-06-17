import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File | null;

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          message: "Image is required",
        },
        { status: 400 },
      );
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        {
          success: false,
          message: "Image must be less than 5MB",
        },
        { status: 400 },
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    const uploadResponse = await cloudinary.uploader.upload(base64, {
      folder: "jasaen/gallery",
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          url: uploadResponse.secure_url,
          publicId: uploadResponse.public_id,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Gallery image upload error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to upload image",
      },
      { status: 500 },
    );
  }
}
