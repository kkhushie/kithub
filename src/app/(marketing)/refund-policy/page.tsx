export default function RefundPolicyPage() {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Refund Policy</h1>
          <p className="text-gray-600">Our commitment to fair digital product sales</p>
        </header>
  
        <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-8 mb-10">
          <div className="flex items-start gap-4">
            <div className="bg-purple-100 p-3 rounded-lg">
              <span className="text-2xl">🔄</span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Digital Product Policy</h3>
              <p className="text-gray-700">
                Due to the nature of digital products (instant download, non-returnable), we generally 
                <strong> do not offer refunds</strong>. However, we make exceptions in specific cases 
                outlined below.
              </p>
            </div>
          </div>
        </div>
  
        <div className="space-y-10">
          {/* Eligibility */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">When Refunds Are Granted</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-green-500 pl-6 py-2">
                <h3 className="font-semibold text-gray-900 mb-2">1. Technical Issues</h3>
                <p className="text-gray-700">
                  If the downloaded file is <strong>corrupted, damaged, or incomplete</strong>, and we cannot 
                  provide a working replacement file within 72 hours.
                </p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-6 py-2">
                <h3 className="font-semibold text-gray-900 mb-2">2. Product Misrepresentation</h3>
                <p className="text-gray-700">
                  If the delivered product is <strong>significantly different</strong> from what was shown 
                  in the preview images and description (e.g., missing promised features, wrong file format).
                </p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-6 py-2">
                <h3 className="font-semibold text-gray-900 mb-2">3. Duplicate Purchase</h3>
                <p className="text-gray-700">
                  If you accidentally <strong>purchase the same product twice</strong> within 24 hours 
                  (contact us immediately with both order IDs).
                </p>
              </div>
            </div>
          </section>
  
          {/* Non-Refundable */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Non-Refundable Situations</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✗</span>
                  <span><strong>Change of mind</strong> after downloading the product</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✗</span>
                  <span><strong>Inability to use</strong> the PSD files with your software (check requirements before purchase)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✗</span>
                  <span><strong>Not satisfied with quality</strong> when the product matches the description</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✗</span>
                  <span><strong>Found a better product</strong> elsewhere</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✗</span>
                  <span><strong>Didn't read</strong> the product description or requirements</span>
                </li>
              </ul>
            </div>
          </section>
  
          {/* Process */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Refund Process</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border-2 border-gray-900 rounded-xl p-6 text-center">
                  <div className="text-3xl mb-4">1</div>
                  <h3 className="font-semibold mb-2">Contact Support</h3>
                  <p className="text-sm text-gray-600">Email support@kithub.com within 7 days of purchase</p>
                </div>
                <div className="border-2 border-gray-900 rounded-xl p-6 text-center">
                  <div className="text-3xl mb-4">2</div>
                  <h3 className="font-semibold mb-2">Provide Details</h3>
                  <p className="text-sm text-gray-600">Include order ID and reason for refund request</p>
                </div>
                <div className="border-2 border-gray-900 rounded-xl p-6 text-center">
                  <div className="text-3xl mb-4">3</div>
                  <h3 className="font-semibold mb-2">Review & Process</h3>
                  <p className="text-sm text-gray-600">We'll review within 3 business days and issue refund if eligible</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                Refunds are processed to the original payment method within 7-10 business days after approval.
              </p>
            </div>
          </section>
  
          {/* Contact */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact for Refunds</h2>
            <div className="bg-gray-50 rounded-xl p-6">
              <p className="text-gray-700 mb-4">
                For refund requests or questions about this policy:
              </p>
              <div className="space-y-3">
                <p className="flex items-center gap-3">
                  <span className="font-medium">Email:</span>
                  <a href="mailto:support@kithub.com" className="text-purple-600 hover:underline">
                    support@kithub.com
                  </a>
                </p>
                <p className="flex items-center gap-3">
                  <span className="font-medium">Subject:</span>
                  <span>Refund Request - [Your Order ID]</span>
                </p>
                <p className="text-sm text-gray-600">
                  Please include your order ID and a detailed explanation of the issue.
                </p>
              </div>
            </div>
          </section>
  
          <div className="pt-8 border-t border-gray-200">
            <p className="text-gray-600 text-sm">
              By purchasing from Kithub, you agree to this Refund Policy. We reserve the right to modify 
              this policy at any time.
            </p>
          </div>
        </div>
      </div>
    );
  }