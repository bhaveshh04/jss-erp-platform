import "server-only";
import { prisma } from "./prisma";
import { SECTION_DEFAULTS, SECTION_SCHEMAS, type SectionDataMap, type SectionKey } from "./site-sections";

const isBuild = process.env.NEXT_PHASE === "phase-production-build";

export async function getSiteContent<K extends SectionKey>(section: K): Promise<SectionDataMap[K]> {
  const row = await prisma.siteContent.findUnique({ where: { section } }).catch((error) => {
    console.error(`Failed to load site section "${section}":`, error);
    // During `next build` the database may be unreachable from the build machine → use defaults.
    // At runtime, throw so Next keeps serving the last good cached page instead of caching defaults.
    if (isBuild) return null;
    throw error;
  });

  if (!row) return SECTION_DEFAULTS[section];

  let content: unknown = row.data;
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

/** Fetches several sections at once. */
export async function getSiteContentMany<K extends SectionKey>(sections: K[]): Promise<Pick<SectionDataMap, K>> {
  const entries = await Promise.all(sections.map(async (s) => [s, await getSiteContent(s)] as const));
  return Object.fromEntries(entries) as Pick<SectionDataMap, K>;
}