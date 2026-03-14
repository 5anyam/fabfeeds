import Link from "next/link";
import Image from "next/image";
import {
  Instagram, Facebook, Twitter, Youtube,
  ArrowUpRight, Flame, Sparkles, MapPin,
  BookOpen, Building2, Zap,
} from "lucide-react";
import { Container } from "@/components/ui/container";

/* ══ Data ═════════════════════════════════════════════════════════════════ */
const footerLinks = [
  {
    heading: "Categories",
    icon: BookOpen,
    links: [
      { label: "👗 Fashion",      href: "/blogs?category=fashion" },
      { label: "✈️ Travel",       href: "/blogs?category=travel" },
      { label: "🏥 Health",       href: "/blogs?category=health" },
      { label: "📌 Home Decor",   href: "/blogs?category=home-decor" },
      { label: "✨ Lifestyle",     href: "/blogs?category=lifestyle" },
      { label: "💄 Beauty",       href: "/blogs?category=beauty" },
      { label: "📌 Relationship", href: "/blogs?category=relationship" },
      { label: "📌 Diet",         href: "/blogs?category=diet" },
      { label: "📌 Ecommerce",    href: "/blogs?category=ecommerce" },
      { label: "📌 Business",     href: "/blogs?category=business" },
      { label: "🚗 Automotive",   href: "/blogs?category=automotive" },
      { label: "🍕 Food",         href: "/blogs?category=food" },
    ],
  },
  {
    heading: "Quick Reads",
    icon: Flame,
    links: [
      { label: "Buying Guides",   href: "/blogs?filter=buying-guides" },
      { label: "How-To Guides",   href: "/blogs?category=how-to" },
      { label: "Product Reviews", href: "/blogs?category=reviews" },
      { label: "Tips & Tricks",   href: "/blogs?category=tips" },
      { label: "Best Picks",      href: "/blogs?category=best-picks" },
      { label: "Comparisons",     href: "/blogs?category=comparisons" },
    ],
  },
  {
    heading: "Resources",
    icon: MapPin,
    links: [
      { label: "Travel Guides",   href: "/blogs?category=travel-guides" },
      { label: "Packing Lists",   href: "/blogs?category=packing" },
      { label: "Visa Information", href: "/blogs?category=visa" },
      { label: "Latest Deals",    href: "/blogs?category=deals" },
      { label: "Itineraries",     href: "/blogs?category=itineraries" },
      { label: "Safety Tips",     href: "/blogs?category=safety" },
    ],
  },
  {
    heading: "Company",
    icon: Building2,
    links: [
      { label: "Home",          href: "/" },
      { label: "About Us",      href: "/about" },
      { label: "All Articles",  href: "/blogs" },
      { label: "Trending",      href: "/trending" },
      { label: "Contact Us",    href: "/contact" },
      { label: "Disclaimer",    href: "/disclaimer" },
    ],
  },
];

const socialLinks = [
  {
    href: "https://instagram.com/trendships",
    icon: Instagram,
    label: "Instagram",
    hover: "hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 hover:text-white hover:border-transparent",
  },
  {
    href: "https://facebook.com/trendships",
    icon: Facebook,
    label: "Facebook",
    hover: "hover:bg-blue-600 hover:text-white hover:border-transparent",
  },
  {
    href: "https://twitter.com/trendships",
    icon: Twitter,
    label: "Twitter/X",
    hover: "hover:bg-gray-900 hover:text-white hover:border-transparent",
  },
  {
    href: "https://youtube.com/@trendships",
    icon: Youtube,
    label: "YouTube",
    hover: "hover:bg-red-600 hover:text-white hover:border-transparent",
  },
];

/* ══ Newsletter ═══════════════════════════════════════════════════════════ */
function NewsletterForm() {
  return (
    <div>
      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3">
        Stay Updated
      </h4>
      <div className="flex gap-2">
        <input
          type="email"
          placeholder="Your email address"
          className="flex-1 min-w-0 px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-teal-400 focus:bg-white focus:ring-2 focus:ring-teal-500/10 transition-all"
        />
        <button className="shrink-0 px-4 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-bold text-[11px] rounded-xl shadow-md shadow-teal-500/20 hover:-translate-y-0.5 transition-all duration-200">
          Subscribe
        </button>
      </div>
      <p className="text-[10px] text-gray-400 mt-2">
        Join 500,000+ readers · No spam, ever
      </p>
    </div>
  );
}

