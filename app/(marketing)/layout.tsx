import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import Motion from "@/components/marketing/Motion";
import { getSiteContentMany } from "@/lib/site-content-db";
import { SITE_URL } from "@/lib/seo";
import "./marketing.css";

// Pages are cached and refreshed every 5 minutes, and immediately when the
// owner saves in Portal → Website content (see the revalidatePath step below).
export const revalidate = 300;

export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
  const { company, products, solutions } = await getSiteContentMany(["company", "products", "solutions"]);

  const postalCode = company.address.match(/\b\d{6}\b/)?.[0];
  const sameAs = Object.values(company.social).filter((u) => /^https?:\/\//i.test(u?.trim() ?? ""));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: company.name,
        alternateName: "JSS",
        inLanguage: "en-IN",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": `${SITE_URL}/#organization`,
        name: company.name,
        alternateName: "JSS",
        slogan: company.shortTagline,
        url: SITE_URL,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png`, width: 762, height: 327 },
        image: `${SITE_URL}/opengraph-image`,
        description: `${company.tagline} — ERP implementation and custom software development in ${company.location}.`,
        telephone: company.phone,
        email: company.email,
        areaServed: { "@type": "Country", name: "India" },
        knowsAbout: [
          "ERP software",
          "ERP implementation",
          "HRMS and payroll software",
          "CRM software",
          "Industrial IoT",
          "GST billing and e-invoicing",
          "Custom software development",
          ...solutions.items.map((s) => s.name),
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            telephone: company.phone,
            email: company.email,
            areaServed: "IN",
            availableLanguage: ["English"],
          },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "ERP products",
          itemListElement: products.items.map((p) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: p.name, description: p.summary, url: `${SITE_URL}/services#${p.slug}` },
          })),
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: company.address,
          addressLocality: "Pune",
          addressRegion: "Maharashtra",
          ...(postalCode ? { postalCode } : {}),
          addressCountry: "IN",
        },
        ...(sameAs.length ? { sameAs } : {}),
      },
    ],
  };

  return (
    <div className="mk flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-navy focus:shadow-lg"
      >
        Skip to content
      </a>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Navbar company={company} products={products.items} solutions={solutions.items} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer company={company} products={products.items} />
      <Motion />
    </div>
  );
}