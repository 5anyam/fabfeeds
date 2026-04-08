import "./globals.css";
import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { InfluencerSharkHeader } from "@/components/layout/navbar";
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
  metadataBase: new URL("https://influencershark.com"),

  title: {
    default: "Influencer Shark — Fashion, Travel, Tech & Honest Reviews",
    template: "%s | Influencer Shark",
  },

  description:
    "Your ultimate guide for the latest in fashion, travel destinations, software reviews, and in-depth product comparisons. Dive into what's trending today.",

  keywords: [
    "fashion trends",
    "travel guides",
    "software reviews",
    "product comparisons",
    "lifestyle blogs",
    "tech reviews",
    "best destinations",
    "influencer shark",
    "trending products",
    "honest reviews"
  ],

  authors: [{ name: "Influencer Shark Team" }],
  creator: "Influencer Shark",
  publisher: "Influencer Shark Media",

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
    url: "https://influencershark.com",
    siteName: "Influencer Shark",
    title: "Influencer Shark — Fashion, Travel & Software Reviews",
    description:
      "Discover the best in lifestyle, tech, and travel. We bring you in-depth product comparisons and the latest trends.",
    images: [
      {
        url: "/og-image.jpg", 
        width: 1200,
        height: 630,
        alt: "Influencer Shark — Discover What's Trending",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Influencer Shark — Honest Reviews & Trends",
    description:
      "Daily blogs on fashion, travel guides, software comparisons, and lifestyle trends.",
    images: ["/og-image.jpg"],
    creator: "@influencershark",
    site: "@influencershark",
  },

  alternates: {
    canonical: "https://influencershark.com",
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
  name: "Influencer Shark",
  url: "https://influencershark.com",
  logo: "https://influencershark.com/influencershark-icon.jpg",
  description:
    "A premium lifestyle and tech magazine featuring travel guides, fashion trends, and software comparisons.",
  foundingDate: "2024",
  slogan: "Dive Into The Best Reviews",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "hello@influencershark.com",
    availableLanguage: ["en"],
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.facebook.com/influencershark",
    "https://www.instagram.com/influencershark",
    "https://www.twitter.com/influencershark",
    "https://www.youtube.com/@influencershark",
  ],
};

/* ══ JSON-LD — WebSite ════════════════════════════════════════════════════ */
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Influencer Shark",
  url: "https://influencershark.com",
  description:
    "Your daily dive into fashion, travel, software reviews, and product comparisons.",
  publisher: {
    "@type": "Organization",
    name: "Influencer Shark Media",
    url: "https://influencershark.com",
    logo: {
      "@type": "ImageObject",
      url: "https://influencershark.com/influencershark-icon.jpg",
    },
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://influencershark.com/blogs?search={search_term_string}",
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cms.influencershark.com" /> 
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>

      <body className={`${jakarta.className} antialiased bg-[#020813] text-slate-200 selection:bg-cyan-500/30`}>
        
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

        <PageTransitionLoader />

        <div className="flex flex-col min-h-screen">
          <InfluencerSharkHeader />
          <main className="flex-1 pt-4">{children}</main>
          <Footer />
        </div>

        <Toaster />
      </body>
    </html>
  );
}