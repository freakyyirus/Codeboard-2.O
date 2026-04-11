import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | CodeBoard",
  description: "CodeBoard Privacy Policy - How we handle your data.",
}

export default function PrivacyPage() {
  const lastUpdated = "April 11, 2026"

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white py-20">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-gray-400 mb-8">Last updated: {lastUpdated}</p>

        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Introduction</h2>
            <p>
              At CodeBoard, we take your privacy seriously. This policy explains how we collect, use, disclose, 
              and safeguard your information when you use our platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Information We Collect</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Account Information:</strong> Email, name, profile picture from Clerk authentication</li>
              <li><strong>Platform Data:</strong> Statistics from connected coding platforms (LeetCode, Codeforces, GitHub, etc.)</li>
              <li><strong>Usage Data:</strong> How you interact with our platform</li>
              <li><strong>Device Information:</strong> Browser type, IP address, device type</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide and maintain our services</li>
              <li>Sync your coding statistics from connected platforms</li>
              <li>Improve and personalize your experience</li>
              <li>Send important updates and notifications</li>
              <li>Detect and prevent fraud and abuse</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Data Sharing</h2>
            <p>We may share your information with:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Service Providers:</strong> Cloud providers, analytics tools (PostHog), payment processors (Stripe)</li>
              <li><strong>Platform Connections:</strong> When you connect third-party accounts, we sync data from those platforms</li>
              <li><strong>Legal Requirements:</strong> When required by law or in response to valid requests</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your 
              personal data against unauthorized access, alteration, disclosure, or destruction. 
              All data is encrypted in transit and at rest.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Data Retention</h2>
            <p>
              We retain your personal data for as long as your account is active or as needed to provide you 
              services. You can request deletion of your data at any time by contacting us or using 
              account deletion features.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Export your data</li>
              <li>Object to processing of your data</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Cookies & Tracking</h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our platform and 
              hold certain information. You can instruct your browser to refuse all cookies, 
              but this may limit certain features.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">9. Third-Party Services</h2>
            <p>
              Our platform links to third-party services (GitHub, LeetCode, Codeforces, etc.). We are not responsible 
              for the privacy practices of these services. We encourage you to review their privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">10. Children's Privacy</h2>
            <p>
              Our service is not intended for children under 13. We do not knowingly collect personal information 
              from children under 13. If you become aware that a child has provided us with personal 
              information, please contact us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">11. Changes to This Policy</h2>
            <p>
              We may update this policy periodically. We will notify you of any material changes 
              by posting the new policy on this page and updating the &quot;last updated&quot; date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">12. Contact Us</h2>
            <p>
              For questions about this policy, contact us at:{" "}
              <a href="mailto:privacy@codeboard.io" className="text-purple-400 hover:underline">
                privacy@codeboard.io
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}