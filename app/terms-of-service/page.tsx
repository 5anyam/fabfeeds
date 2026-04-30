import { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Scale, FileCheck, AlertCircle, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: 'Terms of Service | Fab Feeds',
  description: 'Terms and Conditions for using Fab Feeds. Please read these terms carefully before using our website.',
};

export default function TermsPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 py-16">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-semibold text-gray-600 mb-6">
              <Scale className="w-4 h-4 text-emerald-600" />
              Effective Date: August 2025
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Terms of Service
            </h1>
            <p className="text-gray-600 text-lg">
              Please read these terms and conditions carefully before using our website.
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
                Welcome to <strong>Fab Feeds</strong>! These terms and conditions outline the rules and regulations for the use of Fab Feeds Website, located at https://Fab Feeds.com.
              </p>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 my-8 not-prose rounded-r-lg">
                <div className="flex gap-4">
                  <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide mb-1">Important Notice</h3>
                    <p className="text-sm text-gray-700">
                      By accessing this website we assume you accept these terms and conditions. Do not continue to use Fab Feeds if you do not agree to take all of the terms and conditions stated on this page.
                    </p>
                  </div>
                </div>
              </div>

              <h2>1. Interpretation and Definitions</h2>
              <p>
                The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: Client, You and Your refers to you, the person log on this website and compliant to the Company’s terms and conditions. The Company, Ourselves, We, Our and Us, refers to our Company.
              </p>

              <h2>2. Cookies</h2>
              <p>
                We employ the use of cookies. By accessing Fab Feeds, you agreed to use cookies in agreement with the Fab Feeds Privacy Policy. Most interactive websites use cookies to let us retrieve the user’s details for each visit.
              </p>

              <h2>3. License</h2>
              <p>
                Unless otherwise stated, Fab Feeds and/or its licensors own the intellectual property rights for all material on Fab Feeds. All intellectual property rights are reserved. You may access this from Fab Feeds for your own personal use subjected to restrictions set in these terms and conditions.
              </p>
              <p>You must not:</p>
              <ul>
                <li>Republish material from Fab Feeds</li>
                <li>Sell, rent or sub-license material from Fab Feeds</li>
                <li>Reproduce, duplicate or copy material from Fab Feeds</li>
                <li>Redistribute content from Fab Feeds</li>
              </ul>

              <h2>4. User Comments</h2>
              <p>
                Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. Fab Feeds does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of Fab Feeds,its agents and/or affiliates.
              </p>

              <h2>5. Hyperlinking to our Content</h2>
              <p>
                The following organizations may link to our Website without prior written approval:
              </p>
              <ul>
                <li>Government agencies;</li>
                <li>Search engines;</li>
                <li>News organizations;</li>
                <li>Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses.</li>
              </ul>

              <h2>6. Content Liability</h2>
              <p>
                We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.
              </p>

              <h2>7. Disclaimer</h2>
              <p>
                To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:
              </p>
              <ul>
                <li>limit or exclude our or your liability for death or personal injury;</li>
                <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
                <li>limit any of our or your liabilities in any way that is not permitted under applicable law.</li>
              </ul>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 mt-12 not-prose text-center">
                <HelpCircle className="w-8 h-8 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Need Clarification?</h3>
                <p className="text-gray-600 mb-6 text-sm">
                  If you have any questions about our Terms of Service, please contact us.
                </p>
                <a 
                  href="mailto:support@Fab Feeds.com" 
                  className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  Contact Legal Team
                </a>
              </div>

            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
