"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  Menu, X, ChevronDown, Flame, Sparkles,
  ArrowUpRight, TrendingUp, Compass, ShoppingBag,
  Utensils, Heart, Laptop, MapPin,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

// ── Navbar ke navigation array mein Categories dropdown update karo ──

const navigation = [
  { name: "Home", href: "/" },
  {
    name: "Categories",
    href: "/blogs",
    hasDropdown: true,
    dropdownItems: [
      {
        category: "Style & Beauty",
        icon: Sparkles,         // already imported
        color: "text-pink-600",
        bg: "bg-pink-50",
        items: [
          { name: "Fashion",   href: "/blogs?category=fashion" },
          { name: "Beauty",    href: "/blogs?category=beauty" },
          { name: "Lifestyle", href: "/blogs?category=lifestyle" },
          { name: "Diet",      href: "/blogs?category=diet" },
        ],
      },
      {
        category: "Health & Life",
        icon: Heart,            // already imported
        color: "text-rose-600",
        bg: "bg-rose-50",
        items: [
          { name: "Health",        href: "/blogs?category=health" },
          { name: "Relationship",  href: "/blogs?category=relationship" },
          { name: "Food",          href: "/blogs?category=food" },
          { name: "Home Decor",    href: "/blogs?category=home-decor" },
        ],
      },
      {
        category: "Travel & Auto",
        icon: MapPin,           // already imported
        color: "text-teal-600",
        bg: "bg-teal-50",
        items: [
          { name: "Travel",        href: "/blogs?category=travel" },
          { name: "Automotive",    href: "/blogs?category=automotive" },
          { name: "Buying Guides", href: "/blogs?filter=buying-guides" },
          { name: "Best Picks",    href: "/blogs?category=best-picks" },
        ],
      },
      {
        category: "Business & More",
        icon: ShoppingBag,      // already imported
        color: "text-orange-600",
        bg: "bg-orange-50",
        items: [
          { name: "Business",   href: "/blogs?category=business" },
          { name: "Ecommerce",  href: "/blogs?category=ecommerce" },
          { name: "Tech",       href: "/blogs?category=tech" },
          { name: "Finance",    href: "/blogs?category=finance" },
        ],
      },
    ],
  },
  { name: "Trending",       href: "/trending" },
  { name: "Buying Guides",  href: "/blogs?filter=buying-guides" },
  { name: "About",          href: "/about" },
  { name: "Contact",        href: "/contact" },
];

