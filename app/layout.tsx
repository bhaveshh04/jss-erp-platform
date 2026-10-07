import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.jssinnovativesolutions.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default:
      "JSS Innovative Solutions | Custom Software & ERP Solutions in Pune",
    template: "%s | JSS Innovative Solutions",
  },

  description:
    "JSS Innovative Solutions is a Pune-based technology company providing custom software, ERP, web applications, automation and AI-powered solutions for businesses across India.",

  keywords: [
    "JSS Innovative Solutions",
    "software development company Pune",
    "custom software development Pune",
    "custom software solutions",
    "ERP software Pune",
    "ERP solutions Pune",
    "manufacturing ERP",
    "business automation software",
    "web application development Pune",
    "AI solutions Pune",
  ],

  authors: [
    {
      name: "JSS Innovative Solutions",
    },
  ],

  creator: "JSS Innovative Solutions",
  publisher: "JSS Innovative Solutions",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "JSS Innovative Solutions",
    url: siteUrl,
    title:
      "JSS Innovative Solutions | Custom Software & ERP Solutions in Pune",
    description:
      "Custom software, ERP, web applications, automation and AI-powered solutions for businesses across India.",
  },

  twitter: {
    card: "summary_large_image",
    title:
      "JSS Innovative Solutions | Custom Software & ERP Solutions in Pune",
    description:
      "Custom software, ERP, web applications, automation and AI-powered solutions for businesses across India.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        {children}
      </body>
    </html>
  );
}