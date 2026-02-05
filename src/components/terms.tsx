import { motion } from "framer-motion";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

export function TermsOfService() {
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
            Terms of Service
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
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              By accessing and using the 1 Sec Story platform and purchasing our NFC-enabled metal cards, 
              you agree to be bound by these Terms of Service. If you do not agree to these terms, please 
              do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Product Description</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              1 Sec Story provides premium NFC-enabled metal business cards with digital profile capabilities. 
              Our products include:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Halo (Gold finish) - ₹1,111</li>
              <li>Reflect (Silver finish) - ₹1,111</li>
              <li>Noir (Black finish) - ₹1,111</li>
              <li>Dawn (Rose Gold finish) - ₹1,111</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Payment Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              All payments are processed securely through Razorpay. We accept credit cards, debit cards, 
              UPI, net banking, and international payment methods. Prices are listed in Indian Rupees (INR) 
              and will be automatically converted to your local currency for international orders.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Shipping & Delivery</h2>
            <p className="text-gray-600 leading-relaxed">
              Domestic orders (India) are typically delivered within 5-7 business days. International 
              orders may take 10-15 business days. Shipping costs will be calculated at checkout based 
              on your location.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Returns & Refunds</h2>
            <p className="text-gray-600 leading-relaxed">
              Due to the customized nature of our products, we do not accept returns for personalized 
              cards. However, if you receive a defective or damaged product, please contact our support 
              team at support@1secstory.com within 7 days of delivery for a replacement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Intellectual Property</h2>
            <p className="text-gray-600 leading-relaxed">
              All content, designs, logos, and trademarks on this website are the property of Viraan Holdings. 
              Unauthorized use of any content is strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Contact Information</h2>
            <div className="bg-gray-50 p-6 rounded-lg space-y-2">
              <p><strong>Email:</strong> support@1secstory.com</p>
              <p><strong>Phone:</strong> +91 97911 52717</p>
              <p><strong>WhatsApp:</strong> +91 97911 52717</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Changes to Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              Viraan Holdings reserves the right to modify these terms at any time. Continued use of 
              our services after changes constitutes acceptance of the modified terms.
            </p>
          </section>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
