"use client";

import Link from "next/link";
import {
  ArrowRight, Flame, Sparkles, Clock,
  ArrowUpRight, Zap, ChevronRight, TrendingUp,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { LatestPostsGrid } from "@/components/LatestPostsGrid";
import { useEffect, useMemo, useState, useRef } from "react";

/* ══════════════════════════════════════════════════════════════
   CONFIG
══════════════════════════════════════════════════════════════ */
const WP_API_URL = "https://cms.clubmytrip.com/wp-json/wp/v2";

const CAT_IMGS = [
  "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80",
  "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=800&q=80",
  "https://images.unsplash.com/photo-1535914254981-b5012eebbd15?w=800&q=80",
  "https://images.unsplash.com/photo-1526566762798-8fac9c07aa98?w=800&q=80",
  "https://images.unsplash.com/photo-1572048572872-2394404cf1f3?w=800&q=80",
  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80",
  "https://images.unsplash.com/photo-1579208570378-8c970854bc23?w=800&q=80",
  "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80",
  "https://images.unsplash.com/photo-1688561808434-886a6dd97b8c?w=800&q=80",
  "https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?w=800&q=80",
  "https://images.unsplash.com/photo-1567789884554-0b844b597180?w=800&q=80",
];
const catImg = (_: string, i: number) => CAT_IMGS[i % CAT_IMGS.length];

const stripHtml = (h: string) =>
  h.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();

const fmtDate = (d: string) =>
  new Date(d).toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
  });

const CAT_EMOJI: Record<string, string> = {
  fashion: "👗", beauty: "💄", travel: "✈️", tech: "💻",
  food: "🍕", fitness: "💪", lifestyle: "✨", entertainment: "🎬",
  health: "🏥", sport: "⚽", music: "🎵", default: "📌",
};
const getEmoji = (slug: string) => {
  for (const [k, v] of Object.entries(CAT_EMOJI)) {
    if (slug.toLowerCase().includes(k)) return v;
  }
  return CAT_EMOJI.default;
};

/* ══════════════════════════════════════════════════════════════
   TYPES
══════════════════════════════════════════════════════════════ */
interface WPPost {
  id: number;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };  // ← ye line add karo
  slug: string;
  categories: number[];
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url: string; alt_text: string }>;
    "wp:term"?: Array<Array<{ id: number; name: string; slug: string }>>;
  };
}
interface Cat {
  id: number;
  name: string;
  slug: string;
  count: number;
}

/* ══════════════════════════════════════════════════════════════
   HOOKS
══════════════════════════════════════════════════════════════ */
function useReveal(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) { setVisible(true); io.disconnect(); }
      },
      { threshold }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ══════════════════════════════════════════════════════════════
   SKELETON
══════════════════════════════════════════════════════════════ */
const Sk = ({ className = "" }: { className?: string }) => (
  <div className={`animate-pulse rounded-xl ${className}`} />
);

