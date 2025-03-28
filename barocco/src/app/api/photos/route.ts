import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

// Root directory for all images
const imagesRoot = path.join(process.cwd(), "public", "images");

// Helper function to get folder path for a given slug
const getFolderPath = (slug?: string) => {
  return slug ? path.join(imagesRoot, slug) : imagesRoot;
};

// GET handler
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug") ?? undefined;

  try {
    const folderPath = getFolderPath(slug);
    const directories = slug
      ? [folderPath]
      : (await fs.readdir(imagesRoot, { withFileTypes: true }))
          .filter((entry) => entry.isDirectory())
          .map((dir) => path.join(imagesRoot, dir.name));

    const allPhotos = (
      await Promise.all(
        directories.map(async (dir) => {
          try {
            const files = await fs.readdir(dir);
            return files.filter((file) => /\.(jpe?g|png|gif|webp)$/i.test(file));
          } catch {
            return [];
          }
        })
      )
    ).flat();

    // Return an object with a `photos` property
    return NextResponse.json({ photos: allPhotos });
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
  try {
    const formData = await req.formData();
    const slug = formData.get("slug") as string;
    const photo = formData.get("photo") as File;

    if (!slug || !photo) {
      return NextResponse.json(
        { error: "Missing slug or photo file" },
        { status: 400 }
      );
    }

    const folderPath = path.join(process.cwd(), "public", "images", slug);
    await fs.mkdir(folderPath, { recursive: true });

    const fileBuffer = Buffer.from(await photo.arrayBuffer());
    const filePath = path.join(folderPath, photo.name);
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
  const fileName = searchParams.get("file");

  if (!fileName) {
    return NextResponse.json({ error: "Missing file name" }, { status: 400 });
  }

  try {
    // Look for the file in all directories
    const directories = await fs.readdir(imagesRoot, { withFileTypes: true });
    const folderPaths = directories
      .filter((entry) => entry.isDirectory())
      .map((dir) => path.join(imagesRoot, dir.name));

    let filePath: string | undefined;

    for (const dir of folderPaths) {
      const possiblePath = path.join(dir, fileName);
      try {
        await fs.access(possiblePath);
        filePath = possiblePath;
        break;
      } catch (err) {
        // File does not exist in this directory
      }
    }

    if (!filePath) {
      return NextResponse.json({ error: "File does not exist" }, { status: 404 });
    }

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