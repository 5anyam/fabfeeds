import { Metadata } from "next";
import { Calendar, Clock, ArrowLeft, Facebook, Twitter, Linkedin, Tag, BookOpen, ChevronRight, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

const WP_API_URL = 'https://chocolate-zebra-912190.hostingersite.com/wp-json/wp/v2';

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
      title: 'Article Not Found | Fab Feeds',
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
    title: `${post.title.rendered} | Fab Feeds`,
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

/* ═══════════════════════════════════════════════
   BREADCRUMB
═══════════════════════════════════════════════ */
const Breadcrumb = ({ post }: { post: WordPressPost }) => (
  <nav className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold mb-6 flex-wrap">
    <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
    <ChevronRight className="w-3 h-3" />
    <Link href="/blogs" className="hover:text-indigo-600 transition-colors">Articles</Link>
    {post._embedded?.['wp:term']?.[0]?.[0] && (
      <>
        <ChevronRight className="w-3 h-3" />
        <Link
          href={`/blogs?category=${post._embedded['wp:term'][0][0].slug}`}
          className="hover:text-indigo-600 transition-colors"
        >
          {post._embedded['wp:term'][0][0].name}
        </Link>
      </>
    )}
  </nav>
);

/* ═══════════════════════════════════════════════
   ARTICLE HEADER
═══════════════════════════════════════════════ */
const ArticleHeader = ({ post }: { post: WordPressPost }) => (
  <div className="bg-white border-b border-slate-100">
    <Container>
      <div className="max-w-3xl mx-auto py-10 md:py-14">
        <Breadcrumb post={post} />

        {post._embedded?.['wp:term']?.[0]?.[0] && (
          <Link
            href={`/blogs?category=${post._embedded['wp:term'][0][0].slug}`}
            className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 border border-indigo-100 text-[10px] font-black uppercase tracking-[0.18em] px-3 py-1.5 rounded-full mb-5 hover:bg-indigo-100 transition-colors"
          >
            <Tag className="w-3 h-3" />
            {post._embedded['wp:term'][0][0].name}
          </Link>
        )}

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-6 leading-[1.15] tracking-tight font-serif">
          {post.title.rendered}
        </h1>

        {/* Excerpt */}
        <p className="text-lg text-slate-500 leading-relaxed mb-8 font-medium border-l-4 border-indigo-200 pl-4 italic">
          {stripHtml(post.excerpt.rendered).substring(0, 200)}
        </p>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-4">
          {post._embedded?.author?.[0]?.name && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 border-2 border-indigo-200 flex items-center justify-center font-black text-indigo-700 text-sm rounded-full">
                {post._embedded.author[0].name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="font-bold text-slate-900 text-sm">{post._embedded.author[0].name}</div>
                <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Author</div>
              </div>
            </div>
          )}
          <div className="h-6 w-px bg-slate-200 hidden sm:block" />
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            {formatDate(post.date)}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            {calculateReadingTime(post.content.rendered)} min read
          </div>
        </div>
      </div>
    </Container>
  </div>
);

/* ═══════════════════════════════════════════════
   FEATURED IMAGE
═══════════════════════════════════════════════ */
const FeaturedImage = ({ post }: { post: WordPressPost }) => {
  if (!post._embedded?.['wp:featuredmedia']?.[0]?.source_url) return null;
  return (
    <div className="bg-white pb-0">
      <Container>
        <div className="max-w-4xl mx-auto py-6 pb-0">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.1)] border border-slate-100">
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
            <p className="text-xs text-slate-400 mt-3 text-center italic font-medium">
              {post._embedded['wp:featuredmedia'][0].alt_text}
            </p>
          )}
        </div>
      </Container>
    </div>
  );
};

