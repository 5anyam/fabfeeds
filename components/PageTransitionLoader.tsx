// components/PageTransitionLoader.tsx
"use client"
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

export function PageTransitionLoader() {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsLoading(false);
  }, [pathname, searchParams]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a, button[type="button"]');
      
      if (link) {
        const href = link.getAttribute('href');
        const isExternal = link.getAttribute('target') === '_blank';
        
        if (href && !href.startsWith('#') && !isExternal && !href.startsWith('http')) {
          const currentPath = window.location.pathname;
          
          // Only show loader if navigating to different page
          if (href !== currentPath) {
            setIsLoading(true);
            
            // Fallback timeout
            timeoutId = setTimeout(() => {
              setIsLoading(false);
            }, 10000);
          }
        }
      }
    };

    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999]"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <div className="text-center px-4">
        <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 text-white animate-spin mx-auto mb-3" />
        <p className="text-white text-sm sm:text-lg font-semibold">Loading...</p>
      </div>
    </div>
  );
}
