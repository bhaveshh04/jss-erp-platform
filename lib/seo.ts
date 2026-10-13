import type { Metadata } from "next";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.jssinnovativesolutions.com").replace(/\/$/, "");
export const SITE_NAME = "JSS Innovative Solutions";
export const DEFAULT_TITLE = `${SITE_NAME} | ERP Software Company in Pune`;
export const DEFAULT_DESCRIPTION =
  "Pune-based ERP and custom software company. 200% customised ERP, HRMS, CRM and IoT solutions for manufacturing, textile and process industries across India.";

type PageMetaInput = {
  title: string | { absolute: string };
  description: string;
  path: string;
};

/** Full per-page metadata. (A page-level openGraph REPLACES the root one, so everything is repeated here.) */
export function pageMetadata({ title, description, path }: PageMetaInput): Metadata {
  const fullTitle = typeof title === "string" ? `${title} | ${SITE_NAME}` : title.absolute;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      url: path,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ["/opengraph-image"],
    },
  };
}