import { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ShieldCheck, Lock, Eye, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: 'Privacy Policy | Trendships',
  description: 'Privacy Policy for Trendships. Learn how we collect, use, and protect your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 py-16">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-semibold text-gray-600 mb-6">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Last Updated: December 2024
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-600 text-lg">
              We value your trust and are committed to protecting your personal information.
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
                At <strong>Trendships</strong>, accessible from https://trendships.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Trendships and how we use it.
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-12 not-prose">
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Lock className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Secure Data</h3>
                  <p className="text-sm text-gray-600">We use industry-standard security measures to protect your personal information.</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                    <Eye className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Transparency</h3>
                  <p className="text-sm text-gray-600">We are clear about what data we collect and how we use it.</p>
                </div>
              </div>

              <h2>1. Information We Collect</h2>
              <p>
                The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
              </p>
              <ul>
                <li><strong>Personal Information:</strong> Name, email address, phone number (if you contact us).</li>
                <li><strong>Usage Data:</strong> IP address, browser type, pages visited, time spent on pages.</li>
                <li><strong>Cookies:</strong> We use cookies to store information about visitors preferences.</li>
              </ul>

              <h2>2. How We Use Your Information</h2>
              <p>We use the information we collect in various ways, including to:</p>
              <ul>
                <li>Provide, operate, and maintain our website</li>
                <li>Improve, personalize, and expand our website</li>
                <li>Understand and analyze how you use our website</li>
                <li>Develop new products, services, features, and functionality</li>
                <li>Communicate with you, either directly or through one of our partners</li>
                <li>Send you emails (newsletters or updates)</li>
                <li>Find and prevent fraud</li>
              </ul>

              <h2>3. Log Files</h2>
              <p>
                Trendships follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks.
              </p>

              <h2>4. Cookies and Web Beacons</h2>
              <p>
                Like any other website, Trendships uses cookies. These cookies are used to store information including visitors preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users experience by customizing our web page content based on visitors browser type and/or other information.
              </p>

              <h2>5. Google DoubleClick DART Cookie</h2>
              <p>
                Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">https://policies.google.com/technologies/ads</a>
              </p>

              <h2>6. GDPR Data Protection Rights</h2>
              <p>
                We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
              </p>
              <ul>
                <li>The right to access – You have the right to request copies of your personal data.</li>
                <li>The right to rectification – You have the right to request that we correct any information you believe is inaccurate.</li>
                <li>The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</li>
              </ul>

              <h2>7. Children Information</h2>
              <p>
                Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity. Trendships does not knowingly collect any Personal Identifiable Information from children under the age of 13.
              </p>

              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-8 mt-12 not-prose text-center">
                <FileText className="w-8 h-8 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Have questions about our policy?</h3>
                <p className="text-gray-600 mb-6 text-sm">
                  If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
                </p>
                <a 
                  href="mailto:support@trendships.com" 
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 transition-colors"
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
