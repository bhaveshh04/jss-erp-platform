import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, unauthorized, forbidden } from "@/lib/auth";

export const runtime = "nodejs";

export async function DELETE(_req: Request, { params }: { params: Promise<{ kind: string; id: string }> }) {
  const me = await getCurrentUser();
  if (!me) return unauthorized();
  if (me.role !== "OWNER") return forbidden();

  const { kind, id } = await params;

  try {
    if (kind === "contact") await prisma.contactMessage.delete({ where: { id } });
    else if (kind === "application") await prisma.jobApplication.delete({ where: { id } });
    else return NextResponse.json({ error: "Unknown type." }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "Entry not found." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}