# CSPKIndia - Company Secretary Services Website

A modern, production-ready website for CSPKIndia, a leading Company Secretary firm in India. Built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Tech Stack**: Next.js 13+ with App Router, TypeScript, Tailwind CSS
- **Responsive Design**: Mobile-first approach with beautiful UI components
- **SEO Optimized**: Meta tags, OpenGraph, JSON-LD structured data, sitemap
- **Performance**: Optimized images, lazy loading, code splitting
- **Accessibility**: WCAG compliant with proper focus states and semantic HTML
- **Forms**: Contact forms with server actions and email integration
- **Content Management**: Easy-to-manage service data and blog content

## 🏗️ Architecture

```
app/
├── (routes)/
│   ├── about/
│   ├── services/
│   ├── blogs/
│   ├── career/
│   └── contact/
├── api/          # API routes for forms
├── globals.css
└── layout.tsx

components/
├── layout/       # Navbar, Footer
├── ui/          # Reusable UI components
└── sections/    # Page sections

lib/
├── data/        # Service data, blog content
└── utils.ts     # Utility functions
```

## 🛠️ Getting Started

1. **Clone the repository**
```bash
git clone <repository-url>
cd cspkindia-website
```

2. **Install dependencies**
```bash
npm install
```

3. **Run development server**
```bash
npm run dev
```

4. **Build for production**
```bash
npm run build
npm start
```

## 📝 Content Management

### Services

Edit service information in `lib/data/services.ts`:

```typescript
export const services: Service[] = [
  {
    id: 'unique-service-id',
    title: 'Service Title',
    slug: 'url-friendly-slug',
    category: 'Service Category',
    shortDesc: 'Brief description for cards',
    longDesc: 'Detailed description for service page',
    eligibility: ['Eligibility criteria'],
    documents: ['Required documents'],
    process: ['Process steps'],
    timeline: 'Expected timeline',
    govtFees: 'Government fees',
    ourFees: 'Our service fees',
    faqs: [
      {
        question: 'FAQ question',
        answer: 'FAQ answer'
      }
    ]
  }
];
```

### Blog Posts

Blog posts are managed in the `app/blogs/page.tsx` file. For a CMS approach:

1. Create a `content/blogs/` directory
2. Add markdown files with frontmatter
3. Install and configure a markdown processor like `next-mdx-remote`

### Contact Form

The contact form uses server actions. To integrate with actual email service:

1. Update the form handler in `components/ui/contact-form.tsx`
2. Add environment variables for email service (SendGrid, Resend, etc.)
3. Configure the API route in `app/api/contact/route.ts`

## 🎨 Customization

### Colors

Primary brand colors are defined in `app/globals.css`:

```css
:root {
  --primary: #3AA6FF;
  --primary-light: #E6F3FF;
  --primary-dark: #2690E6;
  --primary-darker: #1a7cc7;
}
```

### Components

All UI components are built with shadcn/ui and can be customized in the `components/ui/` directory.

### Typography

The site uses Inter font. Update in `app/layout.tsx` if needed.

## 🔧 Environment Variables

Create a `.env.local` file:

```env
# Email service configuration
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-email
SMTP_PASS=your-password

# Contact form destination
CONTACT_EMAIL=contact@cspkindia.in

# Site configuration
NEXT_PUBLIC_SITE_URL=https://cspkindia.in
```

## 📱 Responsive Breakpoints

- Mobile: `< 768px`
- Tablet: `768px - 1024px` 
- Desktop: `> 1024px`

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Configure environment variables
4. Deploy automatically

### Manual Deployment

```bash
npm run build
npm run export  # For static export if needed
```

## 📊 SEO Features

- Dynamic meta tags and titles
- OpenGraph social media tags
- JSON-LD structured data for Organization and Services
- Sitemap.xml and robots.txt
- Canonical URLs
- Mobile-friendly design

## 🔍 Performance Optimizations

- Next.js Image optimization
- Code splitting and lazy loading
- Preloading of critical routes
- Optimized bundle size
- Web Vitals monitoring ready

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary to CSPKIndia. All rights reserved.

## 📞 Support

For technical support or questions:
- Email: tech@cspkindia.in
- Phone: +91 9876543210

## 🔄 Updates

### Version 1.0.0 (Current)
- Initial release with all core features
- Complete service catalog
- Blog functionality
- Career portal
- Contact forms
- SEO optimization

### Planned Features
- Client portal for tracking applications
- Online payment integration
- Document upload system
- Multi-language support (Hindi)
- Advanced search functionality# trendships
