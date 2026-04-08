import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export interface Post {
  id: number;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  slug: string;
  categories: number[];
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url: string; alt_text: string }>;
    "wp:term"?: Array<Array<{ id: number; name: string; slug: string }>>;
  };
}

const stripHtml = (html: string) =>
  html?.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim() || "";

export function BlogCard({ post }: { post: Post }) {
  const imageUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const imageAlt = post._embedded?.["wp:featuredmedia"]?.[0]?.alt_text || post.title.rendered;
  const categoryName = post._embedded?.["wp:term"]?.[0]?.[0]?.name || "Radar Pick";

  return (
    <Link 
      href={`/${post.slug}`} 
      className="group flex flex-col h-full bg-[#050b14] rounded-xl overflow-hidden border border-white/5 hover:border-cyan-500/40 hover:shadow-[0_10px_30px_rgba(34,211,238,0.1)] transition-all duration-500 hover:-translate-y-1 relative"
    >
      {/* Subtle background glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/0 via-transparent to-cyan-500/0 group-hover:to-cyan-500/5 pointer-events-none transition-all duration-500" />

      {/* ── IMAGE SECTION ── */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#020813]">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={imageAlt}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#0a1220] border-b border-white/5">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">
              No Visual Data
            </span>
          </div>
        )}
        
        {/* Dark overlay gradient to blend image into the card body */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050b14] via-transparent to-transparent opacity-80" />

        {/* Category Pill */}
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-[#020813]/80 backdrop-blur-md border border-cyan-500/30 text-cyan-400 text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded shadow-[0_0_10px_rgba(34,211,238,0.2)]">
            {categoryName}
          </span>
        </div>
      </div>
      
      {/* ── CONTENT SECTION ── */}
      <div className="p-6 flex flex-col flex-grow relative z-10">
        <h3 className="text-lg font-black text-white line-clamp-2 leading-snug mb-3 group-hover:text-cyan-400 transition-colors">
          {post.title.rendered}
        </h3>
        
        <p className="text-xs text-slate-400 line-clamp-3 mb-5 flex-grow leading-relaxed font-medium">
          {stripHtml(post.excerpt.rendered)}
        </p>
        
        {/* Footer Data */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-slate-700 group-hover:bg-cyan-500 transition-colors" />
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric"
            })}
          </span>
          <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-cyan-500 group-hover:text-cyan-300 transition-colors">
            Access <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  );
}