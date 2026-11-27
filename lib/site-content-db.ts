import "server-only";
import { cache } from "react";
import { unstable_cache } from "next/cache";
import { prisma } from "./prisma";
import { SECTION_DEFAULTS, SECTION_SCHEMAS, type SectionDataMap, type SectionKey } from "./site-sections";

/** Cache tag for all website content. The admin save route revalidates it. */
export const SITE_CONTENT_TAG = "site-content";

const isBuild = process.env.NEXT_PHASE === "phase-production-build";

type RawRows = Record<string, string>;

/**
 * ONE database query loads every website section at once and is kept in
 * Next's data cache, so visitors almost never wait on the database:
 *  - layout + page share the same result (no more ~11 queries per page)
 *  - refreshed every 5 minutes, and immediately when the owner saves
 *    in Portal → Website content (revalidateTag in the save route)
 * Errors are thrown, never cached, so a DB hiccup can't pin default content.
 */
const loadRawRows = unstable_cache(
  async (): Promise<RawRows> => {
    const rows = await prisma.siteContent.findMany({ select: { section: true, data: true } });
    return Object.fromEntries(rows.map((r) => [r.section, r.data]));
  },
  ["site-content-all-v1"],
  { tags: [SITE_CONTENT_TAG], revalidate: 300 }
);

/** Per-request memo on top of the data cache (layout + page + metadata share one call). */
const getRawRows = cache(async (): Promise<RawRows> => {
  try {
    return await loadRawRows();
  } catch (error) {
    console.error("Failed to load site content:", error);
    // During `next build` the database may be unreachable from the build machine → use defaults.
    // At runtime, throw so Next keeps serving the last good cached page instead of caching defaults.
    if (isBuild) return {};
    throw error;
  }
});

function parseSection<K extends SectionKey>(section: K, raw: string | undefined): SectionDataMap[K] {
  if (raw === undefined) return SECTION_DEFAULTS[section];

  let content: unknown = raw;
  if (typeof content === "string") {
    try {
      content = JSON.parse(content);
    } catch (error) {
      console.error(`Invalid JSON stored for site section "${section}":`, error);
      return SECTION_DEFAULTS[section];
    }
  }

  const parsed = SECTION_SCHEMAS[section].safeParse(content);
  if (parsed.success) return parsed.data as SectionDataMap[K];

  console.error(`Invalid content for site section "${section}":`, parsed.error.issues);
  return SECTION_DEFAULTS[section];
}

export async function getSiteContent<K extends SectionKey>(section: K): Promise<SectionDataMap[K]> {
  const rows = await getRawRows();
  return parseSection(section, rows[section]);
}

/** Fetches several sections at once (still a single cached query). */
export async function getSiteContentMany<K extends SectionKey>(sections: K[]): Promise<Pick<SectionDataMap, K>> {
  const rows = await getRawRows();
  return Object.fromEntries(sections.map((s) => [s, parseSection(s, rows[s])])) as Pick<SectionDataMap, K>;
}
