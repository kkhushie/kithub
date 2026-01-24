export default function TermsPage() {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms & Conditions</h1>
          <p className="text-gray-600">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </header>
  
        <div className="space-y-10">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Agreement to Terms</h2>
            <p className="text-gray-700">
              By accessing and purchasing from Kithub ("Website"), you accept and agree to be bound by these Terms 
              and Conditions. These materials are protected by copyright and intellectual property laws.
            </p>
          </section>
  
          {/* License Section */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. License Grant</h2>
            <div className="space-y-4 text-gray-700">
              <p><strong>Personal Use License:</strong> For purchased PSD templates, you receive a non-exclusive, 
              non-transferable license to use, modify, and create derivative works for personal projects.</p>
              
              <p><strong>Commercial Use License:</strong> Most templates include commercial rights. You may use 
              the designs in client work, advertisements, and commercial products. Please check individual product 
              descriptions for specific commercial terms.</p>
              
              <p><strong>Restrictions:</strong> You may not resell, redistribute, or sublicense the original PSD 
              files. You may not claim the designs as your own original work.</p>
            </div>
          </section>
  
          {/* Payments */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Payments & Refunds</h2>
            <div className="space-y-4 text-gray-700">
              <p><strong>Pricing:</strong> All prices are in Indian Rupees (₹). We reserve the right to change 
              prices at any time, but price changes will not affect completed purchases.</p>
              
              <p><strong>Payment Processing:</strong> Payments are processed securely through Razorpay. We do not 
              store your credit card information.</p>
              
              <p><strong>Refund Policy:</strong> Due to the digital nature of our products, we offer refunds only 
              in cases where the downloaded file is corrupted or significantly different from the product description. 
              See our full <a href="/refund-policy" className="text-purple-600 hover:underline">Refund Policy</a>.</p>
            </div>
          </section>
  
          {/* Delivery */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Digital Delivery</h2>
            <div className="space-y-4 text-gray-700">
              <p>After successful payment, you will receive:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Instant access to download links on the success page</li>
                <li>A confirmation email with download instructions</li>
                <li>Access to purchased files in your account dashboard (if registered)</li>
              </ul>
              <p>Download links expire after 30 days. We recommend downloading immediately and backing up your files.</p>
            </div>
          </section>
  
          {/* Requirements */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Software Requirements</h2>
            <p className="text-gray-700">
              Our PSD templates require Adobe Photoshop CS6 or newer. Some templates may work with free alternatives 
              like Photopea, but we only provide support for Adobe Photoshop. Font links are provided but may require 
              separate purchase or free download.
            </p>
          </section>
  
          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Limitation of Liability</h2>
            <p className="text-gray-700">
              Kithub and its creators are not liable for any damages resulting from the use or inability to use 
              our products. The products are provided "as is" without warranty of any kind.
            </p>
          </section>
  
          {/* Contact */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Contact Information</h2>
            <p className="text-gray-700">
              For questions about these Terms, please contact us at:{' '}
              <a href="mailto:legal@kithub.com" className="text-purple-600 hover:underline">
                legal@kithub.com
              </a>
            </p>
          </section>
  
          <div className="pt-8 border-t border-gray-200">
            <p className="text-gray-600 text-sm">
              By purchasing from Kithub, you acknowledge that you have read, understood, and agree to be bound 
              by these Terms & Conditions.
            </p>
          </div>
        </div>
      </div>
    );
  }