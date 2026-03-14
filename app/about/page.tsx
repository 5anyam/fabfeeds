"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import {
  ArrowUpRight, Sparkles, Flame, ShieldCheck,
  Heart, Zap, TrendingUp, Globe, BarChart2,
  Shirt, Plane, Activity, Home, Star,
  Smile, Salad, ShoppingCart, Briefcase, Car, UtensilsCrossed,
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

/* ══ SECTION 1 — DARK HERO ════════════════════════════════════════════════ */
function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 60); return () => clearTimeout(t); }, []);

  return (
    <section className="bg-zinc-950 relative overflow-hidden py-20 md:py-28" aria-label="About hero">
      {/* Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[300px] h-[200px] bg-orange-500/8 rounded-full blur-[80px] pointer-events-none" />
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.022] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 60px)," +
            "repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 60px)",
        }}
      />

      <Container>
        <div
          className={`relative z-10 max-w-3xl mx-auto text-center transition-all duration-1000 ease-out ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Pill */}
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6">
            <Globe className="w-3.5 h-3.5 text-teal-400" />
            <span className="text-[9px] font-black uppercase tracking-[0.25em] text-teal-300">
              AI-Powered Content Platform
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.04] tracking-tight mb-6">
            <span className="text-white">We don&apos;t just write.</span>
            <br />
            <span className="bg-gradient-to-r from-teal-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
              We curate what matters.
            </span>
          </h1>

          <p className="text-zinc-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-10">
            Trendships is an AI-powered content platform that surfaces trending articles,
            deals &amp; products across fashion, travel, health, lifestyle &amp; more — helping
            you stay ahead, every single day.
          </p>

          {/* CTA */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-lg shadow-teal-500/20 hover:-translate-y-0.5 transition-all duration-300 group"
            >
              Browse Articles
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
            <Link
              href="/trending"
              className="inline-flex items-center gap-2 text-[13px] font-bold text-orange-400 border border-orange-500/20 bg-orange-500/8 hover:bg-orange-500/15 px-5 py-3 rounded-xl transition-all duration-200"
            >
              <Flame className="w-3.5 h-3.5" />
              See Trending
            </Link>
          </div>
        </div>
      </Container>

      {/* Bottom fade to white */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-white pointer-events-none" />
    </section>
  );
}

