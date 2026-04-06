"use client";

import {
  Search, X, ChevronDown, Loader2, SlidersHorizontal,
  ArrowUpRight, Flame, Sparkles, LayoutGrid, LayoutList,
  BookOpen, Filter,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { BlogCard } from "@/components/BlogCard";
import { BlogCardSkeleton } from "@/components/BlogCardSkeleton";
import Link from "next/link";
import { useState, useEffect, Suspense, useRef, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

/* ══ Config ═══════════════════════════════════════════════════════════════ */
const WP_API_URL = "https://paleturquoise-goshawk-537115.hostingersite.com/wp-json/wp/v2";

/* ══ Types ════════════════════════════════════════════════════════════════ */
interface WordPressPost {
  id: number;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  slug: string;
  categories: number[];
  featured_media: number;
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url: string; alt_text: string }>;
    author?: Array<{ name: string }>;
    "wp:term"?: Array<Array<{ id: number; name: string; slug: string }>>;
  };
}
interface Category {
  id: number;
  name: string;
  slug: string;
  count: number;
}

/* ══ Helpers ══════════════════════════════════════════════════════════════ */
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

/* ══ BLOGS HERO HEADER ════════════════════════════════════════════════════ */
function BlogsHero({
  totalCount,
  selectedCategory,
  categoryName,
}: {
  totalCount: number;
  selectedCategory: string;
  categoryName: string;
}) {
  return (
    <div className="bg-zinc-950 relative overflow-hidden py-10 md:py-14">
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[300px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[200px] bg-orange-500/8 rounded-full blur-[80px] pointer-events-none" />
      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 60px)," +
            "repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 60px)",
        }}
      />

      <Container>
        <div className="relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 mb-4">
            <Link href="/" className="text-[10px] font-medium text-zinc-600 hover:text-teal-400 transition-colors">
              Home
            </Link>
            <span className="text-zinc-700 text-[10px]">/</span>
            <span className="text-[10px] font-semibold text-zinc-400">Articles</span>
            {selectedCategory !== "all" && (
              <>
                <span className="text-zinc-700 text-[10px]">/</span>
                <span className="text-[10px] font-semibold text-teal-400">{categoryName}</span>
              </>
            )}
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.22em] text-teal-400 border border-teal-500/25 bg-teal-500/8 px-3 py-1 rounded-full">
                  <Sparkles className="w-2.5 h-2.5" />
                  AI Curated
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight">
                {selectedCategory === "all" ? (
                  <>All <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">Articles</span></>
                ) : (
                  <>{categoryName} <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">Articles</span></>
                )}
              </h1>
              {totalCount > 0 && (
                <p className="text-zinc-500 text-sm mt-1.5">
                  {totalCount} article{totalCount !== 1 ? "s" : ""} found
                </p>
              )}
            </div>

            <Link
              href="/trending"
              className="hidden md:inline-flex items-center gap-2 text-[12px] font-bold text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 px-4 py-2.5 rounded-xl shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5 self-end"
            >
              <Flame className="w-3.5 h-3.5" />
              See Trending
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}

