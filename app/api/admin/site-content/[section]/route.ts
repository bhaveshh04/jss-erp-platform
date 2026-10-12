
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser, unauthorized, forbidden } from "@/lib/auth";
import { logActivity } from "@/lib/activity";
import {
  SECTION_SCHEMAS,
  SECTION_DEFAULTS,
  SECTION_LABELS,
  type SectionKey,
} from "@/lib/site-sections";

export const runtime = "nodejs";

type Params = {
  params: Promise<{ section: string }>;
};

function isValidSection(value: string): value is SectionKey {
  return Object.prototype.hasOwnProperty.call(SECTION_SCHEMAS, value);
}

function parseStoredData(value: string): unknown {
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

export async function GET(
  _req: NextRequest,
  { params }: Params
) {
  try {
    const me = await getCurrentUser();

    if (!me) return unauthorized();
    if (me.role !== "OWNER") return forbidden();

    const { section } = await params;

    if (!isValidSection(section)) {
      return NextResponse.json(
        { error: "Unknown content section." },
        { status: 404 }
      );
    }

    const row = await prisma.siteContent.findUnique({
      where: { section },
    });

    const rawData = row ? parseStoredData(row.data) : null;
    const parsed = rawData === null
      ? null
      : SECTION_SCHEMAS[section].safeParse(rawData);

    return NextResponse.json({
      section,
      label: SECTION_LABELS[section],
      data:
        parsed?.success
          ? parsed.data
          : SECTION_DEFAULTS[section],
    });
  } catch (error) {
    console.error("GET site-content error:", error);

    return NextResponse.json(
      { error: "Failed to load website content." },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: Params
) {
  try {
    const me = await getCurrentUser();

    if (!me) return unauthorized();
    if (me.role !== "OWNER") return forbidden();

    const { section } = await params;

    if (!isValidSection(section)) {
      return NextResponse.json(
        { error: "Unknown content section." },
        { status: 404 }
      );
    }

    const json = await req.json().catch(() => null);
    const parsed = SECTION_SCHEMAS[section].safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error:
            parsed.error.issues[0]?.message ??
            "Invalid content for this section.",
          issues: parsed.error.issues,
        },
        { status: 400 }
      );
    }

    const serializedData = JSON.stringify(parsed.data);
    const now = new Date();

  await prisma.siteContent.upsert({
  where: { section },
  update: {
    data: JSON.stringify(parsed.data),
    updatedAt: new Date(),
  },
  create: {
    id: crypto.randomUUID(),
    section,
    data: JSON.stringify(parsed.data),
    updatedAt: new Date(),
  },
});

    try {
      await logActivity(
        "SITE_CONTENT_UPDATED",
        `${me.name} updated "${SECTION_LABELS[section]}" on the website.`
      );
    } catch (error) {
      // A logging failure should not make a successful content save fail.
      console.error("Site-content activity log error:", error);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("PUT site-content error:", error);

    return NextResponse.json(
      { error: "Failed to save website content." },
      { status: 500 }
    );
  }
}
