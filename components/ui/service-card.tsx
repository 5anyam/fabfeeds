import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ServiceCardProps {
  title: string;
  description: string;
  href: string;
  category?: string;
}

export function ServiceCard({ title, description, href, category }: ServiceCardProps) {
  return (
    <Card className="h-full group hover:shadow-lg transition-shadow">
      <CardHeader>
        {category && (
          <div className="text-xs text-[#3AA6FF] font-medium uppercase tracking-wide mb-2">
            {category}
          </div>
        )}
        <CardTitle className="text-lg group-hover:text-[#3AA6FF] transition-colors">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-4">
          {description}
        </p>
        <Button 
          asChild 
          variant="ghost" 
          size="sm" 
          className="w-fit text-[#3AA6FF] hover:text-[#2690E6] p-0 h-auto"
        >
          <Link href={href} className="flex items-center">
            Learn more
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}