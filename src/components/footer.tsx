import { motion } from "framer-motion";
import logo from "../assets/Website-Logo.png";

export function Footer() {
  const links = {
    product: [
      { label: "Shop", href: "#shop" },
      { label: "Activate", href: "#activate" },
      { label: "Dashboard", href: "#dashboard" },
      { label: "Pricing", href: "#pricing" },
    ],
    support: [
      { label: "FAQ", href: "#faq" },
      { label: "Contact", href: "#contact" },
      { label: "Support", href: "#support" },
      { label: "Shipping", href: "#shipping" },
    ],
     
  };

  const socialLinks = [
    { name: "Instagram", href: "#" },
    { name: "LinkedIn", href: "#" },
    { name: "Twitter", href: "#" },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-white to-gray-50 py-20 px-6 lg:px-12 border-t border-gray-100">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <img src={logo} alt="1 Sec Story" className="w-36" />
            </div>
            <p className="text-gray-600 max-w-xs leading-relaxed tracking-wide">
              Built for stories that don't fit in a business card.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-300 rounded-full flex items-center justify-center hover:from-gray-800 hover:to-gray-900 transition-all group"
                >
                  <span className="text-gray-700 text-sm group-hover:text-white transition-colors font-medium">
                    {social.name[0]}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-gray-900 tracking-tight mb-4">Product</h4>
            <ul className="space-y-3">
              {links.product.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors tracking-wide"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-gray-900 tracking-tight mb-4">Support</h4>
            <ul className="space-y-3">
              {links.support.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors tracking-wide"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
 
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-500 text-sm tracking-wide">
            © 2026 1 Sec Story. All rights reserved.
          </p>
          <div className="flex items-center space-x-2">
            <span className="text-gray-400 text-sm tracking-wide">
              Made with
            </span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-red-500"
            >
              ❤️
            </motion.span>
            <span className="text-gray-400 text-sm tracking-wide">
              for storytellers
            </span>
          </div>
        </div>
      </div>

      {/* Decorative gradients */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-gray-200/30 to-transparent rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-gray-300/30 to-transparent rounded-full blur-3xl -z-10" />
    </footer>
  );
}
