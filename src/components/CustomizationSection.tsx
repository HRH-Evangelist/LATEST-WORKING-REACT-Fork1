import { motion } from "framer-motion";
import { useState } from "react";
import {
  Upload,
  FileText,
  Image as ImageIcon,
  Check,
  MessageCircle,
  Mail,
} from "lucide-react";

export function CustomizationSection() {
  const [engravingEnabled, setEngravingEnabled] = useState(false);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [designFile, setDesignFile] = useState<File | null>(null);

  // Contact form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [quantity, setQuantity] = useState("");

  const WHATSAPP_NUMBER = "919791152717";
  const YOUR_EMAIL = "vatsahary@gmail.com";

  const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCsvFile(e.target.files[0]);
    }
  };

  const handleDesignUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDesignFile(e.target.files[0]);
    }
  };

  const handleWhatsAppSubmit = () => {
    const message = `*🎴 Bulk NFC Card Order Request*

👤 *Name:* ${name}
🏢 *Company:* ${company}
📧 *Email:* ${email}
📱 *Phone:* ${phone}
🔢 *Quantity:* ${quantity} cards

✅ *Name Engraving:* Yes (+₹500/card)
📋 *CSV File Ready:* ${csvFile ? "Yes ✓" : "No"}
🎨 *Design File Ready:* ${designFile ? "Yes ✓" : "No"}

💬 I'm interested in placing a bulk order. ${csvFile || designFile ? `I have the files ready and will email them to ${YOUR_EMAIL}` : "Please guide me on the next steps."}`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleEmailSubmit = () => {
    const subject = "Bulk NFC Card Customization Request";
    const body = `Hi,

I would like to place a bulk order with custom engraving:

Name: ${name}
Company: ${company}
Email: ${email}
Phone: ${phone}
Quantity: ${quantity} cards

Customization Details:
✅ Name Engraving: Yes (+₹500/card)
📋 CSV File: ${csvFile ? csvFile.name : "Not uploaded yet"}
🎨 Design File: ${designFile ? designFile.name : "Not uploaded yet"}

${csvFile || designFile ? "I will attach the files in a follow-up email." : "Please let me know how to proceed with file submission."}

Looking forward to your response.

Thank you!`;

    const mailtoUrl = `mailto:${YOUR_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  const isFormValid = engravingEnabled && name && email && phone && quantity;

  return (
    <section className="relative min-h-screen flex items-center justify-center py-32 px-6 lg:px-12 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-5xl mx-auto w-full relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Make it{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              personal.
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Add a personal touch to your 1ss NFC card. Offer name engraving for
            a clean, premium finish.
          </p>
        </motion.div>

        {/* Customization Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-200"
        >
          {/* Checkbox Option */}
          <div className="mb-8">
            <label className="flex items-start space-x-4 cursor-pointer group">
              <div className="relative flex items-center justify-center mt-1">
                <input
                  type="checkbox"
                  checked={engravingEnabled}
                  onChange={(e) => setEngravingEnabled(e.target.checked)}
                  className="w-6 h-6 rounded border-2 border-gray-300 checked:bg-purple-600 checked:border-purple-600 cursor-pointer transition-all"
                />
                {engravingEnabled && (
                  <Check
                    className="absolute text-white pointer-events-none"
                    size={16}
                  />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-lg font-medium text-gray-900">
                    Add name engraving
                  </span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                    +₹500 per card
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Professional laser engraving with your custom name or text
                </p>
              </div>
            </label>
          </div>

          {/* Upload Fields - Show when checkbox is enabled */}
          <motion.div
            initial={false}
            animate={{
              height: engravingEnabled ? "auto" : 0,
              opacity: engravingEnabled ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="space-y-6 pt-6 border-t border-gray-200">
              {/* Contact Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name{" "}
                    <span className="text-gray-400 text-xs">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Your Company"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+92 300 1234567"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity (Minimum 10) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="10"
                  min="10"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* CSV/Excel Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Names List
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleCsvUpload}
                    className="hidden"
                    id="csv-upload"
                  />
                  <label
                    htmlFor="csv-upload"
                    className="flex items-center justify-center gap-3 w-full px-6 py-4 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-purple-400 hover:bg-purple-50 transition-all"
                  >
                    <FileText className="text-gray-400" size={24} />
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-700">
                        {csvFile
                          ? csvFile.name
                          : "Click to upload CSV or Excel file"}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Format: Name, Title, Department (optional)
                      </p>
                    </div>
                    <Upload className="text-gray-400" size={20} />
                  </label>
                </div>
              </div>

              {/* Design/Logo Upload (Optional) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Logo or Design{" "}
                  <span className="text-gray-400 text-xs">(Optional)</span>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".png,.jpg,.jpeg,.svg,.ai,.pdf"
                    onChange={handleDesignUpload}
                    className="hidden"
                    id="design-upload"
                  />
                  <label
                    htmlFor="design-upload"
                    className="flex items-center justify-center gap-3 w-full px-6 py-4 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-purple-400 hover:bg-purple-50 transition-all"
                  >
                    <ImageIcon className="text-gray-400" size={24} />
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-700">
                        {designFile
                          ? designFile.name
                          : "Click to upload logo/design"}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PNG, JPG, SVG, AI, or PDF (max 10MB)
                      </p>
                    </div>
                    <Upload className="text-gray-400" size={20} />
                  </label>
                </div>
              </div>

              {/* Sample Format Link */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <span className="font-medium">💡 File Submission:</span>{" "}
                  Upload files now (optional) or email them to{" "}
                  <strong>{YOUR_EMAIL}</strong> after submitting your contact
                  details.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Corporate Note */}
          <div className="mt-8 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-yellow-900 text-sm font-bold">!</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 mb-1">
                  Corporate Bulk Orders Only
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Customization is available for bulk corporate orders (minimum
                  10 cards). Details will be reviewed before production. Our
                  team will contact you within 24 hours to confirm your order.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
          >
            {/* WhatsApp Button (Primary) */}
            <button
              onClick={handleWhatsAppSubmit}
              disabled={!isFormValid}
              className={`px-8 py-4 rounded-full font-medium tracking-wide transition-all flex items-center justify-center gap-2 ${
                isFormValid
                  ? "bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-xl hover:scale-105"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              <MessageCircle size={20} />
              Send via WhatsApp
            </button>

            {/* Email Button (Secondary) */}
            <button
              onClick={handleEmailSubmit}
              disabled={!isFormValid}
              className={`px-8 py-4 rounded-full font-medium tracking-wide transition-all flex items-center justify-center gap-2 ${
                isFormValid
                  ? "bg-white border-2 border-purple-600 text-purple-600 hover:bg-purple-50 hover:scale-105"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed border-2 border-gray-300"
              }`}
            >
              <Mail size={20} />
              Send via Email
            </button>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 grid md:grid-cols-3 gap-6"
        >
          {[
            {
              icon: "⚡",
              title: "Fast Turnaround",
              desc: "2-3 business days",
            },
            {
              icon: "✨",
              title: "Premium Quality",
              desc: "Laser-etched precision",
            },
            {
              icon: "🎯",
              title: "Bulk Discounts",
              desc: "Save on large orders",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h4 className="font-medium text-gray-900 mb-1">
                {feature.title}
              </h4>
              <p className="text-sm text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
