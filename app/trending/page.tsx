"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  Flame, ArrowRight, Sparkles, Zap, Package,
  Clock, ArrowUpRight, TrendingUp, ChevronRight,
  BarChart2, Eye, Star,
} from "lucide-react";
import { Container } from "@/components/ui/container";


/* ══ Config ═══════════════════════════════════════════════════════════════ */
const WP_API_URL = "https://chocolate-zebra-912190.hostingersite.com/wp-json/wp/v2";


/* ══ Types ════════════════════════════════════════════════════════════════ */
interface WPPost {
  id: number;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  slug: string;
  categories: number[];
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url: string; alt_text: string }>;
    "wp:term"?: Array<Array<{ id: number; name: string; slug: string }>>;
  };
}
interface Category {
  id: number;
  name: string;
  slug: string;
  count: number;
}
interface CategoryWithPosts {
  category: Category;
  posts: WPPost[];
}


/* ══ Helpers ══════════════════════════════════════════════════════════════ */
const stripHtml = (h: string) =>
  h.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();

const fmtDate = (d: string) =>
  new Date(d).toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
  });

const CAT_EMOJI: Record<string, string> = {
  fashion: "👗", beauty: "💄", travel: "✈️", tech: "💻",
  food: "🍕", fitness: "💪", lifestyle: "✨", entertainment: "🎬",
  health: "🏥", sport: "⚽", music: "🎵", finance: "💰",
  shopping: "🛍️", default: "📌",
};
const getEmoji = (slug: string) => {
  for (const [k, v] of Object.entries(CAT_EMOJI)) {
    if (slug.toLowerCase().includes(k)) return v;
  }
  return CAT_EMOJI.default;
};

/* rank colors — all must be visible on white bg */
const rankColor = (i: number) => {
  if (i === 0) return "text-orange-500";
  if (i === 1) return "text-zinc-400";
  if (i === 2) return "text-amber-600";
  return "text-gray-400";
};


/* ══ Scroll Reveal Hook ═══════════════════════════════════════════════════ */
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


/* ══════════════════════════════════════════════════════════════════════════
   SKELETON
══════════════════════════════════════════════════════════════════════════ */
const Sk = ({ className = "" }: { className?: string }) => (
  <div className={`animate-pulse rounded-xl ${className}`} />
);

