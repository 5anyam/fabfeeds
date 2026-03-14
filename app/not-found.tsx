import Link from "next/link";
import { Home, Search, Compass, Map, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Container>
        <div className="text-center text-white py-20">
          {/* Large 404 with Icon */}
          <div className="mb-8 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <Compass className="w-32 h-32 text-white/5 animate-spin-slow" />
            </div>
            <h1 className="text-8xl lg:text-9xl font-bold mb-4 relative z-10">
              404
            </h1>
          </div>

          {/* Message */}
          <div className="mb-10 max-w-2xl mx-auto">
            <h2 className="text-2xl lg:text-4xl font-bold mb-4">
              Lost in the Journey?
            </h2>
            <p className="text-base lg:text-lg text-gray-300 leading-relaxed">
              Looks like this destination does not exist. But do not worry, 
              there are plenty of amazing places waiting to be explored!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
            <Button 
              size="lg" 
              asChild 
              className="bg-white text-black hover:bg-gray-200 font-semibold"
            >
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              asChild 
              className="border-2 border-white text-white hover:bg-white hover:text-black font-semibold"
            >
              <Link href="/blogs">
                <Search className="mr-2 h-4 w-4" />
                Browse Articles
              </Link>
            </Button>
          </div>

          {/* Quick Links */}
          <div className="pt-8 border-t border-white/10 max-w-3xl mx-auto">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-6">
              Explore Popular Destinations
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Travel Guides", href: "/blogs", icon: Map },
                { name: "Destinations", href: "/blogs?category=destinations", icon: Compass },
                { name: "Travel Tips", href: "/blogs?category=tips", icon: Search },
                { name: "Contact Us", href: "/contact", icon: Home }
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group p-4 border border-white/10 hover:border-white/30 rounded-lg transition-all hover:bg-white/5"
                >
                  <item.icon className="w-6 h-6 mx-auto mb-2 text-gray-400 group-hover:text-white transition-colors" />
                  <div className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                    {item.name}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Fun Travel Message */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-xs text-gray-500 italic">
              Not all those who wander are lost... but this page definitely is..
              <span className="ml-2">✈️</span>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
