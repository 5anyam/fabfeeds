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

// ── BLOG NAVIGATION (INFLUENCER SHARK THEME) ──
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

export function InfluencerSharkHeader() {
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
          "fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b",
          isScrolled
            ? "bg-[#020813]/95 backdrop-blur-md border-cyan-900/40 shadow-[0_4px_30px_rgba(6,182,212,0.1)] py-3"
            : "bg-[#020813] border-white/5 py-4"
        )}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">

            {/* ── LOGO ── */}
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="w-9 h-9 bg-cyan-500/10 border border-cyan-400/30 rounded flex items-center justify-center group-hover:bg-cyan-500/20 group-hover:border-cyan-400 transition-all shadow-[0_0_15px_rgba(34,211,238,0.2)] group-hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]">
                <Waves className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black uppercase tracking-widest text-white leading-none">
                  Influencer
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-cyan-400 leading-none mt-1">
                  Shark
                </span>
              </div>
            </Link>

            {/* ── DESKTOP NAVIGATION ── */}
            <nav className="hidden lg:flex items-center gap-1 bg-[#0a1220]/50 border border-white/5 rounded-full px-2 py-1.5 backdrop-blur-sm">
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
                        ? "bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 shadow-[0_0_10px_rgba(34,211,238,0.1)]"
                        : "text-slate-300 hover:text-cyan-300 hover:bg-[#0a1220]",
                      activeDropdown === item.name && "text-cyan-300 bg-[#0a1220]"
                    )}
                  >
                    {item.name === "Trending" && <Flame className="w-3.5 h-3.5 text-cyan-500" />}
                    {item.name}
                    {item.hasDropdown && (
                      <ChevronDown
                        className={cn(
                          "w-3 h-3 ml-1 transition-transform duration-200",
                          activeDropdown === item.name ? "rotate-180 text-cyan-400" : "text-slate-500"
                        )}
                      />
                    )}
                  </Link>

                  {/* ── MEGA DROPDOWN (3 Columns, Dark Theme) ── */}
                  {item.hasDropdown && activeDropdown === item.name && (
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[780px] bg-[#050b14] rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-cyan-900/40 overflow-hidden z-50 before:absolute before:inset-0 before:bg-gradient-to-b before:from-cyan-500/5 before:to-transparent before:pointer-events-none"
                      onMouseEnter={() => handleMouseEnter(item.name)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="p-6 grid grid-cols-3 gap-x-6 gap-y-8 relative z-10">
                        {item.dropdownItems?.map((cat) => {
                          const Icon = cat.icon;
                          return (
                            <div key={cat.category} className="space-y-4">
                              <div className="pb-3 border-b border-white/5">
                                <div className="flex items-center gap-2 mb-1">
                                  <div className="w-6 h-6 rounded bg-cyan-950/50 flex items-center justify-center border border-cyan-900/50">
                                    <Icon className="w-3.5 h-3.5 text-cyan-400" />
                                  </div>
                                  <h3 className="text-xs font-black uppercase tracking-widest text-white">
                                    {cat.category}
                                  </h3>
                                </div>
                                <p className="text-[10px] text-slate-400 font-medium ml-8">{cat.desc}</p>
                              </div>
                              <ul className="space-y-1.5 ml-1">
                                {cat.items.map((sub) => (
                                  <li key={sub.name}>
                                    <Link
                                      href={sub.href}
                                      className="group flex items-center text-xs font-semibold text-slate-300 hover:text-cyan-300 py-1 transition-colors"
                                    >
                                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-900 group-hover:bg-cyan-400 mr-2.5 transition-colors shadow-[0_0_5px_rgba(34,211,238,0)] group-hover:shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
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
                      <div className="bg-[#0a1220] border-t border-cyan-900/30 px-6 py-4 flex items-center justify-between relative z-10">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                          <Zap className="w-3.5 h-3.5 text-cyan-500" /> Dive into the latest stories
                        </span>
                        <Link
                          href="/blogs"
                          className="text-[10px] font-black uppercase tracking-widest text-[#020813] bg-cyan-400 hover:bg-cyan-300 px-4 py-2 rounded shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all flex items-center gap-1"
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
                className="hidden lg:flex items-center gap-2 text-xs font-black uppercase tracking-widest text-cyan-300 bg-cyan-950/30 border border-cyan-500/30 hover:bg-cyan-400 hover:text-[#020813] hover:border-cyan-400 px-5 py-2.5 rounded hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-300"
              >
                Start Reading
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <button
                className="lg:hidden text-slate-300 hover:text-cyan-400 p-1 transition-colors"
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
          "fixed inset-0 z-[60] bg-[#020813]/80 backdrop-blur-sm lg:hidden transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={cn(
          "fixed top-0 right-0 h-full w-[300px] max-w-[85vw] bg-[#050b14] border-l border-cyan-900/40 z-[70] flex flex-col lg:hidden transition-transform duration-300 ease-out shadow-2xl",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5 shrink-0">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400">
            Menu
          </span>
          <button
            className="text-slate-400 hover:text-cyan-400 transition-colors"
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
                      ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                      : "text-slate-300 hover:bg-[#0a1220] hover:text-cyan-300"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name === "Trending" && <Flame className="w-4 h-4 text-cyan-500" />}
                  {item.name}
                </Link>
              ) : (
                <>
                  <button
                    className="flex items-center justify-between w-full px-4 py-3 text-sm font-bold uppercase tracking-wider text-slate-300 hover:bg-[#0a1220] hover:text-cyan-300 rounded-lg transition-colors"
                    onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                  >
                    <span>{item.name}</span>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 transition-transform duration-200",
                        activeDropdown === item.name ? "rotate-180 text-cyan-400" : "text-slate-500"
                      )}
                    />
                  </button>

                  {activeDropdown === item.name && (
                    <div className="mt-2 mb-4 space-y-5 px-4 py-4 bg-[#020813] rounded-lg border border-white/5">
                      {item.dropdownItems?.map((cat) => {
                        const Icon = cat.icon;
                        return (
                          <div key={cat.category}>
                            <div className="flex items-center gap-2 mb-2">
                              <Icon className="w-3.5 h-3.5 text-cyan-500" />
                              <h4 className="text-[10px] font-black uppercase tracking-widest text-cyan-400">
                                {cat.category}
                              </h4>
                            </div>
                            <div className="space-y-1 pl-5 border-l border-white/10">
                              {cat.items.map((sub) => (
                                <Link
                                  key={sub.name}
                                  href={sub.href}
                                  className="block px-3 py-1.5 text-xs font-semibold text-slate-400 hover:text-cyan-300 transition-colors"
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

        <div className="p-6 border-t border-white/5 bg-[#020813] shrink-0">
          <Link
            href="/blogs"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center gap-2 w-full text-xs font-black uppercase tracking-widest text-[#020813] bg-cyan-400 hover:bg-cyan-300 py-3.5 rounded shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all"
          >
            Browse Articles
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </>
  );
}