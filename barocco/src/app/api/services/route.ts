import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const slug = formData.get("slug") as string | null;
    const title = formData.get("title") as string | null;
    const description = formData.get("description") as string | null;

    if (!slug || !title || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const uploadDir = path.join(process.cwd(), "public", "images", slug);
    await fs.mkdir(uploadDir, { recursive: true });

    const uploadedFiles = formData.getAll("images") as File[];
    for (const file of uploadedFiles) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const filePath = path.join(uploadDir, file.name);
      await fs.writeFile(filePath, buffer);
    }

    console.log(`Service updated: ${title}, ${description}`);

    return NextResponse.json({ message: "Service updated successfully" });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Failed to process the request" },
      { status: 500 }
    );
  }
}
