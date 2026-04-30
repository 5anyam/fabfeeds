"use client";

import {
  Search, X, Loader2, ArrowRight,
  Flame, Sparkles, Filter, Bookmark,
  ChevronRight, Tag, BookOpen, ChevronDown
} from "lucide-react";
import { Container } from "@/components/ui/container";
import Link from "next/link";
import { useState, useEffect, Suspense, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

/* ══ Config ═══════════════════════════════════════════════════════════════ */
const WP_API_URL = "https://lemonchiffon-porpoise-679406.hostingersite.com/wp-json/wp/v2";

const fmtDate = (d: string) =>
  new Date(d).toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
  });

const stripHtml = (h: string) =>
  h.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();

/* ══ Types ════════════════════════════════════════════════════════════════ */
interface WordPressPost {
  id: number;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  slug: string;
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

/* ══ HORIZONTAL BLOG CARD (Best for Affiliate/Reviews) ════════════════════ */
function HorizontalBlogCard({ post }: { post: WordPressPost }) {
  const imageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const categoryName = post._embedded?.["wp:term"]?.[0]?.[0]?.name || "Article";

  return (
    <Link 
      href={`/${post.slug}`} 
      className="group flex flex-col sm:flex-row bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg hover:shadow-slate-200/50 hover:border-indigo-200 transition-all duration-300"
    >
      {/* Fixed aspect ratio container for images so they never break */}
      <div className="relative w-full sm:w-64 h-52 sm:h-auto shrink-0 bg-slate-100 overflow-hidden">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={post.title.rendered} 
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-slate-300">
            <Bookmark className="w-8 h-8" />
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-indigo-700 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded shadow-sm">
            {categoryName}
          </span>
        </div>
      </div>
      
      <div className="p-5 sm:p-6 flex flex-col justify-center flex-1">
        <span className="text-slate-500 text-xs font-semibold mb-2 block">
          {fmtDate(post.date)}
        </span>
        <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug group-hover:text-indigo-600 transition-colors font-serif line-clamp-2">
          {post.title.rendered}
        </h3>
        <p className="text-slate-600 text-sm line-clamp-2 mb-4 leading-relaxed">
          {stripHtml(post.excerpt.rendered)}
        </p>
        <div className="mt-auto flex items-center text-sm font-bold text-indigo-600">
          Read Full Guide <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}

function HorizontalSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row bg-white rounded-xl border border-slate-200 overflow-hidden">
      <div className="w-full sm:w-64 h-52 sm:h-auto bg-slate-100 animate-pulse shrink-0" />
      <div className="p-5 sm:p-6 flex-1 space-y-4">
        <div className="w-20 h-3 bg-slate-100 rounded animate-pulse" />
        <div className="w-full h-6 bg-slate-100 rounded animate-pulse" />
        <div className="w-3/4 h-6 bg-slate-100 rounded animate-pulse" />
        <div className="w-full h-16 bg-slate-100 rounded animate-pulse" />
      </div>
    </div>
  );
}

