import LandingPageView from "@/components/marketing/LandingPageView";
import { getSiteContentMany } from "@/lib/site-content-db";
import { PUNE_PAGE, landingPath } from "@/lib/landing-pages";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 300;

export const metadata = {
  ...pageMetadata({
    title: { absolute: PUNE_PAGE.metaTitle },
    description: PUNE_PAGE.metaDescription,
    path: landingPath(PUNE_PAGE),
  }),
  keywords: [PUNE_PAGE.keyword, ...PUNE_PAGE.extraKeywords],
};

export default async function ErpSoftwarePune() {
  const { company, caseStudies } = await getSiteContentMany(["company", "caseStudies"]);
  return <LandingPageView page={PUNE_PAGE} company={company} caseStudies={caseStudies.items} />;
}
