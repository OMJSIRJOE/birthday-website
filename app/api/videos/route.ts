import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const VIDEO_EXTENSIONS = new Set([".mp4", ".webm", ".mov", ".m4v"]);

export async function GET() {
  const videosDir = path.join(process.cwd(), "public", "videos");

  try {
    if (!fs.existsSync(videosDir)) {
      return NextResponse.json({ videos: [], error: "videos folder not found" });
    }

    const files = fs
      .readdirSync(videosDir)
      .filter((file) => {
        const ext = path.extname(file).toLowerCase();
        return VIDEO_EXTENSIONS.has(ext);
      })
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map((file) => `/videos/${file}`);

    return NextResponse.json({ videos: files });
  } catch {
    return NextResponse.json({ videos: [], error: "could not read videos folder" });
  }
}
