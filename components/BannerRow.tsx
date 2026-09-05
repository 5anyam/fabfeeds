"use client";

import { useEffect, useState } from "react";

const WP_API_URL = "https://chocolate-zebra-912190.hostingersite.com/wp-json/wp/v2";

interface BannerPost {
  id: number;
  title: { rendered: string };
  meta?: { fabfeeds_banner_link?: string };
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url: string; alt_text?: string }>;
    "wp:term"?: Array<Array<{ id: number; slug: string; taxonomy: string }>>;
  };
}

/* Fetched once per page load and shared across every <BannerRow> on the page. */
let bannersPromise: Promise<BannerPost[]> | null = null;
function fetchAllBanners(): Promise<BannerPost[]> {
  if (!bannersPromise) {
    bannersPromise = fetch(`${WP_API_URL}/fabfeeds_banner?_embed&per_page=50&status=publish`)
      .then((r) => (r.ok ? r.json() : []))
      .catch(() => []);
  }
  return bannersPromise;
}

function bannerLocationSlug(banner: BannerPost): string | undefined {
  for (const group of banner._embedded?.["wp:term"] || []) {
    const term = group.find((t) => t.taxonomy === "banner_location");
    if (term) return term.slug;
  }
  return undefined;
}

function BannerCard({ banner }: { banner: BannerPost }) {
  const img = banner._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const alt = banner._embedded?.["wp:featuredmedia"]?.[0]?.alt_text || banner.title?.rendered || "Sponsored";
  const link = banner.meta?.fabfeeds_banner_link;
  if (!img) return null;

  const square = (
    <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
      <img src={img} alt={alt} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
    </div>
  );

  return link ? (
    <a
      href={link}
      target="_blank"
      rel="noopener sponsored"
      className="block group hover:opacity-90 transition-opacity"
    >
      {square}
    </a>
  ) : (
    square
  );
}

/**
 * Renders whichever of the 4 banners in `group` ("home" or "blog") are
 * configured in WordPress (Banners → Banner Location: home-1..4 / blog-1..4).
 * Renders nothing if none are set up yet for that group.
 */
export function BannerRow({ group, className = "" }: { group: "home" | "blog"; className?: string }) {
  const [banners, setBanners] = useState<BannerPost[]>([]);

  useEffect(() => {
    let active = true;
    fetchAllBanners().then((all) => {
      if (!active) return;
      const slots = [1, 2, 3, 4].map((n) => `${group}-${n}`);
      const matches = slots
        .map((slot) => all.find((b) => bannerLocationSlug(b) === slot))
        .filter((b): b is BannerPost => Boolean(b));
      setBanners(matches);
    });
    return () => {
      active = false;
    };
  }, [group]);

  if (banners.length === 0) return null;

  return (
    <div className={className}>
      <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400 mb-3 block">
        Sponsored
      </span>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {banners.map((b) => (
          <BannerCard key={b.id} banner={b} />
        ))}
      </div>
    </div>
  );
}
