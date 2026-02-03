import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "../assets/Website-Logo.png";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Shop", href: "#shop" },
    { label: "Activate", href: "#activate" },
    { label: "Experience", href: "#experience" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/70 backdrop-blur-md shadow-lg border-b border-white/20"
          : "bg-white/50 backdrop-blur-md border-b border-white/10"
      }`}
      style={{
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-3 items-center h-20 gap-4">
          {/* Left - Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6 justify-start">
            {navItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="text-gray-700 hover:text-gray-900 transition-colors tracking-wide relative group"
              >
                {item.label}
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </nav>

          {/* Center - Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            whileHover={{ scale: 1.08, rotate: [0, -5, 5, 0] }}
            className="flex items-center justify-center space-x-3"
          >
            <img src={logo} alt="1 Sec Story" className="w-36" />
            {/* <motion.span
              className="tracking-tight text-gray-900 font-medium hidden sm:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              1 Sec Story
            </motion.span> */}
          </motion.div>

          {/* Right - Desktop CTAs */}
          <div className="hidden md:flex items-center space-x-3 justify-end">
            <motion.a
              href="/login"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2.5 text-gray-700 hover:text-gray-900 transition-colors tracking-wide relative group"
            >
              Login
              <motion.div
                className="absolute inset-0 bg-gray-100 rounded-full -z-10"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
            </motion.a>
            <motion.a
              href="#shop"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)",
                y: -2,
              }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2.5 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white rounded-full transition-all tracking-wide border border-gray-700 relative overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10">Create Your Story</span>
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-2 text-gray-700 ml-auto col-start-3"
          >
            <motion.div
              animate={{ rotate: mobileMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/70 backdrop-blur-md border-t border-white/20"
            style={{
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            <div className="px-6 py-6 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-gray-700 hover:text-gray-900 transition-colors tracking-wide"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4 space-y-3">
                <a
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-5 py-2.5 text-center text-gray-700 hover:text-gray-900 border border-gray-200 rounded-full transition-colors tracking-wide"
                >
                  Login
                </a>
                <a
                  href="#shop"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-6 py-2.5 text-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white rounded-full tracking-wide"
                >
                  Create Your Card
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
