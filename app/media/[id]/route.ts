import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

type Params = { params: Promise<{ id: string }> };

/**
 * Public image endpoint for files uploaded from Portal → Website content.
 * Each upload gets a unique id and is never modified afterwards, so it's
 * safe to tell browsers/CDNs to cache it for a year.
 */
export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params;

  const asset = await prisma.mediaAsset.findUnique({ where: { id } });
  if (!asset) return new NextResponse("Not found", { status: 404 });

  return new NextResponse(new Uint8Array(asset.data), {
    headers: {
      "Content-Type": asset.mimeType,
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
