export default function PrivacyPage() {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </header>
  
        <div className="space-y-10">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
            <div className="space-y-4 text-gray-700">
              <p><strong>Information You Provide:</strong></p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name and email address during purchase</li>
                <li>Payment information (processed securely by Razorpay)</li>
                <li>Communication when you contact support</li>
              </ul>
              
              <p><strong>Automatically Collected Information:</strong></p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Browser type, device information, and IP address</li>
                <li>Pages visited and time spent on our site</li>
                <li>Referring website (if applicable)</li>
              </ul>
            </div>
          </section>
  
          {/* Use of Information */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
            <div className="space-y-4 text-gray-700">
              <ul className="list-disc pl-6 space-y-2">
                <li>Process your purchases and deliver digital products</li>
                <li>Send order confirmations and download instructions</li>
                <li>Respond to customer service requests</li>
                <li>Improve our website and product offerings</li>
                <li>Prevent fraud and ensure security</li>
                <li>Send marketing communications (only with your consent)</li>
              </ul>
            </div>
          </section>
  
          {/* Payment Information */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Payment Information</h2>
            <p className="text-gray-700">
              We use Razorpay as our payment processor. We never store your credit card details. All payment 
              information is handled securely by Razorpay in compliance with PCI-DSS standards. You can review 
              Razorpay's privacy policy at{' '}
              <a href="https://razorpay.com/privacy" className="text-purple-600 hover:underline" target="_blank">
                razorpay.com/privacy
              </a>.
            </p>
          </section>
  
          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Cookies & Tracking</h2>
            <div className="space-y-4 text-gray-700">
              <p>We use cookies to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Remember items in your shopping cart</li>
                <li>Understand how you use our website</li>
                <li>Provide a better browsing experience</li>
              </ul>
              <p>
                You can disable cookies in your browser settings, but this may affect website functionality.
              </p>
            </div>
          </section>
  
          {/* Data Sharing */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Sharing & Third Parties</h2>
            <p className="text-gray-700">
              We do not sell your personal information. We may share information with:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700">
              <li><strong>Service Providers:</strong> Payment processors, email services, hosting providers</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> In connection with a merger or sale of assets</li>
            </ul>
          </section>
  
          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Data Security</h2>
            <p className="text-gray-700">
              We implement reasonable security measures to protect your information. However, no method of 
              transmission over the Internet is 100% secure. We cannot guarantee absolute security.
            </p>
          </section>
  
          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Your Rights</h2>
            <div className="space-y-4 text-gray-700">
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access the personal information we hold about you</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your personal data</li>
                <li>Opt-out of marketing communications</li>
                <li>Export your data in a portable format</li>
              </ul>
              <p>
                To exercise these rights, contact us at{' '}
                <a href="mailto:privacy@kithub.com" className="text-purple-600 hover:underline">
                  privacy@kithub.com
                </a>
              </p>
            </div>
          </section>
  
          {/* Children's Privacy */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Children's Privacy</h2>
            <p className="text-gray-700">
              Our website is not intended for children under 13. We do not knowingly collect personal 
              information from children under 13.
            </p>
          </section>
  
          {/* Changes */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Changes to This Policy</h2>
            <p className="text-gray-700">
              We may update this privacy policy. We will notify you of significant changes by posting 
              the new policy on this page and updating the "last updated" date.
            </p>
          </section>
  
          {/* Contact */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Contact Us</h2>
            <p className="text-gray-700">
              For privacy-related questions, contact our Data Protection Officer at:{' '}
              <a href="mailto:privacy@kithub.com" className="text-purple-600 hover:underline">
                privacy@kithub.com
              </a>
            </p>
          </section>
        </div>
      </div>
    );
  }