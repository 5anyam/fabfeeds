"use client";

import Link from "next/link";
import {
  ArrowRight, ArrowUpRight, Flame, Clock, Zap, Target, Waves,
  MonitorPlay, Briefcase
} from "lucide-react";
import { useEffect, useState } from "react";

/* ══════════════════════════════════════════════════════════════
   CONFIG & UTILS
══════════════════════════════════════════════════════════════ */
const WP_API_URL = "https://chocolate-zebra-912190.hostingersite.com/wp-json/wp/v2";

const stripHtml = (h: string) =>
  h.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();

const fmtDate = (d: string) =>
  new Date(d).toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
  });

/* ══════════════════════════════════════════════════════════════
   UI WRAPPERS
══════════════════════════════════════════════════════════════ */
function Container({ children }: { children: React.ReactNode }) {
  return <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">{children}</div>;
}

function SectionHeading({ icon: Icon, title, subtitle }: { icon: any, title: string, subtitle?: string }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <Icon className="w-7 h-7 text-cyan-400" />
      <h2 className="text-2xl md:text-3xl font-black uppercase tracking-wider text-white">
        {title} {subtitle && <span className="text-cyan-100/60 font-light">/ {subtitle}</span>}
      </h2>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════════ */
export default function InfluencerSharkPage() {
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
      <div className="min-h-screen bg-[#020813] flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin" />
      </div>
    );
  }

  // Splitting posts for different sections
  const heroPost = featuredPosts[0];
  const secondaryPosts = featuredPosts.slice(1, 4);
  const trendingSidebar = featuredPosts.slice(2, 8);
  
  const softwarePosts = allPosts.slice(0, 3);
  const strategyPosts = allPosts.slice(3, 7);
  const latestPosts = allPosts.slice(7, 15);

  return (
    <main className="bg-[#020813] text-slate-200 min-h-screen font-sans selection:bg-cyan-500/30 pb-20">
      
      {/* ── OCEAN BACKGROUND EFFECTS ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-900/10 blur-[150px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-cyan-900/10 blur-[150px]" />
      </div>

      <div className="relative z-10">
        {/* ── 1. THE SHARK RADAR (TICKER) ── */}
        <div className="bg-[#050b14] border-b border-cyan-900/40 py-2">
          <div className="flex items-center max-w-[1400px] mx-auto px-4">
            <span className="shrink-0 bg-cyan-400 text-[#020813] text-[10px] font-black uppercase tracking-widest px-3 py-1 mr-4 flex items-center gap-1 shadow-[0_0_15px_rgba(34,211,238,0.4)]">
              <Zap className="w-3 h-3" /> Radar
            </span>
            <div className="overflow-hidden flex-1">
              <div className="flex gap-8 whitespace-nowrap animate-[ticker_30s_linear_infinite]">
                {[...allPosts, ...allPosts].map((p, i) => (
                  <Link key={i} href={`/${p.slug}`} className="text-sm text-white hover:text-cyan-300 font-bold tracking-wide transition-colors">
                    <span className="text-cyan-500 mr-2">◆</span> {p.title.rendered}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── 2. THE DEEP END (HERO MAGAZINE GRID) ── */}
        <section className="py-10 border-b border-white/10">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
              {/* Main Hero Story */}
              {heroPost && (
                <Link href={`/${heroPost.slug}`} className="lg:col-span-8 group relative h-[500px] overflow-hidden bg-[#0a1220] flex flex-col justify-end rounded-xl border border-white/5 hover:border-cyan-500/50 transition-all">
                  {heroPost._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
                    <img 
                      src={heroPost._embedded["wp:featuredmedia"][0].source_url} 
                      alt="Hero" 
                      className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-luminosity group-hover:scale-105 group-hover:opacity-70 group-hover:mix-blend-normal transition-all duration-700"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020813] via-[#020813]/80 to-transparent" />
                  
                  <div className="relative z-10 p-8 md:p-12 border-l-4 border-cyan-400 m-4 backdrop-blur-md bg-[#020813]/60 rounded-r-lg">
                    <span className="bg-cyan-400 text-[#020813] text-[11px] font-black uppercase tracking-widest px-3 py-1.5 mb-4 inline-block shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                      Apex Pick
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4 group-hover:text-cyan-300 transition-colors">
                      {heroPost.title.rendered}
                    </h2>
                    <p className="text-slate-200 text-sm md:text-lg line-clamp-2 max-w-2xl font-medium">
                      {stripHtml(heroPost.excerpt.rendered)}
                    </p>
                  </div>
                </Link>
              )}

              {/* Sidebar Secondary Stories */}
              <div className="lg:col-span-4 flex flex-col gap-3">
                {secondaryPosts.map((post, i) => (
                  <Link key={i} href={`/${post.slug}`} className="group relative flex-1 min-h-[160px] overflow-hidden bg-[#0a1220] flex flex-col justify-end p-6 rounded-xl border border-white/5 hover:border-cyan-500/30 transition-all">
                     {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
                      <img 
                        src={post._embedded["wp:featuredmedia"][0].source_url} 
                        alt="Secondary" 
                        className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-500"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020813] to-transparent" />
                    <div className="relative z-10">
                      <span className="text-cyan-400 text-[11px] font-black uppercase tracking-widest mb-2 block">
                        Trending #{i + 1}
                      </span>
                      <h3 className="text-xl font-bold text-white leading-snug group-hover:text-cyan-300 transition-colors line-clamp-2">
                        {post.title.rendered}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* ── 3. SECTION: SOFTWARE DEEP DIVES (3 Columns) ── */}
        {softwarePosts.length > 0 && (
          <section className="py-14 bg-[#050b14] border-b border-white/5">
            <Container>
              <SectionHeading icon={MonitorPlay} title="Software Deep Dives" subtitle="Tools That Convert" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {softwarePosts.map((post, idx) => (
                  <Link key={idx} href={`/${post.slug}`} className="group block bg-[#020813] rounded-2xl overflow-hidden border border-cyan-900/30 hover:border-cyan-400 transition-all hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(6,182,212,0.15)]">
                    <div className="relative h-56 overflow-hidden">
                      {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ? (
                        <img 
                          src={post._embedded["wp:featuredmedia"][0].source_url} 
                          alt={post.title.rendered}
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-cyan-900/20" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#020813] to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded backdrop-blur-md">
                          Review
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-black text-white mb-3 line-clamp-2 group-hover:text-cyan-400 leading-snug">
                        {post.title.rendered}
                      </h3>
                      <p className="text-slate-300 text-sm line-clamp-2 mb-4">
                        {stripHtml(post.excerpt.rendered)}
                      </p>
                      <div className="flex items-center text-xs font-bold text-cyan-400 uppercase tracking-widest">
                        Read Full Breakdown <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* ── 4. SECTION: MARKETING STRATEGIES (Grid of 4) ── */}
        {strategyPosts.length > 0 && (
          <section className="py-14 border-b border-white/5">
            <Container>
              <SectionHeading icon={Briefcase} title="Growth Strategies" subtitle="Scale Your Income" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {strategyPosts.map((post, idx) => (
                  <Link key={idx} href={`/${post.slug}`} className="group relative h-72 rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-400/50 transition-all flex flex-col justify-end">
                    {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
                        <img 
                          src={post._embedded["wp:featuredmedia"][0].source_url} 
                          alt="Strategy" 
                          className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-70 group-hover:scale-110 transition-all duration-700"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#020813] via-[#020813]/60 to-transparent" />
                      <div className="relative z-10 p-5">
                        <h3 className="text-lg font-bold text-white line-clamp-3 leading-snug group-hover:text-cyan-300 transition-colors">
                          {post.title.rendered}
                        </h3>
                        <span className="text-cyan-400 text-xs font-medium mt-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          Read Strategy <ArrowUpRight className="w-3 h-3" />
                        </span>
                      </div>
                  </Link>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* ── 5. LATEST BLOGS & TRENDING (MAGAZINE SPLIT) ── */}
        <section className="py-14">
          <Container>
            <SectionHeading icon={Waves} title="The Daily Catch" subtitle="Latest Drops" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              
              {/* LATEST POSTS GRID (Main Column) */}
              <div className="lg:col-span-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {latestPosts.map((post, idx) => (
                    <Link key={idx} href={`/${post.slug}`} className="group bg-[#050b14] rounded-xl overflow-hidden border border-cyan-900/40 hover:border-cyan-500/60 transition-colors shadow-lg">
                      <div className="relative h-52 overflow-hidden bg-[#020813]">
                        {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
                          <img 
                            src={post._embedded["wp:featuredmedia"][0].source_url} 
                            alt={post.title.rendered}
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                          />
                        )}
                        <div className="absolute top-3 left-3 bg-[#020813]/90 backdrop-blur text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 border border-cyan-500/50 rounded">
                          {fmtDate(post.date)}
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-cyan-400 leading-snug">
                          {post.title.rendered}
                        </h3>
                        <p className="text-slate-300 text-sm line-clamp-3 mb-5 leading-relaxed">
                          {stripHtml(post.excerpt.rendered)}
                        </p>
                        <div className="flex items-center text-xs font-black text-cyan-400 uppercase tracking-widest group-hover:text-cyan-300">
                          Read Article <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* SIDEBAR: TOP AFFILIATE OFFERS & TRENDING */}
              <aside className="lg:col-span-4 space-y-8">
                {/* Shark's Prey Box */}
                <div className="bg-gradient-to-br from-[#0a1220] to-[#050b14] border border-cyan-500/30 p-7 rounded-2xl relative overflow-hidden shadow-[0_0_20px_rgba(6,182,212,0.05)]">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-[50px] pointer-events-none" />
                  <h3 className="text-lg font-black uppercase tracking-[0.2em] text-white mb-6 flex items-center gap-3">
                    <Target className="w-5 h-5 text-cyan-400" /> Shark Prey
                  </h3>
                  <div className="space-y-5">
                    {trendingSidebar.map((post, i) => (
                      <Link key={i} href={`/${post.slug}`} className="flex gap-4 items-center group">
                        <span className="text-4xl font-black text-[#1a2b4c] group-hover:text-cyan-600 transition-colors tabular-nums">
                          {i + 1}
                        </span>
                        <div>
                          <h4 className="text-sm font-bold text-slate-100 group-hover:text-cyan-400 line-clamp-2 leading-tight">
                            {post.title.rendered}
                          </h4>
                          <span className="text-[10px] text-cyan-100/60 uppercase tracking-wider mt-1.5 block font-semibold">
                            {post._embedded?.["wp:term"]?.[0]?.[0]?.name || "Featured"}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </aside>

            </div>
          </Container>
        </section>

      </div>
    </main>
  );
}