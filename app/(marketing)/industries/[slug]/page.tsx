import { notFound } from "next/navigation";
import LandingPageView from "@/components/marketing/LandingPageView";
import { getSiteContentMany } from "@/lib/site-content-db";
import { INDUSTRY_PAGES, landingPath } from "@/lib/landing-pages";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 300;
// only the industries listed in lib/landing-pages.ts exist; anything else is a 404
export const dynamicParams = false;

export function generateStaticParams() {
  return INDUSTRY_PAGES.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const page = INDUSTRY_PAGES.find((p) => p.slug === slug);
  if (!page) return {};
  return {
    ...pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: landingPath(page) }),
    keywords: [page.keyword, ...page.extraKeywords],
  };
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const page = INDUSTRY_PAGES.find((p) => p.slug === slug);
  if (!page) notFound();

  const { company, caseStudies } = await getSiteContentMany(["company", "caseStudies"]);
  return <LandingPageView page={page} company={company} caseStudies={caseStudies.items} />;
}
