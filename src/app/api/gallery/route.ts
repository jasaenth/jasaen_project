import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import cloudinary from "@/lib/cloudinary";
import Gallery from "@/models/Gallery";

export async function GET() {
  try {
    await connectDB();

    const images = await Gallery.find().sort({
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      data: images,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch gallery",
      },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();

    const title = formData.get("title") as string;
    const subtitle = formData.get("subtitle") as string;
    const tag = formData.get("tag") as string;
    const uploadedImageStr = formData.get("uploadedImage") as string;
    const file = formData.get("image") as File;

    const preuploadedImage = uploadedImageStr
      ? (JSON.parse(uploadedImageStr) as { url: string; publicId: string })
      : null;

    if (!title || !subtitle || !tag || (!file && !preuploadedImage)) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 },
      );
    }

    // 5MB validation
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        {
          success: false,
          message: "Image must be less than 5MB",
        },
        { status: 400 },
      );
    }

    let imageUrl = "";
    let publicId = "";

    if (preuploadedImage) {
      imageUrl = preuploadedImage.url;
      publicId = preuploadedImage.publicId;
    } else if (file) {
      // Fallback: upload file directly if still provided
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

      imageUrl = uploadResponse.secure_url;
      publicId = uploadResponse.public_id;
    }

    const newImage = await Gallery.create({
      title,
      subtitle,
      tag,
      image: imageUrl,
      publicId: publicId,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Image uploaded successfully",
        data: newImage,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Upload failed",
      },
      { status: 500 },
    );
  }
}
