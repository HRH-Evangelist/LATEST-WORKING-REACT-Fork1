import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronDown, MessageCircle } from "lucide-react";
import { useState, useRef } from "react";

const metalCards = [
  {
    name: "Classic Gold",
    gradient: "from-yellow-600 via-yellow-500 to-yellow-400",
    shine: "from-yellow-300/50 via-white/30 to-yellow-300/50",
    textColor: "text-yellow-900",
    glow: "shadow-[0_0_80px_rgba(234,179,8,0.4)]",
  },
  {
    name: "Polished Silver",
    gradient: "from-gray-400 via-gray-300 to-gray-200",
    shine: "from-gray-200/50 via-white/50 to-gray-200/50",
    textColor: "text-gray-700",
    glow: "shadow-[0_0_80px_rgba(156,163,175,0.4)]",
  },
  {
    name: "Matte Black",
    gradient: "from-gray-900 via-gray-800 to-black",
    shine: "from-gray-700/30 via-gray-500/20 to-gray-700/30",
    textColor: "text-white",
    glow: "shadow-[0_0_80px_rgba(0,0,0,0.6)]",
  },
  {
    name: "Rose Gold",
    gradient: "from-rose-400 via-pink-300 to-orange-200",
    shine: "from-rose-300/50 via-white/40 to-orange-200/50",
    textColor: "text-rose-900",
    glow: "shadow-[0_0_80px_rgba(244,114,182,0.4)]",
  },
];

