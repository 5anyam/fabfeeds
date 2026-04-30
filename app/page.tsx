"use client";

import Link from "next/link";
import {
  ArrowRight,
  TrendingUp,
  MonitorSmartphone,
  Lightbulb,
  Zap,
  Star,
  Flame
} from "lucide-react";
import { useEffect, useState } from "react";

/* ══════════════════════════════════════════════════════════════
   CONFIG & UTILS
══════════════════════════════════════════════════════════════ */
const WP_API_URL = "https://lemonchiffon-porpoise-679406.hostingersite.com/wp-json/wp/v2";

const stripHtml = (h: string) =>
  h.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();

const fmtDate = (d: string) =>
  new Date(d).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

/* ══════════════════════════════════════════════════════════════
   UI WRAPPERS
══════════════════════════════════════════════════════════════ */
function Container({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return <div className={`max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

function SectionHeading({ icon: Icon, title, subtitle }: { icon: any, title: string, subtitle?: string }) {
  return (
    <div className="flex flex-col mb-10">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-6 h-6 text-indigo-600" />
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight font-serif">
          {title}
        </h2>
      </div>
      {subtitle && <p className="text-slate-500 font-medium text-lg ml-8">{subtitle}</p>}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════════ */
export default function FabFeedsHomePage() {
  const [featuredPosts, setFeaturedPosts] = useState<any[]>([]);
  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [featRes, postsRes] = await Promise.all([
          fetch(`${WP_API_URL}/posts?_embed&per_page=8&orderby=date`),
          fetch(`${WP_API_URL}/posts?_embed&per_page=20&orderby=date`),
        ]);
        if (featRes.ok) setFeaturedPosts(await featRes.json());
        if (postsRes.ok) setAllPosts(await postsRes.json());
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
        <p className="text-slate-500 font-medium tracking-widest uppercase text-sm">Curating Fab Feeds...</p>
      </div>
    );
  }

  // Splitting posts for different sections
  const heroPost = featuredPosts[0];
  const rightColumnPosts = featuredPosts.slice(1, 4);
  const editorPicks = featuredPosts.slice(4, 8);
  
  const techPosts = allPosts.slice(0, 3);
  const strategyPosts = allPosts.slice(3, 7);
  const latestPosts = allPosts.slice(7, 15);

  return (
    <main className="bg-slate-50 text-slate-800 min-h-screen font-sans selection:bg-indigo-200 pb-20">
      
      {/* ── 1. THE NEWS TICKER (TOP BAR) ── */}
      <div className="bg-slate-900 border-b border-slate-800 py-2.5">
        <div className="flex items-center max-w-[1280px] mx-auto px-4">
          <span className="shrink-0 bg-indigo-600 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-sm mr-4 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 fill-current" /> Breaking
          </span>
          <div className="overflow-hidden flex-1">
            <div className="flex gap-10 whitespace-nowrap animate-[ticker_40s_linear_infinite]">
              {[...allPosts, ...allPosts].map((p, i) => (
                <Link key={i} href={`/${p.slug}`} className="text-sm text-slate-300 hover:text-white font-medium transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" /> 
                  {p.title.rendered}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. EDITORIAL HERO SECTION ── */}
      <section className="py-12 md:py-16 bg-white border-b border-slate-200">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Main Hero Story (Left 8 cols) */}
            {heroPost && (
              <div className="lg:col-span-8 flex flex-col">
                <Link href={`/${heroPost.slug}`} className="group relative block rounded-2xl overflow-hidden aspect-[4/3] md:aspect-[16/9] mb-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-slate-100">
                  {heroPost._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
                    <img 
                      src={heroPost._embedded["wp:featuredmedia"][0].source_url} 
                      alt={heroPost.title.rendered} 
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  )}
                  {/* Subtle gradient for text readability if needed */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                
                <div>
                  <span className="text-indigo-600 font-bold uppercase tracking-widest text-xs mb-3 block">
                    {heroPost._embedded?.["wp:term"]?.[0]?.[0]?.name || "Cover Story"}
                  </span>
                  <Link href={`/${heroPost.slug}`} className="group">
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight mb-4 group-hover:text-indigo-600 transition-colors font-serif">
                      {heroPost.title.rendered}
                    </h2>
                  </Link>
                  <p className="text-slate-600 md:text-lg line-clamp-2 md:line-clamp-3 leading-relaxed mb-6">
                    {stripHtml(heroPost.excerpt.rendered)}
                  </p>
                  <div className="flex items-center text-sm font-semibold text-slate-400">
                    <span className="text-slate-800 mr-2">{fmtDate(heroPost.date)}</span> • 
                    <span className="ml-2 flex items-center hover:text-indigo-600 cursor-pointer transition-colors">
                      Read Full Story <ArrowRight className="w-4 h-4 ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Right Column: Trending List */}
            <div className="lg:col-span-4 flex flex-col">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b-2 border-slate-900">
                <TrendingUp className="w-5 h-5 text-slate-900" />
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-widest">Trending Now</h3>
              </div>
              
              <div className="flex flex-col divide-y divide-slate-100">
                {rightColumnPosts.map((post, i) => (
                  <Link key={i} href={`/${post.slug}`} className="group py-5 first:pt-0 flex gap-5 items-start">
                    <span className="text-4xl font-black text-slate-200 group-hover:text-indigo-100 transition-colors font-serif leading-none mt-1">
                      0{i + 1}
                    </span>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-indigo-600 transition-colors mb-2">
                        {post.title.rendered}
                      </h4>
                      <span className="text-slate-500 text-xs font-medium">
                        {fmtDate(post.date)}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Newsletter / Promo Box */}
              <div className="mt-8 bg-indigo-50 rounded-2xl p-6 border border-indigo-100 text-center">
                <Star className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
                <h4 className="font-bold text-slate-900 mb-2">Join the Inner Circle</h4>
                <p className="text-sm text-slate-600 mb-4">Get the latest insights delivered straight to your inbox.</p>
                <button className="w-full bg-indigo-600 text-white font-bold py-2.5 rounded-lg hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200">
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 3. SECTION: SOFTWARE & TECH DEEP DIVES (Clean Cards) ── */}
      {techPosts.length > 0 && (
        <section className="py-16 md:py-24">
          <Container>
            <SectionHeading icon={MonitorSmartphone} title="Tech & Tools" subtitle="In-depth reviews and software that drives results." />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {techPosts.map((post, idx) => (
                <Link key={idx} href={`/${post.slug}`} className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-indigo-100 hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] transition-all duration-300">
                  <div className="relative h-56 overflow-hidden bg-slate-100">
                    {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
                      <img 
                        src={post._embedded["wp:featuredmedia"][0].source_url} 
                        alt={post.title.rendered}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    )}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-indigo-700 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                      Review
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-indigo-600 leading-snug">
                      {post.title.rendered}
                    </h3>
                    <p className="text-slate-600 text-sm line-clamp-2 mb-5 flex-1">
                      {stripHtml(post.excerpt.rendered)}
                    </p>
                    <div className="flex items-center text-sm font-bold text-indigo-600">
                      Read Breakdown <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ── 4. SECTION: GROWTH STRATEGIES (Image Heavy Grid) ── */}
      {strategyPosts.length > 0 && (
        <section className="py-16 md:py-24 bg-slate-900 text-white">
          <Container>
            <div className="mb-10 flex flex-col items-center text-center">
              <Lightbulb className="w-8 h-8 text-emerald-400 mb-3" />
              <h2 className="text-3xl md:text-4xl font-black tracking-tight font-serif mb-3">Growth Strategies</h2>
              <p className="text-slate-400 max-w-2xl text-lg">Actionable tactics to scale your business and outsmart the competition.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {strategyPosts.map((post, idx) => (
                <Link key={idx} href={`/${post.slug}`} className="group relative h-80 rounded-2xl overflow-hidden bg-slate-800 flex flex-col justify-end">
                  {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
                      <img 
                        src={post._embedded["wp:featuredmedia"][0].source_url} 
                        alt={post.title.rendered} 
                        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700 ease-out"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                    <div className="relative z-10 p-6">
                      <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-2 block">
                        Masterclass
                      </span>
                      <h3 className="text-lg font-bold text-white line-clamp-3 leading-snug group-hover:text-emerald-300 transition-colors">
                        {post.title.rendered}
                      </h3>
                    </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ── 5. LATEST ARTICLES (Classic Feed Layout - FIXED IMAGES) ── */}
      <section className="py-16 md:py-24 bg-slate-50">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* LATEST POSTS FEED (Main Column) */}
            <div className="lg:col-span-8">
              <SectionHeading icon={Flame} title="Latest Drops" />
              <div className="space-y-8">
                {latestPosts.map((post, idx) => (
                  <Link key={idx} href={`/${post.slug}`} className="group flex flex-col md:flex-row gap-6 items-start bg-white p-4 rounded-2xl border border-slate-100 hover:shadow-lg hover:shadow-slate-200/50 transition-all">
                    {/* Fixed Height constraint so absolute images don't collapse */}
                    <div className="relative w-full md:w-64 h-56 md:h-48 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                      {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
                        <img 
                          src={post._embedded["wp:featuredmedia"][0].source_url} 
                          alt={post.title.rendered}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                    </div>
                    <div className="flex-1 py-2 pr-4">
                      <span className="text-slate-500 text-xs font-semibold mb-2 block">
                        {fmtDate(post.date)}
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 leading-snug group-hover:text-indigo-600 transition-colors font-serif">
                        {post.title.rendered}
                      </h3>
                      <p className="text-slate-600 text-sm line-clamp-2 md:line-clamp-3 mb-4 leading-relaxed">
                        {stripHtml(post.excerpt.rendered)}
                      </p>
                      <span className="inline-flex items-center text-sm font-bold text-indigo-600">
                        Read Article <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* SIDEBAR: EDITOR'S PICKS */}
            <aside className="lg:col-span-4">
              <div className="sticky top-8">
                <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm">
                  <h3 className="text-xl font-black text-slate-900 mb-6 font-serif border-b border-slate-100 pb-4">
                    Editor Picks
                  </h3>
                  <div className="space-y-6">
                    {editorPicks.map((post, i) => (
                      <Link key={i} href={`/${post.slug}`} className="group flex gap-4 items-center">
                        <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-slate-100 relative">
                          {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
                            <img 
                              src={post._embedded["wp:featuredmedia"][0].source_url} 
                              alt={post.title.rendered} 
                              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          )}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 line-clamp-2 leading-snug mb-1">
                            {post.title.rendered}
                          </h4>
                          <span className="text-xs text-slate-500">
                            {fmtDate(post.date)}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

          </div>
        </Container>
      </section>

    </main>
  );
}