function TrendingSkeleton() {
  return (
    <div className="bg-white min-h-screen">
      <div className="bg-zinc-950 py-16">
        <Container>
          <div className="text-center space-y-4">
            <Sk className="h-6 w-36 bg-white/5 mx-auto rounded-full" />
            <Sk className="h-16 w-72 bg-white/5 mx-auto" />
            <Sk className="h-5 w-96 bg-white/5 mx-auto" />
          </div>
        </Container>
      </div>
      <div className="bg-white border-b border-gray-100 py-6">
        <Container>
          <div className="grid grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => <Sk key={i} className="h-16 bg-gray-100" />)}
          </div>
        </Container>
      </div>
      <div className="bg-gray-50 py-8">
        <Container>
          <div className="space-y-10">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Sk className="h-8 w-56 bg-gray-200" />
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <Sk className="md:col-span-5 h-64 bg-gray-200" />
                  <div className="md:col-span-7 space-y-3">
                    {[...Array(3)].map((_, j) => (
                      <Sk key={j} className="h-20 bg-gray-200" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
}


/* ══════════════════════════════════════════════════════════════════════════
   1. HERO
══════════════════════════════════════════════════════════════════════════ */
function TrendingHero({ totalCategories }: { totalCategories: number }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 60); return () => clearTimeout(t); }, []);

  return (
    <section className="bg-zinc-950 relative overflow-hidden py-16 md:py-24" aria-label="Trending hero">
      {/* Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[300px] h-[200px] bg-orange-500/8 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[250px] h-[200px] bg-cyan-500/8 rounded-full blur-[80px] pointer-events-none" />
      {/* Grid texture */}
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
          className={`relative z-10 text-center transition-all duration-1000 ease-out ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* AI pill */}
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span className="text-xs font-black uppercase tracking-[0.2em] text-teal-300">
              Powered by AI
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-5">
            <span className="text-white">What&apos;s </span>
            <span className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
              Trending
            </span>
            <br />
            <span className="bg-gradient-to-r from-teal-400 via-cyan-300 to-white bg-clip-text text-transparent text-3xl sm:text-4xl md:text-5xl font-extrabold">
              Right Now
            </span>
          </h1>

          <p className="text-zinc-300 text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-8">
            Our AI scans thousands of sources daily — surfacing the most-read articles &amp;
            hottest products across every category, so you never miss a trend.
          </p>

          {/* Live stats pills */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-300 border border-teal-500/25 bg-teal-500/10 rounded-full px-3.5 py-1.5">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              Live updates
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-300 border border-orange-500/25 bg-orange-500/10 rounded-full px-3.5 py-1.5">
              <Flame className="w-3.5 h-3.5" />
              Refreshed daily
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-300 border border-cyan-500/25 bg-cyan-500/10 rounded-full px-3.5 py-1.5">
              <BarChart2 className="w-3.5 h-3.5" />
              {totalCategories} Categories
            </span>
          </div>
        </div>
      </Container>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-white pointer-events-none" />
    </section>
  );
}


/* ══════════════════════════════════════════════════════════════════════════
   2. STATS BAR
══════════════════════════════════════════════════════════════════════════ */
function StatsBar({ totalPosts }: { totalPosts: number }) {
  const stats = [
    { icon: Flame, label: "Trending Articles", value: `${totalPosts}+`, color: "text-orange-500", bg: "bg-orange-50" },
    { icon: Zap, label: "AI Curated", value: "Daily", color: "text-teal-700", bg: "bg-teal-50" },
    { icon: Eye, label: "Topics Covered", value: "6+", color: "text-blue-700", bg: "bg-blue-50" },
    { icon: Star, label: "Quality Score", value: "Top 1%", color: "text-amber-700", bg: "bg-amber-50" },
  ];

  return (
    <div className="bg-white border-b border-gray-100">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="px-5 py-5 flex items-center gap-3">
                <span className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center shrink-0`}>
                  <Icon className={`w-5 h-5 ${s.color}`} />
                </span>
                <div>
                  <div className={`text-xl font-black ${s.color}`}>{s.value}</div>
                  <div className="text-xs text-gray-600 font-medium">{s.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}


/* ══════════════════════════════════════════════════════════════════════════
   3. AI PRODUCTS BANNER
══════════════════════════════════════════════════════════════════════════ */
function AIProductsBanner() {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      <div className="bg-zinc-950 rounded-2xl overflow-hidden relative border border-white/[0.06] shadow-xl shadow-black/10">
        {/* Glows */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/15 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-500/10 rounded-full blur-[60px] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 60px)," +
              "repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 60px)",
          }}
        />

        <div className="relative z-10 p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            {/* Left text */}
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/25">
                  <Package className="w-5 h-5 text-white" />
                </span>
                <div>
                  <h2 className="text-white font-black text-lg leading-tight">
                    Trending Products
                  </h2>
                  <div className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-[0.18em] text-teal-400">
                    <Sparkles className="w-3 h-3" />
                    Powered by AI
                  </div>
                </div>
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed max-w-md">
                Our AI continuously scans top e-commerce platforms — Amazon, Flipkart, Myntra &amp;
                more — surfacing the best trending products updated in real time.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Fashion", "Electronics", "Beauty", "Home", "Sports"].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-bold text-zinc-400 border border-white/10 bg-white/[0.05] px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Product placeholders */}
            <div className="grid grid-cols-4 gap-2.5 md:w-72 shrink-0">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white/[0.04] border border-white/8 rounded-xl p-2.5 flex flex-col items-center gap-2 hover:bg-white/[0.07] transition-colors cursor-pointer group"
                >
                  <div
                    className="w-full aspect-square rounded-lg bg-gradient-to-br from-white/8 to-white/4 flex items-center justify-center"
                    style={{ animation: `pulse 2s ease-in-out ${i * 0.3}s infinite` }}
                  >
                    <Package className="w-5 h-5 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                  </div>
                  <div className="w-full space-y-1">
                    <div className="h-1.5 bg-white/8 rounded animate-pulse" />
                    <div className="h-1.5 bg-white/5 rounded animate-pulse w-3/4 mx-auto" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Coming soon strip */}
          <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
              <span className="text-xs text-zinc-400 font-medium">
                Live product feed integration — coming soon
              </span>
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-teal-400 border border-teal-500/30 bg-teal-500/8 px-3 py-1 rounded-full">
              Beta
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}


