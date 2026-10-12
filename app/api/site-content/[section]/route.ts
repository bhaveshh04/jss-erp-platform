import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, unauthorized, forbidden } from "@/lib/auth";
import { logActivity } from "@/lib/activity";
import {
  SECTION_SCHEMAS,
  SECTION_DEFAULTS,
  SECTION_KEYS,
  type SectionKey,
} from "@/lib/site-sections";
import { randomUUID } from "node:crypto";
export const runtime = "nodejs";

function isSectionKey(value: string): value is SectionKey {
  return (SECTION_KEYS as string[]).includes(value);
}

type Params = { params: Promise<{ section: string }> };

export async function GET(
  _req: NextRequest,
  { params }: Params
) {
  const me = await getCurrentUser();

  if (!me) return unauthorized();
  if (me.role !== "OWNER") return forbidden();

  const { section } = await params;

  if (!isSectionKey(section)) {
    return NextResponse.json(
      { error: "Unknown section." },
      { status: 404 }
    );
  }

  const row = await prisma.siteContent.findUnique({
    where: { section },
  });

  if (row) {
    // The database stores JSON as a string, so parse it first.
    let storedData: unknown;

    try {
      storedData = JSON.parse(row.data);
    } catch {
      storedData = null;
    }

    const parsed = SECTION_SCHEMAS[section].safeParse(storedData);

    if (parsed.success) {
      return NextResponse.json({
        section,
        data: parsed.data,
        isDefault: false,
      });
    }
  }

  return NextResponse.json({
    section,
    data: SECTION_DEFAULTS[section],
    isDefault: true,
  });
}

export async function PUT(
  req: NextRequest,
  { params }: Params
) {
  const me = await getCurrentUser();

  if (!me) return unauthorized();
  if (me.role !== "OWNER") return forbidden();

  const { section } = await params;

  if (!isSectionKey(section)) {
    return NextResponse.json(
      { error: "Unknown section." },
      { status: 404 }
    );
  }

  const json = await req.json().catch(() => null);
  const parsed = SECTION_SCHEMAS[section].safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error:
          parsed.error.issues[0]?.message ?? "Invalid content.",
        issues: parsed.error.issues,
      },
      { status: 400 }
    );
  }

  // Prisma schema defines data as String, so serialize the object.
  const serializedData = JSON.stringify(parsed.data);

await prisma.siteContent.upsert({
  where: { section },
  update: {
    data: serializedData,
    updatedAt: new Date(),
  },
  create: {
    id: randomUUID(),
    section,
    data: serializedData,
    updatedAt: new Date(),
  },
});
  await logActivity(
    "SITE_CONTENT_UPDATED",
    `${me.name} updated the "${section}" website section.`
  );

  return NextResponse.json({ ok: true });
}