function PageSkeleton() {
  return (
    <div className="bg-zinc-950 min-h-screen">
      {/* ticker skeleton */}
      <div className="h-9 bg-zinc-900 border-b border-white/5" />
      {/* hero skeleton */}
      <div className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-4">
              <Sk className="h-3 w-24 bg-white/5" />
              <Sk className="h-14 w-full bg-white/5" />
              <Sk className="h-14 w-4/5 bg-white/5" />
              <Sk className="h-3 w-full bg-white/5" />
              <Sk className="h-3 w-3/4 bg-white/5" />
              <Sk className="h-10 w-36 rounded-full bg-white/5" />
            </div>
            <Sk className="h-[380px] bg-white/5" />
          </div>
        </Container>
      </div>
      {/* chips skeleton */}
      <div className="border-t border-white/5 py-4">
        <Container>
          <div className="flex gap-3">
            {[...Array(7)].map((_, i) => (
              <Sk key={i} className="h-7 w-24 rounded-full bg-white/5" />
            ))}
          </div>
        </Container>
      </div>
      {/* grid skeleton */}
      <div className="bg-gray-50 py-8">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 space-y-4">
              <Sk className="h-72 bg-gray-100" />
              <div className="grid grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => <Sk key={i} className="h-48 bg-gray-100" />)}
              </div>
            </div>
            <div className="lg:col-span-4 space-y-4">
              <Sk className="h-96 bg-gray-100" />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   SECTION 1 — NEWS TICKER
══════════════════════════════════════════════════════════════ */
function Ticker({ posts }: { posts: WPPost[] }) {
  const items = [...posts.slice(0, 6), ...posts.slice(0, 6)];
  return (
    <div className="bg-zinc-950 border-b border-white/[0.06] py-2.5 overflow-hidden">
      <div className="flex items-center">
        <div className="shrink-0 z-10 pl-4 pr-3">
          <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full flex items-center gap-1.5 whitespace-nowrap shadow-lg shadow-orange-500/20">
            <Flame className="w-2.5 h-2.5" />
            Breaking
          </span>
        </div>
        <div className="w-px h-5 bg-white/10 shrink-0" />
        <div className="overflow-hidden flex-1 ml-3">
          <div
            className="flex gap-10 whitespace-nowrap w-max"
            style={{ animation: "ticker 45s linear infinite" }}
          >
            {items.map((p, i) => (
              <Link
                key={`${p.id}-${i}`}
                href={`/${p.slug}`}
                className="inline-flex items-center gap-2 text-[11px] font-medium text-zinc-400 hover:text-teal-400 transition-colors"
              >
                <span className="text-teal-700 text-[8px]">◆</span>
                {p.title.rendered}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   SECTION 2 — MEGA DARK HERO
══════════════════════════════════════════════════════════════ */
function MegaHero({ post, secondary }: { post: WPPost; secondary: WPPost[] }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 60); return () => clearTimeout(t); }, []);

  const img = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const cat = post._embedded?.["wp:term"]?.[0]?.[0]?.name;

  return (
    <section className="bg-zinc-950 relative overflow-hidden" aria-label="Hero feature">
      {/* Ambient light blobs */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-teal-500/7 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.022]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 60px)," +
            "repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 60px)",
        }}
      />

      <Container>
        {/* Main hero grid */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 pt-10 pb-8 md:pt-14 md:pb-10 items-center transition-all duration-1000 ease-out ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* ── Left: Text content ── */}
          <div className="order-2 lg:order-1 space-y-6">
            <div className="flex flex-wrap items-center gap-2.5">
              {cat && (
                <span className="text-[8px] font-black uppercase tracking-[0.25em] text-teal-400 border border-teal-500/25 bg-teal-500/8 px-3 py-1 rounded-full">
                  {cat}
                </span>
              )}
              <span className="text-[10px] text-white flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {fmtDate(post.date)}
              </span>
              <span className="text-[10px] text-zinc-700">·</span>
              <span className="text-[10px] text-white">5 min read</span>
            </div>

            <h1 className="text-[1.2rem] sm:text-2xl lg:text-[1.6rem] xl:text-[2rem] font-black text-white leading-[3.2] tracking-tight">
              {post.title.rendered}
            </h1>

            <p className="text-zinc-200 text-base md:text-[17px] leading-[1.85] line-clamp-3 max-w-xl">
              {stripHtml(post.excerpt.rendered)}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href={`/${post.slug}`}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white font-bold px-6 py-3 rounded-full text-sm shadow-xl shadow-teal-500/25 hover:shadow-teal-500/40 hover:-translate-y-0.5 transition-all duration-300 group"
              >
                Read Full Article
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <span className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-white border border-white/8 px-3 py-2 rounded-full">
                <Sparkles className="w-3 h-3 text-teal-600" />
                Powered by AI
              </span>
            </div>
          </div>

          {/* ── Right: Featured image ── */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden aspect-[4/3] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] border border-white/[0.06] group">
              {img ? (
                <img
                  src={img}
                  alt={post.title.rendered}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  loading="eager"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-teal-900/30 to-zinc-900" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 to-transparent" />
            </div>
            {/* Floating editor pick badge */}
            <div className="absolute -bottom-4 -left-3 bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-2xl px-4 py-2.5 shadow-2xl shadow-orange-500/30 border border-orange-400/20">
              <div className="flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5" />
                <span className="text-[10px] font-black uppercase tracking-widest">Editor&apos;s Pick</span>
              </div>
            </div>
            {/* Post count badge */}
            <div className="absolute -top-3 -right-3 bg-zinc-900 border border-white/10 text-white rounded-2xl px-3.5 py-2 shadow-xl">
              <div className="text-center">
                <div className="text-lg font-black text-teal-400 leading-none">{secondary.length + 1}</div>
                <div className="text-[8px] text-zinc-600 uppercase tracking-widest mt-0.5">Stories</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Secondary posts strip ── */}
        {secondary.length > 0 && (
          <div className="border-t border-white/[0.06] grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.06]">
            {secondary.slice(0, 4).map((p, i) => {
              const pCat = p._embedded?.["wp:term"]?.[0]?.[0]?.name;
              return (
                <Link
                  key={p.id}
                  href={`/${p.slug}`}
                  className="p-4 md:p-5 hover:bg-white/[0.025] transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[8px] font-black text-zinc-700 tabular-nums">0{i + 2}</span>
                    {pCat && (
                      <span className="text-[8px] font-bold text-teal-600 uppercase tracking-widest">
                        {pCat}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] font-semibold text-zinc-300 line-clamp-2 leading-snug group-hover:text-white transition-colors">
                    {p.title.rendered}
                  </p>
                  <span className="text-[9px] text-white mt-2 block">{fmtDate(p.date)}</span>
                </Link>
              );
            })}
          </div>
        )}
      </Container>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   SECTION 3 — CATEGORY CHIPS
══════════════════════════════════════════════════════════════ */
function CategoryChips({ cats }: { cats: Cat[] }) {
  const list = useMemo(
    () => cats.filter((c) => c.count > 0 && c.slug !== "uncategorized").slice(0, 12),
    [cats]
  );
  if (!list.length) return null;

  return (
    <div className="bg-zinc-950 border-b border-white/[0.06] py-3.5 sticky top-0 z-20 backdrop-blur-sm">
      <Container>
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
          <span className="shrink-0 text-[8px] font-black uppercase tracking-[0.22em] text-zinc-700 pr-3 border-r border-white/8">
            Topics
          </span>
          {list.map((c) => (
            <Link
              key={c.id}
              href={`/blogs?category=${c.slug}`}
              className="shrink-0 flex items-center gap-1.5 text-[11px] font-semibold text-zinc-400 hover:text-white border border-white/8 hover:border-teal-500/40 bg-white/[0.03] hover:bg-teal-500/8 rounded-full px-3.5 py-1.5 transition-all duration-200 whitespace-nowrap group"
            >
              <span className="text-sm leading-none">{getEmoji(c.slug)}</span>
              {c.name}
              <span className="text-[9px] text-zinc-700 group-hover:text-teal-600 transition-colors">
                {c.count}
              </span>
            </Link>
          ))}
          <Link
            href="/categories"
            className="shrink-0 flex items-center gap-1 text-[11px] font-bold text-teal-500 hover:text-teal-400 pl-3 border-l border-white/8 transition-colors whitespace-nowrap"
          >
            All <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </Container>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   CARD COMPONENTS
══════════════════════════════════════════════════════════════ */
function CardLg({ post }: { post: WPPost }) {
  const img = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const cat = post._embedded?.["wp:term"]?.[0]?.[0]?.name;
  return (
    <Link
      href={`/${post.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl min-h-[400px] h-full hover:shadow-2xl transition-all duration-500 border border-white/[0.06]"
    >
      {img ? (
        <img
          src={img}
          alt={post.title.rendered}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
          loading="lazy"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/60 to-zinc-900" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/95 via-zinc-950/25 to-transparent" />

      <div className="absolute inset-0 p-5 flex flex-col justify-end">
        {cat && (
          <div className="flex items-center gap-2 mb-2.5">
            <span className="w-5 h-[2px] bg-orange-400" />
            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-orange-400">
              {cat}
            </span>
          </div>
        )}
        <h2 className="text-xl md:text-2xl font-black text-white leading-tight line-clamp-3 group-hover:text-teal-100 transition-colors mb-2.5">
          {post.title.rendered}
        </h2>
        <p className="text-zinc-200 text-[13px] line-clamp-2 leading-relaxed mb-3.5">
          {stripHtml(post.excerpt.rendered)}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-whilte flex items-center gap-1.5">
            <Clock className="w-2.5 h-2.5" />
            {fmtDate(post.date)} · 5 min read
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-teal-400 bg-teal-400/10 border border-teal-400/20 rounded-full px-2.5 py-1 group-hover:bg-teal-400/20 transition-colors">
            Read <ArrowUpRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function CardMd({ post }: { post: WPPost }) {
  const img = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const cat = post._embedded?.["wp:term"]?.[0]?.[0]?.name;
  return (
    <Link
      href={`/${post.slug}`}
      className="group block overflow-hidden rounded-2xl bg-white border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative h-44 overflow-hidden">
        {img ? (
          <img
            src={img}
            alt={post.title.rendered}
            className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-700"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-teal-50 to-cyan-100" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        {cat && (
          <span className="absolute top-2.5 left-2.5 text-[8px] font-black uppercase tracking-widest bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-2 py-0.5 rounded-full shadow-md">
            {cat}
          </span>
        )}
      </div>
      <div className="p-3.5">
        <h3 className="text-[13px] font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-teal-700 transition-colors mb-2.5">
          {post.title.rendered}
        </h3>
        <p className="text-gray-600 text-[13px] line-clamp-2 leading-relaxed mb-3">
          {stripHtml(post.excerpt.rendered)}
        </p>
        <div className="flex items-center justify-between border-t border-gray-50 pt-2.5">
          <span className="text-[10px] text-black flex items-center gap-1">
            <Clock className="w-2.5 h-2.5" />
            {fmtDate(post.date)}
          </span>
          <span className="text-[10px] font-bold text-teal-600 flex items-center gap-0.5 group-hover:gap-1.5 transition-all">
            Read <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function CardRow({ post, rank }: { post: WPPost; rank: number }) {
  const img = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const cat = post._embedded?.["wp:term"]?.[0]?.[0]?.name;
  return (
    <Link
      href={`/${post.slug}`}
      className="group flex gap-3 items-center bg-white border border-gray-100 rounded-xl p-3 hover:shadow-md hover:border-teal-100 transition-all duration-200"
    >
      <span
        className={`shrink-0 text-2xl font-black leading-none w-6 text-center tabular-nums select-none ${
          rank === 1 ? "text-orange-400" : rank === 2 ? "text-zinc-300" : "text-gray-100"
        }`}
      >
        {rank}
      </span>
      <div className="relative shrink-0 w-16 h-16 rounded-xl overflow-hidden bg-gray-100">
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
      <div className="flex-1 min-w-0">
        {cat && (
          <span className="text-[8px] font-black uppercase tracking-widest text-teal-600 mb-0.5 block">
            {cat}
          </span>
        )}
        <h3 className="text-[12px] font-bold text-gray-800 line-clamp-2 leading-snug group-hover:text-teal-700 transition-colors">
          {post.title.rendered}
        </h3>
        <span className="text-[9px] text-black mt-1 flex items-center gap-1">
          <Clock className="w-2.5 h-2.5" />
          {fmtDate(post.date)}
        </span>
      </div>
      <ArrowUpRight className="w-4 h-4 text-gray-200 group-hover:text-teal-500 shrink-0 -translate-x-1 group-hover:translate-x-0 transition-all" />
    </Link>
  );
}

/* ══════════════════════════════════════════════════════════════
   SECTION 4 — EDITORIAL GRID (Main 8 col + Sidebar 4 col)
══════════════════════════════════════════════════════════════ */
function EditorialGrid({ posts, trendingPosts }: { posts: WPPost[]; trendingPosts: WPPost[] }) {
  const { ref, visible } = useReveal();

  return (
    <div
      ref={ref}
      className={`py-8 bg-gray-50 border-y border-gray-100 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* ── Left: content ── */}
          <div className="lg:col-span-8 space-y-5">
            {/* Section label */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-1 h-6 rounded-full bg-gradient-to-b from-teal-500 to-cyan-400" />
                <span className="text-[10px] font-black uppercase tracking-[0.22em] text-gray-500">
                  Editor&apos;s Selection
                </span>
              </div>
              <Link
                href="/blogs"
                className="text-[11px] font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1 transition-colors"
              >
                All Articles <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Large + 2 medium */}
            {posts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:row-span-2">
                  <CardLg post={posts[0]} />
                </div>
                {posts.slice(1, 3).map((p) => (
                  <CardMd key={p.id} post={p} />
                ))}
              </div>
            )}

            {/* 3 small cards */}
            {posts.length > 3 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {posts.slice(3, 6).map((p) => (
                  <CardMd key={p.id} post={p} />
                ))}
              </div>
            )}
          </div>

          {/* ── Right: Trending sidebar ── */}
          <aside className="lg:col-span-4" aria-label="Trending">
            <div className="sticky top-[56px] space-y-4">
              {/* Trending dark card */}
              <div className="bg-zinc-950 rounded-2xl overflow-hidden border border-white/[0.06] shadow-xl shadow-black/20">
                <div className="px-4 pt-4 pb-3 border-b border-white/[0.06] flex items-center justify-between">
                  <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-md shadow-orange-500/25">
                      <Flame className="w-3.5 h-3.5 text-white" />
                    </span>
                    Trending Now
                  </h2>
                  <Link
                    href="/trending"
                    className="text-[9px] font-bold text-teal-400 hover:text-teal-300 flex items-center gap-0.5 transition-colors"
                  >
                    View all <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
                <div className="divide-y divide-white/[0.05]">
                  {trendingPosts.slice(0, 5).map((post, i) => {
                    const img = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
                    const cat = post._embedded?.["wp:term"]?.[0]?.[0]?.name;
                    return (
                      <Link
                        key={post.id}
                        href={`/${post.slug}`}
                        className="group flex gap-3 items-center px-4 py-3 hover:bg-white/[0.03] transition-colors"
                      >
                        <span
                          className={`shrink-0 text-xl font-black leading-none w-5 text-right tabular-nums select-none ${
                            i === 0
                              ? "text-orange-500"
                              : i === 1
                              ? "text-zinc-600"
                              : "text-zinc-800"
                          }`}
                        >
                          {i + 1}
                        </span>
                        <div className="relative shrink-0 w-12 h-12 rounded-xl overflow-hidden bg-zinc-800">
                          {img && (
                            <img
                              src={img}
                              alt={post.title.rendered}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              loading="lazy"
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          {cat && (
                            <span className="text-[8px] font-black uppercase tracking-widest text-teal-600 block mb-0.5">
                              {cat}
                            </span>
                          )}
                          <p className="text-[11px] font-semibold text-zinc-300 line-clamp-2 leading-snug group-hover:text-white transition-colors">
                            {post.title.rendered}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Ad unit */}
              <div className="rounded-2xl overflow-hidden border border-gray-100 bg-white">

                <a
                  href="https://converti.se/click/4bdd0a13-ff3c999cd6-ccbc7b35/?sid=sidebar1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <div className="relative w-full aspect-square overflow-hidden border-t border-gray-50">
                    <img
                      src="https://marketstreetlynnfield.com/wp-content/uploads/sites/20/2019/04/sephora-featured.jpg"
                      alt="Advertisement"
                      loading="lazy"
                      className="w-full h-full p-4 object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   SECTION 5 — AI POWERED BANNER
══════════════════════════════════════════════════════════════ */
function AIBanner() {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`bg-zinc-950 py-8 md:py-10 relative overflow-hidden transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Gradient blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 60px)," +
            "repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 60px)",
        }}
      />
      <Container>
        <div className="relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 text-teal-400 rounded-full px-4 py-1.5 text-[9px] font-black uppercase tracking-[0.22em] mb-5">
            <Sparkles className="w-3 h-3" />
            Powered by AI
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight mb-4">
            We fetch the best content
            <br />
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              so you don&apos;t have to.
            </span>
          </h2>
          <p className="text-zinc-300 text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-7">
            Our AI continuously scans top blogs, reviews &amp; e-commerce stores — surfacing the
            most trending content across every category, updated daily.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/trending"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white font-bold px-6 py-3 rounded-full text-sm shadow-xl shadow-orange-500/25 hover:-translate-y-0.5 transition-all duration-300 group"
            >
              <Flame className="w-4 h-4" />
              See What&apos;s Trending
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-white border border-white/10 hover:border-white/20 font-semibold px-6 py-3 rounded-full text-sm transition-all duration-300 hover:bg-white/[0.03]"
            >
              Browse All Articles
            </Link>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-6 max-w-sm mx-auto mt-10 pt-8 border-t border-white/[0.06]">
            {[
              { val: "1K+", label: "Articles" },
              { val: "Daily", label: "Updates" },
              { val: "AI", label: "Curated" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-black text-white">{s.val}</div>
                <div className="text-[9px] text-zinc-600 uppercase tracking-widest mt-0.5">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   SECTION 6 — CATEGORY SHOWCASE (new bento)
══════════════════════════════════════════════════════════════ */
function CategoryShowcase({ cats }: { cats: Cat[] }) {
  const { ref, visible } = useReveal();
  const list = useMemo(
    () => cats.filter((c) => c.count > 0 && c.slug !== "uncategorized").slice(0, 6),
    [cats]
  );
  if (!list.length) return null;

  return (
    <div
      ref={ref}
      className={`py-7 bg-white border-b border-gray-100 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <Container>
        <div className="flex items-end justify-between mb-6">
          <div>
            <span className="text-[8px] font-black uppercase tracking-[0.25em] text-teal-600 block mb-1.5">
              Explore
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight tracking-tight">
              Browse by Category
            </h2>
          </div>
          <Link
            href="/categories"
            className="text-[11px] font-bold text-gray-400 hover:text-teal-600 flex items-center gap-1 transition-colors"
          >
            All categories <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Asymmetric bento grid */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-3 h-auto md:h-[340px]">
          {/* Big feature tile */}
          <Link
            href={`/blogs?category=${list[0]?.slug}`}
            className="col-span-2 md:col-span-5 md:row-span-2 relative group rounded-3xl overflow-hidden h-48 md:h-auto"
          >
            <img
              src={catImg(list[0].slug, 0)}
              alt={list[0].name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <div className="absolute inset-0 p-5 flex flex-col justify-end">
              <span className="text-[8px] font-black uppercase tracking-[0.22em] text-orange-400 mb-2 flex items-center gap-1.5">
                <TrendingUp className="w-3 h-3" /> Most Popular
              </span>
              <h3 className="text-2xl md:text-3xl font-black text-white leading-tight mb-1">
                {list[0].name}
              </h3>
              <p className="text-[11px] text-white/60 font-medium">{list[0].count} Articles</p>
            </div>
          </Link>

          {/* 4 smaller tiles */}
          {list.slice(1, 5).map((cat, idx) => (
            <Link
              key={cat.id}
              href={`/blogs?category=${cat.slug}`}
              className={`relative group rounded-2xl overflow-hidden h-32 md:h-auto ${
                idx < 2 ? "col-span-1 md:col-span-3" : "col-span-1 md:col-span-4"
              } ${idx === 3 ? "md:col-span-3" : ""}`}
            >
              <img
                src={catImg(cat.slug, idx + 1)}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
              <div className="absolute inset-0 p-3.5 flex flex-col justify-end">
                <h3 className="text-sm font-black text-white leading-snug">{cat.name}</h3>
                <span className="text-[9px] text-white/55 mt-0.5">{cat.count} Articles</span>
              </div>
              <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-white/10 border border-white/15 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                <ArrowUpRight className="w-3 h-3 text-white" />
              </div>
            </Link>
          ))}

          {/* Tall wide tile */}
          {list[5] && (
            <Link
              href={`/blogs?category=${list[5].slug}`}
              className="col-span-2 md:col-span-4 relative group rounded-2xl overflow-hidden h-32 md:h-auto"
            >
              <img
                src={catImg(list[5].slug, 5)}
                alt={list[5].name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
              <div className="absolute inset-0 p-3.5 flex flex-col justify-end">
                <h3 className="text-sm font-black text-white">{list[5].name}</h3>
                <span className="text-[9px] text-white/55 mt-0.5">{list[5].count} Articles</span>
              </div>
            </Link>
          )}
        </div>
      </Container>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   SECTION 7 — NUMBERED TRENDING + PARTNERS
══════════════════════════════════════════════════════════════ */
function TrendingWithPartners({ posts }: { posts: WPPost[] }) {
  const { ref, visible } = useReveal();

  const partners = [
    {
      href: "https://converti.se/click/4bdd0a13-ff3c999cd6-ccbc7b35/?sid=plm1",
      img: "https://cdn.shopify.com/s/files/1/0639/2741/9138/files/IMG-20191125-WA0007.jpg?v=1666673698",
      alt: "Partner 1",
    },
    {
      href: "https://converti.se/click/4bdd0a13-ff3c999cd6-ccbc7b35/?sid=plm2",
      img: "https://www.lookfantastic.at/images?url=https://static.thcdn.com/widgets/95-fr/17/original-LookFantastic_TopBanner_dt_1900x600_GENERIC_S22-104617.png&format=webp&auto=avif&width=1920&fit=cover",
      alt: "Partner 2",
    },
    {
      href: "https://converti.se/click/4bdd0a13-ff3c999cd6-ccbc7b35/?sid=plm3",
      img: "https://cdn.shopify.com/s/files/1/0639/2741/9138/files/IMG-20191125-WA0007.jpg?v=1666673698",
      alt: "Partner 3",
    },
  ];

  return (
    <div
      ref={ref}
      className={`py-8 bg-gray-50 border-b border-gray-100 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Numbered trending posts */}
          <div className="lg:col-span-12 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-1 h-6 rounded-full bg-gradient-to-b from-orange-400 to-red-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.22em] text-gray-500">
                  Most Read
                </span>
              </div>
              <Link
                href="/trending"
                className="text-[11px] font-bold text-orange-500 hover:text-orange-600 flex items-center gap-1 transition-colors"
              >
                <Flame className="w-3 h-3" />
                Trending Page
              </Link>
            </div>
            <div className="space-y-2.5">
              {posts.slice(0, 5).map((p, i) => (
                <CardRow key={p.id} post={p} rank={i + 1} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════════ */
export default function HomePage() {
  const [featuredPosts, setFeaturedPosts] = useState<WPPost[]>([]);
  const [allPosts, setAllPosts] = useState<WPPost[]>([]);
  const [categories, setCategories] = useState<Cat[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [featRes, postsRes, catsRes] = await Promise.all([
          fetch(`${WP_API_URL}/posts?_embed&per_page=12&orderby=date`),
          fetch(`${WP_API_URL}/posts?_embed&per_page=20&orderby=date`),
          fetch(`${WP_API_URL}/categories?per_page=12&orderby=count&order=desc`),
        ]);
        if (featRes.ok) setFeaturedPosts(await featRes.json());
        if (postsRes.ok) setAllPosts(await postsRes.json());
        if (catsRes.ok) setCategories(await catsRes.json());
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (isLoading) return <PageSkeleton />;

  const heroPost = featuredPosts[0];
  const heroSecondary = featuredPosts.slice(1, 5);
  const editorialPosts = featuredPosts.slice(1, 7);
  const trendingPosts = featuredPosts.slice(0, 10);

  if (!heroPost) {
    return (
      <div className="bg-zinc-950 min-h-screen flex items-center justify-center">
        <p className="text-zinc-500 text-sm">No posts found. Check CMS connection.</p>
      </div>
    );
  }

  return (
    <main className="bg-white" itemScope itemType="https://schema.org/WebPage">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Trendships",
            url: "https://trendships.com",
            description: "AI-powered trending blogs and product recommendations",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://trendships.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />

      {/* ① News ticker */}
      <Ticker posts={featuredPosts} />

      {/* ② Mega dark hero */}
      <MegaHero post={heroPost} secondary={heroSecondary} />

      {/* ③ Category chips nav */}
      <CategoryChips cats={categories} />

      {/* ④ Editorial grid + Trending sidebar */}
      <EditorialGrid posts={editorialPosts} trendingPosts={trendingPosts} />

      {/* ⑤ AI powered banner */}
      <AIBanner />

      {/* ⑥ Category bento showcase */}
      <CategoryShowcase cats={categories} />

      {/* ⑦ Numbered trending + Partners */}
      <TrendingWithPartners posts={trendingPosts} />

      {/* ⑧ Latest posts */}
      <section className="bg-white border-t border-gray-100 py-8" aria-label="Latest Articles">
        <Container>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-6 rounded-full bg-gradient-to-b from-teal-500 to-cyan-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.22em] text-gray-500">
              Latest Articles
            </span>
          </div>
          <LatestPostsGrid
            posts={allPosts}
            isLoading={false}
            title=""
            showViewAll
            viewAllLink="/blogs"
          />
        </Container>
      </section>
    </main>
  );
}