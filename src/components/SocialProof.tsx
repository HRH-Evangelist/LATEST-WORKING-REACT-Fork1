import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  Stethoscope,
  Play,
  FileText,
  Download,
  Eye,
  ChevronLeft,
  ChevronRight,
  Home,
  Monitor,
  Gem,
  Briefcase,
  Sparkles,
  Users,
  Mic,
  Factory,
  Wrench,
  Scale,
  GraduationCap,
  Building2,
} from "lucide-react";

export function SocialProof() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  const files = [
    {
      name: "Product Catalog.pdf",
      size: "2.4 MB",
      color: "red",
      bgColor: "bg-red-100",
      textColor: "text-red-600",
    },
    {
      name: "Company Deck.pdf",
      size: "1.8 MB",
      color: "blue",
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
    },
    {
      name: "Services Menu.pdf",
      size: "1.2 MB",
      color: "green",
      bgColor: "bg-green-100",
      textColor: "text-green-600",
    },
    {
      name: "Portfolio.pdf",
      size: "3.1 MB",
      color: "purple",
      bgColor: "bg-purple-100",
      textColor: "text-purple-600",
    },
  ];

  const nextFile = () => {
    setCurrentFileIndex((prev) => (prev + 1) % files.length);
  };

  const prevFile = () => {
    setCurrentFileIndex((prev) => (prev - 1 + files.length) % files.length);
  };

  const nextMedia = () => {
    setCurrentMediaIndex((prev) => (prev + 1) % 2);
  };

  const prevMedia = () => {
    setCurrentMediaIndex((prev) => (prev - 1 + 2) % 2);
  };

  const personas = [
    {
      icon: Stethoscope,
      title: "Doctors",
      gradient: "from-blue-400 to-cyan-400",
    },
    {
      icon: Scale,
      title: "Lawyers",
      gradient: "from-purple-400 to-pink-400",
    },
    {
      icon: GraduationCap,
      title: "Students",
      gradient: "from-green-400 to-emerald-400",
    },
    {
      icon: Building2,
      title: "Real Estate Agents",
      gradient: "from-yellow-400 to-orange-400",
    },
    {
      icon: Briefcase,
      title: "Founder/CEO",
      gradient: "from-indigo-400 to-blue-500",
    },
    {
      icon: Sparkles,
      title: "Creator / Influencer",
      gradient: "from-rose-400 to-pink-500",
    },
    {
      icon: Users,
      title: "Sales / BD Teams",
      gradient: "from-teal-400 to-cyan-500",
    },
    {
      icon: Mic,
      title: "Event Hosts / Speakers",
      gradient: "from-amber-400 to-red-500",
    },
  ];

  return (
    <section
      id="social-proof"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center py-16 px-6 lg:px-12"
    >
      <motion.div
        style={{ opacity }}
        className="max-w-7xl mx-auto w-full relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 space-y-4 w-full sm:max-w-4xl sm:mx-auto "
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
            From Founders, Doctors, Sales, Teams, Students and everyday
            professionals one smart card{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              for everyone.
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto tracking-wide">
            Join professionals who've upgraded their networking game
          </p>
        </motion.div>

        {/* Persona cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {personas.map((persona, index) => (
            <motion.div
              key={persona.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="relative group"
            >
              <div className="relative p-4 bg-white/60 backdrop-blur-xl rounded-2xl border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ease-in-out">
                {/* Icon */}
                <div
                  className={`w-10 h-10 bg-gradient-to-br ${persona.gradient} rounded-lg flex items-center justify-center mb-3 shadow-md group-hover:scale-110 transition-transform `}
                >
                  <persona.icon className="text-white" size={20} />
                </div>

                {/* Content */}
                <h3 className="text-sm text-gray-900 tracking-tight text-left font-medium">
                  {persona.title}
                </h3>
                {/* Glow on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${persona.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300 ease-in-out`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Digital Brochure Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Your brochure.{" "}
                <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Reimagined.
                </span>
              </h2>

              <p className="text-lg text-gray-600 leading-relaxed">
                Create a digital brochure inside an NFC. Videos, PDFs, decks,
                catalogs - all in one tap.
              </p>

              <div className="space-y-3 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <p className="text-gray-700">Always updated</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600 font-bold">✓</span>
                  </div>
                  <p className="text-gray-700">Always on-brand</p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-medium tracking-wide hover:shadow-xl transition-shadow"
              >
                Create Digital Brochure
              </motion.button>
            </div>

            {/* Right - Visual Mockup */}
            <div className="relative">
              <div className="relative">
                {/* NFC Card Mockup */}
                {/* <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="relative mb-8"
                >
                  <div className="w-64 aspect-[1.6/1] bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-2xl mx-auto relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FileText className="text-white/80" size={48} />
                    </div> 
                    <div className="absolute bottom-4 right-4 w-10 h-10 bg-white/20 rounded-full backdrop-blur-sm flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-white/60 rounded-full"></div>
                    </div>
                  </div>
                </motion.div> */}

                {/* Phone Screen Mockup */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="relative"
                >
                  <div className="w-80 bg-gray-900 rounded-[3rem] p-3 shadow-2xl mx-auto">
                    <div className="bg-white rounded-[2.5rem] overflow-hidden h-135 relative">
                      {/* Status bar */}
                      <div className="absolute top-0 left-0 right-0 h-12 flex items-center justify-center z-20">
                        <div className="w-32 h-7 bg-gray-900 rounded-full"></div>
                      </div>

                      {/* Media Carousel Container */}
                      <div className="relative">
                        <motion.div
                          key={currentMediaIndex}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.4 }}
                        >
                          {currentMediaIndex === 0 ? (
                            /* NFC card mockup */
                            <div className="mt-16 w-64 aspect-[1.6/1] bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-2xl mx-auto relative overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <FileText className="text-white/80" size={48} />
                              </div>
                              {/* NFC chip indicator */}
                              <div className="absolute bottom-4 right-4 w-10 h-10 bg-white/20 rounded-full backdrop-blur-sm flex items-center justify-center">
                                <div className="w-6 h-6 border-2 border-white/60 rounded-full"></div>
                              </div>
                            </div>
                          ) : (
                            /* Video Thumbnail */
                            <div className="relative w-64 mx-auto mt-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl h-40 flex items-center justify-center overflow-hidden group cursor-pointer">
                              <div className="absolute inset-0 bg-black/20"></div>
                              <Play className="text-white z-10" size={48} />
                              <span className="absolute bottom-3 right-3 text-white text-xs bg-black/50 px-2 py-1 rounded">
                                2:30
                              </span>
                            </div>
                          )}
                        </motion.div>

                        {/* Media Navigation Controls */}
                        <div className="flex items-center justify-center gap-3 mt-4">
                          <button
                            onClick={prevMedia}
                            className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                          >
                            <ChevronLeft className="text-gray-600" size={16} />
                          </button>

                          <div className="flex gap-2">
                            {[0, 1].map((index) => (
                              <button
                                key={index}
                                onClick={() => setCurrentMediaIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all ${
                                  index === currentMediaIndex
                                    ? "bg-purple-600 w-6"
                                    : "bg-gray-300"
                                }`}
                              />
                            ))}
                          </div>

                          <button
                            onClick={nextMedia}
                            className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                          >
                            <ChevronRight className="text-gray-600" size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="px-6 pt-5 pb-6 space-y-4">
                        {/* PDF Icons - Carousel */}
                        <div className="relative">
                          <motion.div
                            key={currentFileIndex}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                          >
                            <div
                              className={`w-10 h-10 ${files[currentFileIndex].bgColor} rounded-lg flex items-center justify-center`}
                            >
                              <FileText
                                className={files[currentFileIndex].textColor}
                                size={20}
                              />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">
                                {files[currentFileIndex].name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {files[currentFileIndex].size}
                              </p>
                            </div>
                            <Download className="text-gray-400" size={18} />
                          </motion.div>

                          {/* Carousel Navigation */}
                          <div className="flex items-center justify-between mt-3">
                            <button
                              onClick={prevFile}
                              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                            >
                              <ChevronLeft
                                className="text-gray-600"
                                size={20}
                              />
                            </button>

                            <div className="flex gap-2">
                              {files.map((_, index) => (
                                <button
                                  key={index}
                                  onClick={() => setCurrentFileIndex(index)}
                                  className={`w-2 h-2 rounded-full transition-all ${
                                    index === currentFileIndex
                                      ? "bg-purple-600 w-6"
                                      : "bg-gray-300"
                                  }`}
                                />
                              ))}
                            </div>

                            <button
                              onClick={nextFile}
                              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                            >
                              <ChevronRight
                                className="text-gray-600"
                                size={20}
                              />
                            </button>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-2 pt-2">
                          <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl text-sm font-medium flex items-center justify-center gap-2">
                            <Download size={16} />
                            Download Brochure
                          </button>
                          <button className="w-full py-3 bg-white border border-gray-300 text-gray-700 rounded-xl text-sm font-medium flex items-center justify-center gap-2">
                            <Eye size={16} />
                            Book a Demo
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Decorative elements */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-200/30 rounded-full blur-3xl -z-10"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-200/30 rounded-full blur-3xl -z-10"></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Use Case Strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20"
        >
          <div className="relative bg-gradient-to-br from-gray-50 via-white to-gray-50 rounded-3xl p-8 md:p-12 border border-gray-200 shadow-xl overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-100/40 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-100/40 to-transparent rounded-full blur-3xl"></div>

            <div className="relative z-10">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-10"
              >
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                  Perfect For Every{" "}
                  <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Industry
                  </span>
                </h3>
                <p className="text-gray-600 text-lg">
                  Trusted by professionals across diverse sectors
                </p>
              </motion.div>

              {/* Use Case Cards Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                  { name: "Real Estate", icon: Home, color: "text-orange-600" },
                  { name: "SaaS", icon: Monitor, color: "text-blue-600" },
                  {
                    name: "Luxury Brands",
                    icon: Gem,
                    color: "text-purple-600",
                  },
                  {
                    name: "Consulting",
                    icon: Briefcase,
                    color: "text-green-600",
                  },
                  {
                    name: "Services",
                    icon: Wrench,
                    color: "text-yellow-600",
                  },
                  {
                    name: "Manufacturing",
                    icon: Factory,
                    color: "text-pink-600",
                  },
                ].map((useCase, index) => (
                  <motion.div
                    key={useCase.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    whileHover={{ y: -8, scale: 1.05 }}
                    className="group cursor-pointer"
                  >
                    <div className="relative bg-white rounded-2xl p-5 border border-gray-200 shadow-md hover:shadow-2xl transition-all duration-300 h-full">
                      {/* Icon without background */}
                      <div className="flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <useCase.icon
                          className={`${useCase.color}`}
                          size={40}
                          strokeWidth={1.5}
                        />
                      </div>

                      {/* Text */}
                      <h4 className="text-sm font-semibold text-gray-900 text-center leading-tight">
                        {useCase.name}
                      </h4>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Bottom CTA */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-center mt-10"
              >
                <p className="text-gray-600 text-sm">
                  And many more...{" "}
                  <a
                    href="#shop"
                    className="text-purple-600 hover:text-purple-700 font-semibold underline underline-offset-4"
                  >
                    Get Started Today
                  </a>
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
