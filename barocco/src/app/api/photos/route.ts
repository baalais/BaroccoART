import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

// Helper function to get the folder path for a given slug
const getFolderPath = (slug: string) =>
  path.join(process.cwd(), "public", "images", slug);

// GET handler
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

// POST handler
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

// DELETE handler
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  const fileName = searchParams.get("file");

  console.log("Received file name:", fileName); // Debug log
  console.log("Received slug:", slug); // Debug log

  if (!slug || !fileName) {
    return NextResponse.json(
      { error: "Missing slug or file name" },
      { status: 400 }
    );
  }

  try {
    const folderPath = getFolderPath(slug);
    const filePath = path.join(folderPath, fileName);

    // Ensure the file path is within the folder to avoid path traversal
    if (!filePath.startsWith(folderPath)) {
      return NextResponse.json(
        { error: "Invalid file path" },
        { status: 400 }
      );
    }

    // Delete the file
    await fs.unlink(filePath);

    return NextResponse.json({ message: "Photo deleted successfully" });
  } catch (error) {
    console.error("Error deleting photo:", error);

    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return NextResponse.json(
        { error: "File does not exist" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Failed to delete photo" },
      { status: 500 }
    );
  }
}
