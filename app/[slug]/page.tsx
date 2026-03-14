import { Metadata } from "next";
import { Calendar, Clock, ArrowLeft, Facebook, Twitter, Linkedin, Tag, BookOpen } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

const WP_API_URL = 'https://cms.clubmytrip.com/wp-json/wp/v2';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 3600;

interface WordPressPost {
  id: number;
  date: string;
  modified: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  slug: string;
  categories: number[];
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string; alt_text: string }>;
    author?: Array<{ name: string; description?: string }>;
    'wp:term'?: Array<Array<{ id: number; name: string; slug: string }>>;
  };
}

async function getAllPosts(): Promise<WordPressPost[]> {
  try {
    const res = await fetch(`${WP_API_URL}/posts?per_page=100`, {
      next: { revalidate: 3600 },
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

async function getPost(slug: string): Promise<WordPressPost | null> {
  try {
    const res = await fetch(`${WP_API_URL}/posts?slug=${slug}&_embed`, {
      next: { revalidate: 3600 },
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) return null;
    const posts = await res.json();
    if (!Array.isArray(posts) || posts.length === 0) return null;
    return posts[0];
  } catch {
    return null;
  }
}

async function getRelatedPosts(categoryIds: number[], currentPostId: number): Promise<WordPressPost[]> {
  try {
    if (categoryIds.length === 0) return [];
    const res = await fetch(
      `${WP_API_URL}/posts?categories=${categoryIds[0]}&per_page=3&exclude=${currentPostId}&_embed`,
      { next: { revalidate: 3600 }, headers: { 'Content-Type': 'application/json' } }
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function generateStaticParams() {
  try {
    const posts = await getAllPosts();
    return posts.map((post) => ({ slug: post.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) {
    return {
      title: 'Article Not Found | ClubMyTrip',
      description: 'The article you are looking for could not be found.',
    };
  }
  const description = post.excerpt.rendered
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .trim()
    .substring(0, 160);
  const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/og-image.jpg';
  return {
    title: `${post.title.rendered} | ClubMyTrip`,
    description,
    authors: post._embedded?.author?.[0]?.name
      ? [{ name: post._embedded.author[0].name }]
      : undefined,
    openGraph: {
      title: post.title.rendered,
      description,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.modified,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: post.title.rendered }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title.rendered,
      description,
      images: [imageUrl],
    },
  };
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

function calculateReadingTime(content: string): number {
  const text = content.replace(/<[^>]*>/g, '');
  const wordCount = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
}

/* ============================= FIVERR SIDEBAR BANNER ============================= */
// Shows tall banner (321×1201) on desktop, square (501×501) on mobile
function FiverrSidebarBanner() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-gray-400">
          Sponsored
        </span>
        <span className="text-[9px] text-gray-400">Ad</span>
      </div>

      {/* Desktop: tall banner 321×1201 */}
      <a
        href="https://go.fiverr.com/visit/?bta=1162907&nci=17040"
        target="_top"
        rel="noopener noreferrer"
        className="hidden lg:block group"
      >
        <div className="relative w-full overflow-hidden rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 bg-white">
          {/* Maintain 321:1201 aspect ratio */}
          <div style={{ paddingBottom: `${(1201 / 321) * 100}%` }} className="relative w-full">
            <img
              src="https://fiverr.ck-cdn.com/tn/serve/?cid=45097609"
              alt="Fiverr - Find freelance services"
              width={321}
              height={1201}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-500"
            />
          </div>
        </div>
      </a>

      {/* Mobile: square banner 501×501 */}
      <a
        href="https://go.fiverr.com/visit/?bta=1162907&nci=17041"
        target="_top"
        rel="noopener noreferrer"
        className="block lg:hidden group"
      >
        <div className="relative w-full overflow-hidden rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 bg-white aspect-square">
          <img
            src="https://fiverr.ck-cdn.com/tn/serve/?cid=45097613"
            alt="Fiverr - Find freelance services"
            width={501}
            height={501}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-500"
          />
        </div>
      </a>
    </div>
  );
}

/* ============================= ARTICLE HEADER ============================= */
const ArticleHeader = ({ post }: { post: WordPressPost }) => (
  <div className="bg-white border-b border-gray-200">
    <Container>
      <div className="max-w-3xl mx-auto py-8">
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <Link href="/" className="hover:text-black">Home</Link>
          <span>/</span>
          <Link href="/blogs" className="hover:text-black">Articles</Link>
          {post._embedded?.['wp:term']?.[0]?.[0] && (
            <>
              <span>/</span>
              <Link
                href={`/blogs?category=${post._embedded['wp:term'][0][0].slug}`}
                className="hover:text-black"
              >
                {post._embedded['wp:term'][0][0].name}
              </Link>
            </>
          )}
        </nav>

        {post._embedded?.['wp:term']?.[0]?.[0] && (
          <Link
            href={`/blogs?category=${post._embedded['wp:term'][0][0].slug}`}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-900 text-[11px] font-bold uppercase tracking-wider mb-5 hover:bg-gray-200 rounded-full transition-colors"
          >
            <Tag className="w-3 h-3" />
            {post._embedded['wp:term'][0][0].name}
          </Link>
        )}

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-[1.2] tracking-tight">
          {post.title.rendered}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-xs text-gray-500 pb-6">
          {post._embedded?.author?.[0]?.name && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 border border-gray-200 flex items-center justify-center font-bold text-gray-700 text-sm rounded-full">
                {post._embedded.author[0].name.charAt(0)}
              </div>
              <div>
                <div className="font-bold text-gray-900 text-xs">{post._embedded.author[0].name}</div>
                <div className="text-[10px] text-gray-500">Author</div>
              </div>
            </div>
          )}
          <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formatDate(post.date)}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
            <Clock className="w-3.5 h-3.5" />
            <span>{calculateReadingTime(post.content.rendered)} min read</span>
          </div>
        </div>
      </div>
    </Container>
  </div>
);

/* ============================= FEATURED IMAGE ============================= */
const FeaturedImage = ({ post }: { post: WordPressPost }) => {
  if (!post._embedded?.['wp:featuredmedia']?.[0]?.source_url) return null;
  return (
    <div className="bg-white">
      <Container>
        <div className="max-w-4xl mx-auto py-8">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl shadow-sm border border-gray-100">
            <Image
              src={post._embedded['wp:featuredmedia'][0].source_url}
              alt={post._embedded['wp:featuredmedia'][0].alt_text || post.title.rendered}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
            />
          </div>
          {post._embedded['wp:featuredmedia'][0].alt_text && (
            <p className="text-xs text-gray-500 mt-3 text-center italic">
              {post._embedded['wp:featuredmedia'][0].alt_text}
            </p>
          )}
        </div>
      </Container>
    </div>
  );
};

/* ============================= SHARE BUTTONS ============================= */
const ShareButtons = ({ post }: { post: WordPressPost }) => {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = post.title.rendered;
  return (
    <div className="flex items-center justify-center sm:justify-start gap-3">
      <span className="text-sm font-bold text-gray-900 mr-2">Share this article:</span>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
        target="_blank" rel="noopener noreferrer"
        className="w-10 h-10 border border-gray-200 hover:border-blue-600 hover:bg-blue-600 hover:text-white text-gray-500 flex items-center justify-center transition-all rounded-full"
        aria-label="Share on Facebook"
      >
        <Facebook className="w-4 h-4" />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`}
        target="_blank" rel="noopener noreferrer"
        className="w-10 h-10 border border-gray-200 hover:border-sky-500 hover:bg-sky-500 hover:text-white text-gray-500 flex items-center justify-center transition-all rounded-full"
        aria-label="Share on Twitter"
      >
        <Twitter className="w-4 h-4" />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
        target="_blank" rel="noopener noreferrer"
        className="w-10 h-10 border border-gray-200 hover:border-blue-700 hover:bg-blue-700 hover:text-white text-gray-500 flex items-center justify-center transition-all rounded-full"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4" />
      </a>
    </div>
  );
};

/* ============================= RELATED POSTS ============================= */
const RelatedPosts = ({ posts }: { posts: WordPressPost[] }) => {
  if (posts.length === 0) return null;
  return (
    <div className="bg-gray-50 border-t border-gray-200 py-16">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Read Next</h2>
            <Link href="/blogs" className="text-sm font-semibold text-gray-600 hover:text-black">
              View All Articles
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all h-full flex flex-col"
              >
                <Link href={`/${post.slug}`} className="block relative aspect-[4/3] overflow-hidden bg-gray-100">
                  {post._embedded?.['wp:featuredmedia']?.[0]?.source_url ? (
                    <Image
                      src={post._embedded['wp:featuredmedia'][0].source_url}
                      alt={post.title.rendered}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <BookOpen className="w-8 h-8 text-gray-300" />
                    </div>
                  )}
                </Link>
                <div className="p-5 flex-1 flex flex-col">
                  {post._embedded?.['wp:term']?.[0]?.[0] && (
                    <span className="text-[10px] font-bold uppercase text-emerald-600 mb-2 block">
                      {post._embedded['wp:term'][0][0].name}
                    </span>
                  )}
                  <h3 className="text-base font-bold text-gray-900 mb-3 leading-snug line-clamp-2 group-hover:text-emerald-700 transition-colors">
                    <Link href={`/${post.slug}`}>{post.title.rendered}</Link>
                  </h3>
                  <div className="mt-auto flex items-center gap-3 text-[11px] text-gray-400 font-medium">
                    <span>{formatDate(post.date)}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full" />
                    <span>{calculateReadingTime(post.content.rendered)} min</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

/* ============================= NEWSLETTER CTA ============================= */
const NewsletterCTA = () => (
  <div className="bg-black text-white py-16">
    <Container>
      <div className="max-w-xl mx-auto text-center space-y-6">
        <BookOpen className="w-8 h-8 mx-auto text-white/50" />
        <div>
          <h2 className="text-2xl font-bold mb-2">Stay in the Loop</h2>
          <p className="text-gray-400">
            Join 500,000+ readers getting weekly guides, reviews & deals.
          </p>
        </div>
        <form className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="Your email address"
            required
            className="flex-1 px-4 py-3 text-sm text-gray-900 bg-white focus:outline-none rounded-lg"
          />
          <Button
            type="submit"
            className="bg-white text-black hover:bg-gray-100 font-bold px-8 py-3 rounded-lg"
          >
            Subscribe Free
          </Button>
        </form>
        <p className="text-xs text-gray-500">No spam. Unsubscribe at any time.</p>
      </div>
    </Container>
  </div>
);

/* ============================= MAIN PAGE ============================= */
export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  const relatedPosts = await getRelatedPosts(post.categories, post.id);

  // Check if this post is fiverr-related
  const isFiverrPost = params.slug.toLowerCase().includes('fiverr');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title.rendered,
            description: stripHtml(post.excerpt.rendered),
            image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
            datePublished: post.date,
            dateModified: post.modified,
            author: {
              '@type': 'Person',
              name: post._embedded?.author?.[0]?.name || 'ClubMyTrip Team',
            },
            publisher: {
              '@type': 'Organization',
              name: 'ClubMyTrip',
              logo: {
                '@type': 'ImageObject',
                url: 'https://clubmytrip.com/LOGO.png',
              },
            },
          }),
        }}
      />

      <ArticleHeader post={post} />
      <FeaturedImage post={post} />

      {/* Main Content Area */}
      <div className="bg-white relative">
        <Container>
          {/* 
            Layout:
            - Fiverr posts: article (col-span-8) + sticky sidebar with banner (col-span-4)
            - Other posts: article centered max-w-3xl (no sidebar)
          */}
          {isFiverrPost ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-16">
              {/* Article */}
              <div className="lg:col-span-8">
                <Link
                  href="/blogs"
                  className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black mb-8 font-medium transition-colors group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Back to Articles
                </Link>

                <article className="wp-content prose prose-lg max-w-none text-gray-700
    
    [&>h2]:text-2xl [&>h2]:md:text-3xl [&>h2]:font-bold [&>h2]:text-gray-900 [&>h2]:mt-12 [&>h2]:mb-6
    [&>h3]:text-xl [&>h3]:md:text-2xl [&>h3]:font-bold [&>h3]:text-gray-900 [&>h3]:mt-10 [&>h3]:mb-4
    [&>p]:leading-8 [&>p]:mb-6
    [&>p>a]:text-blue-600 [&>p>a]:underline [&>p>a]:decoration-blue-200 hover:[&>p>a]:decoration-blue-600 [&>p>a]:underline-offset-2
    [&_figure]:mx-auto [&_figure]:block [&_figure]:max-w-full [&_figure]:my-10
    [&_img]:mx-auto [&_img]:block [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-xl [&_img]:shadow-sm
    [&_figcaption]:text-center [&_figcaption]:text-sm [&_figcaption]:text-gray-500 [&_figcaption]:mt-3 [&_figcaption]:italic
    [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ul]:space-y-2
    [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6 [&>ol]:space-y-2
    [&>blockquote]:border-l-4 [&>blockquote]:border-black [&>blockquote]:bg-gray-50 [&>blockquote]:py-6 [&>blockquote]:px-8 [&>blockquote]:my-10 [&>blockquote]:rounded-r-lg [&>blockquote]:italic [&>blockquote]:text-gray-800 [&>blockquote]:font-medium

    [&_.wp-block-button]:my-6 [&_.wp-block-button]:flex [&_.wp-block-button]:justify-center
    [&_.wp-block-button__link]:inline-flex [&_.wp-block-button__link]:items-center [&_.wp-block-button__link]:justify-center
    [&_.wp-block-button__link]:bg-black [&_.wp-block-button__link]:text-white
    [&_.wp-block-button__link]:no-underline [&_.wp-block-button__link]:font-bold
    [&_.wp-block-button__link]:px-8 [&_.wp-block-button__link]:py-3
    [&_.wp-block-button__link]:rounded-full [&_.wp-block-button__link]:text-sm
    [&_.wp-block-button__link]:tracking-wide
    [&_.wp-block-button__link]:transition-all [&_.wp-block-button__link]:duration-200
    hover:[&_.wp-block-button__link]:bg-gray-800 hover:[&_.wp-block-button__link]:scale-[1.02]
    hover:[&_.wp-block-button__link]:shadow-lg
  "
  dangerouslySetInnerHTML={{ __html: post.content.rendered }}
/>


                {/* Mobile square banner — inside article flow on mobile */}
                <div className="block lg:hidden mt-10">
                  <FiverrSidebarBanner />
                </div>

                <div className="mt-12 pt-8 border-t border-gray-100">
                  <ShareButtons post={post} />
                </div>
              </div>

              {/* Sticky Sidebar — desktop only */}
              <aside className="hidden lg:block lg:col-span-4">
                <div className="sticky top-24 pt-16">
                  <FiverrSidebarBanner />
                </div>
              </aside>
            </div>
          ) : (
            /* Non-fiverr: original centered layout */
            <div className="max-w-3xl mx-auto pb-16">
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black mb-8 font-medium transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Articles
              </Link>

              <article
                className="
                  wp-content prose prose-lg max-w-none text-gray-700
                  [&>h2]:text-2xl [&>h2]:md:text-3xl [&>h2]:font-bold [&>h2]:text-gray-900 [&>h2]:mt-12 [&>h2]:mb-6
                  [&>h3]:text-xl [&>h3]:md:text-2xl [&>h3]:font-bold [&>h3]:text-gray-900 [&>h3]:mt-10 [&>h3]:mb-4
                  [&>p]:leading-8 [&>p]:mb-6
                  [&>p>a]:text-blue-600 [&>p>a]:underline [&>p>a]:decoration-blue-200 hover:[&>p>a]:decoration-blue-600 [&>p>a]:underline-offset-2
                  [&_figure]:mx-auto [&_figure]:block [&_figure]:max-w-full [&_figure]:my-10
                  [&_img]:mx-auto [&_img]:block [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-xl [&_img]:shadow-sm
                  [&_figcaption]:text-center [&_figcaption]:text-sm [&_figcaption]:text-gray-500 [&_figcaption]:mt-3 [&_figcaption]:italic
                  [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ul]:space-y-2
                  [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6 [&>ol]:space-y-2
                  [&>blockquote]:border-l-4 [&>blockquote]:border-black [&>blockquote]:bg-gray-50 [&>blockquote]:py-6 [&>blockquote]:px-8 [&>blockquote]:my-10 [&>blockquote]:rounded-r-lg [&>blockquote]:italic [&>blockquote]:text-gray-800 [&>blockquote]:font-medium
                "
                dangerouslySetInnerHTML={{ __html: post.content.rendered }}
              />

              <div className="mt-12 pt-8 border-t border-gray-100">
                <ShareButtons post={post} />
              </div>
            </div>
          )}
        </Container>
      </div>

      <RelatedPosts posts={relatedPosts} />
      <NewsletterCTA />
    </>
  );
}
