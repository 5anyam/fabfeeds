"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  Flame, ArrowRight, Sparkles, Zap, Package,
  Clock, ArrowUpRight, TrendingUp, ChevronRight,
  BarChart2, Eye, Target, Crosshair, Activity
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

/* Neon rank colors */
const rankColor = (i: number) => {
  if (i === 0) return "text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]";
  if (i === 1) return "text-cyan-500 drop-shadow-[0_0_5px_rgba(34,211,238,0.4)]";
  if (i === 2) return "text-slate-400";
  return "text-slate-600";
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
  <div className={`animate-pulse rounded ${className}`} />
);

function TrendingSkeleton() {
  return (
    <div className="bg-[#020813] min-h-screen">
      <div className="bg-[#020813] border-b border-cyan-900/40 py-24">
        <Container>
          <div className="text-center space-y-5">
            <Sk className="h-6 w-36 bg-cyan-900/30 mx-auto rounded-full" />
            <Sk className="h-20 w-80 bg-cyan-900/20 mx-auto" />
            <Sk className="h-5 w-96 bg-white/5 mx-auto" />
          </div>
        </Container>
      </div>
      <div className="bg-[#050b14] border-b border-white/5 py-8">
        <Container>
          <div className="grid grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => <Sk key={i} className="h-16 bg-[#0a1220]" />)}
          </div>
        </Container>
      </div>
      <div className="bg-[#020813] py-12">
        <Container>
          <div className="space-y-16">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-6">
                <Sk className="h-8 w-64 bg-cyan-900/20" />
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  <Sk className="md:col-span-5 h-[350px] bg-[#050b14] border border-white/5" />
                  <div className="md:col-span-7 space-y-4">
                    {[...Array(3)].map((_, j) => (
                      <Sk key={j} className="h-[100px] bg-[#050b14] border border-white/5" />
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
    <section className="bg-[#020813] relative overflow-hidden py-20 md:py-32 border-b border-cyan-900/40" aria-label="Trending hero">
      {/* Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[300px] h-[200px] bg-cyan-900/20 rounded-full blur-[80px] pointer-events-none" />
      
      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,#06b6d4 0,#06b6d4 1px,transparent 1px,transparent 60px)," +
            "repeating-linear-gradient(90deg,#06b6d4 0,#06b6d4 1px,transparent 1px,transparent 60px)",
        }}
      />

      <Container>
        <div
          className={`relative z-10 text-center transition-all duration-1000 ease-out ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* AI pill */}
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded px-4 py-1.5 mb-6 shadow-[0_0_15px_rgba(34,211,238,0.15)]">
            <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-300">
              Active Radar Scan
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tighter uppercase mb-6">
            <span className="text-white">Live </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200">
              Signals
            </span>
            <br />
            <span className="text-slate-500 text-3xl sm:text-4xl md:text-5xl font-black">
              Across The Grid
            </span>
          </h1>

          <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto font-medium leading-relaxed mb-10">
            The Influencer Shark AI continuously monitors the digital depths, intercepting the highest-performing 
            strategies, tools, and content in real-time. Don&apos;t chase trends—anticipate them.
          </p>

          {/* Live stats pills */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-cyan-400 border border-cyan-500/30 bg-[#050b14] rounded px-4 py-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] animate-pulse" />
              Live Feed
            </span>
            <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-300 border border-white/10 bg-[#050b14] rounded px-4 py-2">
              <Zap className="w-3.5 h-3.5 text-cyan-500" />
              Real-Time Sync
            </span>
            <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-300 border border-white/10 bg-[#050b14] rounded px-4 py-2">
              <Target className="w-3.5 h-3.5 text-cyan-500" />
              {totalCategories} Sectors Monitored
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   2. STATS BAR
══════════════════════════════════════════════════════════════════════════ */
function StatsBar({ totalPosts }: { totalPosts: number }) {
  const stats = [
    { icon: Activity, label: "Signals Intercepted", value: `${totalPosts}+` },
    { icon: Zap, label: "Algorithm Status", value: "Optimal" },
    { icon: Target, label: "Active Sectors", value: "6+" },
    { icon: Crosshair, label: "Data Accuracy", value: "99.8%" },
  ];

  return (
    <div className="bg-[#050b14] border-b border-white/5">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="px-5 py-6 flex items-center gap-4 group">
                <span className="w-12 h-12 rounded bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 group-hover:bg-cyan-500/20 group-hover:border-cyan-400 transition-all shadow-[0_0_10px_rgba(34,211,238,0.1)] group-hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                  <Icon className="w-5 h-5 text-cyan-400" />
                </span>
                <div>
                  <div className="text-xl md:text-2xl font-black text-white leading-none mb-1">{s.value}</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{s.label}</div>
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
      <div className="bg-[#050b14] rounded-xl overflow-hidden relative border border-cyan-900/40 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
        {/* Glows */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-900/20 rounded-full blur-[60px] pointer-events-none" />

        <div className="relative z-10 p-6 md:p-10">
          <div className="flex flex-col md:flex-row md:items-center gap-8">
            {/* Left text */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-4">
                <span className="w-12 h-12 rounded bg-cyan-400 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.4)]">
                  <Package className="w-6 h-6 text-[#020813]" />
                </span>
                <div>
                  <h2 className="text-white font-black text-2xl uppercase tracking-tight">
                    Apex Software Deals
                  </h2>
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-400 mt-1">
                    <Sparkles className="w-3 h-3" />
                    Radar Intel
                  </div>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-lg font-medium">
                The Shark Radar intercepts the highest-converting software, SaaS deals, and affiliate 
                networks before they hit the mainstream. Dominate your niche with superior tools.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {["SaaS", "AI Tools", "Funnels", "Networks", "Tracking"].map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-bold uppercase tracking-widest text-cyan-300 border border-cyan-900 bg-cyan-950/30 px-3 py-1.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Product placeholders */}
            <div className="grid grid-cols-4 gap-3 md:w-[320px] shrink-0">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="bg-[#020813] border border-white/5 rounded-lg p-3 flex flex-col items-center gap-3 hover:border-cyan-500/50 transition-colors cursor-pointer group"
                >
                  <div
                    className="w-full aspect-square rounded bg-cyan-950/30 flex items-center justify-center border border-white/5"
                    style={{ animation: `pulse 2s ease-in-out ${i * 0.3}s infinite` }}
                  >
                    <Package className="w-5 h-5 text-cyan-900 group-hover:text-cyan-400 transition-colors" />
                  </div>
                  <div className="w-full space-y-1.5">
                    <div className="h-1 bg-slate-700 rounded animate-pulse" />
                    <div className="h-1 bg-slate-800 rounded animate-pulse w-3/4 mx-auto" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Coming soon strip */}
          <div className="mt-8 pt-5 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                Live API integration initiating...
              </span>
            </div>
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#020813] bg-cyan-400 px-3 py-1 rounded">
              Phase 2
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
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
        <div className="flex items-center gap-4">
          <span className="flex items-center justify-center w-12 h-12 rounded bg-cyan-500/10 border border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.15)] shrink-0">
            <Target className="w-5 h-5 text-cyan-400" />
          </span>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                Sector Activity
              </span>
              <span
                className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded ${
                  rank <= 3
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                    : "bg-[#050b14] border border-white/10 text-slate-400"
                }`}
              >
                LEVEL {rank}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">
              {category.name}
            </h2>
          </div>
        </div>

        <Link
          href={`/blogs?category=${category.slug}`}
          className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-cyan-400 hover:text-[#020813] hover:bg-cyan-400 border border-cyan-500/50 px-4 py-2 rounded transition-all duration-300 group"
        >
          View Sector
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Posts grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Main large post */}
        <Link
          href={`/${main.slug}`}
          className="md:col-span-5 group block relative rounded-xl overflow-hidden border border-white/5 hover:border-cyan-500/50 hover:shadow-[0_10px_30px_rgba(34,211,238,0.15)] transition-all duration-500 bg-[#050b14]"
        >
          <div className="relative h-64 md:h-[320px] overflow-hidden bg-[#020813]">
            {mainImg ? (
              <img
                src={mainImg}
                alt={main.title.rendered}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-cyan-950/20" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050b14] via-[#050b14]/40 to-transparent" />

            {/* #1 badge */}
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.2em] bg-cyan-400 text-[#020813] px-3 py-1.5 rounded shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                <Flame className="w-3 h-3" />
                Apex Signal
              </span>
            </div>

            {/* Category */}
            {mainCat && (
              <div className="absolute top-4 right-4">
                <span className="text-[9px] font-black uppercase tracking-widest bg-[#020813]/80 backdrop-blur-md border border-cyan-900 text-cyan-400 px-3 py-1.5 rounded">
                  {mainCat}
                </span>
              </div>
            )}

            <div className="absolute bottom-5 left-5 right-5 text-white z-10">
              <h3 className="text-lg md:text-xl font-black uppercase line-clamp-2 leading-tight group-hover:text-cyan-400 transition-colors">
                {main.title.rendered}
              </h3>
              <p className="text-xs text-slate-400 font-medium line-clamp-2 mt-2 hidden sm:block">
                {stripHtml(main.excerpt.rendered)}
              </p>
            </div>
          </div>

          <div className="px-5 py-4 bg-[#050b14] border-t border-white/5 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
              <Clock className="w-3 h-3 text-cyan-900" />
              {fmtDate(main.date)}
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-cyan-500 flex items-center gap-1 group-hover:gap-2 transition-all">
              Initiate <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </Link>

        {/* Side posts — numbered */}
        <div className="md:col-span-7 flex flex-col gap-4">
          {side.map((post, idx) => {
            const img = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
            const cat = post._embedded?.["wp:term"]?.[0]?.[0]?.name;
            return (
              <Link
                key={post.id}
                href={`/${post.slug}`}
                className="group flex gap-4 items-center bg-[#050b14] rounded-xl border border-white/5 p-4 hover:border-cyan-500/40 hover:shadow-[0_5px_20px_rgba(34,211,238,0.1)] transition-all duration-300"
              >
                {/* Rank number */}
                <span
                  className={`shrink-0 text-3xl md:text-4xl font-black leading-none w-10 text-center tabular-nums select-none ${rankColor(idx + 1)}`}
                >
                  {idx + 2}
                </span>

                {/* Thumbnail */}
                <div className="relative shrink-0 w-[90px] h-[90px] rounded overflow-hidden bg-[#020813] border border-white/5">
                  {img ? (
                    <img
                      src={img}
                      alt={post.title.rendered}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-cyan-950/20" />
                  )}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0 py-1">
                  {cat && (
                    <span className="text-[9px] font-black uppercase tracking-widest text-cyan-500 block mb-1.5">
                      {cat}
                    </span>
                  )}
                  <h3 className="text-sm md:text-base font-bold text-white line-clamp-2 leading-snug group-hover:text-cyan-400 transition-colors">
                    {post.title.rendered}
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-2 flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-slate-700 group-hover:bg-cyan-500 transition-colors" />
                    {fmtDate(post.date)}
                  </span>
                </div>

                <ArrowUpRight className="w-5 h-5 text-slate-600 group-hover:text-cyan-400 shrink-0 transition-colors hidden sm:block mr-2" />
              </Link>
            );
          })}

          {/* See all link — mobile */}
          <Link
            href={`/blogs?category=${category.slug}`}
            className="sm:hidden flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-cyan-400 border border-cyan-900/50 bg-[#050b14] rounded py-3.5 hover:bg-cyan-500/10 transition-colors mt-2"
          >
            Access Full Sector
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
      className={`bg-[#050b14] border-t border-cyan-900/30 relative overflow-hidden py-20 md:py-28 transition-all duration-1000 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
      
      <Container>
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#020813] border border-cyan-500/30 text-cyan-400 rounded px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] mb-6 shadow-[0_0_15px_rgba(34,211,238,0.15)]">
            <Target className="w-3.5 h-3.5" />
            Scanner Active
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-5">
            Command the
            <br />
            <span className="text-cyan-400">Digital Space.</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base font-medium leading-relaxed mb-10">
            The Influencer Shark Radar processes massive datasets daily to hand you the exact 
            strategies and tools you need to dominate.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/blogs"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-cyan-400 text-[#020813] font-black uppercase tracking-widest text-[11px] px-8 py-4 rounded shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:bg-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all duration-300 group"
            >
              Access Radar Intel
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
            <Link
              href="/categories"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-cyan-400 border border-cyan-900/50 hover:border-cyan-500/50 bg-[#020813] font-bold uppercase tracking-widest text-[11px] px-8 py-4 rounded transition-all duration-300 hover:bg-cyan-500/10"
            >
              Scan Sectors
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
    <main className="bg-[#020813]">
      {/* SEO JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "The Radar — Influencer Shark",
            url: "https://influencershark.com/trending",
            description:
              "Live signals and apex strategies curated by Influencer Shark AI. Dominate your sector.",
          }),
        }}
      />

      {/* ① Dark hero */}
      <TrendingHero totalCategories={data.length} />

      {/* ② Stats bar */}
      <StatsBar totalPosts={totalPosts} />

      {/* ③ Main content */}
      <div className="py-12 md:py-20">
        <Container>
          <div className="space-y-16 md:space-y-24">
            {/* AI products banner */}
            <AIProductsBanner />

            {/* Divider with label */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-white/5" />
              <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-cyan-500 bg-[#020813] px-4 border border-cyan-900/40 py-1.5 rounded">
                <Activity className="w-3.5 h-3.5" />
                Live Sector Feed
              </span>
              <div className="flex-1 h-px bg-white/5" />
            </div>

            {/* Category sections */}
            <div className="space-y-16 md:space-y-24">
              {data.map((d, idx) => (
                <CategorySection key={d.category.id} data={d} rank={idx + 1} />
              ))}
            </div>

            {/* No data fallback */}
            {data.length === 0 && (
              <div className="text-center py-24 bg-[#050b14] border border-white/5 rounded-xl">
                <div className="w-16 h-16 rounded bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto mb-5 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                  <Activity className="w-6 h-6 text-cyan-400 animate-pulse" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-widest text-white mb-2">
                  No Signals Detected
                </h3>
                <p className="text-sm font-medium text-slate-400 mb-8">
                  The radar is recalibrating. Check back shortly.
                </p>
                <Link
                  href="/blogs"
                  className="inline-flex items-center gap-2 bg-cyan-400 text-[#020813] font-black uppercase tracking-widest text-[11px] px-8 py-3.5 rounded shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:bg-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all"
                >
                  Access Archives
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