/* ═══════════════════════════════════════════════
   SHARE BUTTONS
═══════════════════════════════════════════════ */
const ShareButtons = ({ post }: { post: WordPressPost }) => {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = post.title.rendered;
  return (
    <div className="flex flex-wrap items-center gap-3 py-6 border-t border-b border-slate-100">
      <span className="text-xs font-black text-slate-500 uppercase tracking-widest mr-2">Share:</span>
      {[
        {
          href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
          icon: Facebook, label: "Facebook",
          cls: "hover:bg-blue-600 hover:border-blue-600 hover:text-white"
        },
        {
          href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
          icon: Twitter, label: "Twitter",
          cls: "hover:bg-sky-500 hover:border-sky-500 hover:text-white"
        },
        {
          href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
          icon: Linkedin, label: "LinkedIn",
          cls: "hover:bg-blue-700 hover:border-blue-700 hover:text-white"
        },
      ].map(({ href, icon: Icon, label, cls }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-9 h-9 border border-slate-200 text-slate-400 flex items-center justify-center rounded-full transition-all ${cls}`}
          aria-label={`Share on ${label}`}
        >
          <Icon className="w-4 h-4" />
        </a>
      ))}
    </div>
  );
};

/* ═══════════════════════════════════════════════
   RELATED POSTS
═══════════════════════════════════════════════ */
const RelatedPosts = ({ posts }: { posts: WordPressPost[] }) => {
  if (posts.length === 0) return null;
  return (
    <section className="bg-slate-50 border-t border-slate-100 py-16 md:py-20">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="w-1 h-7 bg-indigo-600 rounded-full" />
              <h2 className="text-xl md:text-2xl font-black text-slate-900 font-serif">Read Next</h2>
            </div>
            <Link href="/blogs" className="text-xs font-bold text-slate-500 hover:text-indigo-600 uppercase tracking-widest flex items-center gap-1 transition-colors">
              All Articles <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-indigo-100 hover:shadow-[0_12px_40px_rgba(79,70,229,0.08)] transition-all flex flex-col"
              >
                <Link href={`/${post.slug}`} className="block relative aspect-[4/3] overflow-hidden bg-slate-100">
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
                      <BookOpen className="w-8 h-8 text-slate-300" />
                    </div>
                  )}
                </Link>
                <div className="p-5 flex-1 flex flex-col">
                  {post._embedded?.['wp:term']?.[0]?.[0] && (
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-2 block">
                      {post._embedded['wp:term'][0][0].name}
                    </span>
                  )}
                  <h3 className="text-sm font-bold text-slate-900 mb-3 leading-snug line-clamp-2 group-hover:text-indigo-600 transition-colors flex-1">
                    <Link href={`/${post.slug}`}>{post.title.rendered}</Link>
                  </h3>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 font-semibold mt-auto pt-3 border-t border-slate-50">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(post.date)}</span>
                    <span className="w-1 h-1 bg-slate-200 rounded-full" />
                    <Clock className="w-3 h-3" />
                    <span>{calculateReadingTime(post.content.rendered)} min</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

/* ═══════════════════════════════════════════════
   NEWSLETTER CTA
═══════════════════════════════════════════════ */
const NewsletterCTA = () => (
  <div className="bg-indigo-600 text-white py-16 md:py-20">
    <Container>
      <div className="max-w-xl mx-auto text-center space-y-6">
        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mx-auto">
          <BookOpen className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-black mb-2 font-serif">Stay in the Loop</h2>
          <p className="text-indigo-200 leading-relaxed">
            Join thousands of readers getting the best stories, weekly guides & exclusive deals.
          </p>
        </div>
        <form className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="Your email address"
            required
            className="flex-1 px-4 py-3 text-sm text-slate-900 bg-white focus:outline-none rounded-xl focus:ring-2 focus:ring-white/50"
          />
          <Button
            type="submit"
            className="bg-slate-900 text-white hover:bg-slate-800 font-bold px-8 py-3 rounded-xl shadow-lg"
          >
            Subscribe Free
          </Button>
        </form>
        <p className="text-xs text-indigo-300 font-medium">No spam. Unsubscribe at any time.</p>
      </div>
    </Container>
  </div>
);

/* ═══════════════════════════════════════════════
   FIVERR SIDEBAR BANNER
═══════════════════════════════════════════════ */
function FiverrSidebarBanner() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400">Sponsored</span>
        <span className="text-[9px] text-slate-400">Ad</span>
      </div>
      <a
        href="https://go.fiverr.com/visit/?bta=1162907&nci=17040"
        target="_top"
        rel="noopener noreferrer"
        className="hidden lg:block group"
      >
        <div className="relative w-full overflow-hidden rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 bg-white">
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
      <a
        href="https://go.fiverr.com/visit/?bta=1162907&nci=17041"
        target="_top"
        rel="noopener noreferrer"
        className="block lg:hidden group"
      >
        <div className="relative w-full overflow-hidden rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 bg-white aspect-square">
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

/* ═══════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════ */
export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  const relatedPosts = await getRelatedPosts(post.categories, post.id);
  const isFiverrPost = params.slug.toLowerCase().includes('fiverr');

  const articleClasses = `
    wp-content prose prose-lg max-w-none text-slate-700 leading-[1.85]
    [&>h2]:text-2xl [&>h2]:md:text-3xl [&>h2]:font-black [&>h2]:text-slate-900 [&>h2]:mt-14 [&>h2]:mb-5 [&>h2]:font-serif [&>h2]:tracking-tight
    [&>h3]:text-xl [&>h3]:md:text-2xl [&>h3]:font-bold [&>h3]:text-slate-900 [&>h3]:mt-10 [&>h3]:mb-4
    [&>p]:leading-[1.9] [&>p]:mb-6 [&>p]:text-slate-600
    [&>p>a]:text-indigo-600 [&>p>a]:underline [&>p>a]:decoration-indigo-200 hover:[&>p>a]:decoration-indigo-500 [&>p>a]:underline-offset-2
    [&_figure]:mx-auto [&_figure]:block [&_figure]:max-w-full [&_figure]:my-10
    [&_img]:mx-auto [&_img]:block [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-2xl [&_img]:shadow-md
    [&_figcaption]:text-center [&_figcaption]:text-sm [&_figcaption]:text-slate-400 [&_figcaption]:mt-3 [&_figcaption]:italic
    [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ul]:space-y-2 [&>ul]:text-slate-600
    [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6 [&>ol]:space-y-2 [&>ol]:text-slate-600
    [&>blockquote]:border-l-4 [&>blockquote]:border-indigo-500 [&>blockquote]:bg-indigo-50 [&>blockquote]:py-5 [&>blockquote]:px-7 [&>blockquote]:my-10 [&>blockquote]:rounded-r-xl [&>blockquote]:italic [&>blockquote]:text-indigo-900 [&>blockquote]:font-medium [&>blockquote]:text-lg
    [&_.wp-block-button]:my-6 [&_.wp-block-button]:flex [&_.wp-block-button]:justify-center
    [&_.wp-block-button__link]:inline-flex [&_.wp-block-button__link]:items-center [&_.wp-block-button__link]:justify-center
    [&_.wp-block-button__link]:bg-indigo-600 [&_.wp-block-button__link]:text-white
    [&_.wp-block-button__link]:no-underline [&_.wp-block-button__link]:font-bold
    [&_.wp-block-button__link]:px-8 [&_.wp-block-button__link]:py-3
    [&_.wp-block-button__link]:rounded-xl [&_.wp-block-button__link]:text-sm
    [&_.wp-block-button__link]:tracking-wide
    [&_.wp-block-button__link]:transition-all [&_.wp-block-button__link]:duration-200
    hover:[&_.wp-block-button__link]:bg-indigo-700 hover:[&_.wp-block-button__link]:scale-[1.02]
  `;

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
              name: post._embedded?.author?.[0]?.name || 'Fab Feeds Team',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Fab Feeds',
              logo: {
                '@type': 'ImageObject',
                url: 'https://fabfeeds.com/fabfeeds_logo.png',
              },
            },
          }),
        }}
      />

      <ArticleHeader post={post} />
      <FeaturedImage post={post} />

      {/* Main Content */}
      <div className="bg-white pt-10 pb-4">
        <Container>
          {isFiverrPost ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-16">
              <div className="lg:col-span-8">
                <Link
                  href="/blogs"
                  className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-indigo-600 mb-8 font-bold uppercase tracking-wider transition-colors group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Back to Articles
                </Link>

                <article className={articleClasses} dangerouslySetInnerHTML={{ __html: post.content.rendered }} />

                <div className="block lg:hidden mt-10">
                  <FiverrSidebarBanner />
                </div>

                <div className="mt-10">
                  <ShareButtons post={post} />
                </div>
              </div>

              <aside className="hidden lg:block lg:col-span-4">
                <div className="sticky top-24 pt-16">
                  <FiverrSidebarBanner />
                </div>
              </aside>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto pb-16">
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-indigo-600 mb-8 font-bold uppercase tracking-wider transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Articles
              </Link>

              <article className={articleClasses} dangerouslySetInnerHTML={{ __html: post.content.rendered }} />

              <div className="mt-10">
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
