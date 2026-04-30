"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import {
  ArrowUpRight, Sparkles, Flame, ShieldCheck,
  Heart, Zap, Globe, BarChart2,
  Shirt, Plane, Activity, Home, Star,
  Salad, ShoppingCart, Briefcase, Car, UtensilsCrossed,
} from "lucide-react";
import { Container } from "@/components/ui/container";

/* ══ Scroll Reveal ════════════════════════════════════════════════════════ */
function useReveal(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ══ SECTION 1 — LIGHT HERO ════════════════════════════════════════════════ */
function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 60); return () => clearTimeout(t); }, []);

  return (
    <section className="bg-slate-50 relative overflow-hidden py-20 md:py-28 border-b border-slate-200" aria-label="About hero">
      {/* Subtle Background Accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-indigo-50 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-emerald-50/50 rounded-full blur-[100px] pointer-events-none" />

      <Container>
        <div
          className={`relative z-10 max-w-3xl mx-auto text-center transition-all duration-1000 ease-out ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Pill */}
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-1.5 mb-6 shadow-sm">
            <Globe className="w-3.5 h-3.5 text-indigo-600" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">
              Your Daily Feed
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight font-serif mb-6">
            We don&apos;t just write.
            <br />
            <span className="text-indigo-600 italic">
              We curate what matters.
            </span>
          </h1>

          <p className="text-slate-600 text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-10 font-medium">
            Fab Feeds is your premium editorial destination. We surface the absolute best articles,
            honest reviews, and top trends across fashion, travel, health, lifestyle &amp; tech — 
            helping you stay ahead, every single day.
          </p>

          {/* CTA */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase tracking-widest text-xs px-8 py-3.5 rounded-lg shadow-md shadow-indigo-200 hover:-translate-y-0.5 transition-all duration-300 group"
            >
              Browse Articles
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
            <Link
              href="/trending"
              className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-700 border border-slate-200 bg-white hover:bg-slate-50 px-8 py-3.5 rounded-lg transition-all duration-200 shadow-sm"
            >
              <Flame className="w-4 h-4 text-emerald-500" />
              See Trending
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ══ SECTION 2 — STATS BAR ════════════════════════════════════════════════ */
function StatsBar() {
  const stats = [
    { value: "50K+",  label: "Monthly Readers",    color: "text-indigo-600" },
    { value: "12+",   label: "Categories Covered", color: "text-emerald-600" },
    { value: "500+",  label: "Articles Published", color: "text-indigo-600" },
    { value: "Daily", label: "Fresh Updates",      color: "text-emerald-600" },
  ];
  return (
    <div className="bg-white border-b border-slate-200 shadow-sm relative z-20">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-100">
          {stats.map((s) => (
            <div key={s.label} className="px-5 py-8 text-center">
              <div className={`text-3xl md:text-4xl font-black mb-2 ${s.color} font-serif`}>
                {s.value}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

/* ══ SECTION 3 — STORY ════════════════════════════════════════════════════ */
function OurStory() {
  const { ref, visible } = useReveal();
  return (
    <section
      ref={ref}
      className={`py-16 md:py-24 bg-white transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image collage */}
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-4 md:space-y-6 mt-12">
              <div className="rounded-2xl overflow-hidden h-64 bg-slate-100 shadow-lg shadow-slate-200/50">
                <img
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&q=80"
                  alt="Tech & Gadgets"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="rounded-2xl overflow-hidden h-48 bg-slate-100 shadow-lg shadow-slate-200/50">
                <img
                  src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=600&q=80"
                  alt="Travel"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="space-y-4 md:space-y-6">
              <div className="rounded-2xl overflow-hidden h-48 bg-slate-100 shadow-lg shadow-slate-200/50">
                <img
                  src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80"
                  alt="Fashion"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="rounded-2xl overflow-hidden h-64 bg-slate-100 shadow-lg shadow-slate-200/50">
                <img
                  src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80"
                  alt="Food & Lifestyle"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-full px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                Our Story
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight font-serif">
                One Platform.
                <br />
                <span className="text-indigo-600">Endless Discoveries.</span>
              </h2>
            </div>

            <div className="space-y-5 text-slate-600 text-sm md:text-base leading-relaxed font-medium">
              <p>
                <strong className="text-slate-900">Fab Feeds</strong> was built with one
                goal — to cut through the noise and bring you only what&apos;s genuinely
                trending and worth your time. We explore thousands of sources daily across fashion, travel,
                health, beauty, food, business &amp; more.
              </p>
              <p>
                We don&apos;t just aggregate — we curate. Every article on Fab Feeds is
                selected for relevance, quality, and freshness before it reaches you. Our
                mission is simple: help you <em className="text-slate-900 font-bold">spend smarter, live better, and explore more.</em>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              {[
                {
                  icon: ShieldCheck,
                  bg: "bg-indigo-50 border-indigo-100",
                  color: "text-indigo-600",
                  title: "Honest Content",
                  sub: "Unbiased & research-backed.",
                },
                {
                  icon: Heart,
                  bg: "bg-emerald-50 border-emerald-100",
                  color: "text-emerald-600",
                  title: "Made with Passion",
                  sub: "Real people, real opinions.",
                },
                {
                  icon: Zap,
                  bg: "bg-indigo-50 border-indigo-100",
                  color: "text-indigo-600",
                  title: "AI-Enhanced",
                  sub: "Updated daily, automatically.",
                },
                {
                  icon: Star,
                  bg: "bg-emerald-50 border-emerald-100",
                  color: "text-emerald-600",
                  title: "Quality First",
                  sub: "Top 1% content only.",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className={`flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 rounded-xl border ${item.bg}`}>
                    <span className={`w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center shrink-0`}>
                      <Icon className={`w-5 h-5 ${item.color}`} />
                    </span>
                    <div>
                      <h4 className="text-[13px] font-bold text-slate-900">{item.title}</h4>
                      <p className="text-[11px] text-slate-500 font-medium">{item.sub}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ══ SECTION 4 — WHAT WE COVER ════════════════════════════════════════════ */
function WhatWeCover() {
  const { ref, visible } = useReveal();

  const categories = [
    { emoji: "👗", icon: Shirt,          bg: "bg-indigo-50",    color: "text-indigo-600",   title: "Fashion",       desc: "Latest trends, outfit inspiration, brand spotlights, and fashion deals curated daily." },
    { emoji: "✈️", icon: Plane,          bg: "bg-emerald-50",   color: "text-emerald-600",  title: "Travel",        desc: "Destination guides, visa tips, packing lists, and budget travel hacks for every explorer." },
    { emoji: "🏥", icon: Activity,       bg: "bg-indigo-50",    color: "text-indigo-600",   title: "Health",        desc: "Wellness tips, fitness guides, mental health articles, and healthy living inspiration." },
    { emoji: "🏠", icon: Home,           bg: "bg-emerald-50",   color: "text-emerald-600",  title: "Home Decor",    desc: "Interior ideas, decor trends, DIY projects, and the best home products on the market." },
    { emoji: "✨", icon: Sparkles,       bg: "bg-indigo-50",    color: "text-indigo-600",   title: "Lifestyle",     desc: "Daily habits, productivity, self-improvement, and content that elevates everyday life." },
    { emoji: "💄", icon: Star,           bg: "bg-emerald-50",   color: "text-emerald-600",  title: "Beauty",        desc: "Skincare routines, makeup reviews, best beauty products, and expert tips from the pros." },
    { emoji: "💑", icon: Heart,          bg: "bg-indigo-50",    color: "text-indigo-600",   title: "Relationship",  desc: "Relationship advice, dating tips, communication guides, and emotional well-being reads." },
    { emoji: "🥗", icon: Salad,          bg: "bg-emerald-50",   color: "text-emerald-600",  title: "Diet",          desc: "Nutrition guides, diet plans, healthy recipes, and expert takes on trending food habits." },
    { emoji: "🛒", icon: ShoppingCart,   bg: "bg-indigo-50",    color: "text-indigo-600",   title: "Ecommerce",     desc: "Best deals, platform comparisons, shopping guides, and the hottest products right now." },
    { emoji: "📊", icon: Briefcase,      bg: "bg-emerald-50",   color: "text-emerald-600",  title: "Business",      desc: "Startup stories, business strategies, marketing tips, and entrepreneurship insights." },
    { emoji: "🚗", icon: Car,            bg: "bg-indigo-50",    color: "text-indigo-600",   title: "Automotive",    desc: "Car reviews, EV news, buying guides, and the latest in auto trends and technology." },
    { emoji: "🍕", icon: UtensilsCrossed,bg: "bg-emerald-50",   color: "text-emerald-600",  title: "Food",          desc: "Restaurant picks, food reviews, easy recipes, and the tastiest trends from around the world." },
  ];

  return (
    <section
      ref={ref}
      className={`py-16 md:py-24 bg-slate-50 border-t border-slate-200 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <Container>
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-4 shadow-sm">
            <BarChart2 className="w-3.5 h-3.5 text-emerald-500" />
            12 Categories
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight mb-4 font-serif">
            What We <span className="text-indigo-600">Explore.</span>
          </h2>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium">
            From fashion trends to automotive news — we cover every niche that
            matters to modern readers.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.title}
                href={`/blogs?category=${cat.title.toLowerCase().replace(" ", "-")}`}
                className="group bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-xl hover:shadow-slate-200/50 hover:border-indigo-200 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className={`w-12 h-12 rounded-xl border border-white/50 shadow-sm ${cat.bg} flex items-center justify-center shrink-0`}>
                    <Icon className={`w-5 h-5 ${cat.color}`} />
                  </span>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 group-hover:text-indigo-600 transition-colors flex items-center gap-2">
                    <span className="text-lg">{cat.emoji}</span>
                    {cat.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 font-medium">
                  {cat.desc}
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  View Feed <ArrowUpRight className="w-3 h-3" />
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/* ══ SECTION 5 — AFFILIATE DISCLOSURE ═════════════════════════════════════ */
function AffiliateDisclosure() {
  return (
    <section className="py-12 bg-white border-t border-slate-200">
      <Container>
        <div className="flex flex-col sm:flex-row items-start gap-4 bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8 max-w-4xl mx-auto shadow-sm">
          <span className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6 text-indigo-600" />
          </span>
          <div>
            <h4 className="font-black text-slate-900 text-sm mb-2 uppercase tracking-widest">Affiliate Disclosure</h4>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              Some links on Fab Feeds are affiliate links. If you make a purchase through
              these links, we may earn a small commission — at no extra cost to you. We only
              recommend products and services we genuinely believe in. This helps us keep
              content free and the platform running.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ══ SECTION 6 — BOTTOM CTA ═══════════════════════════════════════════════ */
function BottomCTA() {
  const { ref, visible } = useReveal();
  return (
    <section
      ref={ref}
      className={`bg-slate-900 relative overflow-hidden py-20 md:py-32 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Editorial Dark Section for contrast */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-900/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-emerald-900/20 rounded-full blur-[80px] pointer-events-none" />
      
      <Container>
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-slate-800 border border-slate-700 text-emerald-400 rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            Start Exploring
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-6 font-serif">
            Ready to discover
            <br />
            <span className="text-indigo-400 font-sans uppercase tracking-tighter">what&apos;s trending?</span>
          </h2>

          <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-10 max-w-lg mx-auto font-medium">
            Whether you&apos;re into fashion, food, business, or travel — Fab Feeds has
            curated content for every curious mind.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link
              href="/blogs"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold uppercase tracking-widest text-xs px-8 py-4 rounded-lg shadow-lg shadow-indigo-900/50 transition-all duration-300 group"
            >
              Explore Articles
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-slate-300 hover:text-white border border-slate-700 bg-slate-800 hover:bg-slate-700 font-bold uppercase tracking-widest text-xs px-8 py-4 rounded-lg transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>

          {/* Email */}
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mt-6">
            Partnership or collaboration?{" "}
            <a
              href="mailto:hello@fabfeeds.com"
              className="text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              hello@fabfeeds.com
            </a>
          </p>
        </div>
      </Container>
    </section>
  );
}

/* ══ PAGE EXPORT ══════════════════════════════════════════════════════════ */
export default function AboutPage() {
  return (
    <main className="bg-slate-50">
      <Hero />
      <StatsBar />
      <OurStory />
      <WhatWeCover />
      <AffiliateDisclosure />
      <BottomCTA />
    </main>
  );
}