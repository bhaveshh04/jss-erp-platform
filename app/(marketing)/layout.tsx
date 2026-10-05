import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import { getSiteContentMany } from "@/lib/site-content-db";

// Content here comes straight from the database (edited from Portal →
// Website content), so this whole route group must always render fresh on
// the server — never statically cached — or Owner edits wouldn't show up
// without a full redeploy. This setting on the layout covers every page
// under it, and each page below also sets it explicitly as a belt-and-braces
// guarantee.
export const dynamic = "force-dynamic";

// Every marketing page shares this layout, so we fetch the small, frequently
// reused sections (company info + nav categories) once here rather than in
// every page — this always reflects the latest edits from Portal → Website
// content since it's a fresh DB read per request.
export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
  const { company, products, solutions } = await getSiteContentMany(["company", "products", "solutions"]);

  return (
    <>
      <Navbar company={company} products={products.items} solutions={solutions.items} />
      <main className="flex-1">{children}</main>
      <Footer company={company} products={products.items} />
    </>
  );
}
