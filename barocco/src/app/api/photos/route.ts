import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

// Helper function to get the folder path for a given slug
const getFolderPath = (slug: string) =>
  path.join(process.cwd(), "public", "images", slug);

// GET method: Fetch photos for a specific category
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
    const folderPath = getFolderPath(slug);

    // Read the directory contents
    const files = await fs.readdir(folderPath);

    // Filter image files
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

// POST method: Upload a new photo
export async function POST(req: Request) {
  const formData = await req.formData();
  const slug = formData.get("slug") as string;
  const photo = formData.get("photo") as File;

  if (!slug || !photo) {
    return NextResponse.json(
      { error: "Missing slug or photo file" },
      { status: 400 }
    );
  }

  try {
    const folderPath = getFolderPath(slug);

    // Ensure the folder exists
    await fs.mkdir(folderPath, { recursive: true });

    // Save the uploaded file
    const filePath = path.join(folderPath, photo.name);
    const fileBuffer = Buffer.from(await photo.arrayBuffer());
    await fs.writeFile(filePath, fileBuffer);

    return NextResponse.json({ message: "Photo uploaded successfully" });
  } catch (error) {
    console.error("Error uploading photo:", error);
    return NextResponse.json(
      { error: "Failed to upload photo" },
      { status: 500 }
    );
  }
}

// DELETE method: Delete a specific photo
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  const fileName = searchParams.get("file");

  if (!slug || !fileName) {
    return NextResponse.json(
      { error: "Missing slug or file name" },
      { status: 400 }
    );
  }

  try {
    const folderPath = getFolderPath(slug);
    const filePath = path.join(folderPath, fileName);

    // Delete the file
    await fs.unlink(filePath);

    return NextResponse.json({ message: "Photo deleted successfully" });
  } catch (error) {
    console.error("Error deleting photo:", error);
    return NextResponse.json(
      { error: "Failed to delete photo" },
      { status: 500 }
    );
  }
}