/* ══ STICKY SEARCH + FILTER BAR ═══════════════════════════════════════════ */
function SearchFilterBar({
  categories,
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  totalCount,
}: {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (slug: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  totalCount: number;
}) {
  const [isDropOpen, setIsDropOpen] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <Container>
        <div className="py-3 flex items-center gap-3">
          {/* Search */}
          <div className="flex-1 relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
            <input
              ref={inputRef}
              type="search"
              placeholder="Search articles…"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-xl text-[13px] text-gray-700 placeholder-gray-400 focus:outline-none focus:border-teal-400 focus:bg-white focus:ring-2 focus:ring-teal-500/10 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => { onSearchChange(""); inputRef.current?.focus(); }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category dropdown — desktop */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => setIsDropOpen(!isDropOpen)}
              className={cn(
                "flex items-center gap-2 px-3.5 py-2 text-[12px] font-semibold rounded-xl border transition-all duration-200 min-w-[130px]",
                selectedCategory !== "all"
                  ? "border-teal-400 bg-teal-50 text-teal-700"
                  : "border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300 hover:bg-white"
              )}
            >
              {selectedCategory !== "all" && (
                <span className="text-base leading-none">{getEmoji(selectedCategory)}</span>
              )}
              <span className="truncate flex-1 text-left">
                {selectedCategory === "all"
                  ? "All Categories"
                  : categories.find((c) => c.slug === selectedCategory)?.name ?? "Category"}
              </span>
              <ChevronDown
                className={cn(
                  "w-3.5 h-3.5 transition-transform shrink-0",
                  isDropOpen ? "rotate-180 text-teal-600" : ""
                )}
              />
            </button>

            {isDropOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsDropOpen(false)} />
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl border border-gray-100 shadow-xl z-50 overflow-hidden">
                  <div className="p-1.5 max-h-64 overflow-y-auto">
                    <button
                      onClick={() => { onCategoryChange("all"); setIsDropOpen(false); }}
                      className={cn(
                        "w-full flex items-center gap-2.5 px-3 py-2 text-[12px] font-semibold rounded-xl transition-colors text-left",
                        selectedCategory === "all"
                          ? "bg-teal-50 text-teal-700"
                          : "text-gray-700 hover:bg-gray-50"
                      )}
                    >
                      <span className="text-base">📋</span>
                      All Categories
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => { onCategoryChange(cat.slug); setIsDropOpen(false); }}
                        className={cn(
                          "w-full flex items-center gap-2.5 px-3 py-2 text-[12px] font-semibold rounded-xl transition-colors text-left",
                          selectedCategory === cat.slug
                            ? "bg-teal-50 text-teal-700"
                            : "text-gray-700 hover:bg-gray-50"
                        )}
                      >
                        <span className="text-base leading-none">{getEmoji(cat.slug)}</span>
                        <span className="flex-1 truncate">{cat.name}</span>
                        <span className="text-[10px] text-gray-400 font-normal">{cat.count}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Mobile filter toggle */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className={cn(
              "sm:hidden flex items-center gap-1.5 px-3 py-2 text-[12px] font-semibold rounded-xl border transition-all",
              selectedCategory !== "all"
                ? "border-teal-400 bg-teal-50 text-teal-700"
                : "border-gray-200 bg-gray-50 text-gray-600"
            )}
          >
            <Filter className="w-3.5 h-3.5" />
            Filter
            {selectedCategory !== "all" && (
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
            )}
          </button>

          {/* Active filter pill */}
          {selectedCategory !== "all" && (
            <button
              onClick={() => onCategoryChange("all")}
              className="hidden sm:flex items-center gap-1.5 text-[11px] font-semibold text-teal-700 bg-teal-50 border border-teal-200 px-2.5 py-1.5 rounded-full hover:bg-teal-100 transition-colors"
            >
              {categories.find((c) => c.slug === selectedCategory)?.name}
              <X className="w-3 h-3" />
            </button>
          )}

          {/* Spacer */}
          <div className="flex-1 hidden sm:block" />

          {/* Active search result count */}
          {(searchQuery || selectedCategory !== "all") && totalCount > 0 && (
            <span className="text-[11px] text-gray-400 font-medium hidden md:block whitespace-nowrap">
              {totalCount} result{totalCount !== 1 ? "s" : ""}
            </span>
          )}
        </div>
      </Container>

      {/* Mobile filter drawer */}
      {isMobileFilterOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 sm:hidden"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 bg-white z-50 rounded-t-3xl shadow-2xl sm:hidden p-5 max-h-[70vh] overflow-y-auto">
            <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5" />
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-black text-gray-900">Filter by Category</h3>
              <button onClick={() => setIsMobileFilterOpen(false)}>
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => { onCategoryChange("all"); setIsMobileFilterOpen(false); }}
                className={cn(
                  "flex items-center gap-2 px-3 py-2.5 text-[12px] font-semibold rounded-xl border transition-all text-left",
                  selectedCategory === "all"
                    ? "border-teal-400 bg-teal-50 text-teal-700"
                    : "border-gray-100 text-gray-700 hover:bg-gray-50"
                )}
              >
                <span>📋</span> All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => { onCategoryChange(cat.slug); setIsMobileFilterOpen(false); }}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2.5 text-[12px] font-semibold rounded-xl border transition-all text-left",
                    selectedCategory === cat.slug
                      ? "border-teal-400 bg-teal-50 text-teal-700"
                      : "border-gray-100 text-gray-700 hover:bg-gray-50"
                  )}
                >
                  <span>{getEmoji(cat.slug)}</span>
                  <span className="truncate">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* ══ CATEGORY CHIPS STRIP ═════════════════════════════════════════════════ */