/* ══ SECTION 2 — STATS BAR ════════════════════════════════════════════════ */
function StatsBar() {
  const stats = [
    { value: "50K+",  label: "Monthly Readers",    color: "text-teal-600",   bg: "bg-teal-50"  },
    { value: "12+",   label: "Categories Covered", color: "text-orange-600", bg: "bg-orange-50" },
    { value: "500+",  label: "Articles Published", color: "text-blue-600",   bg: "bg-blue-50"  },
    { value: "Daily", label: "AI Updates",         color: "text-rose-600",   bg: "bg-rose-50"  },
  ];
  return (
    <div className="bg-white border-b border-gray-100 shadow-sm">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
          {stats.map((s) => (
            <div key={s.label} className="px-5 py-6 text-center">
              <div className={`text-3xl md:text-4xl font-black mb-1 ${s.color}`}>
                {s.value}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">
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
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Image collage */}
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <div className="space-y-3 md:space-y-4 mt-8">
              <div className="rounded-2xl overflow-hidden h-60 bg-gray-100 shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&q=80"
                  alt="Tech & Gadgets"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="rounded-2xl overflow-hidden h-44 bg-gray-100 shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=600&q=80"
                  alt="Travel"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="space-y-3 md:space-y-4">
              <div className="rounded-2xl overflow-hidden h-44 bg-gray-100 shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80"
                  alt="Fashion"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="rounded-2xl overflow-hidden h-60 bg-gray-100 shadow-md">
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
          <div className="space-y-7">
            <div>
              <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-100 text-teal-600 rounded-full px-3.5 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] mb-4">
                <Sparkles className="w-3 h-3" />
                Our Story
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight">
                One Platform.
                <br />
                <span className="bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
                  Endless Discoveries.
                </span>
              </h2>
              <div className="w-16 h-1 rounded-full bg-gradient-to-r from-teal-500 to-cyan-400 mt-4" />
            </div>

            <div className="space-y-5 text-gray-500 text-[14px] md:text-[15px] leading-[1.8]">
              <p>
                <strong className="text-gray-900">Trendships</strong> was built with one
                goal — to cut through the noise and bring you only what&apos;s genuinely
                trending. Our AI scans thousands of sources daily across fashion, travel,
                health, beauty, food, business &amp; more.
              </p>
              <p>
                We don&apos;t just aggregate — we curate. Every article on Trendships is
                scored for relevance, quality, and freshness before it reaches you. Our
                mission is to help you{" "}
                <em className="text-gray-700">spend smarter, live better, and explore more.</em>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              {[
                {
                  icon: ShieldCheck,
                  bg: "bg-teal-50",
                  color: "text-teal-600",
                  title: "Honest Content",
                  sub: "Unbiased, research-backed.",
                },
                {
                  icon: Heart,
                  bg: "bg-rose-50",
                  color: "text-rose-500",
                  title: "Made with Passion",
                  sub: "Real people, real opinions.",
                },
                {
                  icon: Zap,
                  bg: "bg-orange-50",
                  color: "text-orange-500",
                  title: "AI-Powered",
                  sub: "Updated daily, automatically.",
                },
                {
                  icon: Star,
                  bg: "bg-amber-50",
                  color: "text-amber-600",
                  title: "Quality First",
                  sub: "Top 1% content only.",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex items-start gap-3 p-3 rounded-2xl bg-gray-50 border border-gray-100">
                    <span className={`w-9 h-9 rounded-xl ${item.bg} flex items-center justify-center shrink-0`}>
                      <Icon className={`w-4 h-4 ${item.color}`} />
                    </span>
                    <div>
                      <h4 className="text-[12px] font-black text-gray-900">{item.title}</h4>
                      <p className="text-[11px] text-gray-400">{item.sub}</p>
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
    { emoji: "👗", icon: Shirt,          bg: "bg-pink-50",    color: "text-pink-600",   title: "Fashion",       desc: "Latest trends, outfit inspiration, brand spotlights, and fashion deals curated daily." },
    { emoji: "✈️", icon: Plane,          bg: "bg-teal-50",    color: "text-teal-600",   title: "Travel",        desc: "Destination guides, visa tips, packing lists, and budget travel hacks for every explorer." },
    { emoji: "🏥", icon: Activity,       bg: "bg-red-50",     color: "text-red-500",    title: "Health",        desc: "Wellness tips, fitness guides, mental health articles, and healthy living inspiration." },
    { emoji: "🏠", icon: Home,           bg: "bg-yellow-50",  color: "text-yellow-600", title: "Home Decor",    desc: "Interior ideas, decor trends, DIY projects, and the best home products on the market." },
    { emoji: "✨", icon: Sparkles,       bg: "bg-violet-50",  color: "text-violet-600", title: "Lifestyle",     desc: "Daily habits, productivity, self-improvement, and content that elevates everyday life." },
    { emoji: "💄", icon: Star,           bg: "bg-rose-50",    color: "text-rose-600",   title: "Beauty",        desc: "Skincare routines, makeup reviews, best beauty products, and expert tips from the pros." },
    { emoji: "💑", icon: Heart,          bg: "bg-orange-50",  color: "text-orange-500", title: "Relationship",  desc: "Relationship advice, dating tips, communication guides, and emotional well-being reads." },
    { emoji: "🥗", icon: Salad,          bg: "bg-green-50",   color: "text-green-600",  title: "Diet",          desc: "Nutrition guides, diet plans, healthy recipes, and expert takes on trending food habits." },
    { emoji: "🛒", icon: ShoppingCart,   bg: "bg-cyan-50",    color: "text-cyan-600",   title: "Ecommerce",     desc: "Best deals, platform comparisons, shopping guides, and the hottest products right now." },
    { emoji: "📊", icon: Briefcase,      bg: "bg-blue-50",    color: "text-blue-600",   title: "Business",      desc: "Startup stories, business strategies, marketing tips, and entrepreneurship insights." },
    { emoji: "🚗", icon: Car,            bg: "bg-gray-100",   color: "text-gray-600",   title: "Automotive",    desc: "Car reviews, EV news, buying guides, and the latest in auto trends and technology." },
    { emoji: "🍕", icon: UtensilsCrossed,bg: "bg-amber-50",   color: "text-amber-600",  title: "Food",          desc: "Restaurant picks, food reviews, easy recipes, and the tastiest trends from around the world." },
  ];

  return (
    <section
      ref={ref}
      className={`py-16 md:py-24 bg-gray-50 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <Container>
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-white border border-gray-100 rounded-full px-3.5 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 mb-4 shadow-sm">
            <BarChart2 className="w-3 h-3 text-orange-400" />
            12 Categories
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-3">
            What We{" "}
            <span className="bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
              Write About
            </span>
          </h2>
          <p className="text-gray-500 text-[14px] leading-relaxed">
            From fashion trends to automotive news — our AI covers every niche that
            matters to modern readers.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.title}
                href={`/blogs?category=${cat.title.toLowerCase().replace(" ", "-")}`}
                className="group bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-xl hover:border-teal-100 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className={`w-10 h-10 rounded-xl ${cat.bg} flex items-center justify-center shrink-0`}>
                    <Icon className={`w-4.5 h-4.5 ${cat.color}`} />
                  </span>
                  <h3 className="text-[13px] font-black text-gray-900 group-hover:text-teal-700 transition-colors flex items-center gap-1.5">
                    <span className="text-base">{cat.emoji}</span>
                    {cat.title}
                  </h3>
                </div>
                <p className="text-[11px] text-gray-400 leading-relaxed line-clamp-2">
                  {cat.desc}
                </p>
                <div className="mt-3 flex items-center gap-1 text-[10px] font-bold text-teal-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore <ArrowUpRight className="w-3 h-3" />
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
    <section className="py-10 bg-white">
      <Container>
        <div className="flex items-start gap-4 bg-amber-50 border border-amber-100 rounded-2xl p-6 max-w-3xl mx-auto">
          <span className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
            <ShieldCheck className="w-4.5 h-4.5 text-amber-600" />
          </span>
          <div>
            <h4 className="font-black text-gray-900 text-[13px] mb-1">Affiliate Disclosure</h4>
            <p className="text-[12px] text-gray-500 leading-relaxed">
              Some links on Trendships are affiliate links. If you make a purchase through
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
      className={`bg-zinc-950 relative overflow-hidden py-16 md:py-24 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[200px] bg-orange-500/8 rounded-full blur-[80px] pointer-events-none" />
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.022] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 60px)," +
            "repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 60px)",
        }}
      />

      <Container>
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 text-teal-400 rounded-full px-4 py-1.5 text-[9px] font-black uppercase tracking-[0.22em] mb-6">
            <Sparkles className="w-3 h-3" />
            Start Exploring
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight mb-4">
            Ready to discover
            <br />
            <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              what&apos;s trending?
            </span>
          </h2>

          <p className="text-zinc-500 text-sm md:text-base leading-relaxed mb-8 max-w-lg mx-auto">
            Whether you&apos;re into fashion, food, business, or travel — Trendships has
            AI-curated content for every curious mind.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white font-bold text-sm px-7 py-3.5 rounded-xl shadow-xl shadow-teal-500/20 hover:-translate-y-0.5 transition-all duration-300 group"
            >
              Explore Articles
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-white border border-white/10 hover:border-white/20 font-semibold text-sm px-7 py-3.5 rounded-xl transition-all duration-300 hover:bg-white/[0.03]"
            >
              Contact Us
            </Link>
          </div>

          {/* Email */}
          <p className="text-[11px] text-zinc-700">
            Partnership or collaboration?{" "}
            <a
              href="mailto:hello@trendships.com"
              className="text-teal-600 hover:text-teal-400 font-semibold transition-colors"
            >
              hello@trendships.com
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
    <main className="bg-white">
      <Hero />
      <StatsBar />
      <OurStory />
      <WhatWeCover />
      <AffiliateDisclosure />
      <BottomCTA />
    </main>
  );
}
