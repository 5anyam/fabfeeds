// components/BlogCardSkeleton.tsx
export const BlogCardSkeleton = () => {
    return (
      <article className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm animate-pulse">
        {/* Image Skeleton */}
        <div className="relative aspect-[16/10] bg-gray-200" />
        
        {/* Content Skeleton */}
        <div className="p-3.5">
          {/* Title */}
          <div className="space-y-2 mb-3">
            <div className="h-3.5 bg-gray-200 rounded w-full" />
            <div className="h-3.5 bg-gray-200 rounded w-4/5" />
          </div>
          
          {/* Excerpt */}
          <div className="space-y-1.5 mb-3">
            <div className="h-2.5 bg-gray-200 rounded w-full" />
            <div className="h-2.5 bg-gray-200 rounded w-3/4" />
          </div>
          
          {/* Meta */}
          <div className="flex items-center justify-between pt-2.5 border-t border-gray-100">
            <div className="flex gap-2">
              <div className="h-2 bg-gray-200 rounded w-12" />
              <div className="h-2 bg-gray-200 rounded w-8" />
            </div>
            <div className="h-2 bg-gray-200 rounded w-8" />
          </div>
        </div>
      </article>
    );
  };
  