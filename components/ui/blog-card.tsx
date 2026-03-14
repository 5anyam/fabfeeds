import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BlogCardProps {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  author: string;
  tags: string[];
  coverImage?: string;
  readTime?: string;
}

export function BlogCard({ 
  title, 
  excerpt, 
  slug, 
  date, 
  author, 
  tags, 
  coverImage,
  readTime 
}: BlogCardProps) {
  return (
    <Card className="h-full group hover:shadow-lg transition-shadow">
      {coverImage && (
        <div className="aspect-video bg-gradient-to-r from-[#3AA6FF] to-[#2690E6] rounded-t-lg"></div>
      )}
      <CardHeader className="pb-3">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{date}</span>
          <span className="mx-2">•</span>
          <User className="h-4 w-4 mr-1" />
          <span>{author}</span>
          {readTime && (
            <>
              <span className="mx-2">•</span>
              <span>{readTime}</span>
            </>
          )}
        </div>
        <h3 className="text-xl font-semibold group-hover:text-[#3AA6FF] transition-colors">
          <Link href={`/blogs/${slug}`}>{title}</Link>
        </h3>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <p className="text-gray-600 leading-relaxed flex-1 mb-4">{excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <Link 
            href={`/blogs/${slug}`}
            className="text-[#3AA6FF] hover:text-[#2690E6] flex items-center text-sm font-medium"
          >
            Read more
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}