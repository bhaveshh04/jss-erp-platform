import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, unauthorized, forbidden } from "@/lib/auth";
import { logActivity } from "@/lib/activity";

export const runtime = "nodejs";

// SVG is deliberately excluded: an SVG opened directly can carry scripts, and
// these files are served from the same origin as the portal.
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

// Vercel rejects request bodies above ~4.5 MB, so stay safely under that.
// (The portal compresses images in the browser first, so real uploads are
// usually a few hundred KB.)
const MAX_BYTES = 4 * 1024 * 1024;

export async function POST(req: NextRequest) {
  const me = await getCurrentUser();
  if (!me) return unauthorized();
  if (me.role !== "OWNER") return forbidden();

  const form = await req.formData().catch(() => null);
  const file = form?.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No image file received." }, { status: 400 });
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Only JPG, PNG, WebP or GIF images are allowed." }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "That image is too large (max 4 MB)." }, { status: 400 });
  }

  const asset = await prisma.mediaAsset.create({
    data: {
      filename: file.name.slice(0, 200) || "upload",
      mimeType: file.type,
      size: file.size,
      data: new Uint8Array(await file.arrayBuffer()),
    },
    select: { id: true },
  });

  await logActivity("MEDIA_UPLOADED", `${me.name} uploaded an image (${file.name.slice(0, 80)}).`);

  return NextResponse.json({ url: `/media/${asset.id}` });
}
