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
import { BannerRow } from "@/components/BannerRow";
import { getLanguageId, DEFAULT_LANGUAGE_SLUG } from "@/lib/language";

const WP_API_URL = "https://chocolate-zebra-912190.hostingersite.com/wp-json/wp/v2";

interface Category {
  id: number;
  name: string;
  slug: string;
  count: number;
}
interface CategoryWithPosts {
  category: Category;
  posts: any[];
}

const stripHtml = (h: string) =>
  h.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();

/* WP category/term names come HTML-entity-encoded (e.g. "Health &amp; Lifestyle") */
const decodeEntities = (s: string) =>
  s.replace(/&amp;/g, "&").replace(/&#0?39;/g, "'").replace(/&quot;/g, '"');

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

/* ── CATEGORY TAG COLORS — each vertical gets its own eyebrow color,
   like a real editorial magazine, while blue stays the brand/CTA color ── */
const CATEGORY_COLORS: Record<string, string> = {
  fashion: "text-rose-600",
  beauty: "text-pink-600",
  accessories: "text-pink-600",
  travel: "text-emerald-600",
  automobile: "text-slate-600",
  technology: "text-blue-600",
  gadget: "text-blue-600",
  electronics: "text-blue-600",
  edtech: "text-fuchsia-600",
  business: "text-amber-600",
  ecommerce: "text-orange-600",
  freelance: "text-cyan-600",
  hosting: "text-indigo-600",
  "health-lifestyle": "text-violet-600",
  lifestyle: "text-sky-600",
  "home-decor": "text-teal-600",
  gaming: "text-purple-600",
  sports: "text-green-600",
  entertainment: "text-red-600",
};
const catColor = (name?: string, slug?: string) =>
  CATEGORY_COLORS[(slug || name || "").toLowerCase()] || "text-blue-600";

function getCat(post: any): { name?: string; slug?: string } {
  const t = post._embedded?.["wp:term"]?.[0]?.[0];
  return { name: t?.name && decodeEntities(t.name), slug: t?.slug };
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

/* ── EYEBROW TAG (plain text, colored by category — not a pill) ── */
function Eyebrow({ post, className = "" }: { post: any; className?: string }) {
  const { name, slug } = getCat(post);
  if (!name) return null;
  return (
    <span className={`text-[10px] font-black uppercase tracking-widest ${catColor(name, slug)} ${className}`}>
      {name}
    </span>
  );
}

/* ── LEAD STORY (big, top-left) ── */
function LeadStory({ post }: { post: any }) {
  const img = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  return (
    <Link href={`/${post.slug}`} className="group relative block overflow-hidden bg-slate-900 h-full min-h-[380px] md:min-h-[480px]">
      {img && (
        <img
          src={img}
          alt={post.title.rendered}
          className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700 ease-out"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-9">
        <Eyebrow post={post} className="!text-blue-300" />
        <h2 className="mt-2 text-2xl md:text-4xl font-black text-white leading-[1.1] line-clamp-3">
          {post.title.rendered}
        </h2>
        <p className="mt-3 text-slate-300 text-sm line-clamp-2 leading-relaxed hidden md:block">
          {stripHtml(post.excerpt.rendered)}
        </p>
        <div className="mt-4 flex items-center gap-4 text-xs text-slate-400 font-semibold">
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

/* ── MEDIUM STORY (stacked beside lead) ── */
function MediumStory({ post }: { post: any }) {
  const img = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  return (
    <Link href={`/${post.slug}`} className="group flex gap-4 items-start py-4 border-b border-slate-200 last:border-0">
      <div className="flex-1 min-w-0">
        <Eyebrow post={post} className="block mb-1.5" />
        <h3 className="text-sm md:text-[15px] font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug line-clamp-2">
          {post.title.rendered}
        </h3>
        <span className="text-[11px] text-slate-400 font-medium mt-1.5 block">{fmtDate(post.date)}</span>
      </div>
      {img && (
        <div className="w-24 h-20 shrink-0 rounded-lg overflow-hidden bg-slate-100 relative">
          <img src={img} alt={post.title.rendered} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        </div>
      )}
    </Link>
  );
}

/* ── TRENDING RAIL ITEM (numbered, horizontal strip) ── */
function TrendingItem({ post, index }: { post: any; index: number }) {
  const img = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  return (
    <Link href={`/${post.slug}`} className="group flex gap-3 items-center shrink-0 w-[260px] md:w-auto">
      <span className="text-2xl font-black text-slate-200 group-hover:text-blue-200 transition-colors leading-none font-serif shrink-0 w-8 text-center tabular-nums">
        {index + 1}
      </span>
      <div className="w-14 h-14 shrink-0 rounded-lg overflow-hidden bg-slate-100 relative">
        {img && <img src={img} alt={post.title.rendered} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />}
      </div>
      <div className="min-w-0">
        <Eyebrow post={post} className="block mb-1" />
        <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug line-clamp-2">
          {post.title.rendered}
        </h4>
      </div>
    </Link>
  );
}

/* ── STANDARD CARD ── */
function PostCard({ post }: { post: any }) {
  const img = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  return (
    <Link
      href={`/${post.slug}`}
      className="group flex flex-col bg-white overflow-hidden border border-slate-100 hover:border-blue-100 hover:shadow-[0_12px_40px_rgba(37,99,235,0.08)] transition-all duration-300"
    >
      <div className="relative h-44 overflow-hidden bg-slate-100">
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
      </div>
      <div className="p-4 flex flex-col flex-1">
        <Eyebrow post={post} className="mb-1.5" />
        <h3 className="text-[15px] font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug line-clamp-2 mb-3 flex-1">
          {post.title.rendered}
        </h3>
        <span className="text-[11px] text-slate-400 font-semibold">{fmtDate(post.date)}</span>
      </div>
    </Link>
  );
}

/* ── HORIZONTAL FEATURE CARD ── */
function FeatureCard({ post }: { post: any }) {
  const img = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  return (
    <Link
      href={`/${post.slug}`}
      className="group flex gap-4 items-start bg-white p-3 border border-slate-100 hover:border-blue-100 hover:shadow-lg hover:shadow-slate-100 transition-all"
    >
      <div className="relative w-24 h-20 shrink-0 overflow-hidden bg-slate-100">
        {img ? (
          <img src={img} alt={post.title.rendered} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-slate-300" />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <Eyebrow post={post} className="mb-1 block" />
        <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug line-clamp-2">
          {post.title.rendered}
        </h4>
      </div>
    </Link>
  );
}

/* ── DARK OVERLAY CARD (for "Editor's Choice" section) ── */
function DarkCard({ post }: { post: any }) {
  const img = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  return (
    <Link href={`/${post.slug}`} className="group relative overflow-hidden h-60 bg-slate-800 flex flex-col justify-end">
      {img && (
        <img src={img} alt={post.title.rendered} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
      <div className="relative z-10 p-5">
        <Eyebrow post={post} className="!text-blue-300 mb-1.5 block" />
        <h3 className="text-sm font-bold text-white group-hover:text-blue-200 transition-colors leading-snug line-clamp-3">
          {post.title.rendered}
        </h3>
        <span className="text-[10px] text-slate-400 mt-2 block">{fmtDate(post.date)}</span>
      </div>
    </Link>
  );
}

/* ── CATEGORY RAIL SECTION ── */
function CategoryRail({ data }: { data: CategoryWithPosts }) {
  const { category, posts } = data;
  if (!posts.length) return null;
  return (
    <section className="py-12 md:py-16 border-t border-slate-200">
      <Container>
        <div className="flex items-end justify-between mb-8 pb-4 border-b-2 border-slate-900">
          <div>
            <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${catColor(category.name, category.slug)}`}>
              Category Spotlight
            </p>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight font-serif">{decodeEntities(category.name)}</h2>
          </div>
          <Link
            href={`/blogs?category=${category.slug}`}
            className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors uppercase tracking-widest shrink-0"
          >
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-100">
          {posts.map((p) => <PostCard key={p.id} post={p} />)}
        </div>
      </Container>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════════ */
export default function FabFeedsHomePage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [rails, setRails] = useState<CategoryWithPosts[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        /* Default the entire home page to English — if the language plugin
           isn't installed yet, langParam is just empty and nothing changes. */
        const englishId = await getLanguageId(DEFAULT_LANGUAGE_SLUG);
        const langParam = englishId ? `&blog_language=${englishId}` : "";

        const res = await fetch(`${WP_API_URL}/posts?_embed&per_page=30&orderby=date${langParam}`, { signal: controller.signal });
        if (res.ok) setPosts(await res.json());

        /* Top 3 live categories, by post count, drive the category rails */
        const catsRes = await fetch(`${WP_API_URL}/categories?per_page=10&orderby=count&order=desc`, { signal: controller.signal });
        const allCats: Category[] = catsRes.ok ? await catsRes.json() : [];
        const topCats = allCats.filter((c) => c.count > 0 && c.slug !== "uncategorized").slice(0, 3);

        const railResults = await Promise.all(
          topCats.map((cat) =>
            fetch(`${WP_API_URL}/posts?_embed&per_page=4&categories=${cat.id}&orderby=date&order=desc${langParam}`, { signal: controller.signal })
              .then((r) => (r.ok ? r.json() : []))
              .then((p) => ({ category: cat, posts: p }))
          )
        );
        setRails(railResults.filter((r) => r.posts.length > 0));
      } catch (err: any) {
        if (err.name !== "AbortError") console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
    return () => controller.abort();
  }, []);

  /* ── LOADING STATE ── */
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="bg-slate-900 h-10" />
        <Container className="py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <div className="overflow-hidden animate-pulse bg-slate-200 h-[480px]" />
            </div>
            <div className="lg:col-span-4 space-y-4">
              {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        </Container>
      </div>
    );
  }

  /* ── DATA SLICING ── */
  const lead = posts[0];
  const mediumStories = posts.slice(1, 4);
  const trendingRail = posts.slice(4, 10);
  const mustRead = posts.slice(10, 14);
  const latestMain = posts.slice(14, 18);
  const sidebarFeed = posts.slice(18, 24);

  return (
    <main className="bg-slate-50 text-slate-800 min-h-screen">

      {/* ══ 1. NEWS TICKER ══ */}
      <div className="bg-slate-900 border-b border-slate-800 py-2.5 overflow-hidden">
        <div className="flex items-center max-w-[1280px] mx-auto px-4">
          <span className="shrink-0 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded flex items-center gap-1.5 mr-4 whitespace-nowrap">
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

      {/* ══ 2. LEAD STORY GRID — multiple stories above the fold ══ */}
      <section className="bg-white border-b border-slate-200 py-8 md:py-10">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-10">
            {/* Lead story */}
            <div className="lg:col-span-7">
              {lead && <LeadStory post={lead} />}
            </div>

            {/* Stacked medium stories */}
            <div className="lg:col-span-5 flex flex-col justify-between mt-2 lg:mt-0">
              <div className="flex items-center gap-2 pb-3 mb-1 border-b-2 border-slate-900">
                <Flame className="w-4 h-4 text-blue-600" />
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900">More Top Stories</h3>
              </div>
              {mediumStories.map((p) => <MediumStory key={p.id} post={p} />)}
            </div>
          </div>

          {/* Trending rail — horizontal strip, numbered (people.com "most popular" style) */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="flex items-center gap-2 mb-5">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900">Trending Now</h3>
            </div>
            <div className="flex lg:grid lg:grid-cols-6 gap-6 overflow-x-auto pb-2 -mx-1 px-1 lg:overflow-visible">
              {trendingRail.map((p, i) => <TrendingItem key={p.id} post={p} index={i} />)}
            </div>
          </div>
        </Container>
      </section>

      {/* ══ 3. HOME BANNERS — configured live from WordPress ══ */}
      <section className="bg-white border-b border-slate-100 py-8">
        <Container>
          <BannerRow group="home" />
        </Container>
      </section>

      {/* ══ 4. CATEGORY RAILS — real live categories, real posts ══ */}
      {rails.map((rail) => <CategoryRail key={rail.category.id} data={rail} />)}

      {/* ══ 4. FULL-WIDTH DARK SECTION — EDITOR'S CHOICE ══ */}
      <section className="bg-slate-900 py-14 md:py-20 border-t border-slate-800">
        <Container>
          <div className="flex items-center gap-3 mb-10">
            <Star className="w-6 h-6 text-blue-400" />
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-0.5">Can&apos;t Miss</p>
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight font-serif">Editor&apos;s Choice</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-800">
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
              <div className="flex items-center gap-3 mb-8 pb-4 border-b-2 border-slate-900">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-0.5">Fresh Off The Press</p>
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight font-serif">Latest Articles</h2>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-slate-100">
                {latestMain.map((p) => <PostCard key={p.id} post={p} />)}
              </div>

              <div className="mt-10 text-center">
                <Link
                  href="/blogs"
                  className="inline-flex items-center gap-2 bg-white border-2 border-slate-200 hover:border-blue-400 hover:text-blue-600 text-slate-700 font-bold uppercase tracking-widest text-xs px-8 py-3.5 rounded-full transition-all duration-300 shadow-sm"
                >
                  Load More Stories <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-8">

              {/* Newsletter */}
              <div className="bg-blue-600 rounded-2xl p-7 text-white text-center">
                <Star className="w-8 h-8 text-blue-200 mx-auto mb-4" />
                <h3 className="text-lg font-black mb-2 font-serif">Join the Inner Circle</h3>
                <p className="text-blue-200 text-sm mb-5 leading-relaxed">Get the best stories and exclusive reads delivered weekly.</p>
                <input type="email" placeholder="Your email address" className="w-full px-4 py-2.5 rounded-lg text-slate-900 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-white/50" />
                <button className="w-full bg-white text-blue-600 hover:bg-blue-50 font-black uppercase tracking-widest text-xs py-3 rounded-lg transition-colors">
                  Subscribe Free
                </button>
                <p className="text-blue-300 text-[10px] mt-3 font-medium">No spam. Unsubscribe anytime.</p>
              </div>

              {/* Quick reads */}
              <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-5 pb-4 border-b border-slate-100">
                  <BookOpen className="w-4 h-4 text-blue-500" />
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-900">More to Read</h3>
                </div>
                <div className="space-y-2">
                  {sidebarFeed.slice(0, 5).map((p) => <FeatureCard key={p.id} post={p} />)}
                </div>
                <Link
                  href="/blogs"
                  className="mt-5 flex items-center justify-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-800 uppercase tracking-widest pt-4 border-t border-slate-100 transition-colors"
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
