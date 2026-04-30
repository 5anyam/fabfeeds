import "./globals.css";
import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { Header } from "@/components/layout/navbar";
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
  metadataBase: new URL("https://fabfeeds.com"), // Update with your actual domain

  title: {
    default: "Fab Feeds — Fashion, Travel, Tech & Honest Reviews",
    template: "%s | Fab Feeds",
  },

  description:
    "Your ultimate daily feed for the latest in fashion, travel destinations, software reviews, and in-depth product comparisons. Dive into what's trending today.",

  keywords: [
    "fab feeds",
    "fashion trends",
    "travel guides",
    "software reviews",
    "product comparisons",
    "lifestyle blogs",
    "tech reviews",
    "best destinations",
    "trending products",
    "honest reviews"
  ],

  authors: [{ name: "Fab Feeds Team" }],
  creator: "Fab Feeds",
  publisher: "Fab Feeds Media",

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
    url: "https://fabfeeds.com",
    siteName: "Fab Feeds",
    title: "Fab Feeds — Fashion, Travel & Software Reviews",
    description:
      "Discover the best in lifestyle, tech, and travel. We bring you in-depth product comparisons and the latest trends.",
    images: [
      {
        url: "/og-image.jpg", 
        width: 1200,
        height: 630,
        alt: "Fab Feeds — Discover What's Trending",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Fab Feeds — Honest Reviews & Trends",
    description:
      "Daily blogs on fashion, travel guides, software comparisons, and lifestyle trends.",
    images: ["/og-image.jpg"],
    creator: "@fabfeeds",
    site: "@fabfeeds",
  },

  alternates: {
    canonical: "https://fabfeeds.com",
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
  name: "Fab Feeds",
  url: "https://fabfeeds.com",
  logo: "https://fabfeeds.com/fabfeeds-icon.jpg",
  description:
    "A premium lifestyle and tech magazine featuring travel guides, fashion trends, and software comparisons.",
  foundingDate: "2024",
  slogan: "Your Daily Dose of Fabulous",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "hello@fabfeeds.com",
    availableLanguage: ["en"],
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.facebook.com/fabfeeds",
    "https://www.instagram.com/fabfeeds",
    "https://www.twitter.com/fabfeeds",
    "https://www.youtube.com/@fabfeeds",
  ],
};

/* ══ JSON-LD — WebSite ════════════════════════════════════════════════════ */
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Fab Feeds",
  url: "https://fabfeeds.com",
  description:
    "Your daily feed for fashion, travel, software reviews, and product comparisons.",
  publisher: {
    "@type": "Organization",
    name: "Fab Feeds Media",
    url: "https://fabfeeds.com",
    logo: {
      "@type": "ImageObject",
      url: "https://fabfeeds.com/fabfeeds-icon.jpg",
    },
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://fabfeeds.com/blogs?search={search_term_string}",
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
        {/* Update this URL if your CMS domain changes */}
        <link rel="preconnect" href="https://cms.fabfeeds.com" /> 
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>

      {/* Applied the Light Theme colors to match the rest of the site */}
      <body className={`${jakarta.className} antialiased bg-slate-50 text-slate-800 selection:bg-indigo-200`}>
        
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
          <Header />
          <main className="flex-1 pt-4">{children}</main>
          <Footer />
        </div>

        <Toaster />
      </body>
    </html>
  );
}