"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  Menu, X, ChevronDown, Waves, Zap, Flame,
  ArrowUpRight, Sparkles, Heart, Utensils, 
  Compass, Laptop, TrendingUp, LucideIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

// ── TYPESCRIPT INTERFACES ──
type SubMenuItem = {
  name: string;
  href: string;
};

type DropdownCategory = {
  category: string;
  icon: LucideIcon;
  desc: string;
  items: SubMenuItem[];
};

type NavItem = {
  name: string;
  href: string;
  icon?: LucideIcon;
  hasDropdown?: boolean;
  dropdownItems?: DropdownCategory[];
};

// ── BLOG NAVIGATION ──
const navigation: NavItem[] = [
  { name: "Home", href: "/" },
  {
    name: "Categories",
    href: "/blogs",
    hasDropdown: true,
    dropdownItems: [
      {
        category: "Style & Beauty",
        icon: Sparkles,
        desc: "Fashion & lifestyle trends",
        items: [
          { name: "Fashion",   href: "/blogs?category=fashion" },
          { name: "Beauty",    href: "/blogs?category=beauty" },
          { name: "Lifestyle", href: "/blogs?category=lifestyle" },
        ],
      },
      {
        category: "Health & Life",
        icon: Heart,
        desc: "Wellness & modern living",
        items: [
          { name: "Health",        href: "/blogs?category=health" },
          { name: "Relationship",  href: "/blogs?category=relationship" },
          { name: "Home Decor",    href: "/blogs?category=home-decor" },
        ],
      },
      {
        category: "Food & Dining",
        icon: Utensils,
        desc: "Recipes & top restaurants",
        items: [
          { name: "Recipes",      href: "/blogs?category=recipes" },
          { name: "Restaurants",  href: "/blogs?category=restaurants" },
          { name: "Diet Plans",   href: "/blogs?category=diet" },
        ],
      },
      {
        category: "Travel & Auto",
        icon: Compass,
        desc: "Destinations & rides",
        items: [
          { name: "Destinations",  href: "/blogs?category=destinations" },
          { name: "Automotive",    href: "/blogs?category=automotive" },
          { name: "Travel Guides", href: "/blogs?category=travel-guides" },
        ],
      },
      {
        category: "Tech & Gear",
        icon: Laptop,
        desc: "Gadgets & digital life",
        items: [
          { name: "Gadgets",      href: "/blogs?category=gadgets" },
          { name: "Software",     href: "/blogs?category=software" },
          { name: "AI Trends",    href: "/blogs?category=ai-trends" },
        ],
      },
      {
        category: "Business & More",
        icon: TrendingUp,
        desc: "Markets & entrepreneurship",
        items: [
          { name: "Business",     href: "/blogs?category=business" },
          { name: "Ecommerce",    href: "/blogs?category=ecommerce" },
          { name: "Finance",      href: "/blogs?category=finance" },
        ],
      },
    ],
  },
  { name: "Trending",       href: "/trending", icon: Flame },
  { name: "Buying Guides",  href: "/blogs?filter=buying-guides" },
];

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setIsOpen(false); setActiveDropdown(null); }, [pathname]);

  const handleMouseEnter = (name: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setActiveDropdown(name);
  };
  
  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  const isActive = (href: string) => 
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm py-3"
            : "bg-white border-b border-slate-100 py-4"
        )}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* ── LOGO (Structure kept same, adapted for Light Theme) ── */}
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="justify-center shadow-sm">
                <img src="/fabfeeds_logo.png" alt="fabfeeds-logo" className="h-16" />
              </div>
            </Link>

            {/* ── DESKTOP NAVIGATION ── */}
            <nav className="hidden lg:flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-full px-2 py-1.5">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.hasDropdown && handleMouseEnter(item.name)}
                  onMouseLeave={() => item.hasDropdown && handleMouseLeave()}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300",
                      isActive(item.href) && !item.hasDropdown
                        ? "bg-indigo-50 text-indigo-700 border border-indigo-100 shadow-sm"
                        : "text-slate-600 hover:text-indigo-600 hover:bg-slate-100",
                      activeDropdown === item.name && "text-indigo-700 bg-slate-100"
                    )}
                  >
                    {item.name === "Trending" && <Flame className="w-3.5 h-3.5 text-emerald-500" />}
                    {item.name}
                    {item.hasDropdown && (
                      <ChevronDown
                        className={cn(
                          "w-3 h-3 ml-1 transition-transform duration-200",
                          activeDropdown === item.name ? "rotate-180 text-indigo-600" : "text-slate-400"
                        )}
                      />
                    )}
                  </Link>

                  {/* ── MEGA DROPDOWN (Premium Editorial Style) ── */}
                  {item.hasDropdown && activeDropdown === item.name && (
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[780px] bg-white rounded-2xl shadow-[0_20px_40px_rgb(0,0,0,0.08)] border border-slate-100 overflow-hidden z-50"
                      onMouseEnter={() => handleMouseEnter(item.name)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="p-8 grid grid-cols-3 gap-x-8 gap-y-10 relative z-10">
                        {item.dropdownItems?.map((cat) => {
                          const Icon = cat.icon;
                          return (
                            <div key={cat.category} className="space-y-4">
                              <div className="pb-3 border-b border-slate-100">
                                <div className="flex items-center gap-2 mb-1">
                                  <div className="w-6 h-6 rounded bg-indigo-50 flex items-center justify-center border border-indigo-100/50">
                                    <Icon className="w-3.5 h-3.5 text-indigo-600" />
                                  </div>
                                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-900">
                                    {cat.category}
                                  </h3>
                                </div>
                                <p className="text-[10px] text-slate-500 font-medium ml-8">{cat.desc}</p>
                              </div>
                              <ul className="space-y-2 ml-1">
                                {cat.items.map((sub) => (
                                  <li key={sub.name}>
                                    <Link
                                      href={sub.href}
                                      className="group flex items-center text-xs font-semibold text-slate-600 hover:text-indigo-600 py-1 transition-colors"
                                    >
                                      <span className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-indigo-500 mr-2.5 transition-colors" />
                                      {sub.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          );
                        })}
                      </div>
                      
                      {/* Dropdown Footer */}
                      <div className="bg-slate-50 border-t border-slate-100 px-8 py-5 flex items-center justify-between relative z-10">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                          <Zap className="w-3.5 h-3.5 text-emerald-500" /> Dive into the latest stories
                        </span>
                        <Link
                          href="/blogs"
                          className="text-[10px] font-black uppercase tracking-widest text-white bg-indigo-600 hover:bg-indigo-700 px-5 py-2.5 rounded-md shadow-md shadow-indigo-200 transition-all flex items-center gap-1"
                        >
                          View All Articles <ArrowUpRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* ── RIGHT CTA & MOBILE TOGGLE ── */}
            <div className="flex items-center gap-4">
              <Link
                href="/blogs"
                className="hidden lg:flex items-center gap-2 text-xs font-black uppercase tracking-widest text-indigo-700 bg-indigo-50 border border-indigo-200 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 px-5 py-2.5 rounded-md transition-all duration-300 shadow-sm"
              >
                Start Reading
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <button
                className="lg:hidden text-slate-900 hover:text-indigo-600 p-1 transition-colors"
                onClick={() => setIsOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ── MOBILE MENU DRAWER ── */}
      <div
        className={cn(
          "fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm lg:hidden transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={cn(
          "fixed top-0 right-0 h-full w-[300px] max-w-[85vw] bg-white border-l border-slate-200 z-[70] flex flex-col lg:hidden transition-transform duration-300 ease-out shadow-2xl",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 shrink-0">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600">
            Menu
          </span>
          <button
            className="text-slate-400 hover:text-slate-900 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-4 space-y-2">
          {navigation.map((item) => (
            <div key={item.name}>
              {!item.hasDropdown ? (
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 text-sm font-bold uppercase tracking-wider rounded-lg transition-colors",
                    isActive(item.href)
                      ? "bg-indigo-50 text-indigo-700 border border-indigo-100"
                      : "text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name === "Trending" && <Flame className="w-4 h-4 text-emerald-500" />}
                  {item.name}
                </Link>
              ) : (
                <>
                  <button
                    className="flex items-center justify-between w-full px-4 py-3 text-sm font-bold uppercase tracking-wider text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-lg transition-colors"
                    onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                  >
                    <span>{item.name}</span>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 transition-transform duration-200",
                        activeDropdown === item.name ? "rotate-180 text-indigo-600" : "text-slate-400"
                      )}
                    />
                  </button>

                  {activeDropdown === item.name && (
                    <div className="mt-2 mb-4 space-y-5 px-4 py-4 bg-slate-50 rounded-lg border border-slate-100">
                      {item.dropdownItems?.map((cat) => {
                        const Icon = cat.icon;
                        return (
                          <div key={cat.category}>
                            <div className="flex items-center gap-2 mb-2">
                              <Icon className="w-3.5 h-3.5 text-indigo-500" />
                              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-900">
                                {cat.category}
                              </h4>
                            </div>
                            <div className="space-y-1 pl-5 border-l border-slate-200">
                              {cat.items.map((sub) => (
                                <Link
                                  key={sub.name}
                                  href={sub.href}
                                  className="block px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
                                  onClick={() => setIsOpen(false)}
                                >
                                  {sub.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        <div className="p-6 border-t border-slate-100 bg-slate-50 shrink-0">
          <Link
            href="/blogs"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center gap-2 w-full text-xs font-black uppercase tracking-widest text-white bg-indigo-600 hover:bg-indigo-700 py-3.5 rounded-md shadow-md shadow-indigo-200 transition-all"
          >
            Browse Articles
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </>
  );
}