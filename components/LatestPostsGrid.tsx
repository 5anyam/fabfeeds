import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlogCard, Post } from "./BlogCard";

interface LatestPostsGridProps {
  posts: Post[];
  isLoading?: boolean;
  title?: string;
  showViewAll?: boolean;
  viewAllLink?: string;
}

export function LatestPostsGrid({
  posts,
  isLoading = false,
  title = "Latest Articles",
  showViewAll = false,
  viewAllLink = "/blogs",
}: LatestPostsGridProps) {
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gray-100 rounded-2xl h-80 animate-pulse" />
        ))}
      </div>
    );
  }

  if (!posts?.length) return null;

  return (
    <div className="w-full">
      {title && (
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">{title}</h2>
          {showViewAll && viewAllLink && (
            <Link
              href={viewAllLink}
              className="text-sm font-bold text-cyan-600 hover:text-orange-500 transition-colors flex items-center gap-1"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}