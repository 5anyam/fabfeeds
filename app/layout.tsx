import "./globals.css";
import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/sonner";
import { PageTransitionLoader } from "@/components/PageTransitionLoader";
import Script from "next/script";

/* ══ Fonts ════════════════════════════════════════════════════════════════
   Plus Jakarta Sans — modern, magazine-feel font
   Inter — fallback for body text
══════════════════════════════════════════════════════════════════════════ */
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/* ══ Metadata ═════════════════════════════════════════════════════════════ */
export const metadata: Metadata = {
  metadataBase: new URL("https://trendships.com"),

  title: {
    default: "Trendships — AI-Powered Trending Blogs, Deals & Products",
    template: "%s | Trendships",
  },

  description:
    "Discover AI-curated trending articles, deals, and products across fashion, travel, tech, lifestyle & more. Trendships brings you what's hot — updated daily.",

  keywords: [
    "trending blogs",
    "AI curated content",
    "trending products",
    "deals",
    "travel guides",
    "tech reviews",
    "lifestyle articles",
    "fashion trends",
    "best picks",
    "trendships",
    "what's trending",
    "buying guides",
    "product recommendations",
  ],

  authors: [{ name: "Trendships Team" }],
  creator: "Trendships",
  publisher: "Adshouz Digital LLP",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://trendships.com",
    siteName: "Trendships",
    title: "Trendships — AI-Powered Trending Blogs, Deals & Products",
    description:
      "AI-curated trending content across travel, tech, fashion, lifestyle & more. Discover what's hot today on Trendships.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Trendships — Discover What's Trending",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Trendships — What's Trending Today",
    description:
      "AI-curated trending blogs, deals & products — updated daily across every category.",
    images: ["/og-image.jpg"],
    creator: "@trendships",
    site: "@trendships",
  },

  alternates: {
    canonical: "https://trendships.com",
  },

  verification: {
    google: "your-google-verification-code",
    other: {
      "verify-admitad": "ff3fcff36d",
      "convertiser-verification": "4a2836a5da7012c891e09927e427664d7b22686d",
    },
  },

  category: "lifestyle",

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },

  manifest: "/site.webmanifest",
};

/* ══ JSON-LD — Organization ═══════════════════════════════════════════════ */
const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Trendships",
  url: "https://trendships.com",
  logo: "https://trendships.com/trendships-icon.jpg",
  description:
    "AI-powered content platform surfacing trending blogs, deals, and products across every category — updated daily.",
  foundingDate: "2024",
  slogan: "Discover What's Trending",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "hello@trendships.com",
    availableLanguage: ["en"],
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.facebook.com/trendships",
    "https://www.instagram.com/trendships",
    "https://www.twitter.com/trendships",
    "https://www.youtube.com/@trendships",
  ],
};

/* ══ JSON-LD — WebSite ════════════════════════════════════════════════════ */
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Trendships",
  url: "https://trendships.com",
  description:
    "AI-curated trending articles, deals and product recommendations updated daily.",
  publisher: {
    "@type": "Organization",
    name: "Adshouz Digital LLP",
    url: "https://www.adshouz.com",
    logo: {
      "@type": "ImageObject",
      url: "https://trendships.com/trendships-icon.jpg",
    },
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://trendships.com/blogs?search={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

/* ══ Root Layout ══════════════════════════════════════════════════════════ */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} ${inter.variable}`}>
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cms.trendships.com" />
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>

      <body className={`${jakarta.className} antialiased bg-white text-gray-900`}>
        {/* ── JSON-LD Structured Data ── */}
        <Script
          id="org-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
          strategy="afterInteractive"
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
          strategy="afterInteractive"
        />

        {/* ── App Shell ── */}
        <PageTransitionLoader />

        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>

        <Toaster />
      </body>
    </html>
  );
}
