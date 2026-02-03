import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState } from "react";
import { Package, Globe, Sparkles } from "lucide-react";
import mockup2 from "../assets/Landingpage/mockup2.png";
import mockup3 from "../assets/Landingpage/mockup3.png";

export function ActivateCard() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [100, 0]);

  const [activeImage, setActiveImage] = useState(0);
  const images = [mockup2, mockup3];

  const handleImageChange = (newIndex: number) => {
    if (newIndex >= 0 && newIndex < images.length) {
      setActiveImage(newIndex);
    }
  };

  const steps = [
    {
      icon: Package,
      number: "01",
      title: "Open Your Package",
      description: "Find your premium metal card inside the envelope.",
      gradient: "from-yellow-600 via-yellow-500 to-yellow-400",
    },
    {
      icon: Globe,
      number: "02",
      title: "Tap or Scan to begin",
      description:
        "Visit our simple activation portal from any device. No app download required. Keep your secret pin handy.",
      gradient: "from-gray-400 via-gray-300 to-gray-200",
    },
    {
      icon: Sparkles,
      number: "03",
      title: "Set Your Story",
      description:
        "Add your 1 sec story, links and contact, save story and card is live.",
      gradient: "from-rose-400 via-pink-300 to-orange-200",
    },
  ];

  return (
    <section
      id="activate"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center py-16 px-6 lg:px-12"
    >
      <motion.div
        style={{ opacity, y }}
        className="max-w-6xl mx-auto w-full relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 space-y-4"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Activate. Edit. Evolve.
            </span>
          </h2>
          <p className="text-gray-600 mx-auto tracking-wide ">
            Get your card up and running in under 2 minutes
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Box mockup with swipe */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
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
                    alt="Metal card mockup"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{
                      duration: 0.3,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                    className="rounded-xl w-3/4 mx-auto"
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

          {/* Right - Steps */}
          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative flex space-x-6 group"
              >
                {/* Icon */}
                <div className="shrink-0">
                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${step.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    <step.icon className="text-white" size={24} />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-gray-900 tracking-tight">
                      {step.title}
                    </h3>
                    <span className="text-sm text-gray-400 tracking-wider">
                      {step.number}
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed tracking-wide">
                    {step.description}
                  </p>
                </div>

                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-1 top-16 w-0.5 h-[90px] sm:h-12 bg-gradient-to-b from-purple-300 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-20 text-center space-y-6"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="/login"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full tracking-wide shadow-lg hover:shadow-xl transition-shadow border border-purple-500"
            >
              <span>Already have a card?</span>
            </motion.a>
            <motion.a
              href="#shop"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-800 rounded-full tracking-wide hover:border-gray-400 transition-colors"
            >
              Get your story
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
