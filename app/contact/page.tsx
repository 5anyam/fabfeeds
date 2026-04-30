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
  title: "Contact Us — Fab Feeds",
  description:
    "Get in touch with the Fab Feeds team for collaborations, content inquiries, or general questions. We reply within 24 hours.",
  keywords:
    "contact fab feeds, content collaboration, fab feeds support, ai content platform contact",
};

/* ══ Data ═════════════════════════════════════════════════════════════════ */
const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    detail: "hello@fabfeeds.com",
    sub: "We reply within 24 hours",
    href: "mailto:hello@fabfeeds.com",
    bg: "bg-indigo-50",
    color: "text-indigo-600",
  },
  {
    icon: MapPin,
    title: "Based In",
    detail: "New Delhi, India",
    sub: "Serving readers worldwide",
    href: null,
    bg: "bg-emerald-50",
    color: "text-emerald-600",
  },
];

const reasons = [
  {
    icon: Sparkles,
    bg: "bg-indigo-50",
    color: "text-indigo-600",
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
    bg: "bg-emerald-50",
    color: "text-emerald-600",
    title: "Updated Daily",
    desc: "Fresh content refreshed every single day.",
  },
  {
    icon: Zap,
    bg: "bg-indigo-50",
    color: "text-indigo-600",
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
    q: "How do I get my product featured on Fab Feeds?",
    a: "Email us at hello@fabfeeds.com with details about your product. We review every collaboration request and respond within 48 hours.",
  },
  {
    q: "Is Fab Feeds a content aggregator or original publisher?",
    a: "Both! Our AI curates the best trending content from across the web while our editorial team produces original buying guides, reviews, and how-tos.",
  },
  {
    q: "How quickly do you respond to emails?",
    a: "We typically reply to all emails within 24 hours on business days. Partnership inquiries may take up to 48 hours.",
  },
  {
    q: "Can I write a guest post for Fab Feeds?",
    a: "Yes! We welcome high-quality guest contributions. Contact us with your topic idea and we'll let you know if it fits our editorial guidelines.",
  },
  {
    q: "How is content selected to be trending?",
    a: "Our AI scores content based on freshness, engagement signals, social shares, and relevance — only top 1% content makes it to Fab Feeds.",
  },
  {
    q: "Do you offer advertising opportunities?",
    a: "Yes! We offer sponsored placements, newsletter ads, and category sponsorships. Email hello@fabfeeds.com for our media kit.",
  },
];