function CategoryChips({
  categories,
  selectedCategory,
  onCategoryChange,
}: {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (slug: string) => void;
}) {
  if (!categories.length) return null;
  return (
    <div className="bg-white border-b border-gray-100">
      <Container>
        <div className="py-3 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => onCategoryChange("all")}
            className={cn(
              "shrink-0 flex items-center gap-1.5 text-[11px] font-bold px-3.5 py-1.5 rounded-full border transition-all duration-200 whitespace-nowrap",
              selectedCategory === "all"
                ? "bg-zinc-950 border-zinc-950 text-white shadow-md"
                : "bg-white border-gray-200 text-gray-600 hover:border-gray-400 hover:text-gray-900"
            )}
          >
            All
          </button>
          {categories.slice(0, 12).map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.slug)}
              className={cn(
                "shrink-0 flex items-center gap-1.5 text-[11px] font-bold px-3.5 py-1.5 rounded-full border transition-all duration-200 whitespace-nowrap",
                selectedCategory === cat.slug
                  ? "bg-gradient-to-r from-teal-500 to-cyan-500 border-transparent text-white shadow-md shadow-teal-500/20"
                  : "bg-white border-gray-200 text-gray-600 hover:border-teal-300 hover:text-teal-700 hover:bg-teal-50"
              )}
            >
              <span className="text-sm leading-none">{getEmoji(cat.slug)}</span>
              {cat.name}
            </button>
          ))}
        </div>
      </Container>
    </div>
  );
}

/* ══ SKELETON GRID ════════════════════════════════════════════════════════ */
function SkeletonGrid() {
  return (
    <div className="bg-gray-50 py-8">
      <Container>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(6)].map((_, i) => <BlogCardSkeleton key={i} />)}
        </div>
      </Container>
    </div>
  );
}

/* ══ EMPTY STATE ══════════════════════════════════════════════════════════ */
function EmptyState({ searchQuery }: { searchQuery: string }) {
  return (
    <div className="bg-gray-50 py-20">
      <Container>
        <div className="max-w-sm mx-auto text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-100 to-cyan-100 flex items-center justify-center mx-auto mb-5">
            <BookOpen className="w-7 h-7 text-teal-500" />
          </div>
          <h3 className="text-lg font-black text-gray-900 mb-2">No Articles Found</h3>
          <p className="text-sm text-gray-500 mb-6 leading-relaxed">
            {searchQuery
              ? `No results for "${searchQuery}". Try a different keyword.`
              : "No articles in this category yet. Check back soon!"}
          </p>
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-md shadow-teal-500/20 hover:-translate-y-0.5 transition-all"
          >
            Browse All Articles
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </Container>
    </div>
  );
}

/* ══ ARTICLES GRID ════════════════════════════════════════════════════════ */
function ArticlesGrid({
  posts,
  isLoading,
  searchQuery,
  hasMore,
  onLoadMore,
  isLoadMoreLoading,
}: {
  posts: WordPressPost[];
  isLoading: boolean;
  searchQuery: string;
  hasMore: boolean;
  onLoadMore: () => void;
  isLoadMoreLoading: boolean;
}) {
  if (isLoading && posts.length === 0) return <SkeletonGrid />;
  if (!isLoading && posts.length === 0) return <EmptyState searchQuery={searchQuery} />;

  return (
    <div className="bg-gray-50 py-7">
      <Container>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post) => (
            <div
              key={post.id}
              className="opacity-0 animate-[fadeInUp_0.5s_ease_forwards]"
              style={{ animationFillMode: "forwards" }}
            >
              <BlogCard post={post} />
            </div>
          ))}
        </div>

        {/* Inline skeletons while loading more */}
        {isLoadMoreLoading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
            {[...Array(3)].map((_, i) => <BlogCardSkeleton key={i} />)}
          </div>
        )}

        {/* Load more */}
        {hasMore && !isLoadMoreLoading && (
          <div className="flex flex-col items-center gap-3 mt-10">
            <button
              onClick={onLoadMore}
              className="inline-flex items-center gap-2.5 bg-white border-2 border-gray-200 hover:border-teal-400 text-gray-700 hover:text-teal-700 font-bold text-[13px] px-8 py-3 rounded-xl hover:bg-teal-50 transition-all duration-200 group shadow-sm hover:shadow-md"
            >
              <span>Load More Articles</span>
              <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </button>
            <p className="text-[10px] text-gray-400">
              Showing {posts.length} articles
            </p>
          </div>
        )}

        {/* No more posts indicator */}
        {!hasMore && posts.length > 0 && (
          <div className="flex flex-col items-center gap-2 mt-10 pt-8 border-t border-gray-200">
            <div className="flex items-center gap-2 text-[11px] text-gray-400">
              <Sparkles className="w-3 h-3 text-teal-400" />
              You&apos;ve read all {posts.length} articles
              <Sparkles className="w-3 h-3 text-teal-400" />
            </div>
            <Link
              href="/trending"
              className="inline-flex items-center gap-1.5 text-[12px] font-bold text-orange-600 hover:text-orange-700 transition-colors"
            >
              <Flame className="w-3.5 h-3.5" />
              Check what&apos;s trending
            </Link>
          </div>
        )}
      </Container>
    </div>
  );
}

