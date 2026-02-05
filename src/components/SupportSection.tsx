import { motion } from "framer-motion";
import { Mail, Phone, MessageCircle, MapPin, HelpCircle } from "lucide-react";

export function SupportSection() {
  const contactMethods = [
    {
      icon: Phone,
      title: "Phone Support",
      value: "+91 97911 52717",
      href: "tel:+919791152717",
      description: "Mon-Sat, 10 AM - 7 PM IST",
    },
    {
      icon: Mail,
      title: "Email Support",
      value: "support@1secstory.com",
      href: "mailto:support@1secstory.com",
      description: "Response within 24 hours",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp Support",
      value: "Chat with us",
      href: "https://wa.me/919791152717",
      description: "Quick replies",
    },
  ];

  const faqs = [
    {
      question: "How do I activate my NFC card?",
      answer: "After receiving your card, scan the QR code or tap with your phone to start the activation process.",
    },
    {
      question: "What's the delivery time?",
      answer: "Standard delivery takes 5-7 business days within India. Express shipping available on request.",
    },
    {
      question: "Can I customize my card design?",
      answer: "Yes! You can add custom engraving and personalize your digital profile completely.",
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship worldwide. International shipping rates apply and delivery takes 10-15 business days.",
    },
  ];

  const businessInfo = {
    name: "Viraan Holdings",
    merchant: "RAMACHANDRAN HARIVATSA",
    address: "Bangalore, Karnataka, India",
    gst: "Available on request",
  };

  return (
    <section id="support" className="relative py-24 px-6 lg:px-12 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            We're Here to Help
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Questions about your order? Need technical support? Our team is ready to assist you.
          </p>
        </motion.div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {contactMethods.map((method, index) => (
            <motion.a
              key={method.title}
              href={method.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center group-hover:from-purple-600 group-hover:to-purple-700 transition-all">
                  <method.icon className="w-8 h-8 text-purple-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{method.title}</h3>
                <p className="text-purple-600 font-medium group-hover:text-purple-700">
                  {method.value}
                </p>
                <p className="text-sm text-gray-500">{method.description}</p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* FAQs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all"
              >
                <div className="flex items-start space-x-3">
                  <HelpCircle className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Business Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-200 max-w-3xl mx-auto"
        >
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Business Information</h3>
            <p className="text-gray-600 text-sm">Registered business details</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-500 mb-1">Business Name</p>
              <p className="font-semibold text-gray-900">{businessInfo.name}</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-500 mb-1">Merchant Name</p>
              <p className="font-semibold text-gray-900">{businessInfo.merchant}</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-500 mb-1">Location</p>
              <p className="font-semibold text-gray-900 flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-purple-600" />
                {businessInfo.address}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-500 mb-1">GST Number</p>
              <p className="font-semibold text-gray-900">{businessInfo.gst}</p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600">
              For business inquiries and partnerships, please contact us at{" "}
              <a href="mailto:business@1secstory.com" className="text-purple-600 hover:text-purple-700 font-medium">
                business@1secstory.com
              </a>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-transparent rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-200/30 to-transparent rounded-full blur-3xl -z-10" />
    </section>
  );
}
