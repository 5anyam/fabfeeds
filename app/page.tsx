"use client";

import Link from "next/link";
import {
  ArrowRight,
  TrendingUp,
  Flame,
  Clock,
  ChevronRight,
  Zap,
  BookOpen,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";

const WP_API_URL = "https://chocolate-zebra-912190.hostingersite.com/wp-json/wp/v2";

const stripHtml = (h: string) =>
  h.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();

const fmtDate = (d: string) =>
  new Date(d).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

function readingTime(content: string) {
  const words = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

/* ── SKELETON ── */
function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-white rounded-2xl overflow-hidden border border-slate-100 animate-pulse ${className}`}>
      <div className="bg-slate-100 h-52" />
      <div className="p-5 space-y-3">
        <div className="h-3 bg-slate-100 rounded w-1/4" />
        <div className="h-5 bg-slate-100 rounded w-full" />
        <div className="h-5 bg-slate-100 rounded w-3/4" />
        <div className="h-3 bg-slate-100 rounded w-1/3" />
      </div>
    </div>
  );
}

/* ── CATEGORY PILL ── */
function CategoryPill({ name }: { name?: string }) {
  if (!name) return null;
  return (
    <span className="inline-block bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
      {name}
    </span>
  );
}

/* ── HERO CARD (big) ── */
function HeroCard({ post }: { post: any }) {
  const img = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const cat = post._embedded?.["wp:term"]?.[0]?.[0]?.name;

  return (
    <Link href={`/${post.slug}`} className="group relative block rounded-2xl overflow-hidden bg-slate-900 h-full min-h-[420px] md:min-h-[520px]">
      {img && (
        <img
          src={img}
          alt={post.title.rendered}
          className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700 ease-out"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-7 md:p-10">
        <CategoryPill name={cat} />
        <h2 className="mt-3 text-2xl md:text-4xl font-black text-white leading-tight group-hover:text-indigo-200 transition-colors line-clamp-3">
          {post.title.rendered}
        </h2>
        <p className="mt-3 text-slate-300 text-sm line-clamp-2 leading-relaxed hidden md:block">
          {stripHtml(post.excerpt.rendered)}
        </p>
        <div className="mt-5 flex items-center gap-4 text-xs text-slate-400 font-semibold">
          <span>{fmtDate(post.date)}</span>
          <span className="w-1 h-1 rounded-full bg-slate-500" />
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" /> {readingTime(post.content?.rendered || "")} min read
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ── SIDE STORY CARD ── */
function SideCard({ post, index }: { post: any; index: number }) {
  const img = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const cat = post._embedded?.["wp:term"]?.[0]?.[0]?.name;

  return (
    <Link href={`/${post.slug}`} className="group flex gap-4 items-start py-4 border-b border-slate-100 last:border-0">
      <span className="text-3xl font-black text-slate-200 group-hover:text-indigo-200 transition-colors leading-none mt-1 font-serif min-w-[2rem] text-center">
        0{index + 1}
      </span>
      <div className="flex-1 min-w-0">
        {cat && (
          <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 block mb-1">{cat}</span>
        )}
        <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug line-clamp-2">
          {post.title.rendered}
        </h4>
        <span className="text-[11px] text-slate-400 font-medium mt-1 block">{fmtDate(post.date)}</span>
      </div>
      {img && (
        <div className="w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-slate-100 relative">
          <img src={img} alt={post.title.rendered} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        </div>
      )}
    </Link>
  );
}

/* ── STANDARD CARD ── */
function PostCard({ post }: { post: any }) {
  const img = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const cat = post._embedded?.["wp:term"]?.[0]?.[0]?.name;

  return (
    <Link
      href={`/${post.slug}`}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-indigo-100 hover:shadow-[0_12px_40px_rgba(79,70,229,0.08)] transition-all duration-300"
    >
      <div className="relative h-52 overflow-hidden bg-slate-100">
        {img ? (
          <img
            src={img}
            alt={post.title.rendered}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-slate-300" />
          </div>
        )}
        {cat && (
          <div className="absolute top-3 left-3">
            <span className="bg-white/90 backdrop-blur-sm text-indigo-700 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm">
              {cat}
            </span>
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug line-clamp-2 mb-2">
          {post.title.rendered}
        </h3>
        <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed mb-4 flex-1">
          {stripHtml(post.excerpt.rendered)}
        </p>
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-50">
          <span className="text-[11px] text-slate-400 font-semibold">{fmtDate(post.date)}</span>
          <span className="flex items-center gap-1 text-[11px] font-bold text-indigo-600">
            Read <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ── HORIZONTAL FEATURE CARD ── */
function FeatureCard({ post }: { post: any }) {
  const img = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const cat = post._embedded?.["wp:term"]?.[0]?.[0]?.name;

  return (
    <Link
      href={`/${post.slug}`}
      className="group flex gap-5 items-start bg-white rounded-2xl p-4 border border-slate-100 hover:border-indigo-100 hover:shadow-lg hover:shadow-slate-100 transition-all"
    >
      <div className="relative w-28 h-20 shrink-0 rounded-xl overflow-hidden bg-slate-100">
        {img ? (
          <img src={img} alt={post.title.rendered} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-slate-300" />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        {cat && <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 mb-1 block">{cat}</span>}
        <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug line-clamp-2 mb-2">
          {post.title.rendered}
        </h4>
        <span className="text-[11px] text-slate-400 font-medium">{fmtDate(post.date)}</span>
      </div>
    </Link>
  );
}

/* ── DARK OVERLAY CARD (for "Must Read" section) ── */
function DarkCard({ post }: { post: any }) {
  const img = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const cat = post._embedded?.["wp:term"]?.[0]?.[0]?.name;

  return (
    <Link href={`/${post.slug}`} className="group relative rounded-2xl overflow-hidden h-60 bg-slate-800 flex flex-col justify-end">
      {img && (
        <img src={img} alt={post.title.rendered} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
      <div className="relative z-10 p-5">
        {cat && <span className="text-emerald-400 text-[9px] font-bold uppercase tracking-widest mb-1.5 block">{cat}</span>}
        <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug line-clamp-3">
          {post.title.rendered}
        </h3>
        <span className="text-[10px] text-slate-400 mt-2 block">{fmtDate(post.date)}</span>
      </div>
    </Link>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════════ */
export default function FabFeedsHomePage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${WP_API_URL}/posts?_embed&per_page=24&orderby=date`);
        if (res.ok) setPosts(await res.json());
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  /* ── LOADING STATE ── */
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        {/* Top bar skeleton */}
        <div className="bg-slate-900 h-10" />
        <Container className="py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <div className="rounded-2xl overflow-hidden animate-pulse bg-slate-200 h-[520px]" />
            </div>
            <div className="lg:col-span-4 space-y-4">
              {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        </Container>
      </div>
    );
  }

  /* ── DATA SLICING ── */
  const hero = posts[0];
  const trendingSide = posts.slice(1, 5);
  const editorPicks = posts.slice(5, 9);
  const mustRead = posts.slice(9, 13);
  const latestMain = posts.slice(13, 17);
  const sidebarFeed = posts.slice(17, 24);

  return (
    <main className="bg-slate-50 text-slate-800 min-h-screen">

      {/* ══ 1. NEWS TICKER ══ */}
      <div className="bg-slate-900 border-b border-slate-800 py-2.5 overflow-hidden">
        <div className="flex items-center max-w-[1280px] mx-auto px-4">
          <span className="shrink-0 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded flex items-center gap-1.5 mr-4 whitespace-nowrap">
            <Zap className="w-3 h-3 fill-current" /> Live Feed
          </span>
          <div className="overflow-hidden flex-1 relative">
            <div
              className="flex gap-12 whitespace-nowrap"
              style={{ animation: "ticker 40s linear infinite" }}
            >
              {[...posts, ...posts].map((p, i) => (
                <Link
                  key={i}
                  href={`/${p.slug}`}
                  className="text-xs text-slate-400 hover:text-white font-medium transition-colors flex items-center gap-2 shrink-0"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                  {p.title.rendered}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══ 2. HERO + TRENDING ══ */}
      <section className="bg-white border-b border-slate-100 py-10 md:py-14">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Hero story */}
            <div className="lg:col-span-8">
              {hero && <HeroCard post={hero} />}
            </div>

            {/* Trending sidebar */}
            <aside className="lg:col-span-4">
              <div className="flex items-center gap-2 pb-4 mb-2 border-b-2 border-slate-900">
                <TrendingUp className="w-4 h-4" />
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900">Trending Now</h3>
              </div>
              {trendingSide.map((p, i) => <SideCard key={p.id} post={p} index={i} />)}
              <Link
                href="/blogs"
                className="mt-6 flex items-center justify-center gap-2 bg-indigo-600 text-white text-xs font-black uppercase tracking-widest py-3.5 rounded-xl hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200"
              >
                Browse All Articles <ArrowRight className="w-4 h-4" />
              </Link>
            </aside>
          </div>
        </Container>
      </section>

      {/* ══ 3. SECTION DIVIDER — EDITOR'S PICKS ══ */}
      <section className="py-14 md:py-20">
        <Container>
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-indigo-600 rounded-full" />
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-0.5">Curated for You</p>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight font-serif">Editor&apos;s Picks</h2>
              </div>
            </div>
            <Link href="/blogs" className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors uppercase tracking-widest">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {editorPicks.map((p) => <PostCard key={p.id} post={p} />)}
          </div>
        </Container>
      </section>

      {/* ══ 4. FULL-WIDTH DARK SECTION — MUST READ ══ */}
      <section className="bg-slate-900 py-14 md:py-20">
        <Container>
          <div className="flex items-center gap-3 mb-10">
            <Flame className="w-6 h-6 text-emerald-400" />
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-0.5">Can&apos;t Miss</p>
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight font-serif">Must Read Stories</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {mustRead.map((p) => <DarkCard key={p.id} post={p} />)}
          </div>
        </Container>
      </section>

      {/* ══ 5. LATEST + SIDEBAR ══ */}
      <section className="py-14 md:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* Main feed */}
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-8 bg-emerald-500 rounded-full" />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-0.5">Fresh Off The Press</p>
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight font-serif">Latest Articles</h2>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {latestMain.map((p) => <PostCard key={p.id} post={p} />)}
              </div>

              <div className="mt-10 text-center">
                <Link
                  href="/blogs"
                  className="inline-flex items-center gap-2 bg-white border-2 border-slate-200 hover:border-indigo-400 hover:text-indigo-600 text-slate-700 font-bold uppercase tracking-widest text-xs px-8 py-3.5 rounded-xl transition-all duration-300 shadow-sm"
                >
                  Load More Stories <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-8">

              {/* Newsletter */}
              <div className="bg-indigo-600 rounded-2xl p-7 text-white text-center">
                <Star className="w-8 h-8 text-indigo-200 mx-auto mb-4" />
                <h3 className="text-lg font-black mb-2 font-serif">Join the Inner Circle</h3>
                <p className="text-indigo-200 text-sm mb-5 leading-relaxed">Get the best stories and exclusive reads delivered weekly.</p>
                <input type="email" placeholder="Your email address" className="w-full px-4 py-2.5 rounded-lg text-slate-900 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-white/50" />
                <button className="w-full bg-white text-indigo-600 hover:bg-indigo-50 font-black uppercase tracking-widest text-xs py-3 rounded-lg transition-colors">
                  Subscribe Free
                </button>
                <p className="text-indigo-300 text-[10px] mt-3 font-medium">No spam. Unsubscribe anytime.</p>
              </div>

              {/* Quick reads */}
              <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-5 pb-4 border-b border-slate-100">
                  <BookOpen className="w-4 h-4 text-indigo-500" />
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-900">More to Read</h3>
                </div>
                <div className="space-y-2">
                  {sidebarFeed.slice(0, 5).map((p) => <FeatureCard key={p.id} post={p} />)}
                </div>
                <Link
                  href="/blogs"
                  className="mt-5 flex items-center justify-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-800 uppercase tracking-widest pt-4 border-t border-slate-100 transition-colors"
                >
                  See All Articles <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </aside>
          </div>
        </Container>
      </section>

    </main>
  );
}
