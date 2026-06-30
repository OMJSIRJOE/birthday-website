import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

export async function GET() {
  const imagesDir = path.join(process.cwd(), "public", "images");

  try {
    if (!fs.existsSync(imagesDir)) {
      return NextResponse.json({ images: [], error: "images folder not found" });
    }

    const files = fs
      .readdirSync(imagesDir)
      .filter((file) => {
        const ext = path.extname(file).toLowerCase();
        return IMAGE_EXTENSIONS.has(ext);
      })
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map((file) => `/images/${file}`);

    return NextResponse.json({ images: files });
  } catch {
    return NextResponse.json({ images: [], error: "could not read images folder" });
  }
}
