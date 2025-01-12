import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json(
      { error: "Missing slug parameter" },
      { status: 400 }
    );
  }

  try {
    const folderPath = path.join(process.cwd(), "public", "images", slug);

    // Read the directory contents
    const files = await fs.readdir(folderPath);

    // Only return image files
    const imageFiles = files.filter((file) =>
      /\.(jpe?g|png|gif|webp)$/i.test(file)
    );

    return NextResponse.json(imageFiles);
  } catch (error) {
    console.error("Error reading files:", error);
    return NextResponse.json(
      { error: "Failed to fetch files" },
      { status: 500 }
    );
  }
}
