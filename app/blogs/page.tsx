"use client";

import {
  Search, X, ChevronDown, Loader2,
  ArrowUpRight, Flame, Sparkles,
  BookOpen, Filter, Zap, Target
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
    <div className="bg-[#020813] border-b border-cyan-900/40 relative overflow-hidden py-12 md:py-16">
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/3 w-[500px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[200px] bg-cyan-900/20 rounded-full blur-[80px] pointer-events-none" />
      
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
        <div className="relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6">
            <Link href="/" className="text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-cyan-400 transition-colors">
              Home
            </Link>
            <span className="text-cyan-900 text-sm">/</span>
            <span className="text-[11px] font-bold uppercase tracking-widest text-white">The Radar</span>
            {selectedCategory !== "all" && (
              <>
                <span className="text-cyan-900 text-sm">/</span>
                <span className="text-[11px] font-bold uppercase tracking-widest text-cyan-400">{categoryName}</span>
              </>
            )}
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-300 border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 rounded shadow-[0_0_10px_rgba(34,211,238,0.1)]">
                  <Sparkles className="w-3 h-3" />
                  AI Curated
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight uppercase">
                {selectedCategory === "all" ? (
                  <>The <span className="text-cyan-400">Radar</span></>
                ) : (
                  <>{categoryName} <span className="text-cyan-400">Picks</span></>
                )}
              </h1>
              {totalCount > 0 && (
                <p className="text-slate-400 text-sm md:text-base mt-3 font-medium flex items-center gap-2">
                  <Target className="w-4 h-4 text-cyan-500" />
                  Scanning {totalCount} apex article{totalCount !== 1 ? "s" : ""}
                </p>
              )}
            </div>

            <Link
              href="/trending"
              className="hidden md:inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[#020813] bg-cyan-400 hover:bg-cyan-300 px-6 py-3.5 rounded shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all hover:-translate-y-0.5 self-end"
            >
              <Flame className="w-4 h-4" />
              View Trending
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
    <div className="sticky top-[73px] z-30 bg-[#020813]/95 backdrop-blur-md border-b border-cyan-900/40 shadow-sm">
      <Container>
        <div className="py-3.5 flex items-center gap-3">
          {/* Search */}
          <div className="flex-1 relative max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
            <input
              ref={inputRef}
              type="search"
              placeholder="Search the depths..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 bg-[#0a1220] border border-white/5 hover:border-cyan-900/50 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500/50 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => { onSearchChange(""); inputRef.current?.focus(); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-cyan-400 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category dropdown — desktop */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => setIsDropOpen(!isDropOpen)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg border transition-all duration-200 min-w-[160px]",
                selectedCategory !== "all"
                  ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-300"
                  : "border-white/10 bg-[#0a1220] text-slate-300 hover:border-cyan-900/60 hover:text-cyan-400"
              )}
            >
              <span className="truncate flex-1 text-left">
                {selectedCategory === "all"
                  ? "All Categories"
                  : categories.find((c) => c.slug === selectedCategory)?.name ?? "Category"}
              </span>
              <ChevronDown
                className={cn(
                  "w-4 h-4 transition-transform shrink-0",
                  isDropOpen ? "rotate-180 text-cyan-400" : "text-slate-500"
                )}
              />
            </button>

            {isDropOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsDropOpen(false)} />
                <div className="absolute top-full left-0 mt-2 w-64 bg-[#050b14] rounded-xl border border-cyan-900/40 shadow-[0_10px_40px_rgba(0,0,0,0.8)] z-50 overflow-hidden">
                  <div className="p-2 max-h-72 overflow-y-auto custom-scrollbar">
                    <button
                      onClick={() => { onCategoryChange("all"); setIsDropOpen(false); }}
                      className={cn(
                        "w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors text-left",
                        selectedCategory === "all"
                          ? "bg-cyan-500/10 text-cyan-400"
                          : "text-slate-300 hover:bg-[#0a1220] hover:text-cyan-300"
                      )}
                    >
                      <Zap className="w-3.5 h-3.5" /> All Categories
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => { onCategoryChange(cat.slug); setIsDropOpen(false); }}
                        className={cn(
                          "w-full flex items-center justify-between px-3 py-2.5 text-xs font-semibold rounded-lg transition-colors text-left group",
                          selectedCategory === cat.slug
                            ? "bg-cyan-500/10 text-cyan-400"
                            : "text-slate-400 hover:bg-[#0a1220] hover:text-cyan-300"
                        )}
                      >
                        <span className="flex items-center gap-2.5 truncate">
                          <span className={cn(
                            "w-1.5 h-1.5 rounded-full transition-colors",
                            selectedCategory === cat.slug ? "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" : "bg-slate-700 group-hover:bg-cyan-500"
                          )} />
                          {cat.name}
                        </span>
                        <span className="text-[10px] text-cyan-900 font-black px-1.5 bg-cyan-500/10 rounded">{cat.count}</span>
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
              "sm:hidden flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg border transition-all",
              selectedCategory !== "all"
                ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-300"
                : "border-white/10 bg-[#0a1220] text-slate-300"
            )}
          >
            <Filter className="w-4 h-4" />
            Filter
            {selectedCategory !== "all" && (
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
            )}
          </button>

          {/* Spacer */}
          <div className="flex-1 hidden sm:block" />

          {/* Active search result count */}
          {(searchQuery || selectedCategory !== "all") && totalCount > 0 && (
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-500 hidden md:block whitespace-nowrap bg-cyan-950/30 px-3 py-1.5 rounded border border-cyan-900/30">
              {totalCount} result{totalCount !== 1 ? "s" : ""}
            </span>
          )}
        </div>
      </Container>

      {/* Mobile filter drawer */}
      {isMobileFilterOpen && (
        <>
          <div
            className="fixed inset-0 bg-[#020813]/80 backdrop-blur-sm z-40 sm:hidden"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 bg-[#050b14] border-t border-cyan-900/40 z-50 rounded-t-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)] sm:hidden p-5 max-h-[75vh] overflow-y-auto custom-scrollbar">
            <div className="w-12 h-1 bg-cyan-900/50 rounded-full mx-auto mb-5" />
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-white">Filter Categories</h3>
              <button onClick={() => setIsMobileFilterOpen(false)} className="text-slate-500 hover:text-cyan-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-2">
              <button
                onClick={() => { onCategoryChange("all"); setIsMobileFilterOpen(false); }}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-wider rounded-lg border transition-all text-left",
                  selectedCategory === "all"
                    ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-400"
                    : "border-white/5 bg-[#0a1220] text-slate-300 hover:border-cyan-900/40"
                )}
              >
                <Zap className="w-4 h-4 text-cyan-500" /> All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => { onCategoryChange(cat.slug); setIsMobileFilterOpen(false); }}
                  className={cn(
                    "flex items-center justify-between px-4 py-3 text-xs font-bold uppercase tracking-wider rounded-lg border transition-all text-left",
                    selectedCategory === cat.slug
                      ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-400"
                      : "border-white/5 bg-[#0a1220] text-slate-400 hover:border-cyan-900/40 hover:text-cyan-300"
                  )}
                >
                  <span className="flex items-center gap-3 truncate">
                    <span className={cn(
                      "w-1.5 h-1.5 rounded-full transition-colors",
                      selectedCategory === cat.slug ? "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" : "bg-slate-700"
                    )} />
                    {cat.name}
                  </span>
                  <span className="text-[10px] text-cyan-900 bg-cyan-500/10 px-2 py-0.5 rounded">{cat.count}</span>
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
    <div className="bg-[#020813] border-b border-white/5">
      <Container>
        <div className="py-3 flex items-center gap-3 overflow-x-auto custom-scrollbar pb-2">
          <button
            onClick={() => onCategoryChange("all")}
            className={cn(
              "shrink-0 flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest px-4 py-2 rounded border transition-all duration-200 whitespace-nowrap",
              selectedCategory === "all"
                ? "bg-cyan-400 border-cyan-400 text-[#020813] shadow-[0_0_10px_rgba(34,211,238,0.3)]"
                : "bg-[#050b14] border-white/10 text-slate-400 hover:border-cyan-500/50 hover:text-cyan-300"
            )}
          >
            All
          </button>
          {categories.slice(0, 12).map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.slug)}
              className={cn(
                "shrink-0 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider px-4 py-2 rounded border transition-all duration-200 whitespace-nowrap",
                selectedCategory === cat.slug
                  ? "bg-cyan-500/10 border-cyan-500/50 text-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.1)]"
                  : "bg-[#050b14] border-white/10 text-slate-400 hover:border-cyan-500/50 hover:text-cyan-300"
              )}
            >
              <span className={cn(
                "w-1.5 h-1.5 rounded-full",
                selectedCategory === cat.slug ? "bg-cyan-400" : "bg-slate-700"
              )} />
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
    <div className="bg-[#020813] py-12">
      <Container>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => <BlogCardSkeleton key={i} />)}
        </div>
      </Container>
    </div>
  );
}

