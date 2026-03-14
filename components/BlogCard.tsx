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
  const categoryName = post._embedded?.["wp:term"]?.[0]?.[0]?.name || "Article";

  return (
    <Link href={`/${post.slug}`} className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={imageAlt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-xs font-medium">
            No Image
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-cyan-700 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm">
            {categoryName}
          </span>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-extrabold text-gray-900 line-clamp-2 leading-snug mb-2 group-hover:text-cyan-600 transition-colors">
          {post.title.rendered}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-grow leading-relaxed">
          {stripHtml(post.excerpt.rendered)}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
          <span className="text-xs font-semibold text-gray-400">
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric"
            })}
          </span>
          <span className="flex items-center gap-1 text-xs font-bold text-orange-500 group-hover:text-orange-600 transition-colors">
            Read <ArrowUpRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}