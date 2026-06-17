import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import Gallery from "@/models/Gallery";
import cloudinary from "@/lib/cloudinary";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

/* UPDATE IMAGE */
export async function PUT(req: Request, context: RouteContext) {
  try {
    await connectDB();

    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid image id",
        },
        { status: 400 },
      );
    }

    const existing = await Gallery.findById(id);

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          message: "Image not found",
        },
        { status: 404 },
      );
    }

    const formData = await req.formData();

    const title = (formData.get("title") as string) || existing.title;
    const subtitle = (formData.get("subtitle") as string) || existing.subtitle;
    const tag = (formData.get("tag") as string) || existing.tag;
    const uploadedImageStr = formData.get("uploadedImage") as string;
    const file = formData.get("image") as File | null;

    const preuploadedImage = uploadedImageStr
      ? (JSON.parse(uploadedImageStr) as { url: string; publicId: string })
      : null;

    let imageUrl = existing.image;
    let publicId = existing.publicId;

    if (preuploadedImage) {
      // Delete old image when new one is uploaded
      await cloudinary.uploader.destroy(existing.publicId);
      imageUrl = preuploadedImage.url;
      publicId = preuploadedImage.publicId;
    } else if (file && file.size > 0) {
      // Fallback: handle direct file upload if still provided
      if (file.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          {
            success: false,
            message: "Image must be less than 5MB",
          },
          { status: 400 },
        );
      }

      // delete old cloudinary image
      await cloudinary.uploader.destroy(existing.publicId);

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

      const uploadResponse = await cloudinary.uploader.upload(base64, {
        folder: "jasaen/gallery",
      });

      imageUrl = uploadResponse.secure_url;
      publicId = uploadResponse.public_id;
    }

    const updated = await Gallery.findByIdAndUpdate(
      id,
      {
        title,
        subtitle,
        tag,
        image: imageUrl,
        publicId,
      },
      {
        returnDocument: "after",
      },
    );

    return NextResponse.json({
      success: true,
      message: "Updated successfully",
      data: updated,
    });
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

/* DELETE IMAGE */
export async function DELETE(req: Request, context: RouteContext) {
  try {
    await connectDB();

    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid image id",
        },
        { status: 400 },
      );
    }

    const image = await Gallery.findById(id);

    if (!image) {
      return NextResponse.json(
        {
          success: false,
          message: "Image not found",
        },
        { status: 404 },
      );
    }

    await cloudinary.uploader.destroy(image.publicId);

    await Gallery.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Deleted successfully",
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
