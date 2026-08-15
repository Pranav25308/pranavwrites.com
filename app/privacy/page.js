'use client';

import { Card, CardContent } from '@/components/ui/card';
import { ShieldCheck } from 'lucide-react';
import { useTheme } from '@/components/theme/ThemeProvider';

const SECTIONS = [
  {
    title: '1. Information We Collect',
    body: `This website is a personal portfolio and blog. We do not require you to create an account. The only personal information we collect is what you voluntarily provide through the contact form (your name, email address, and message). We may also collect anonymous usage data such as pages visited, browser type, and approximate location (country/city level) for analytics purposes.`,
  },
  {
    title: '2. How We Use Your Information',
    body: `Information submitted via the contact form is used solely to respond to your enquiry. Anonymous analytics data is used to understand which content is most useful and to improve the site. We never sell, rent, or trade your personal information to third parties.`,
  },
  {
    title: '3. Cookies',
    body: `This site uses cookies and similar technologies (such as localStorage) to remember your preferences — for example, your light/dark theme choice. Third-party services used on this site, such as advertising and analytics providers, may also set cookies as described below. You can disable cookies in your browser settings, though some features may not work as intended.`,
  },
  {
    title: '4. Advertising',
    body: `We may display advertisements served by third-party advertising networks, including Google AdSense. These networks may use cookies and web beacons to serve ads based on your prior visits to this or other websites. Google's use of advertising cookies enables it and its partners to serve ads based on your visits to this site and/or other sites on the Internet. You may opt out of personalized advertising by visiting Google Ads Settings (adssettings.google.com) or aboutads.info/choices.`,
  },
  {
    title: '5. Third-Party Services',
    body: `Some content and functionality on this site is provided by third parties — for example, images hosted on external CDNs and embedded media. These providers may collect usage data subject to their own privacy policies. We encourage you to review the privacy policies of any third-party services you interact with.`,
  },
  {
    title: '6. Data Retention & Security',
    body: `Contact form submissions are retained only as long as needed to respond to and follow up on your enquiry. We take reasonable technical measures to protect any data handled by this site, but no method of transmission over the Internet is 100% secure.`,
  },
  {
    title: '7. Your Rights',
    body: `You may request access to, correction of, or deletion of any personal information you have provided to us. To make such a request, please reach out via the contact page and we will respond promptly.`,
  },
  {
    title: '8. Children\u2019s Privacy',
    body: `This website is not directed at children under 13 and we do not knowingly collect personal information from children.`,
  },
  {
    title: '9. Changes to This Policy',
    body: `We may update this privacy policy from time to time. Any changes will be posted on this page with an updated revision date. Continued use of the site after changes constitutes acceptance of the updated policy.`,
  },
  {
    title: '10. Contact',
    body: `If you have any questions about this privacy policy or how your data is handled, please get in touch through the contact page of this website.`,
  },
];

export default function PrivacyPage() {
  const { darkMode } = useTheme();

  return (
    <div className="min-h-screen max-w-4xl mx-auto relative pt-8 px-4 sm:px-6 lg:px-8" data-testid="privacy-page">
      <Card className={`backdrop-blur-sm border shadow-xl overflow-hidden relative mb-16 ${
        darkMode
          ? 'bg-slate-900/50 border-purple-500/10'
          : 'bg-white/80 border-purple-100'
      }`}>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500"></div>
        <CardContent className="pt-10 pb-10 px-8">
          <div className="flex items-start gap-4 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/25">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-3xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                Privacy <span className="bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent">Policy</span>
              </h1>
              <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Last updated: June 2026
              </p>
            </div>
          </div>

          <p className={`leading-relaxed mb-8 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            Your privacy matters. This page explains what information this website collects,
            how it is used, and the choices you have.
          </p>

          <div className="space-y-8">
            {SECTIONS.map((section) => (
              <div key={section.title}>
                <h2 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                  {section.title}
                </h2>
                <p className={`leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  {section.body}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
