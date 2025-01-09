import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const slug = formData.get("slug") as string;
    const files = formData.getAll("images") as File[];

    // Validate slug
    if (!slug || typeof slug !== "string") {
      return NextResponse.json(
        { error: "Slug is required and must be a string" },
        { status: 400 }
      );
    }

    // Validate files
    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: "At least one image file is required" },
        { status: 400 }
      );
    }

    const folderPath = path.join(process.cwd(), "public", "images", slug);

    // Create folder if it doesn't exist
    await mkdir(folderPath, { recursive: true });

    const savedFiles = [];
    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const filePath = path.join(folderPath, file.name);
      await writeFile(filePath, buffer);

      savedFiles.push(`/images/${slug}/${file.name}`);
    }

    return NextResponse.json({
      message: "Files uploaded successfully!",
      files: savedFiles,
    });
  } catch (error) {
    console.error("Error saving files:", error);
    return NextResponse.json(
      { error: "Failed to upload files" },
      { status: 500 }
    );
  }
}