/* ══════════════════════════════════════════════════════════════════════════
   4. CATEGORY TRENDING SECTION
══════════════════════════════════════════════════════════════════════════ */
function CategorySection({ data, rank }: { data: CategoryWithPosts; rank: number }) {
  const { ref, visible } = useReveal();
  const { category, posts } = data;
  if (!posts.length) return null;

  const main = posts[0];
  const side = posts.slice(1, 4);
  const mainImg = main._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const mainCat = main._embedded?.["wp:term"]?.[0]?.[0]?.name;

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Section header */}
      <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 shadow-md shadow-orange-500/20 shrink-0">
            <Flame className="w-5 h-5 text-white" />
          </span>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-xs font-black uppercase tracking-widest text-gray-500">
                Trending in
              </span>
              <span
                className={`text-xs font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                  rank <= 3
                    ? "bg-orange-50 text-orange-600 border border-orange-100"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                #{rank}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-gray-900 leading-tight flex items-center gap-2">
              <span className="text-2xl">{getEmoji(category.slug)}</span>
              {category.name}
            </h2>
          </div>
        </div>

        <Link
          href={`/blogs?category=${category.slug}`}
          className="hidden sm:inline-flex items-center gap-1.5 text-sm font-bold text-teal-700 hover:text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-100 px-4 py-2 rounded-xl transition-all duration-200 group"
        >
          See All
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Posts grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Main large post */}
        <Link
          href={`/${main.slug}`}
          className="md:col-span-5 group block relative rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 bg-white"
        >
          <div className="relative h-56 md:h-64 overflow-hidden">
            {mainImg ? (
              <img
                src={mainImg}
                alt={main.title.rendered}
                className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-teal-100 to-cyan-50" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />

            {/* #1 badge */}
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wide bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full shadow-lg shadow-orange-500/25">
                <Flame className="w-3 h-3" />
                #1 Trending
              </span>
            </div>

            {/* Category */}
            {mainCat && (
              <div className="absolute top-3 right-3">
                <span className="text-xs font-bold uppercase tracking-wide bg-white/15 backdrop-blur-sm border border-white/20 text-white px-2.5 py-1 rounded-full">
                  {mainCat}
                </span>
              </div>
            )}

            <div className="absolute bottom-3 left-3 right-3 text-white">
              <h3 className="text-sm md:text-base font-extrabold line-clamp-2 leading-snug group-hover:text-teal-200 transition-colors">
                {main.title.rendered}
              </h3>
              <p className="text-sm text-gray-200 line-clamp-1 mt-1 hidden sm:block">
                {stripHtml(main.excerpt.rendered)}
              </p>
            </div>
          </div>

          <div className="px-4 py-3 bg-white border-t border-gray-50 flex items-center justify-between">
            <span className="text-xs text-gray-500 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {fmtDate(main.date)} · 5 min read
            </span>
            <span className="text-xs font-bold text-teal-700 flex items-center gap-1 group-hover:gap-1.5 transition-all">
              Read <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </Link>

        {/* Side posts — numbered */}
        <div className="md:col-span-7 flex flex-col gap-3">
          {side.map((post, idx) => {
            const img = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
            const cat = post._embedded?.["wp:term"]?.[0]?.[0]?.name;
            return (
              <Link
                key={post.id}
                href={`/${post.slug}`}
                className="group flex gap-3 items-center bg-white rounded-2xl border border-gray-100 p-3.5 hover:shadow-lg hover:border-teal-100 hover:-translate-y-0.5 transition-all duration-200"
              >
                {/* Rank number */}
                <span
                  className={`shrink-0 text-3xl font-black leading-none w-9 text-center tabular-nums select-none ${rankColor(
                    idx + 1
                  )}`}
                >
                  {idx + 2}
                </span>

                {/* Thumbnail */}
                <div className="relative shrink-0 w-[80px] h-[80px] rounded-xl overflow-hidden bg-gray-100">
                  {img ? (
                    <img
                      src={img}
                      alt={post.title.rendered}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-teal-100 to-cyan-50" />
                  )}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  {cat && (
                    <span className="text-xs font-black uppercase tracking-widest text-teal-700 block mb-1">
                      {cat}
                    </span>
                  )}
                  <h3 className="text-sm font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-teal-700 transition-colors">
                    {post.title.rendered}
                  </h3>
                  <span className="text-xs text-gray-500 mt-1.5 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {fmtDate(post.date)}
                  </span>
                </div>

                <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-teal-500 shrink-0 transition-colors" />
              </Link>
            );
          })}

          {/* See all link — mobile */}
          <Link
            href={`/blogs?category=${category.slug}`}
            className="sm:hidden flex items-center justify-center gap-2 text-sm font-bold text-teal-700 border border-teal-100 bg-teal-50 rounded-xl py-3 hover:bg-teal-100 transition-colors"
          >
            See all {category.name} articles
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}


/* ══════════════════════════════════════════════════════════════════════════
   5. BOTTOM CTA BANNER
══════════════════════════════════════════════════════════════════════════ */
function BottomCTA() {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`bg-zinc-950 relative overflow-hidden py-16 md:py-20 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.022] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 60px)," +
            "repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 60px)",
        }}
      />
      <Container>
        <div className="relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 text-teal-300 rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            Powered by AI
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight mb-4">
            Never miss a trend again.
            <br />
            <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Stay ahead, always.
            </span>
          </h2>
          <p className="text-zinc-300 text-base max-w-md mx-auto leading-relaxed mb-8">
            Trendships AI scans thousands of sources daily — delivering the most relevant
            content straight to you.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-xl shadow-teal-500/20 hover:-translate-y-0.5 transition-all duration-300 group"
            >
              Browse All Articles
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 text-zinc-300 hover:text-white border border-white/15 hover:border-white/25 font-semibold text-sm px-6 py-3 rounded-xl transition-all duration-300 hover:bg-white/[0.04]"
            >
              Explore Categories
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}