/* ══ Navbar ═════════════════════════════════════════════════════════════ */
export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* close mobile menu on route change */
  useEffect(() => { setIsOpen(false); setActiveDropdown(null); }, [pathname]);

  const handleMouseEnter = (name: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setActiveDropdown(name);
  };
  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 120);
  };
  const handleLinkClick = () => {
    setActiveDropdown(null);
    setIsOpen(false);
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <nav
        className={cn(
          "sticky top-0 z-50 bg-white transition-all duration-300",
          isScrolled
            ? "shadow-[0_2px_20px_rgba(0,0,0,0.08)] border-b border-gray-100"
            : "border-b border-gray-100"
        )}
      >
        <Container>
          <div className="flex items-center justify-between h-16">

            {/* ── Logo ── */}
            <Link href="/" className="flex items-center shrink-0" onClick={handleLinkClick}>
              <Image
                src="/trendships_logo.png"
                alt="Trendships"
                width={140}
                height={36}
                className="h-9 w-auto object-contain"
                priority
              />
            </Link>

            {/* ── Desktop Nav ── */}
            <div className="hidden lg:flex items-center gap-0.5">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.hasDropdown && handleMouseEnter(item.name)}
                  onMouseLeave={() => item.hasDropdown && handleMouseLeave()}
                >
                  <Link
                    href={item.href}
                    onClick={() => !item.hasDropdown && handleLinkClick()}
                    className={cn(
                      "flex items-center gap-1 px-3.5 py-2 text-[13px] font-semibold rounded-xl transition-all duration-200",
                      isActive(item.href) && !item.hasDropdown
                        ? "text-teal-600 bg-teal-50"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                      activeDropdown === item.name && "text-gray-900 bg-gray-50"
                    )}
                  >
                    {item.name}
                    {item.hasDropdown && (
                      <ChevronDown
                        className={cn(
                          "w-3.5 h-3.5 transition-transform duration-200",
                          activeDropdown === item.name ? "rotate-180 text-teal-600" : "text-gray-400"
                        )}
                      />
                    )}
                  </Link>

                  {/* ── Desktop Mega Dropdown ── */}
                  {item.hasDropdown && activeDropdown === item.name && (
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[720px] bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-gray-100 overflow-hidden z-50"
                      onMouseEnter={() => handleMouseEnter(item.name)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="p-5 grid grid-cols-4 gap-5">
                        {item.dropdownItems?.map((cat) => {
                          const Icon = cat.icon;
                          return (
                            <div key={cat.category} className="space-y-2.5">
                              <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                                <span className={cn("w-6 h-6 rounded-lg flex items-center justify-center shrink-0", cat.bg)}>
                                  <Icon className={cn("w-3.5 h-3.5", cat.color)} />
                                </span>
                                <h3 className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-500">
                                  {cat.category}
                                </h3>
                              </div>
                              <ul className="space-y-0.5">
                                {cat.items.map((sub) => (
                                  <li key={sub.name}>
                                    <Link
                                      href={sub.href}
                                      onClick={handleLinkClick}
                                      className="block text-[12px] font-medium text-gray-600 hover:text-teal-700 hover:bg-teal-50 px-2.5 py-1.5 rounded-lg transition-all duration-150"
                                    >
                                      {sub.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          );
                        })}
                      </div>

                      {/* Dropdown footer CTA */}
                      <div className="bg-gradient-to-r from-gray-50 to-teal-50/40 border-t border-gray-100 px-5 py-3.5 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-teal-500" />
                          <span className="text-[11px] font-semibold text-gray-500">
                            AI-curated content across all topics
                          </span>
                        </div>
                        <Link
                          href="/blogs"
                          onClick={handleLinkClick}
                          className="inline-flex items-center gap-1.5 text-[11px] font-bold text-teal-600 hover:text-teal-700 bg-white border border-teal-100 hover:border-teal-300 px-3.5 py-1.5 rounded-full transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                          View All Articles
                          <ArrowUpRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* ── Right: Trending CTA + Browse + Mobile toggle ── */}
            <div className="flex items-center gap-2">
              {/* 🔥 Trending Tab — Desktop */}
              <Link
                href="/trending"
                className={cn(
                  "hidden lg:inline-flex items-center gap-1.5 text-[12px] font-bold px-3.5 py-2 rounded-xl transition-all duration-200",
                  pathname === "/trending"
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md shadow-orange-500/25"
                    : "text-orange-600 hover:bg-orange-50 border border-orange-100 hover:border-orange-200"
                )}
              >
                <Flame className={cn("w-3.5 h-3.5", pathname === "/trending" ? "text-white" : "text-orange-500")} />
                Trending
                <span className={cn(
                  "text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full leading-none",
                  pathname === "/trending"
                    ? "bg-white/20 text-white"
                    : "bg-red-500 text-white animate-pulse"
                )}>
                  HOT
                </span>
              </Link>

              {/* Browse CTA — Desktop */}
              <Link
                href="/blogs"
                className="hidden lg:inline-flex items-center gap-1.5 text-[12px] font-bold text-white bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 px-4 py-2 rounded-xl shadow-md shadow-teal-500/20 hover:shadow-teal-500/35 hover:-translate-y-0.5 transition-all duration-200"
                onClick={handleLinkClick}
              >
                Browse Articles
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>

              {/* Mobile menu toggle */}
              <button
                className="lg:hidden flex items-center justify-center w-9 h-9 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </Container>
      </nav>

      {/* ══ Mobile Menu Drawer ══════════════════════════════════════════════ */}
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-[300px] max-w-[85vw] bg-white z-50 shadow-2xl flex flex-col lg:hidden transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-gray-100 shrink-0">
          <span className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">
            Menu
          </span>
          <button
            className="w-8 h-8 flex items-center justify-center rounded-xl text-gray-400 hover:bg-gray-100 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Drawer body */}
        <div className="flex-1 overflow-y-auto py-3">
          {/* 🔥 Trending — mobile highlight */}
          <div className="px-3 mb-3">
            <Link
              href="/trending"
              onClick={handleLinkClick}
              className="flex items-center gap-2.5 w-full bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-3 rounded-xl font-bold text-sm shadow-md shadow-orange-500/20"
            >
              <Flame className="w-4 h-4" />
              What&apos;s Trending
              <span className="ml-auto text-[8px] font-black bg-white/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                Hot
              </span>
            </Link>
          </div>

          {/* Divider */}
          <div className="mx-5 mb-3 border-t border-gray-100" />

          {/* Nav items */}
          {navigation.map((item) => (
            <div key={item.name}>
              {!item.hasDropdown ? (
                <Link
                  href={item.href}
                  onClick={handleLinkClick}
                  className={cn(
                    "flex items-center px-5 py-3 text-[13px] font-semibold transition-colors",
                    isActive(item.href)
                      ? "text-teal-600 bg-teal-50"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  )}
                >
                  {item.name}
                </Link>
              ) : (
                <>
                  <button
                    className="flex items-center justify-between w-full px-5 py-3 text-[13px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() =>
                      setActiveDropdown(activeDropdown === item.name ? null : item.name)
                    }
                  >
                    {item.name}
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 text-gray-400 transition-transform duration-200",
                        activeDropdown === item.name && "rotate-180 text-teal-500"
                      )}
                    />
                  </button>

                  {/* Mobile dropdown */}
                  {activeDropdown === item.name && (
                    <div className="bg-gray-50 border-y border-gray-100 py-3 px-3 space-y-4">
                      {item.dropdownItems?.map((cat) => {
                        const Icon = cat.icon;
                        return (
                          <div key={cat.category}>
                            <div className="flex items-center gap-1.5 mb-1.5 px-2">
                              <Icon className={cn("w-3 h-3", cat.color)} />
                              <span className="text-[9px] font-black uppercase tracking-[0.18em] text-gray-400">
                                {cat.category}
                              </span>
                            </div>
                            <div className="space-y-0.5">
                              {cat.items.map((sub) => (
                                <Link
                                  key={sub.name}
                                  href={sub.href}
                                  onClick={handleLinkClick}
                                  className="block px-3 py-2 text-[12px] font-medium text-gray-600 hover:text-teal-700 hover:bg-white rounded-xl transition-colors"
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

        {/* Drawer footer */}
        <div className="px-4 py-4 border-t border-gray-100 space-y-2.5 shrink-0">
          <Link
            href="/blogs"
            onClick={handleLinkClick}
            className="flex items-center justify-center gap-1.5 w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold text-[13px] py-3 rounded-xl shadow-md shadow-teal-500/20 transition-all hover:-translate-y-0.5"
          >
            Browse All Articles
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
          <p className="text-center text-[9px] text-gray-400 flex items-center justify-center gap-1">
            <Sparkles className="w-2.5 h-2.5 text-teal-400" />
            AI-powered content by Trendships
          </p>
        </div>
      </div>
    </>
  );
}
