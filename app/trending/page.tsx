"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  Flame, ArrowRight, Sparkles, Zap, Package,
  Clock, ArrowUpRight, TrendingUp, ChevronRight,
  BarChart2, Eye, BookOpen, Star
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
    <div className="bg-slate-50 min-h-screen">
      <div className="bg-white border-b border-slate-100 py-24">
        <Container>
          <div className="text-center space-y-5">
            <Sk className="h-6 w-36 bg-slate-100 mx-auto rounded-full" />
            <Sk className="h-16 w-80 bg-slate-100 mx-auto" />
            <Sk className="h-5 w-96 bg-slate-100 mx-auto" />
          </div>
        </Container>
      </div>
      <div className="bg-white border-b border-slate-100 py-8">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => <Sk key={i} className="h-16 bg-slate-100" />)}
          </div>
        </Container>
      </div>
      <div className="bg-slate-50 py-12">
        <Container>
          <div className="space-y-16">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-6">
                <Sk className="h-8 w-64 bg-slate-100" />
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  <Sk className="md:col-span-5 h-[350px] bg-white border border-slate-100" />
                  <div className="md:col-span-7 space-y-4">
                    {[...Array(3)].map((_, j) => (
                      <Sk key={j} className="h-[100px] bg-white border border-slate-100" />
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
    <section className="bg-white relative overflow-hidden py-20 md:py-28 border-b border-slate-100" aria-label="Trending hero">
      {/* Soft blue glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-blue-100/60 rounded-full blur-[120px] pointer-events-none" />

      <Container>
        <div
          className={`relative z-10 text-center transition-all duration-1000 ease-out ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Pill */}
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-700">
              Updated Daily
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight text-slate-900 mb-6 font-serif">
            What&apos;s Trending
            <br />
            <span className="text-blue-600">Right Now</span>
          </h1>

          <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto font-medium leading-relaxed mb-10">
            Our editorial team and AI curation surface the highest-performing stories,
            guides, and deals across every category — so you never have to go looking.
          </p>

          {/* Stat pills */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-700 border border-blue-100 bg-blue-50 rounded-full px-4 py-2">
              <Flame className="w-3.5 h-3.5 text-blue-600" />
              Live Feed
            </span>
            <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-600 border border-slate-200 bg-slate-50 rounded-full px-4 py-2">
              <Zap className="w-3.5 h-3.5 text-blue-600" />
              Updated Continuously
            </span>
            <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-600 border border-slate-200 bg-slate-50 rounded-full px-4 py-2">
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              {totalCategories} Categories Covered
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
    { icon: BarChart2, label: "Stories Curated", value: `${totalPosts}+` },
    { icon: Eye, label: "Editorial Quality", value: "Verified" },
    { icon: TrendingUp, label: "Categories Live", value: "6+" },
    { icon: Star, label: "Reader Rated", value: "4.8/5" },
  ];

  return (
    <div className="bg-white border-b border-slate-100">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-100">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="px-5 py-6 flex items-center gap-4 group">
                <span className="w-12 h-12 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-all">
                  <Icon className="w-5 h-5 text-blue-600" />
                </span>
                <div>
                  <div className="text-xl md:text-2xl font-black text-slate-900 leading-none mb-1">{s.value}</div>
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
      <div className="bg-blue-600 rounded-2xl overflow-hidden relative shadow-lg shadow-blue-200">
        {/* Glows */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-[60px] pointer-events-none" />

        <div className="relative z-10 p-6 md:p-10">
          <div className="flex flex-col md:flex-row md:items-center gap-8">
            {/* Left text */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-4">
                <span className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-md shrink-0">
                  <Package className="w-6 h-6 text-blue-600" />
                </span>
                <div>
                  <h2 className="text-white font-black text-2xl tracking-tight font-serif">
                    Top Software Deals
                  </h2>
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-blue-100 mt-1">
                    <Sparkles className="w-3 h-3" />
                    Editor Curated
                  </div>
                </div>
              </div>
              <p className="text-blue-100 text-sm leading-relaxed max-w-lg font-medium">
                We track the best-converting software, SaaS deals, and affiliate offers
                before they hit the mainstream — hand-picked to save you time and money.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {["SaaS", "AI Tools", "Productivity", "Deals", "Tracking"].map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-bold uppercase tracking-widest text-white border border-white/30 bg-white/10 px-3 py-1.5 rounded-full"
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
                  className="bg-white/10 border border-white/20 rounded-lg p-3 flex flex-col items-center gap-3 hover:bg-white/20 transition-colors cursor-pointer group"
                >
                  <div className="w-full aspect-square rounded bg-white/10 flex items-center justify-center border border-white/10">
                    <Package className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                  </div>
                  <div className="w-full space-y-1.5">
                    <div className="h-1 bg-white/30 rounded" />
                    <div className="h-1 bg-white/20 rounded w-3/4 mx-auto" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Coming soon strip */}
          <div className="mt-8 pt-5 border-t border-white/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest text-blue-100 font-bold">
                Live deals integration coming soon
              </span>
            </div>
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-blue-700 bg-white px-3 py-1 rounded-full">
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
      <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-slate-900">
        <div className="flex items-center gap-4">
          <span className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 border border-blue-100 shrink-0">
            <TrendingUp className="w-5 h-5 text-blue-600" />
          </span>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                Trending Category
              </span>
              <span
                className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full ${
                  rank <= 3
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 border border-slate-200 text-slate-500"
                }`}
              >
                #{rank}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight font-serif">
              {category.name}
            </h2>
          </div>
        </div>

        <Link
          href={`/blogs?category=${category.slug}`}
          className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-blue-700 hover:text-white hover:bg-blue-600 border border-blue-200 px-4 py-2 rounded-full transition-all duration-300 group"
        >
          View Category
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Posts grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Main large post */}
        <Link
          href={`/${main.slug}`}
          className="md:col-span-5 group block relative rounded-2xl overflow-hidden border border-slate-100 hover:border-blue-200 hover:shadow-[0_10px_30px_rgba(37,99,235,0.12)] transition-all duration-500 bg-white"
        >
          <div className="relative h-64 md:h-[320px] overflow-hidden bg-slate-100">
            {mainImg ? (
              <img
                src={mainImg}
                alt={main.title.rendered}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-slate-300" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* #1 badge */}
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.2em] bg-blue-600 text-white px-3 py-1.5 rounded-full shadow-md">
                <Flame className="w-3 h-3" />
                Top Story
              </span>
            </div>

            {/* Category */}
            {mainCat && (
              <div className="absolute top-4 right-4">
                <span className="text-[9px] font-black uppercase tracking-widest bg-white/90 backdrop-blur-md text-blue-700 px-3 py-1.5 rounded-full shadow-sm">
                  {mainCat}
                </span>
              </div>
            )}

            <div className="absolute bottom-5 left-5 right-5 text-white z-10">
              <h3 className="text-lg md:text-xl font-black line-clamp-2 leading-tight group-hover:text-blue-200 transition-colors">
                {main.title.rendered}
              </h3>
              <p className="text-xs text-slate-300 font-medium line-clamp-2 mt-2 hidden sm:block">
                {stripHtml(main.excerpt.rendered)}
              </p>
            </div>
          </div>

          <div className="px-5 py-4 bg-white border-t border-slate-100 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
              <Clock className="w-3 h-3 text-slate-400" />
              {fmtDate(main.date)}
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all">
              Read Now <ArrowUpRight className="w-3.5 h-3.5" />
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
                className="group flex gap-4 items-center bg-white rounded-2xl border border-slate-100 p-4 hover:border-blue-200 hover:shadow-[0_5px_20px_rgba(37,99,235,0.08)] transition-all duration-300"
              >
                {/* Rank number */}
                <span className="shrink-0 text-3xl md:text-4xl font-black leading-none w-10 text-center tabular-nums select-none text-slate-200 group-hover:text-blue-200 transition-colors font-serif">
                  {idx + 2}
                </span>

                {/* Thumbnail */}
                <div className="relative shrink-0 w-[90px] h-[90px] rounded-xl overflow-hidden bg-slate-100">
                  {img ? (
                    <img
                      src={img}
                      alt={post.title.rendered}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-slate-300" />
                    </div>
                  )}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0 py-1">
                  {cat && (
                    <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 block mb-1.5">
                      {cat}
                    </span>
                  )}
                  <h3 className="text-sm md:text-base font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                    {post.title.rendered}
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-2 flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-slate-300 group-hover:bg-blue-500 transition-colors" />
                    {fmtDate(post.date)}
                  </span>
                </div>

                <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 shrink-0 transition-colors hidden sm:block mr-2" />
              </Link>
            );
          })}

          {/* See all link — mobile */}
          <Link
            href={`/blogs?category=${category.slug}`}
            className="sm:hidden flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-700 border border-blue-100 bg-blue-50 rounded-full py-3.5 hover:bg-blue-100 transition-colors mt-2"
          >
            View Full Category
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
      className={`bg-white border-t border-slate-100 relative overflow-hidden py-20 md:py-28 transition-all duration-1000 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-50 rounded-full blur-[100px] pointer-events-none" />

      <Container>
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Never Miss a Story
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-5 font-serif">
            Explore Every
            <br />
            <span className="text-blue-600">Category.</span>
          </h2>
          <p className="text-slate-500 text-sm md:text-base font-medium leading-relaxed mb-10">
            From fashion to tech, travel to finance — browse our full archive of
            editorial picks and in-depth guides.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/blogs"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 text-white font-black uppercase tracking-widest text-[11px] px-8 py-4 rounded-full shadow-md shadow-blue-200 hover:bg-blue-700 transition-all duration-300 group"
            >
              Browse All Articles
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
            <Link
              href="/categories"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-slate-700 border-2 border-slate-200 hover:border-blue-400 hover:text-blue-600 bg-white font-bold uppercase tracking-widest text-[11px] px-8 py-4 rounded-full transition-all duration-300"
            >
              View Categories
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
    <main className="bg-slate-50">
      {/* SEO JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Trending — Fab Feeds",
            url: "https://fabfeeds.com/trending",
            description:
              "The most popular stories and editorial picks, curated by Fab Feeds across every category.",
          }),
        }}
      />

      {/* ① Hero */}
      <TrendingHero totalCategories={data.length} />

      {/* ② Stats bar */}
      <StatsBar totalPosts={totalPosts} />

      {/* ③ Main content */}
      <div className="py-12 md:py-20">
        <Container>
          <div className="space-y-16 md:space-y-24">
            {/* Deals banner */}
            <AIProductsBanner />

            {/* Divider with label */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-blue-700 bg-white px-4 border border-blue-100 py-1.5 rounded-full">
                <TrendingUp className="w-3.5 h-3.5" />
                Trending by Category
              </span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            {/* Category sections */}
            <div className="space-y-16 md:space-y-24">
              {data.map((d, idx) => (
                <CategorySection key={d.category.id} data={d} rank={idx + 1} />
              ))}
            </div>

            {/* No data fallback */}
            {data.length === 0 && (
              <div className="text-center py-24 bg-white border border-slate-100 rounded-2xl">
                <div className="w-16 h-16 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto mb-5">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2 font-serif">
                  No Trending Stories Yet
                </h3>
                <p className="text-sm font-medium text-slate-500 mb-8">
                  Check back shortly — we&apos;re curating fresh picks.
                </p>
                <Link
                  href="/blogs"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white font-black uppercase tracking-widest text-[11px] px-8 py-3.5 rounded-full shadow-md shadow-blue-200 hover:bg-blue-700 transition-all"
                >
                  Browse Articles
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
