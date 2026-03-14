import Link from "next/link";
import { MapPin, Clock, Briefcase, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface JobCardProps {
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  salary?: string;
  description: string;
  slug: string;
  requirements: string[];
}

export function JobCard({ 
  title, 
  department, 
  location, 
  type, 
  experience, 
  salary, 
  description, 
  slug,
  requirements 
}: JobCardProps) {
  return (
    <Card className="h-full group hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <CardTitle className="text-xl group-hover:text-[#3AA6FF] transition-colors">
            {title}
          </CardTitle>
          <Badge variant="outline" className="ml-2">
            {type}
          </Badge>
        </div>
        <div className="flex items-center text-sm text-gray-600 space-x-4">
          <div className="flex items-center">
            <Briefcase className="h-4 w-4 mr-1" />
            <span>{department}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{location}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{experience}</span>
          </div>
        </div>
        {salary && (
          <div className="text-sm font-medium text-[#3AA6FF]">
            {salary}
          </div>
        )}
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <p className="text-gray-600 leading-relaxed mb-4">{description}</p>
        
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-2">Key Requirements:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {requirements.slice(0, 3).map((req, index) => (
              <li key={index} className="flex items-start">
                <span className="text-[#3AA6FF] mr-2">•</span>
                {req}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mt-auto">
          <Button asChild className="w-full bg-[#3AA6FF] hover:bg-[#2690E6] text-white">
            <Link href={`/career/${slug}`}>
              Apply Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}