"use client";

import Link from "next/link";
import {
  Instagram, Facebook, Twitter, Youtube,
  ArrowUpRight, Flame, Sparkles, MapPin,
  BookOpen, Building2, Zap, Target
} from "lucide-react";
import { Container } from "@/components/ui/container"; // Assumes you have this, otherwise replace with standard div

/* ══ Data ═════════════════════════════════════════════════════════════════ */
const footerLinks = [
  {
    heading: "Categories",
    icon: BookOpen,
    links: [
      { label: "Fashion",       href: "/blogs?category=fashion" },
      { label: "Travel",        href: "/blogs?category=travel" },
      { label: "Health",        href: "/blogs?category=health" },
      { label: "Home Decor",    href: "/blogs?category=home-decor" },
      { label: "Lifestyle",     href: "/blogs?category=lifestyle" },
      { label: "Beauty",        href: "/blogs?category=beauty" },
      { label: "Relationship",  href: "/blogs?category=relationship" },
      { label: "Diet",          href: "/blogs?category=diet" },
      { label: "Ecommerce",     href: "/blogs?category=ecommerce" },
      { label: "Business",      href: "/blogs?category=business" },
      { label: "Automotive",    href: "/blogs?category=automotive" },
      { label: "Food",          href: "/blogs?category=food" },
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
      { label: "Visa Info",       href: "/blogs?category=visa" },
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
    href: "https://instagram.com",
    icon: Instagram,
    label: "Instagram",
    hover: "hover:bg-pink-50 hover:text-pink-600 hover:border-pink-200",
  },
  {
    href: "https://facebook.com",
    icon: Facebook,
    label: "Facebook",
    hover: "hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200",
  },
  {
    href: "https://twitter.com",
    icon: Twitter,
    label: "Twitter/X",
    hover: "hover:bg-slate-100 hover:text-slate-900 hover:border-slate-300",
  },
  {
    href: "https://youtube.com",
    icon: Youtube,
    label: "YouTube",
    hover: "hover:bg-red-50 hover:text-red-600 hover:border-red-200",
  },
];

/* ══ Newsletter ═══════════════════════════════════════════════════════════ */
function NewsletterForm() {
  return (
    <div>
      <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-3 flex items-center gap-2">
        <Zap className="w-4 h-4 text-emerald-500" /> Stay Updated
      </h4>
      <div className="flex gap-2">
        <input
          type="email"
          placeholder="Your email address"
          className="flex-1 min-w-0 px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
        />
        <button className="shrink-0 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase tracking-wider text-xs rounded-lg shadow-md shadow-indigo-200 transition-all duration-300">
          Subscribe
        </button>
      </div>
      <p className="text-xs text-slate-500 mt-2 font-medium">
        Join the inner circle · No spam, ever
      </p>
    </div>
  );
}

/* ══ Footer ═══════════════════════════════════════════════════════════════ */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-200 selection:bg-indigo-100" aria-label="Site footer">

      {/* ── Pre-footer Trending CTA strip ── */}
      <div className="bg-indigo-50 border-b border-indigo-100 relative overflow-hidden">
        <Container>
          <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-5 relative z-10">
            <div className="flex items-center gap-4">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-indigo-100 shadow-sm shrink-0">
                <Target className="w-5 h-5 text-indigo-600" />
              </span>
              <div>
                <p className="text-sm font-black text-slate-900 tracking-wider uppercase">
                  See what&apos;s trending right now
                </p>
                <p className="text-xs text-slate-600 font-medium mt-0.5">
                  Hand-picked editorial and AI-curated top stories
                </p>
              </div>
            </div>
            <Link
              href="/trending"
              className="shrink-0 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg shadow-md shadow-indigo-200 transition-all duration-300 group"
            >
              <Flame className="w-4 h-4 text-emerald-400" />
              Explore Trending
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>
        </Container>
      </div>

      {/* ── Main footer body ── */}
      <Container>
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 relative">
          
          {/* ── Brand column ── */}
          <div className="lg:col-span-4 space-y-8 relative z-10">
            {/* Logo - Fixed container to work well with images */}
            <Link href="/" className="inline-block group">
              <img 
                src="/fabfeeds_logo.png" 
                alt="Fab Feeds Logo" 
                className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
              />
            </Link>

            {/* Tagline */}
            <p className="text-slate-600 text-sm leading-relaxed max-w-xs font-medium">
              Your modern editorial hub for lifestyle, tech, health, and more. 
              Discover the apex of what&apos;s trending every day.
            </p>

            {/* AI badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-full px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              Powered by AI
            </div>

            {/* Newsletter */}
            <NewsletterForm />

            {/* Socials */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-3">
                Follow The Radar
              </h4>
              <div className="flex gap-2.5">
                {socialLinks.map((s) => {
                  const Icon = s.icon;
                  return (
                    <Link
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className={`w-10 h-10 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-500 transition-all duration-300 ${s.hover}`}
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
              <div key={col.heading} className="lg:col-span-2 space-y-6 relative z-10">
                <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-900">
                  <Icon className="w-4 h-4 text-indigo-500 shrink-0" />
                  {col.heading}
                </h3>
                <div className="w-8 h-0.5 bg-indigo-100" />
                <ul className="space-y-3.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="group flex items-center gap-2.5 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors duration-200"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-indigo-500 transition-all shrink-0" />
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

      {/* ── Affiliate disclosure - UPDATED NAME ── */}
      <div className="border-t border-slate-100 bg-slate-50">
        <Container>
          <div className="py-6">
            <p className="text-xs text-slate-500 text-center leading-relaxed max-w-4xl mx-auto font-medium">
              <span className="text-slate-900 font-bold uppercase tracking-wider">Affiliate Disclosure: </span>
              Fab Feeds earns commissions from qualifying purchases made through affiliate
              links on this site, at no extra cost to you. We only recommend products, tools, and
              services we genuinely believe in.
            </p>
          </div>
        </Container>
      </div>

      {/* ── Bottom bar - UPDATED COPYRIGHT NAME ── */}
      <div className="border-t border-slate-200 bg-white">
        <Container>
          <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500 font-semibold tracking-wide text-center md:text-left">
              © {year} FAB FEEDS. ALL RIGHTS RESERVED.
            </p>
            <div className="flex flex-wrap justify-center md:justify-end gap-6">
              {[
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Terms of Service", href: "/terms-of-service" },
                { label: "Disclaimer", href: "/disclaimer" },
                { label: "Cookie Policy", href: "/cookie-policy" },
              ].map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="text-xs text-slate-500 hover:text-indigo-600 font-bold uppercase tracking-wider transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </div>

    </footer>
  );
}