/* ══ MAIN LAYOUT COMPONENT ════════════════════════════════════════════════ */
function BlogContent() {
  const [posts, setPosts] = useState<WordPressPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all");

  useEffect(() => {
    setSearchQuery(searchParams.get("search") || "");
    setSelectedCategory(searchParams.get("category") || "all");
  }, [searchParams]);

  const handleSearchChange = useCallback(
    (q: string) => {
      setSearchQuery(q);
      const params = new URLSearchParams(searchParams.toString());
      q ? params.set("search", q) : params.delete("search");
      router.replace(`/blogs?${params.toString()}`, { scroll: false });
    },
    [searchParams, router]
  );

  const handleCategoryChange = useCallback(
    (slug: string) => {
      setSelectedCategory(slug);
      const params = new URLSearchParams(searchParams.toString());
      slug !== "all" ? params.set("category", slug) : params.delete("category");
      router.replace(`/blogs?${params.toString()}`, { scroll: false });
    },
    [searchParams, router]
  );

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      setIsLoading(true);
      setPage(1);
      setPosts([]);

      try {
        let cats = categories;
        if (!cats.length) {
          const catRes = await fetch(
            `${WP_API_URL}/categories?per_page=20&orderby=count&order=desc`,
            { signal: controller.signal }
          );
          if (catRes.ok) {
            const all: Category[] = await catRes.json();
            cats = all.filter((c) => c.count > 0 && c.slug !== "uncategorized");
            setCategories(cats);
          }
        }

        let url = `${WP_API_URL}/posts?_embed&per_page=10&page=1`;
        if (searchQuery) url += `&search=${encodeURIComponent(searchQuery)}`;
        if (selectedCategory !== "all") {
          const catId = cats.find((c) => c.slug === selectedCategory)?.id;
          if (catId) url += `&categories=${catId}`;
        }

        const res = await fetch(url, { signal: controller.signal });
        if (res.ok) {
          const data = await res.json();
          const total = parseInt(res.headers.get("X-WP-Total") || "0");
          const totalPages = parseInt(res.headers.get("X-WP-TotalPages") || "1");
          setPosts(data);
          setTotalCount(total);
          setHasMore(1 < totalPages);
        } else {
          setPosts([]);
          setTotalCount(0);
          setHasMore(false);
        }
      } catch (err: any) {
        if (err.name !== "AbortError") console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    }

    const timer = setTimeout(fetchData, 300);
    return () => { clearTimeout(timer); controller.abort(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, selectedCategory]);

  const handleLoadMore = async () => {
    if (isLoadMoreLoading || !hasMore) return;
    setIsLoadMoreLoading(true);
    const next = page + 1;

    let url = `${WP_API_URL}/posts?_embed&per_page=10&page=${next}`;
    if (searchQuery) url += `&search=${encodeURIComponent(searchQuery)}`;
    if (selectedCategory !== "all") {
      const catId = categories.find((c) => c.slug === selectedCategory)?.id;
      if (catId) url += `&categories=${catId}`;
    }

    try {
      const res = await fetch(url);
      if (res.ok) {
        const newPosts = await res.json();
        const totalPages = parseInt(res.headers.get("X-WP-TotalPages") || "1");
        setPosts((prev) => [...prev, ...newPosts]);
        setPage(next);
        setHasMore(next < totalPages);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Load more error:", err);
    } finally {
      setIsLoadMoreLoading(false);
    }
  };

  const categoryName = selectedCategory === "all" ? "All Categories" 
    : categories.find((c) => c.slug === selectedCategory)?.name || "";

  return (
    <div className="bg-slate-50 min-h-screen pt-16">
      
      {/* ── COMPACT HEADER & BREADCRUMBS ── */}
      <div className="bg-white border-b border-slate-200 py-8">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              {/* SEO Breadcrumbs */}
              <div className="flex items-center gap-2 mb-3 text-xs font-semibold">
                <Link href="/" className="text-slate-500 hover:text-indigo-600 transition-colors">Home</Link>
                <ChevronRight className="w-3 h-3 text-slate-400" />
                <span className="text-slate-500">Articles</span>
                {selectedCategory !== "all" && (
                  <>
                    <ChevronRight className="w-3 h-3 text-slate-400" />
                    <span className="text-indigo-600 font-bold">{categoryName}</span>
                  </>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 font-serif tracking-tight">
                {selectedCategory === "all" ? "Latest Articles" : `${categoryName} Guides`}
              </h1>
            </div>

            {/* Compact Search Bar */}
            <div className="relative w-full md:w-72">
              <input
                type="search"
                placeholder="Search articles & reviews..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all shadow-sm"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              {searchQuery && (
                <button onClick={() => handleSearchChange("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </Container>
      </div>

      {/* ── MAIN CONTENT (List View + Sidebar) ── */}
      <Container className="py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* ── LEFT FEED (8 Columns) ── */}
          <main className="lg:col-span-8">
            
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mr-2 flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5" /> Filter:
              </span>
              <button
                onClick={() => handleCategoryChange("all")}
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all",
                  selectedCategory === "all" ? "bg-indigo-600 text-white shadow-md shadow-indigo-200" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
                )}
              >
                All
              </button>
              {categories.slice(0, 6).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.slug)}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all",
                    selectedCategory === cat.slug ? "bg-indigo-600 text-white shadow-md shadow-indigo-200" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
                  )}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Articles List */}
            {isLoading && posts.length === 0 ? (
              <div className="space-y-6">
                {[...Array(5)].map((_, i) => <HorizontalSkeleton key={i} />)}
              </div>
            ) : !isLoading && posts.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
                <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-black text-slate-900 mb-2">No Results Found</h3>
                <p className="text-slate-500 text-sm">We could not find any articles matching your criteria.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {posts.map((post) => (
                  <HorizontalBlogCard key={post.id} post={post} />
                ))}

                {isLoadMoreLoading && (
                  <div className="space-y-6 pt-6">
                    {[...Array(2)].map((_, i) => <HorizontalSkeleton key={i} />)}
                  </div>
                )}

                {hasMore && !isLoadMoreLoading && (
                  <div className="pt-8 text-center">
                    <button
                      onClick={handleLoadMore}
                      className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:border-indigo-400 hover:text-indigo-600 text-slate-700 font-bold uppercase tracking-widest text-xs px-8 py-3.5 rounded-lg shadow-sm transition-all duration-300"
                    >
                      Load More Articles <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </main>

          {/* ── RIGHT SIDEBAR (4 Columns) - Highly Affiliate Friendly ── */}
          <aside className="lg:col-span-4 space-y-8">
            
            {/* Quick Links / Deals Widget */}
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
              <h3 className="text-sm font-black uppercase tracking-widest text-indigo-900 mb-4 flex items-center gap-2">
                <Flame className="w-4 h-4 text-emerald-500" /> Top Picks & Deals
              </h3>
              <ul className="space-y-3">
                {[
                  { label: "Best Software Reviews 2024", href: "/blogs?category=software" },
                  { label: "Ultimate Buying Guides", href: "/blogs?filter=buying-guides" },
                  { label: "Travel Packing Essentials", href: "/blogs?category=travel-guides" },
                  { label: "Top Rated Gadgets", href: "/blogs?category=gadgets" }
                ].map((link, i) => (
                  <li key={i}>
                    <Link href={link.href} className="group flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-indigo-600 transition-colors">
                      <ChevronRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-1 transition-transform" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* All Categories Widget */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
                <Tag className="w-4 h-4 text-indigo-500" /> Categories
              </h3>
              <div className="flex flex-col gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.slug)}
                    className="flex items-center justify-between py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
                  >
                    <span>{cat.name}</span>
                    <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-semibold">{cat.count}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sticky Newsletter Banner */}
            <div className="sticky top-24 bg-slate-900 rounded-xl p-6 text-center shadow-lg">
              <Sparkles className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
              <h3 className="text-lg font-black text-white font-serif mb-2">Join the Inner Circle</h3>
              <p className="text-slate-400 text-xs mb-5 font-medium">Get the best reviews and exclusive deals delivered weekly.</p>
              <input type="email" placeholder="Your email..." className="w-full px-4 py-2.5 rounded border border-slate-700 bg-slate-800 text-white text-sm mb-3 focus:outline-none focus:border-indigo-500" />
              <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold uppercase tracking-widest text-xs py-3 rounded transition-colors">
                Subscribe Now
              </button>
            </div>

          </aside>
        </div>
      </Container>
    </div>
  );
}

/* ══ PAGE EXPORT ══════════════════════════════════════════════════════════ */
export default function BlogsPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-slate-50 min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
              <Loader2 className="w-6 h-6 text-indigo-600 animate-spin" />
            </div>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest animate-pulse">Loading Feed...</p>
          </div>
        </div>
      }
    >
      <BlogContent />
    </Suspense>
  );
}