import { Metadata } from "next";
import {
  Mail, Send, MessageSquare, Globe, Clock,
  Users, MapPin, ArrowUpRight, Sparkles,
  Flame, ShieldCheck, Zap, BarChart2,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import Link from "next/link";

/* ══ Metadata ═════════════════════════════════════════════════════════════ */
export const metadata: Metadata = {
  title: "Contact Us — influencershark",
  description:
    "Get in touch with the influencershark team for collaborations, content inquiries, or general questions. We reply within 24 hours.",
  keywords:
    "contact influencershark, content collaboration, influencershark support, ai content platform contact",
};

/* ══ Data ═════════════════════════════════════════════════════════════════ */
const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    detail: "hello@influencershark.com",
    sub: "We reply within 24 hours",
    href: "mailto:hello@influencershark.com",
    bg: "bg-teal-50",
    color: "text-teal-600",
  },
  {
    icon: MapPin,
    title: "Based In",
    detail: "New Delhi, India",
    sub: "Serving readers worldwide",
    href: null,
    bg: "bg-orange-50",
    color: "text-orange-600",
  },
];

const reasons = [
  {
    icon: Sparkles,
    bg: "bg-teal-50",
    color: "text-teal-600",
    title: "AI-Powered Content",
    desc: "Trending articles curated daily by our AI engine.",
  },
  {
    icon: Users,
    bg: "bg-blue-50",
    color: "text-blue-600",
    title: "50K+ Readers",
    desc: "A growing community across 12 categories.",
  },
  {
    icon: Clock,
    bg: "bg-violet-50",
    color: "text-violet-600",
    title: "Updated Daily",
    desc: "Fresh content refreshed every single day.",
  },
  {
    icon: Zap,
    bg: "bg-orange-50",
    color: "text-orange-500",
    title: "Quick Support",
    desc: "Fast responses to every query.",
  },
];

const inquiryTypes = [
  "Content Collaboration",
  "Affiliate Partnership",
  "Sponsored Article",
  "Product Feature Request",
  "General Feedback",
  "Technical Issue",
  "Press Inquiry",
  "Advertise with Us",
  "Suggest a Category",
  "Report an Error",
  "Newsletter Inquiry",
  "Other",
];

const faqs = [
  {
    q: "How do I get my product featured on influencershark?",
    a: "Email us at hello@influencershark.com with details about your product. We review every collaboration request and respond within 48 hours.",
  },
  {
    q: "Is influencershark a content aggregator or original publisher?",
    a: "Both! Our AI curates the best trending content from across the web while our editorial team produces original buying guides, reviews, and how-tos.",
  },
  {
    q: "How quickly do you respond to emails?",
    a: "We typically reply to all emails within 24 hours on business days. Partnership inquiries may take up to 48 hours.",
  },
  {
    q: "Can I write a guest post for influencershark?",
    a: "Yes! We welcome high-quality guest contributions. Contact us with your topic idea and we'll let you know if it fits our editorial guidelines.",
  },
  {
    q: "How is content selected to be trending?",
    a: "Our AI scores content based on freshness, engagement signals, social shares, and relevance — only top 1% content makes it to influencershark.",
  },
  {
    q: "Do you offer advertising opportunities?",
    a: "Yes! We offer sponsored placements, newsletter ads, and category sponsorships. Email hello@influencershark.com for our media kit.",
  },
];

