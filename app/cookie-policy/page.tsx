import { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Cookie, Settings, Shield, Info } from "lucide-react";

export const metadata: Metadata = {
  title: 'Cookie Policy | Fab Feeds',
  description: 'Learn about how Fab Feeds uses cookies to improve your experience and show relevant content.',
};

export default function CookiePolicyPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 py-16">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-semibold text-gray-600 mb-6">
              <Cookie className="w-4 h-4 text-emerald-600" />
              Effective Date: December 2024
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Cookie Policy
            </h1>
            <p className="text-gray-600 text-lg">
              Understanding how and why we use cookies on our website.
            </p>
          </div>
        </Container>
      </div>

      {/* Content */}
      <Section>
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg prose-gray max-w-none">
              
              <p className="lead text-xl text-gray-700 leading-relaxed mb-10">
                This Cookie Policy explains what cookies are, how <strong>Fab Feeds</strong> uses them, and your choices regarding their use. By using our website, you consent to the use of cookies as described in this policy.
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8 not-prose rounded-r-lg">
                <div className="flex gap-4">
                  <Info className="w-6 h-6 text-blue-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide mb-1">What are Cookies?</h3>
                    <p className="text-sm text-gray-700">
                      Cookies are small text files that are stored on your computer or mobile device when you visit a website. They allow the website to remember your actions and preferences (such as login, language, font size) over a period of time.
                    </p>
                  </div>
                </div>
              </div>

              <h2>1. How We Use Cookies</h2>
              <p>
                We use cookies for several reasons, including to ensure our website functions correctly, to understand how you interact with our content, and to improve your experience. We may use the following types of cookies:
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-8 not-prose">
                <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <Shield className="w-8 h-8 text-emerald-600 mb-4" />
                    <h3 className="font-bold text-gray-900 mb-2">Essential Cookies</h3>
                    <p className="text-sm text-gray-600">Necessary for the website to function. You cannot switch these off.</p>
                </div>
                <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <Settings className="w-8 h-8 text-blue-600 mb-4" />
                    <h3 className="font-bold text-gray-900 mb-2">Analytics Cookies</h3>
                    <p className="text-sm text-gray-600">Help us understand how visitors interact with the website (e.g., Google Analytics).</p>
                </div>
              </div>

              <h2>2. Third-Party Cookies</h2>
              <p>
                In addition to our own cookies, we may also use various third-parties cookies to report usage statistics of the Service, deliver advertisements on and through the Service, and so on.
              </p>
              <ul>
                <li><strong>Google Analytics:</strong> We use Google Analytics to help us understand how our customers use the site.</li>
                <li><strong>Advertising:</strong> We may use third-party advertising companies (like Google AdSense) to serve ads when you visit our website. These companies may use information about your visits to provide advertisements about goods and services of interest to you.</li>
              </ul>

              <h2>3. Managing Cookies</h2>
              <p>
                You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Consent Manager. Alternatively, you can set or amend your web browser controls to accept or refuse cookies.
              </p>
              <p>
                If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.
              </p>

              <h2>4. Updates to This Policy</h2>
              <p>
                We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
              </p>

              <div className="bg-gray-900 text-white rounded-xl p-8 mt-12 not-prose text-center">
                <h3 className="text-lg font-bold mb-2">Questions about our cookies?</h3>
                <p className="text-gray-400 mb-6 text-sm">
                  If you have any questions about our use of cookies or other technologies, please email us.
                </p>
                <a 
                  href="mailto:support@Fab Feeds.com" 
                  className="inline-flex items-center justify-center px-6 py-3 border border-white/20 text-sm font-bold rounded-md text-black bg-white hover:bg-gray-100 transition-colors"
                >
                  Contact Support
                </a>
              </div>

            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
