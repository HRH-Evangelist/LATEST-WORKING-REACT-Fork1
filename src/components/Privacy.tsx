import { motion } from "framer-motion";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

export function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      <Header />
      
      <div className="max-w-4xl mx-auto px-6 lg:px-12 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            to="/"
            className="inline-flex items-center text-purple-600 hover:text-purple-700 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-600">Last updated: February 2026</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border border-gray-200 p-8 md:p-12 space-y-8"
        >
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Business Information</h2>
            <div className="bg-gray-50 p-6 rounded-lg space-y-2">
              <p><strong>Business Name:</strong> Viraan Holdings</p>
              <p><strong>Merchant Name:</strong> RAMACHANDRAN HARIVATSA</p>
              <p><strong>Location:</strong> Bangalore, Karnataka, India</p>
              <p><strong>Website:</strong> https://1secstory.com/</p>
              <p><strong>Contact:</strong> support@1secstory.com</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              When you use 1 Sec Story services, we collect the following information:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li><strong>Account Information:</strong> Name, email, phone number, profile picture</li>
              <li><strong>Card Information:</strong> Digital profile content, social links, contact details</li>
              <li><strong>Payment Information:</strong> Processed securely through Razorpay (we don't store card details)</li>
              <li><strong>Usage Data:</strong> Analytics on profile views, taps, and interactions</li>
              <li><strong>Device Information:</strong> IP address, browser type, device type</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We use your information to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Provide and maintain your digital NFC profile</li>
              <li>Process your orders and payments</li>
              <li>Send order confirmations and shipping updates</li>
              <li>Provide customer support</li>
              <li>Improve our products and services</li>
              <li>Send promotional communications (you can opt-out anytime)</li>
              <li>Prevent fraud and ensure security</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Information Sharing</h2>
            <p className="text-gray-600 leading-relaxed">
              We do not sell or rent your personal information to third parties. We may share your 
              information with:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4 mt-4">
              <li><strong>Payment Processors:</strong> Razorpay for secure payment processing</li>
              <li><strong>Shipping Partners:</strong> For order delivery</li>
              <li><strong>Service Providers:</strong> For analytics, email, and hosting services</li>
              <li><strong>Legal Compliance:</strong> When required by law or to protect our rights</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
            <p className="text-gray-600 leading-relaxed">
              We implement industry-standard security measures to protect your data, including encryption, 
              secure servers, and regular security audits. However, no method of transmission over the 
              internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Your Rights</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Access your personal data</li>
              <li>Update or correct your information</li>
              <li>Delete your account and data</li>
              <li>Opt-out of marketing communications</li>
              <li>Export your data</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mt-4">
              To exercise these rights, contact us at support@1secstory.com
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cookies</h2>
            <p className="text-gray-600 leading-relaxed">
              We use cookies and similar technologies to improve your experience, analyze usage, and 
              provide personalized content. You can control cookies through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Children's Privacy</h2>
            <p className="text-gray-600 leading-relaxed">
              Our services are not intended for users under 18 years of age. We do not knowingly collect 
              information from children under 18.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. International Users</h2>
            <p className="text-gray-600 leading-relaxed">
              If you access our services from outside India, your data may be transferred to and 
              processed in India. By using our services, you consent to this transfer.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Changes to Privacy Policy</h2>
            <p className="text-gray-600 leading-relaxed">
              Viraan Holdings may update this policy periodically. We will notify you of significant 
              changes by email or through our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Us</h2>
            <div className="bg-gray-50 p-6 rounded-lg space-y-2">
              <p className="text-gray-600 mb-2">For privacy-related questions or concerns:</p>
              <p><strong>Email:</strong> support@1secstory.com</p>
              <p><strong>Phone:</strong> +91 97911 52717</p>
              <p><strong>Address:</strong> Bangalore, Karnataka, India</p>
            </div>
          </section>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
