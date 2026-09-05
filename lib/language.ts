const WP_API_URL = "https://chocolate-zebra-912190.hostingersite.com/wp-json/wp/v2";

export interface Language {
  id: number;
  name: string;
  slug: string;
  count?: number;
}

export const DEFAULT_LANGUAGE_SLUG = "english";

/**
 * Fetches all language terms once per page load and shares the result across
 * every caller. Returns [] if the "Fab Feeds — Language Filter" WordPress
 * plugin isn't installed/activated yet — callers should treat an empty list
 * as "no language filtering available" and just fetch posts unfiltered.
 */
let languagesPromise: Promise<Language[]> | null = null;
export function fetchLanguages(): Promise<Language[]> {
  if (!languagesPromise) {
    languagesPromise = fetch(`${WP_API_URL}/languages?per_page=50`)
      .then((r) => (r.ok ? r.json() : []))
      .catch(() => []);
  }
  return languagesPromise;
}

/** Term id for a given language slug (e.g. "english"), or null if not found
 *  (including when the plugin isn't installed). */
export async function getLanguageId(slug: string): Promise<number | null> {
  const langs = await fetchLanguages();
  const match = langs.find((l) => l.slug === slug);
  return match ? match.id : null;
}
