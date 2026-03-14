"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Container } from "@/components/ui/container";
import { Search, MapPin, Compass, Camera, Coffee, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const WP_API_URL = 'https://cms.clubmytrip.com/wp-json/wp/v2';

interface Category {
  id: number;
  name: string;
  slug: string;
  count: number;
  description?: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        // Fetching more categories to show full list
        const res = await fetch(`${WP_API_URL}/categories?per_page=100&orderby=count&order=desc`);
        if (res.ok) {
          const data = await res.json();
          // Filter empty and uncategorized
          const filtered = data.filter((c: Category) => 
            c.count > 0 && c.slug !== 'uncategorized'
          );
          setCategories(filtered);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCategories();
  }, []);

  // Filter logic
  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Helper to get random gradients or images based on index
  const getGradient = (index: number) => {
    const gradients = [
      "from-emerald-500 to-teal-500",
      "from-blue-500 to-indigo-500",
      "from-orange-500 to-red-500",
      "from-purple-500 to-pink-500",
      "from-cyan-500 to-blue-500",
      "from-yellow-400 to-orange-500",
    ];
    return gradients[index % gradients.length];
  };

  // Helper for icons (random assignment for visual variety if no specific logic)
  const getIcon = (index: number) => {
    const icons = [Compass, MapPin, Camera, Coffee];
    const IconComponent = icons[index % icons.length];
    return <IconComponent className="w-6 h-6 text-white" />;
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* 1. Header Section */}
      <div className="bg-gray-50 border-b border-gray-200 py-16">
        <Container>
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
              Explore by Interest
            </h1>
            <p className="text-lg text-gray-600">
              Find the perfect travel guide for your next adventure. Browse our curated collections below.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search categories (e.g. Beaches, Solo Travel)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-11 pr-4 py-3 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition duration-150 ease-in-out sm:text-sm shadow-sm"
              />
            </div>
          </div>
        </Container>
      </div>

      {/* 2. Categories Grid */}
      <Container className="pt-12">
        {isLoading ? (
          // Skeleton Loader
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-40 bg-gray-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : filteredCategories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category, index) => (
              <Link 
                key={category.id} 
                href={`/blogs?category=${category.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white flex flex-col h-full"
              >
                {/* Header with Gradient */}
                <div className={`h-24 bg-gradient-to-r ${getGradient(index)} p-6 flex items-start justify-between`}>
                  <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                    {getIcon(index)}
                  </div>
                  <span className="bg-black/20 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                    {category.count} Articles
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {category.description || `Discover the best guides and tips about ${category.name}. Curated for travelers.`}
                    </p>
                  </div>
                  
                  <div className="mt-6 flex items-center text-sm font-semibold text-gray-900 group-hover:gap-2 transition-all">
                    Browse Articles <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">No categories found</h3>
            <p className="text-gray-500">Try adjusting your search terms.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => setSearchQuery('')}
            >
              Clear Search
            </Button>
          </div>
        )}
      </Container>
    </div>
  );
}