/* ══ Footer ═══════════════════════════════════════════════════════════════ */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100" aria-label="Site footer">

      {/* ── Pre-footer Trending CTA strip ── */}
      <div className="bg-gradient-to-r from-gray-50 via-white to-teal-50/40 border-b border-gray-100">
        <Container>
          <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 shadow-md shadow-orange-500/20 shrink-0">
                <Flame className="w-4 h-4 text-white" />
              </span>
              <div>
                <p className="text-[12px] font-black text-gray-900 tracking-tight">
                  See what&apos;s trending right now
                </p>
                <p className="text-[10px] text-gray-400">
                  AI-curated picks updated daily
                </p>
              </div>
            </div>
            <Link
              href="/trending"
              className="shrink-0 inline-flex items-center gap-2 text-[12px] font-bold text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 px-5 py-2.5 rounded-xl shadow-md shadow-orange-500/20 hover:-translate-y-0.5 transition-all duration-200 group"
            >
              <Flame className="w-3.5 h-3.5" />
              Explore Trending
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </Container>
      </div>

      {/* ── Main footer body ── */}
      <Container>
        <div className="py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

          {/* ── Brand column ── */}
          <div className="lg:col-span-4 space-y-7">
            {/* Logo */}
            <Link href="/" className="inline-block">
              <Image
                src="/trendships_logo.png"
                alt="Trendships"
                width={150}
                height={40}
                className="h-10 w-auto object-contain"
              />
            </Link>

            {/* Tagline */}
            <p className="text-gray-500 text-[13px] leading-relaxed max-w-xs">
              Your AI-powered content hub for travel, tech, lifestyle, finance &amp;
              more — helping you discover what&apos;s trending every day.
            </p>

            {/* AI badge */}
            <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-100 text-teal-600 rounded-full px-3.5 py-1.5 text-[9px] font-black uppercase tracking-[0.2em]">
              <Sparkles className="w-3 h-3" />
              Powered by AI
            </div>

            {/* Newsletter */}
            <NewsletterForm />

            {/* Socials */}
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3">
                Follow Us
              </h4>
              <div className="flex gap-2">
                {socialLinks.map((s) => {
                  const Icon = s.icon;
                  return (
                    <Link
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className={`w-9 h-9 rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-center text-gray-400 transition-all duration-200 ${s.hover}`}
                    >
                      <Icon className="w-4 h-4" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Link columns ── */}
          {footerLinks.map((col) => {
            const Icon = col.icon;
            return (
              <div key={col.heading} className="lg:col-span-2 space-y-4">
                <h3 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                  <Icon className="w-3 h-3 text-teal-500 shrink-0" />
                  {col.heading}
                </h3>
                <div className="w-10 h-px bg-gradient-to-r from-teal-400 to-transparent" />
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="group flex items-center gap-2 text-[12px] font-medium text-gray-500 hover:text-teal-600 transition-colors duration-150"
                      >
                        <span className="w-1 h-1 rounded-full bg-gray-300 group-hover:bg-teal-500 transition-colors shrink-0" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Container>

      {/* ── Affiliate disclosure ── */}
      <div className="border-t border-gray-100 bg-gray-50">
        <Container>
          <div className="py-4">
            <p className="text-[10px] text-gray-400 text-center leading-relaxed max-w-3xl mx-auto">
              <span className="text-gray-500 font-semibold">Affiliate Disclosure: </span>
              Trendships earns commissions from qualifying purchases made through affiliate
              links on this site, at no extra cost to you. We only recommend products and
              services we genuinely believe in.
            </p>
          </div>
        </Container>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-gray-100 bg-white">
        <Container>
          <div className="py-5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[11px] text-gray-400 font-medium text-center md:text-left">
              © {year} Trendships. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center md:justify-end gap-5">
              {[
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Terms of Service", href: "/terms-of-service" },
                { label: "Disclaimer", href: "/disclaimer" },
                { label: "Cookie Policy", href: "/cookie-policy" },
              ].map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="text-[11px] text-gray-400 hover:text-teal-600 font-medium transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* ── Powered by strip ── */}
      <div className="border-t border-gray-100 bg-gray-50">
        <Container>
          <div className="py-3 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2">
            <p className="text-[10px] text-gray-400 flex items-center gap-1.5">
              Powered by{" "}
              <Link
                href="https://www.adshouz.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-600 hover:text-teal-700 font-bold transition-colors inline-flex items-center gap-0.5"
              >
                Adshouz Digital LLP
                <ArrowUpRight className="w-2.5 h-2.5" />
              </Link>
            </p>
            <p className="text-[10px] text-gray-300 flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-teal-300" />
              Trendships — Discover what&apos;s trending today
              <span className="w-1 h-1 rounded-full bg-teal-300" />
            </p>
          </div>
        </Container>
      </div>

    </footer>
  );
}
