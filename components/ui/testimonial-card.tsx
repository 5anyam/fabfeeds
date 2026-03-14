import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface TestimonialCardProps {
  name: string;
  company: string;
  rating: number;
  testimonial: string;
}

export function TestimonialCard({ name, company, rating, testimonial }: TestimonialCardProps) {
  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
          ))}
        </div>
        <p className="text-gray-600 leading-relaxed mb-6 italic">
          "{testimonial}"
        </p>
        <div>
          <div className="font-semibold text-gray-900">{name}</div>
          <div className="text-sm text-[#3AA6FF]">{company}</div>
        </div>
      </CardContent>
    </Card>
  );
}