/* ══ NEWSLETTER CTA ═══════════════════════════════════════════════════════ */
function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div className="bg-zinc-950 relative overflow-hidden py-14 md:py-18">
      {/* Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-teal-500/10 rounded-full blur-[80px] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 60px)," +
            "repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 60px)",
        }}
      />
      <Container>
        <div className="relative z-10 max-w-lg mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 text-teal-400 rounded-full px-4 py-1.5 text-[9px] font-black uppercase tracking-[0.22em] mb-5">
            <Sparkles className="w-3 h-3" />
            Stay Updated
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tight">
            Get the best content
            <br />
            <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              delivered to you.
            </span>
          </h2>
          <p className="text-zinc-500 text-sm mb-7 leading-relaxed">
            AI-curated articles, trending picks &amp; exclusive deals — no spam, ever.
          </p>

          {submitted ? (
            <div className="flex items-center justify-center gap-2 bg-teal-500/10 border border-teal-500/20 rounded-2xl py-4 px-6">
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span className="text-teal-400 text-sm font-bold">
                You&apos;re subscribed! Welcome to Trendships.
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-teal-500/50 focus:bg-white/8 transition-all"
              />
              <button
                type="submit"
                className="shrink-0 inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-white font-bold text-sm px-5 py-3 rounded-xl shadow-lg shadow-teal-500/20 hover:-translate-y-0.5 transition-all"
              >
                Subscribe
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
          <p className="text-[10px] text-zinc-700 mt-3">
            No spam · Unsubscribe anytime · Powered by Trendships AI
          </p>
        </div>
      </Container>
    </div>
  );
}

/* ══ BLOG CONTENT ═════════════════════════════════════════════════════════ */
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

  /* Sync state with URL */
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

  /* Fetch posts */
  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      setIsLoading(true);
      setPage(1);
      setPosts([]);

      try {
        /* Fetch categories if needed */
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

        let url = `${WP_API_URL}/posts?_embed&per_page=12&page=1`;
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

  /* Load more */
  const handleLoadMore = async () => {
    if (isLoadMoreLoading || !hasMore) return;
    setIsLoadMoreLoading(true);
    const next = page + 1;

    let url = `${WP_API_URL}/posts?_embed&per_page=12&page=${next}`;
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

  const categoryName =
    selectedCategory === "all"
      ? "All Categories"
      : categories.find((c) => c.slug === selectedCategory)?.name || "";

  return (
    <>
      {/* Dark hero header */}
      <BlogsHero
        totalCount={totalCount}
        selectedCategory={selectedCategory}
        categoryName={categoryName}
      />

      {/* Sticky search + filter bar */}
      <SearchFilterBar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        totalCount={totalCount}
      />

      {/* Category chips */}
      <CategoryChips
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Articles */}
      <ArticlesGrid
        posts={posts}
        isLoading={isLoading}
        searchQuery={searchQuery}
        hasMore={hasMore}
        onLoadMore={handleLoadMore}
        isLoadMoreLoading={isLoadMoreLoading}
      />

      {/* Newsletter */}
      <NewsletterCTA />
    </>
  );
}

/* ══ PAGE EXPORT ══════════════════════════════════════════════════════════ */
export default function BlogsPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-zinc-950 min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center">
              <Loader2 className="w-5 h-5 text-white animate-spin" />
            </div>
            <p className="text-zinc-600 text-xs font-medium">Loading articles…</p>
          </div>
        </div>
      }
    >
      <BlogContent />
    </Suspense>
  );
}
