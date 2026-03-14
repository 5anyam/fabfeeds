// src/components/BrandAdBanners.tsx
"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";

const BrandAdBanners = () => {
  const banners = [
    {
      id: 1,
      label: 'Sponsored',
      brand: 'MakeMyTrip',
      line: 'Up to 40% OFF on Flights & Hotels',
      cta: 'Book on MakeMyTrip',
      href: 'https://www.makemytrip.com/',
      image: 'https://logos-world.net/wp-content/uploads/2022/01/MakeMyTrip-Logo.png',
      tag: 'FLIGHTS • HOTELS',
    },
    {
      id: 2,
      label: 'Sponsored',
      brand: 'Booking.com',
      line: 'Genius discounts on stays worldwide',
      cta: 'Search Stays',
      href: 'https://www.booking.com/',
      image: 'https://seeklogo.com/images/B/booking-com-logo-680F0C4EAA-seeklogo.com.png',
      tag: 'HOTELS • APARTMENTS',
    },
    {
      id: 3,
      label: 'Sponsored',
      brand: 'Airbnb',
      line: 'Unique homes & stays globally',
      cta: 'Find an Airbnb',
      href: 'https://www.airbnb.com/',
      image: 'https://seeklogo.com/images/A/airbnb-logo-6F3C10B460-seeklogo.com.png',
      tag: 'HOMESTAYS • VILLAS',
    },
  ];

  return (
    <Section className="bg-[#f8fafc] py-4 md:py-5 border-b border-slate-200/70">
      <Container>
        <div className="flex md:grid md:grid-cols-3 gap-3 md:gap-4 overflow-x-auto no-scrollbar -mx-2 px-2 md:mx-0 md:px-0">
          {banners.map((banner) => (
            <a
              key={banner.id}
              href={banner.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group min-w-[280px] md:min-w-0 bg-white border border-slate-200/80 hover:border-emerald-500/70 rounded-2xl px-3.5 py-3 md:px-4 md:py-3.5 flex items-center gap-3 shadow-[0_1px_2px_rgba(15,23,42,0.06)] hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl bg-slate-50 flex items-center justify-center overflow-hidden border border-slate-200/80">
                <img
                  src={banner.image}
                  alt={banner.brand}
                  className="max-h-8 md:max-h-9 w-auto object-contain"
                  loading="lazy"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[10px] uppercase tracking-[0.16em] text-slate-400 font-semibold">
                    {banner.label}
                  </span>
                  <span className="inline-flex items-center text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-medium">
                    {banner.tag}
                  </span>
                </div>
                <p className="text-xs md:text-sm font-semibold text-slate-900 truncate">
                  {banner.brand} · <span className="font-normal text-slate-600">{banner.line}</span>
                </p>
                <p className="text-[11px] text-emerald-600 font-semibold mt-0.5 flex items-center gap-1 group-hover:underline">
                  {banner.cta}
                  <ArrowRight className="w-3 h-3" />
                </p>
              </div>
            </a>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default BrandAdBanners;
