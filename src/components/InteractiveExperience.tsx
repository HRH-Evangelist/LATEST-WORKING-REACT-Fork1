import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

import AV from "../assets/CardsScreen/AV.png";
import BG from "../assets/CardsScreen/BG.png";
import EM from "../assets/CardsScreen/EM.png";
import TC from "../assets/CardsScreen/TC.png";
import VK from "../assets/CardsScreen/VK.png";

export function InteractiveExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const x = useTransform(scrollYProgress, [0, 0.2], [-100, 0]);

  const [activeImage, setActiveImage] = useState(0);
  const images = [AV, BG, EM, TC, VK];

  const handleImageChange = (newIndex: number) => {
    if (newIndex >= 0 && newIndex < images.length) {
      setActiveImage(newIndex);
    }
  };
 
 
  const features = [
    "Save contact in one tap",
    "Link all your socials, website, Calendly",
    "Update your QR anytime from your dashboard",
    "Easy Share Option",
    "Sleek metal design. No branding. All you.",
    "Compatible with all NFC reading devices",
  ];
 
  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center py-16 px-6 lg:px-12"
    >
      <motion.div
        style={{ opacity }}
        className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center justify-between relative z-10 "
      >
        {/* Left - Phone Mockup with Carousel */}
        <motion.div
          style={{ x }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative flex justify-center pb-16"
        >
          <div className="relative w-full max-w-md">
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_e, { offset }) => {
                // Swipe left (offset.x is negative) = next image
                if (offset.x < -50) {
                  handleImageChange(activeImage + 1);
                }
                // Swipe right (offset.x is positive) = previous image
                else if (offset.x > 50) {
                  handleImageChange(activeImage - 1);
                }
              }}
              className="relative cursor-grab active:cursor-grabbing"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  key={activeImage}
                  src={images[activeImage]}
                  alt="Card screen mockup"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{
                    duration: 0.3,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className="w-1/2 mx-auto"
                  draggable={false}
                />
              </AnimatePresence>
            </motion.div>

            {/* Navigation Dots */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === activeImage
                      ? "w-8 h-2 bg-purple-600"
                      : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right - Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 bg-gradient-to-r  from-purple-600 to-blue-600 rounded-full"
            >
              <span className="text-white tracking-widest text-sm">
                INTERACTIVE EXPERIENCE
              </span>
            </motion.div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
              Your{" "}
              <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                Entire Digital Identity
              </span>{" "}
              in One Card
            </h2>

            <p className="text-gray-600 leading-relaxed tracking-wide">
              More than just a business card. 1 Sec Story is your complete
              digital presence, accessible with a single tap. Swipe through your
              contacts, socials, portfolio, and payments.
            </p>
          </div>

          {/* Features list */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start space-x-4 group"
              >
                <div className="mt-1 w-6 h-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-gray-700 leading-relaxed tracking-wide">
                  {feature}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="pt-4"
          >
            <motion.a
              href="#shop"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full tracking-wide shadow-lg hover:shadow-xl transition-shadow border border-purple-500"
            >
              <span>Get Your Card Now</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Animated cloud gradient */}
      <motion.div
        animate={{
          y: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-emerald-300/30 rounded-full blur-3xl -z-10"
      />
    </section>
  );
}