/* ══ PAGE ═════════════════════════════════════════════════════════════════ */
export default function ContactPage() {
  return (
    <main className="bg-slate-50 min-h-screen">

      {/* ══ 1. LIGHT EDITORIAL HERO ════════════════════════════════════════ */}
      <section className="bg-white border-b border-slate-200 relative overflow-hidden py-16 md:py-24">
        {/* Subtle Accents */}
        <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-indigo-50 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-emerald-50/50 rounded-full blur-[100px] pointer-events-none" />

        <Container>
          <div className="relative z-10 max-w-2xl mx-auto text-center">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-4 py-1.5 mb-6 shadow-sm">
              <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">
                Get In Touch
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight mb-5 font-serif">
              Let&apos;s{" "}
              <span className="text-indigo-600 italic">
                Connect.
              </span>
            </h1>

            <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-8 max-w-lg mx-auto font-medium">
              Have a collaboration idea, partnership proposal, or just a question?
              We&apos;d love to hear from you. Our team responds within 24 hours.
            </p>

            {/* Quick stat pills */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-indigo-700 border border-indigo-100 bg-indigo-50 rounded-full px-3.5 py-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                24h Response
              </span>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-700 border border-emerald-100 bg-emerald-50 rounded-full px-3.5 py-1.5">
                <Flame className="w-3 h-3 text-emerald-500" />
                Open to Collabs
              </span>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-indigo-700 border border-indigo-100 bg-indigo-50 rounded-full px-3.5 py-1.5">
                <Globe className="w-3 h-3 text-indigo-500" />
                Worldwide
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* ══ 2. CONTACT INFO CARDS ══════════════════════════════════════════ */}
      <section className="bg-slate-50 py-10 border-b border-slate-200">
        <Container>
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {contactInfo.map((info) => {
              const Icon = info.icon;
              return (
                <div
                  key={info.title}
                  className="flex items-center gap-4 bg-white border border-slate-200 rounded-2xl p-6 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-100 transition-all duration-300 group"
                >
                  <span className={`w-12 h-12 rounded-xl border border-white/50 shadow-sm ${info.bg} flex items-center justify-center shrink-0`}>
                    <Icon className={`w-5 h-5 ${info.color}`} />
                  </span>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-0.5">
                      {info.title}
                    </p>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-[13px] font-bold text-slate-900 hover:text-indigo-600 transition-colors"
                      >
                        {info.detail}
                      </a>
                    ) : (
                      <p className="text-[13px] font-bold text-slate-900">{info.detail}</p>
                    )}
                    <p className="text-[11px] text-slate-500 mt-1 font-medium">{info.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ══ 3. MAIN FORM + SIDEBAR ════════════════════════════════════════ */}
      <section className="bg-white py-16 md:py-24">
        <Container>
          <div className="grid lg:grid-cols-3 gap-10">

            {/* ── Contact Form (2 cols) ── */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-slate-50 rounded-2xl border border-slate-200 shadow-sm p-8 md:p-10">
                <div className="mb-8 border-b border-slate-200 pb-6">
                  <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                    <Send className="w-3 h-3 text-indigo-500" />
                    Send a Message
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight font-serif">
                    We&apos;d love to hear from you.
                  </h2>
                  <p className="text-sm text-slate-500 mt-2 font-medium">
                    Fill out the form below and we&apos;ll get back to you within 24 hours.
                  </p>
                </div>

                <form className="space-y-5">
                  {/* Name + Email */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Phone + Inquiry type */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-2">
                        Phone (Optional)
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all shadow-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-2">
                        Inquiry Type *
                      </label>
                      <select
                        required
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all appearance-none shadow-sm"
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
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="How can we help you?"
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all shadow-sm"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-2">
                      Your Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tell us about your idea, question, or collaboration proposal…"
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all resize-none shadow-sm"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-widest py-4 rounded-xl shadow-md shadow-indigo-200 hover:-translate-y-0.5 transition-all duration-300 group mt-4"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>

                  <p className="text-[10px] font-medium text-slate-400 text-center uppercase tracking-widest pt-2">
                    We respect your privacy · No spam, ever
                  </p>
                </form>
              </div>
            </div>

            {/* ── Sidebar (1 col) ── */}
            <div className="space-y-6">

              {/* Support Email Card */}
              <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-indigo-500" />
                  <h3 className="text-sm font-black text-indigo-900 uppercase tracking-widest">Quick Support</h3>
                </div>
                <p className="text-xs text-indigo-700/80 leading-relaxed mb-5 font-medium">
                  Prefer a direct line? Reach out via email for the fastest response from our editorial team.
                </p>
                <a
                  href="mailto:hello@fabfeeds.com"
                  className="w-full inline-flex items-center justify-center gap-2 bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-600 hover:text-white font-bold uppercase tracking-widest text-xs py-3.5 rounded-lg shadow-sm transition-all duration-300"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Email Support
                </a>
              </div>

              {/* Why Fab Feeds */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-5 border-b border-slate-100 pb-3">
                  Why Fab Feeds?
                </h3>
                <div className="space-y-4">
                  {reasons.map((r) => {
                    const Icon = r.icon;
                    return (
                      <div key={r.title} className="flex items-start gap-3">
                        <span className={`w-9 h-9 rounded-lg border border-white/50 shadow-sm ${r.bg} flex items-center justify-center shrink-0`}>
                          <Icon className={`w-4 h-4 ${r.color}`} />
                        </span>
                        <div>
                          <p className="text-xs font-bold text-slate-900">{r.title}</p>
                          <p className="text-[11px] text-slate-500 mt-1 font-medium leading-tight">{r.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* We can help with */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-5 border-b border-slate-100 pb-3">
                  We Can Help With
                </h3>
                <div className="space-y-2.5">
                  {inquiryTypes.map((type) => (
                    <div
                      key={type}
                      className="flex items-center gap-2.5 text-xs font-medium text-slate-600"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                      {type}
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-5 border-t border-slate-100">
                  <Link
                    href="/blogs"
                    className="w-full inline-flex items-center justify-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-indigo-700 border border-indigo-200 bg-indigo-50 hover:bg-indigo-600 hover:text-white py-3 rounded-lg transition-colors"
                  >
                    Browse All Articles
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ══ 4. FAQ ════════════════════════════════════════════════════════ */}
      <section className="bg-slate-50 border-t border-slate-200 py-16 md:py-24">
        <Container>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-4 shadow-sm">
              <BarChart2 className="w-3 h-3 text-emerald-500" />
              FAQ
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3 font-serif">
              Frequently Asked{" "}
              <span className="text-indigo-600 italic">Questions.</span>
            </h2>
            <p className="text-sm text-slate-500 font-medium">Quick answers to common questions about Fab Feeds.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-indigo-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <h3 className="text-sm font-bold text-slate-900 mb-3 leading-snug">
                  {faq.q}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">{faq.a}</p>
              </div>
            ))}
          </div>

          {/* Still have questions CTA */}
          <div className="mt-16 text-center">
            <div className="inline-block bg-white border border-slate-200 rounded-2xl p-8 shadow-sm max-w-md w-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full pointer-events-none" />
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mx-auto mb-5 relative z-10">
                <MessageSquare className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2 relative z-10 font-serif">
                Still have questions?
              </h3>
              <p className="text-xs text-slate-500 mb-6 max-w-xs mx-auto leading-relaxed font-medium relative z-10">
                Our team is ready to answer via email — we reply within 24 hours on all business days.
              </p>
              <a
                href="mailto:hello@fabfeeds.com"
                className="inline-flex items-center gap-2 bg-indigo-600 text-white font-bold uppercase tracking-widest text-xs px-8 py-3.5 rounded-lg shadow-md shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all duration-300 group relative z-10"
              >
                <Mail className="w-3.5 h-3.5" />
                Email Us Now
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
          </div>
        </Container>
      </section>

    </main>
  );
}