/* ══ EMPTY STATE ══════════════════════════════════════════════════════════ */
function EmptyState({ searchQuery }: { searchQuery: string }) {
  return (
    <div className="bg-[#020813] py-24">
      <Container>
        <div className="max-w-md mx-auto text-center">
          <div className="w-20 h-20 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(34,211,238,0.1)]">
            <Search className="w-8 h-8 text-cyan-400" />
          </div>
          <h3 className="text-xl font-black uppercase tracking-widest text-white mb-2">No Signals Found</h3>
          <p className="text-sm text-slate-400 mb-8 leading-relaxed font-medium">
            {searchQuery
              ? `The radar couldn't locate anything for "${searchQuery}". Adjust your frequency and try again.`
              : "No articles have surfaced in this sector yet. Check back later."}
          </p>
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 bg-cyan-400 text-[#020813] font-black uppercase tracking-widest text-[11px] px-6 py-3.5 rounded shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:bg-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all"
          >
            Clear Radar
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
    <div className="bg-[#020813] py-12">
      <Container>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {[...Array(3)].map((_, i) => <BlogCardSkeleton key={i} />)}
          </div>
        )}

        {/* Load more */}
        {hasMore && !isLoadMoreLoading && (
          <div className="flex flex-col items-center gap-4 mt-16">
            <button
              onClick={onLoadMore}
              className="inline-flex items-center gap-2.5 bg-cyan-500/5 border border-cyan-500/30 hover:bg-cyan-500/10 text-cyan-400 font-black uppercase tracking-widest text-[11px] px-8 py-3.5 rounded transition-all duration-300 group hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]"
            >
              <span>Scan For More</span>
              <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </button>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
              Showing {posts.length} records
            </p>
          </div>
        )}

        {/* No more posts indicator */}
        {!hasMore && posts.length > 0 && (
          <div className="flex flex-col items-center gap-4 mt-16 pt-10 border-t border-white/5">
            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-500">
              <span className="w-1 h-1 rounded-full bg-cyan-900" />
              End of scan. {posts.length} records found.
              <span className="w-1 h-1 rounded-full bg-cyan-900" />
            </div>
            <Link
              href="/trending"
              className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-cyan-500 hover:text-cyan-300 transition-colors"
            >
              <Flame className="w-4 h-4" />
              Check what&apos;s trending next
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
    <div className="bg-[#050b14] border-t border-cyan-900/30 relative overflow-hidden py-16 md:py-24">
      {/* Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />
      
      <Container>
        <div className="relative z-10 max-w-xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#020813] border border-cyan-500/30 text-cyan-400 rounded-full px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] mb-6 shadow-[0_0_15px_rgba(34,211,238,0.15)]">
            <Zap className="w-3.5 h-3.5 text-cyan-500" />
            Join The Network
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight uppercase">
            Dominate The
            <br />
            <span className="text-cyan-400">Digital Space</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base mb-10 leading-relaxed font-medium max-w-md mx-auto">
            Get the apex of tech, marketing, and lifestyle intelligence delivered directly to your inbox.
          </p>

          {submitted ? (
            <div className="flex items-center justify-center gap-3 bg-cyan-500/10 border border-cyan-500/30 rounded py-5 px-6 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
              <Zap className="w-5 h-5 text-cyan-400" />
              <span className="text-cyan-300 text-sm font-bold uppercase tracking-wider">
                Signal received. Welcome to the Radar.
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-5 py-3.5 bg-[#020813] border border-cyan-900/50 rounded text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500/50 transition-all"
              />
              <button
                type="submit"
                className="shrink-0 inline-flex items-center justify-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-[#020813] font-black uppercase tracking-widest text-[11px] px-8 py-3.5 rounded shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:shadow-[0_0_20px_rgba(34,211,238,0.5)] transition-all duration-300"
              >
                Connect
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </form>
          )}
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600 mt-5">
            No spam · Unsubscribe anytime · Secure Channel
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
      <BlogsHero
        totalCount={totalCount}
        selectedCategory={selectedCategory}
        categoryName={categoryName}
      />

      <SearchFilterBar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        totalCount={totalCount}
      />

      <CategoryChips
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      <ArticlesGrid
        posts={posts}
        isLoading={isLoading}
        searchQuery={searchQuery}
        hasMore={hasMore}
        onLoadMore={handleLoadMore}
        isLoadMoreLoading={isLoadMoreLoading}
      />

      <NewsletterCTA />
    </>
  );
}

/* ══ PAGE EXPORT ══════════════════════════════════════════════════════════ */
export default function BlogsPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-[#020813] min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.2)]">
              <Loader2 className="w-6 h-6 text-cyan-400 animate-spin" />
            </div>
            <p className="text-cyan-400 text-[10px] font-black uppercase tracking-[0.2em] animate-pulse">Scanning...</p>
          </div>
        </div>
      }
    >
      <BlogContent />
    </Suspense>
  );
}