/* ══ PAGE ═════════════════════════════════════════════════════════════════ */
export default function ContactPage() {
  return (
    <main className="bg-white">

      {/* ══ 1. DARK HERO ══════════════════════════════════════════════════ */}
      <section className="bg-zinc-950 relative overflow-hidden py-16 md:py-24">
        {/* Blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[200px] bg-orange-500/8 rounded-full blur-[80px] pointer-events-none" />
        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.022] pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 60px)," +
              "repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 60px)",
          }}
        />

        <Container>
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6">
              <MessageSquare className="w-3.5 h-3.5 text-teal-400" />
              <span className="text-[9px] font-black uppercase tracking-[0.25em] text-teal-300">
                Get In Touch
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.04] tracking-tight mb-5">
              Let&apos;s{" "}
              <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Connect
              </span>
            </h1>

            <p className="text-zinc-500 text-sm md:text-base leading-relaxed mb-8 max-w-lg mx-auto">
              Have a collaboration idea, partnership proposal, or just a question?
              We&apos;d love to hear from you. Our team responds within 24 hours.
            </p>

            {/* Quick stat pills */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-teal-400 border border-teal-500/20 bg-teal-500/8 rounded-full px-3.5 py-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                24h Response
              </span>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-orange-400 border border-orange-500/20 bg-orange-500/8 rounded-full px-3.5 py-1.5">
                <Flame className="w-3 h-3" />
                Open to Collabs
              </span>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-cyan-400 border border-cyan-500/20 bg-cyan-500/8 rounded-full px-3.5 py-1.5">
                <Globe className="w-3 h-3" />
                Worldwide
              </span>
            </div>
          </div>
        </Container>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-white pointer-events-none" />
      </section>

      {/* ══ 2. CONTACT INFO CARDS ══════════════════════════════════════════ */}
      <section className="bg-white py-8 border-b border-gray-100">
        <Container>
          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {contactInfo.map((info) => {
              const Icon = info.icon;
              return (
                <div
                  key={info.title}
                  className="flex items-center gap-4 bg-gray-50 border border-gray-100 rounded-2xl p-5 hover:border-teal-100 hover:shadow-md transition-all duration-200 group"
                >
                  <span className={`w-11 h-11 rounded-xl ${info.bg} flex items-center justify-center shrink-0`}>
                    <Icon className={`w-5 h-5 ${info.color}`} />
                  </span>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-gray-400 mb-0.5">
                      {info.title}
                    </p>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-[13px] font-bold text-gray-900 hover:text-teal-600 transition-colors"
                      >
                        {info.detail}
                      </a>
                    ) : (
                      <p className="text-[13px] font-bold text-gray-900">{info.detail}</p>
                    )}
                    <p className="text-[11px] text-gray-400 mt-0.5">{info.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ══ 3. MAIN FORM + SIDEBAR ════════════════════════════════════════ */}
      <section className="bg-gray-50 py-12 md:py-16">
        <Container>
          <div className="grid lg:grid-cols-3 gap-7">

            {/* ── Contact Form (2 cols) ── */}
            <div className="lg:col-span-2 space-y-5">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 md:p-8">
                <div className="mb-7">
                  <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-100 text-teal-600 rounded-full px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] mb-3">
                    <Send className="w-2.5 h-2.5" />
                    Send a Message
                  </div>
                  <h2 className="text-xl md:text-2xl font-black text-gray-900 leading-tight">
                    We&apos;d love to hear from you
                  </h2>
                  <p className="text-[12px] text-gray-400 mt-1.5">
                    Fill out the form below and we&apos;ll get back to you within 24 hours.
                  </p>
                </div>

                <form className="space-y-4">
                  {/* Name + Email */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-[0.18em] text-gray-500 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-[13px] text-gray-700 placeholder-gray-400 focus:outline-none focus:border-teal-400 focus:bg-white focus:ring-2 focus:ring-teal-500/10 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-[0.18em] text-gray-500 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-[13px] text-gray-700 placeholder-gray-400 focus:outline-none focus:border-teal-400 focus:bg-white focus:ring-2 focus:ring-teal-500/10 transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone + Inquiry type */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-[0.18em] text-gray-500 mb-1.5">
                        Phone (Optional)
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-[13px] text-gray-700 placeholder-gray-400 focus:outline-none focus:border-teal-400 focus:bg-white focus:ring-2 focus:ring-teal-500/10 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-[0.18em] text-gray-500 mb-1.5">
                        Inquiry Type *
                      </label>
                      <select
                        required
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-[13px] text-gray-700 focus:outline-none focus:border-teal-400 focus:bg-white focus:ring-2 focus:ring-teal-500/10 transition-all appearance-none"
                      >
                        <option value="">Select type…</option>
                        <option>Content Collaboration</option>
                        <option>Affiliate Partnership</option>
                        <option>Sponsored Article</option>
                        <option>Advertise with Us</option>
                        <option>General Question</option>
                        <option>Feedback</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.18em] text-gray-500 mb-1.5">
                      Subject *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="How can we help you?"
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-[13px] text-gray-700 placeholder-gray-400 focus:outline-none focus:border-teal-400 focus:bg-white focus:ring-2 focus:ring-teal-500/10 transition-all"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.18em] text-gray-500 mb-1.5">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tell us about your idea, question, or collaboration proposal…"
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-[13px] text-gray-700 placeholder-gray-400 focus:outline-none focus:border-teal-400 focus:bg-white focus:ring-2 focus:ring-teal-500/10 transition-all resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-bold text-[13px] py-3.5 rounded-xl shadow-md shadow-teal-500/20 hover:-translate-y-0.5 transition-all duration-200 group"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>

                  <p className="text-[10px] text-gray-400 text-center">
                    We respect your privacy · No spam, ever
                  </p>
                </form>
              </div>

              {/* Quick contact cards below form */}
              <div className="grid sm:grid-cols-2 gap-4">
                <a
                  href="mailto:hello@influencershark.com"
                  className="group flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-5 hover:border-teal-200 hover:shadow-lg transition-all duration-200"
                >
                  <span className="w-11 h-11 rounded-xl bg-teal-50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5 text-teal-600" />
                  </span>
                  <div>
                    <p className="text-[11px] font-black text-gray-900">Email Directly</p>
                    <p className="text-[11px] text-teal-600 font-semibold">hello@influencershark.com</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Fastest way to reach us</p>
                  </div>
                </a>

                <Link
                  href="/blogs"
                  className="group flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-5 hover:border-orange-200 hover:shadow-lg transition-all duration-200"
                >
                  <span className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Flame className="w-5 h-5 text-orange-500" />
                  </span>
                  <div>
                    <p className="text-[11px] font-black text-gray-900">Browse Articles</p>
                    <p className="text-[11px] text-orange-600 font-semibold">influencershark.com/blogs</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">AI-curated, updated daily</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* ── Sidebar (1 col) ── */}
            <div className="space-y-5">

              {/* Dark quick support card */}
              <div className="bg-zinc-950 rounded-2xl p-6 border border-white/[0.06] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/15 rounded-full blur-[50px] pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-teal-400" />
                    <h3 className="text-sm font-black text-white">Quick Support</h3>
                  </div>
                  <p className="text-[11px] text-zinc-500 leading-relaxed mb-5">
                    Prefer a direct line? Reach out via email for the fastest response from our team.
                  </p>
                  <a
                    href="mailto:hello@influencershark.com"
                    className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold text-[12px] py-3 rounded-xl shadow-md shadow-teal-500/20 hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    Email Support
                  </a>
                </div>
              </div>

              {/* Why influencershark */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h3 className="text-[11px] font-black uppercase tracking-[0.18em] text-gray-400 mb-4">
                  Why influencershark?
                </h3>
                <div className="space-y-3">
                  {reasons.map((r) => {
                    const Icon = r.icon;
                    return (
                      <div key={r.title} className="flex items-start gap-3">
                        <span className={`w-8 h-8 rounded-xl ${r.bg} flex items-center justify-center shrink-0`}>
                          <Icon className={`w-3.5 h-3.5 ${r.color}`} />
                        </span>
                        <div>
                          <p className="text-[12px] font-black text-gray-900">{r.title}</p>
                          <p className="text-[11px] text-gray-400 mt-0.5">{r.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* We can help with */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h3 className="text-[11px] font-black uppercase tracking-[0.18em] text-gray-400 mb-4">
                  We Can Help With
                </h3>
                <div className="space-y-2">
                  {inquiryTypes.map((type) => (
                    <div
                      key={type}
                      className="flex items-center gap-2 text-[11px] font-medium text-gray-600"
                    >
                      <span className="w-1 h-1 rounded-full bg-teal-400 shrink-0" />
                      {type}
                    </div>
                  ))}
                </div>
                <div className="mt-5 pt-4 border-t border-gray-100">
                  <Link
                    href="/blogs"
                    className="w-full inline-flex items-center justify-center gap-1.5 text-[11px] font-bold text-teal-600 border border-teal-100 bg-teal-50 hover:bg-teal-100 py-2.5 rounded-xl transition-colors"
                  >
                    Browse All Articles
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ══ 4. FAQ ════════════════════════════════════════════════════════ */}
      <section className="bg-white py-14 md:py-20">
        <Container>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-full px-3.5 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 mb-4">
              <BarChart2 className="w-3 h-3 text-teal-500" />
              FAQ
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <p className="text-[13px] text-gray-400">Quick answers to common questions</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-gray-50 border border-gray-100 rounded-2xl p-5 hover:border-teal-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <h3 className="text-[13px] font-black text-gray-900 mb-2 leading-snug">
                  {faq.q}
                </h3>
                <p className="text-[11px] text-gray-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>

          {/* Still have questions CTA */}
          <div className="mt-12 text-center">
            <div className="inline-block bg-gradient-to-br from-gray-50 to-teal-50/40 border border-gray-100 rounded-2xl px-8 py-8 shadow-sm max-w-md w-full">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center mx-auto mb-4 shadow-md shadow-teal-500/20">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-base font-black text-gray-900 mb-2">
                Still have questions?
              </h3>
              <p className="text-[12px] text-gray-500 mb-5 max-w-xs mx-auto leading-relaxed">
                Our team is ready to answer via email — we reply within 24 hours.
              </p>
              <a
                href="mailto:hello@influencershark.com"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold text-[12px] px-6 py-3 rounded-xl shadow-md shadow-teal-500/20 hover:-translate-y-0.5 transition-all duration-200 group"
              >
                <Mail className="w-3.5 h-3.5" />
                Email Us Now
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* ══ 5. BOTTOM DARK STRIP ══════════════════════════════════════════ */}
      <div className="bg-zinc-950 border-t border-white/[0.05]">
        <Container>
          <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[11px] text-zinc-600">
              Powered by{" "}
              <a
                href="https://www.adshouz.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-600 hover:text-teal-400 font-bold transition-colors"
              >
                Adshouz Digital LLP
              </a>
            </p>
            <div className="flex items-center gap-1.5 text-[10px] text-zinc-700">
              <span className="w-1 h-1 rounded-full bg-teal-700" />
              influencershark — Discover what&apos;s trending today
              <span className="w-1 h-1 rounded-full bg-teal-700" />
            </div>
          </div>
        </Container>
      </div>

    </main>
  );
}