/* ══════════════════════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════════════════════ */
export default function TrendingPage() {
  const [data, setData] = useState<CategoryWithPosts[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPosts, setTotalPosts] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        /* Step 1: Fetch top categories */
        const catsRes = await fetch(
          `${WP_API_URL}/categories?per_page=8&orderby=count&order=desc`,
          { signal: controller.signal }
        );
        const allCats: Category[] = catsRes.ok ? await catsRes.json() : [];
        const cats = allCats
          .filter((c) => c.count > 0 && c.slug !== "uncategorized")
          .slice(0, 6);

        /* Step 2: Fetch posts per category in parallel */
        const results = await Promise.all(
          cats.map((cat) =>
            fetch(
              `${WP_API_URL}/posts?_embed&per_page=4&categories=${cat.id}&orderby=date&order=desc`,
              { signal: controller.signal }
            )
              .then((r) => (r.ok ? r.json() : []))
              .then((posts: WPPost[]) => ({ category: cat, posts }))
          )
        );

        const filtered = results.filter((d) => d.posts.length > 0);
        setData(filtered);
        setTotalPosts(filtered.reduce((acc, d) => acc + d.posts.length, 0));
      } catch (err: any) {
        if (err.name !== "AbortError") console.error("Trending fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
    return () => controller.abort();
  }, []);

  if (isLoading) return <TrendingSkeleton />;

  return (
    <main>
      {/* SEO JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Trending — Trendships",
            url: "https://trendships.com/trending",
            description:
              "AI-curated trending articles and products across all categories on Trendships, updated daily.",
          }),
        }}
      />

      {/* ① Dark hero */}
      <TrendingHero totalCategories={data.length} />

      {/* ② Stats bar */}
      <StatsBar totalPosts={totalPosts} />

      {/* ③ Main content */}
      <div className="bg-gray-50 py-8">
        <Container>
          <div className="space-y-12">
            {/* AI products banner */}
            <AIProductsBanner />

            {/* Divider with label */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-gray-500 bg-gray-50 px-3">
                <TrendingUp className="w-3.5 h-3.5 text-orange-500" />
                Trending by Category
              </span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Category sections */}
            {data.map((d, idx) => (
              <CategorySection key={d.category.id} data={d} rank={idx + 1} />
            ))}

            {/* No data fallback */}
            {data.length === 0 && (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-100 to-cyan-100 flex items-center justify-center mx-auto mb-4">
                  <Flame className="w-7 h-7 text-teal-600" />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-2">
                  No trending content yet
                </h3>
                <p className="text-base text-gray-600 mb-6">
                  Check back soon — our AI is warming up.
                </p>
                <Link
                  href="/blogs"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md shadow-teal-500/20 hover:-translate-y-0.5 transition-all"
                >
                  Browse All Articles
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </Container>
      </div>

      {/* ④ Bottom CTA */}
      <BottomCTA />
    </main>
  );
}