export function HeroSection() {
  const [activeCard, setActiveCard] = useState(0);
  const [cardHovered, setCardHovered] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.3 });

  // WhatsApp number - Update this with your actual number
  const WHATSAPP_NUMBER = "919087083332";

  const card = metalCards[activeCard];

  const handleCardChange = (newIndex: number) => {
    if (
      newIndex >= 0 &&
      newIndex < metalCards.length &&
      newIndex !== activeCard
    ) {
      setActiveCard(newIndex);
    }
  };

  return (
    <section className="relative sm:min-h-screen flex items-center justify-center pt-20 px-6 lg:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full grid sm:pb-3 lg:pb-0 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8"
        >
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
              Your Story, <br />
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Shared in a sec
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 max-w-xl leading-relaxed">
              Premium Metal NFC + Editable QR Cards for Creators, Students,
              Professionals, Founders & Teams. Share your entire digital
              presence with a single tap.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <motion.a
              href="#shop"
              whileHover={{
                scale: 1.02,
                boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
              }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white rounded-full inline-flex items-center justify-center space-x-2 tracking-wide transition-shadow border border-gray-700"
            >
              <span>Create Your Card</span>
            </motion.a>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex gap-6 pt-8 flex-wrap"
          >
            <div>
              <div className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent font-medium text-xl">
                1.0s
              </div>
              <p className="text-gray-500 text-sm tracking-wide">
                Avg. Load Time
              </p>
            </div>
            <div>
              <div className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent font-medium text-xl">
                ∞
              </div>
              <p className="text-gray-500 text-sm tracking-wide">
                Edits Allowed
              </p>
            </div>{" "}
            <div>
              <div className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent font-medium text-xl">
                1 QR
              </div>
              <p className="text-gray-500 text-sm tracking-wide">
                Infinite Links
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right - 3D Card */}
        <motion.div
          initial={{ opacity: 0, x: 50, rotateY: -15 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative flex items-center justify-center pb-40 sm:pb-30 md:pb-30 lg:pb-0"
        >
          <div className="relative w-full max-w-md">
            <motion.div
              ref={cardRef}
              animate={{
                y: isInView ? [0, -20, 0] : 0,
              }}
              transition={{
                duration: 4,
                repeat: isInView ? Infinity : 0,
                ease: "easeInOut",
              }}
              className="relative"
              onMouseEnter={() => setCardHovered(true)}
              onMouseLeave={() => setCardHovered(false)}
            >
              {/* Spotlight effect */}
              <motion.div
                animate={{
                  opacity: cardHovered ? 0.8 : 0.4,
                  scale: cardHovered ? 1.1 : 1,
                }}
                className={`absolute inset-0 rounded-full blur-3xl transition-all duration-500`}
                style={{
                  background:
                    activeCard === 0
                      ? "linear-gradient(to bottom right, rgba(234,179,8,0.4), rgba(234,179,8,0.2))"
                      : activeCard === 1
                        ? "linear-gradient(to bottom right, rgba(156,163,175,0.4), rgba(156,163,175,0.2))"
                        : activeCard === 2
                          ? "linear-gradient(to bottom right, rgba(0,0,0,0.6), rgba(0,0,0,0.3))"
                          : "linear-gradient(to bottom right, rgba(244,114,182,0.4), rgba(244,114,182,0.2))",
                }}
              />

              {/* Card */}
              <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_e, { offset, velocity }) => {
                  const swipe = Math.abs(offset.x) * velocity.x;
                  if (swipe > 500) {
                    handleCardChange(activeCard + 1);
                  } else if (swipe < -500) {
                    handleCardChange(activeCard - 1);
                  }
                }}
                className="relative cursor-grab active:cursor-grabbing"
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "1500px",
                }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeCard}
                    initial={{ rotateY: 90, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    exit={{ rotateY: -90, opacity: 0 }}
                    transition={{
                      duration: 0.5,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                    className={`relative w-full aspect-[1.6/1] ${card.glow} rounded-3xl transition-shadow duration-500`}
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {/* Plain Metallic Card - Both sides identical */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${card.gradient} rounded-3xl overflow-hidden`}
                    >
                      {/* Metallic shine effect */}
                      <motion.div
                        animate={{
                          x: cardHovered ? ["-200%", "200%"] : "0%",
                        }}
                        transition={{
                          duration: 1.5,
                          ease: "easeInOut",
                        }}
                        className={`absolute inset-0 bg-gradient-to-r ${card.shine} opacity-60`}
                        style={{
                          transform: "skewX(-20deg)",
                        }}
                      />

                      {/* Metallic texture overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10" />
                      <div
                        className="absolute inset-0 opacity-30"
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
                        }}
                      />

                      {/* Metallic edge highlight */}
                      <div className="absolute inset-0 rounded-3xl border border-white/30" />
                    </div>

                    {/* Glow effect */}
                    <motion.div
                      animate={{
                        opacity: cardHovered ? 1 : 0,
                      }}
                      className="absolute inset-0 border-2 border-gray-400/50 rounded-3xl pointer-events-none"
                      style={{
                        boxShadow: "0 0 30px rgba(100, 100, 100, 0.5)",
                      }}
                    />
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* Micro-timer chip */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute -bottom-4 -right-4 px-4 py-2 bg-white rounded-full shadow-lg border border-gray-100"
              >
                <span className="text-gray-800 tracking-wider text-sm">
                  ⚡ 1.0s
                </span>
              </motion.div>
            </motion.div>

            {/* Color Indicators */}
            <div className="flex justify-center space-x-3 mt-12">
              {metalCards.map((c, index) => (
                <button
                  key={c.name}
                  onClick={() => handleCardChange(index)}
                  className={`relative w-12 h-12 rounded-xl transition-all duration-300 ${
                    index === activeCard
                      ? "ring-2 ring-gray-900 ring-offset-2 scale-110"
                      : "hover:scale-105"
                  }`}
                >
                  <div
                    className={`w-full h-full bg-gradient-to-br ${c.gradient} rounded-xl border-2 border-white shadow-lg`}
                  />
                  {index === activeCard && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-gray-900 rounded-full"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 z-10"
      >
        <span className="text-gray-500 text-sm tracking-widest">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="text-gray-400" size={24} />
        </motion.div>
      </motion.div>

      {/* Floating WhatsApp Button */}
      <motion.a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I need help with 1 Sec Story NFC cards.")}`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full p-4 shadow-2xl hover:shadow-green-500/50 transition-all duration-300 group"
      >
        <MessageCircle
          size={28}
          className="group-hover:rotate-12 transition-transform"
        />

        {/* Tooltip */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
        >
          Contact / Get Help
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-gray-900"></div>
        </motion.div>

        {/* Pulse effect */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-green-400 rounded-full -z-10"
        />
      </motion.a>
    </section>
  );
}
