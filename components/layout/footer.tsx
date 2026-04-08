"use client";

import Link from "next/link";
import {
  Instagram, Facebook, Twitter, Youtube,
  ArrowUpRight, Flame, Sparkles, MapPin,
  BookOpen, Building2, Zap, Waves, Target
} from "lucide-react";
import { Container } from "@/components/ui/container";

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
    hover: "hover:bg-cyan-500/20 hover:text-cyan-400 hover:border-cyan-400",
  },
  {
    href: "https://facebook.com",
    icon: Facebook,
    label: "Facebook",
    hover: "hover:bg-cyan-500/20 hover:text-cyan-400 hover:border-cyan-400",
  },
  {
    href: "https://twitter.com",
    icon: Twitter,
    label: "Twitter/X",
    hover: "hover:bg-cyan-500/20 hover:text-cyan-400 hover:border-cyan-400",
  },
  {
    href: "https://youtube.com",
    icon: Youtube,
    label: "YouTube",
    hover: "hover:bg-cyan-500/20 hover:text-cyan-400 hover:border-cyan-400",
  },
];

/* ══ Newsletter ═══════════════════════════════════════════════════════════ */
function NewsletterForm() {
  return (
    <div>
      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3 flex items-center gap-2">
        <Zap className="w-3 h-3 text-cyan-500" /> Stay Updated
      </h4>
      <div className="flex gap-2">
        <input
          type="email"
          placeholder="Your email address"
          className="flex-1 min-w-0 px-3.5 py-2.5 bg-[#0a1220] border border-cyan-900/40 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500/50 transition-all"
        />
        <button className="shrink-0 px-4 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-[#020813] font-black uppercase tracking-widest text-[10px] rounded-xl shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-300">
          Subscribe
        </button>
      </div>
      <p className="text-[10px] text-slate-500 mt-2">
        Join the radar · No spam, ever
      </p>
    </div>
  );
}

/* ══ Footer ═══════════════════════════════════════════════════════════════ */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#020813] border-t border-cyan-900/30 selection:bg-cyan-500/30" aria-label="Site footer">

      {/* ── Pre-footer Trending CTA strip ── */}
      <div className="bg-[#050b14] border-b border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/10 to-transparent pointer-events-none" />
        <Container>
          <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 shrink-0">
                <Target className="w-4 h-4 text-cyan-400" />
              </span>
              <div>
                <p className="text-[12px] font-black text-white tracking-wider uppercase">
                  See what&apos;s trending right now
                </p>
                <p className="text-[10px] text-cyan-100/60 font-medium">
                  AI-curated picks updated daily
                </p>
              </div>
            </div>
            <Link
              href="/trending"
              className="shrink-0 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[#020813] bg-cyan-400 hover:bg-cyan-300 px-5 py-2.5 rounded-xl shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all duration-300 group"
            >
              <Flame className="w-3.5 h-3.5 text-[#020813]" />
              Explore Trending
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </Container>
      </div>

      {/* ── Main footer body ── */}
      <Container>
        <div className="py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 relative">
          
          {/* Background Glow */}
          <div className="absolute top-1/2 left-0 w-64 h-64 bg-cyan-900/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2" />

          {/* ── Brand column ── */}
          <div className="lg:col-span-4 space-y-7 relative z-10">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group inline-flex">
              <div className="w-10 h-10 bg-cyan-500/10 border border-cyan-400/30 rounded flex items-center justify-center group-hover:bg-cyan-500/20 group-hover:border-cyan-400 transition-all shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                <Waves className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black uppercase tracking-widest text-white leading-none">
                  Influencer
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-cyan-400 leading-none mt-1">
                  Shark
                </span>
              </div>
            </Link>

            {/* Tagline */}
            <p className="text-slate-400 text-[12px] leading-relaxed max-w-xs font-medium">
              Your AI-powered content hub for lifestyle, tech, health, and more. 
              Discover the apex of what&apos;s trending every day.
            </p>

            {/* AI badge */}
            <div className="inline-flex items-center gap-2 bg-cyan-950/40 border border-cyan-900 text-cyan-400 rounded-full px-3.5 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] shadow-[0_0_10px_rgba(34,211,238,0.1)]">
              <Sparkles className="w-3 h-3" />
              Powered by AI
            </div>

            {/* Newsletter */}
            <NewsletterForm />

            {/* Socials */}
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">
                Follow The Radar
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
                      className={`w-9 h-9 rounded-xl border border-white/10 bg-[#0a1220] flex items-center justify-center text-slate-400 transition-all duration-300 ${s.hover}`}
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
              <div key={col.heading} className="lg:col-span-2 space-y-5 relative z-10">
                <h3 className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-slate-300">
                  <Icon className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                  {col.heading}
                </h3>
                <div className="w-10 h-px bg-cyan-500/50" />
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="group flex items-center gap-2.5 text-[12px] font-semibold text-slate-400 hover:text-cyan-300 transition-colors duration-200"
                      >
                        <span className="w-1 h-1 rounded-full bg-slate-700 group-hover:bg-cyan-400 group-hover:shadow-[0_0_5px_rgba(34,211,238,0.8)] transition-all shrink-0" />
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
      <div className="border-t border-white/5 bg-[#050b14]">
        <Container>
          <div className="py-5">
            <p className="text-[10px] text-slate-500 text-center leading-relaxed max-w-4xl mx-auto font-medium">
              <span className="text-cyan-400 font-bold uppercase tracking-wider">Affiliate Disclosure: </span>
              Influencer Shark earns commissions from qualifying purchases made through affiliate
              links on this site, at no extra cost to you. We only recommend products, tools, and
              services we genuinely believe in.
            </p>
          </div>
        </Container>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/5 bg-[#020813]">
        <Container>
          <div className="py-5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[11px] text-slate-500 font-bold tracking-wide text-center md:text-left">
              © {year} INFLUENCER SHARK. ALL RIGHTS RESERVED.
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
                  className="text-[11px] text-slate-500 hover:text-cyan-400 font-semibold uppercase tracking-wider transition-colors"
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