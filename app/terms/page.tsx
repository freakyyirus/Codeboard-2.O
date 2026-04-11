import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service | CodeBoard",
  description: "CodeBoard Terms of Service - Read our terms and conditions.",
}

export default function TermsPage() {
  const lastUpdated = "April 11, 2026"

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white py-20">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
        <p className="text-gray-400 mb-8">Last updated: {lastUpdated}</p>

        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing and using CodeBoard, you accept and agree to be bound by the terms and 
              provisions of this agreement. If you do not agree to these terms, please do not use our service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Description of Service</h2>
            <p>
              CodeBoard is a developer productivity platform that aggregates coding statistics from 
              various platforms, provides analytics, learning roadmaps, and AI-powered insights 
              for competitive programmers and software developers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. User Accounts</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials. You agree to accept 
              responsibility for all activities that occur under your account. We reserve the right to suspend or terminate 
              accounts that violate these terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. User Content</h2>
            <p>
              You retain ownership of any content you submit to CodeBoard. By submitting content, you grant us a license 
              to use, modify, and display that content in connection with providing our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Prohibited Uses</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon the rights of others</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Use the service for any illegal purpose</li>
              <li>Harass, abuse, or harm others</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Intellectual Property</h2>
            <p>
              All content, features, and functionality of CodeBoard are owned by us and are protected 
              by copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Disclaimer of Warranties</h2>
            <p>
              THE SERVICE IS PROVIDED &quot;AS IS&quot; WITHOUT WARRANTIES OF ANY KIND. WE DO NOT WARRANT 
              THAT THE SERVICE WILL BE UNINTERRUPTED OR ERROR-FREE.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Limitation of Liability</h2>
            <p>
              IN NO EVENT SHALL WE BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL 
              DAMAGES ARISING FROM YOUR USE OF THE SERVICE.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">9. Governing Law</h2>
            <p>
              These terms shall be governed by and construed in accordance with the laws of India, 
              without regard to conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">10. Contact Information</h2>
            <p>
              For questions about these terms, contact us at:{" "}
              <a href="mailto:legal@codeboard.io" className="text-purple-400 hover:underline">
                legal@codeboard.io
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}