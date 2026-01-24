'use client';
import { useState } from 'react';
import { Mail, MessageSquare, Clock, Send, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setSubmitted(true);
      setLoading(false);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <header className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Have questions about our PSD templates, need technical support, or want to suggest improvements? 
          We're here to help!
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Get in Touch</h2>
            <p className="text-gray-700 mb-8">
              We typically respond within 24 hours during business days (Monday-Friday).
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Mail className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Email Support</h3>
                <p className="text-gray-700">General inquiries & support</p>
                <a 
                  href="mailto:support@kithub.com" 
                  className="text-purple-600 hover:underline font-medium"
                >
                  support@kithub.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <MessageSquare className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Technical Issues</h3>
                <p className="text-gray-700">File downloads, payment problems</p>
                <a 
                  href="mailto:tech@kithub.com" 
                  className="text-purple-600 hover:underline font-medium"
                >
                  tech@kithub.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Business Hours</h3>
                <p className="text-gray-700">Monday - Friday</p>
                <p className="text-gray-700 font-medium">10:00 AM - 6:00 PM IST</p>
              </div>
            </div>
          </div>

          {/* FAQ Links */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="/refund-policy" className="text-purple-600 hover:underline">
                  ↳ Refund Policy & Requests
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-purple-600 hover:underline">
                  ↳ Privacy Policy Questions
                </a>
              </li>
              <li>
                <a href="/terms" className="text-purple-600 hover:underline">
                  ↳ Terms & Conditions
                </a>
              </li>
              <li>
                <a href="/products" className="text-purple-600 hover:underline">
                  ↳ Browse All Products
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          {submitted ? (
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-12 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Message Sent Successfully!</h3>
              <p className="text-gray-700 mb-8">
                Thank you for contacting Kithub. We've received your message and will get back to you 
                within 24 hours. Check your email for a confirmation.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', subject: '', message: '' });
                }}
                className="border-2 border-gray-900 bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-900 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="What's this regarding?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Please provide details about your inquiry, including order ID if applicable..."
                />
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  * Required fields
                </p>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 border-2 border-gray-900 bg-purple-300 text-black px-6 py-3 rounded-lg font-semibold hover:bg-purple-400 transition-colors disabled:opacity-50"
                >
                  {loading ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}