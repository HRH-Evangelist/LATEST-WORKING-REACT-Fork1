import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { initiatePayment, type ProductDetails } from "../utils/razorpay";

export function ProductShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [100, 0]);

  const products = [
    {
      name: "Halo",
      variant: "A glow that stands out.",
      price: "₹1,111",
      gradient: "from-yellow-600 via-yellow-500 to-yellow-400",
      accentGradient: "from-yellow-400 to-yellow-600",
      colors: ["bg-yellow-600", "bg-yellow-400", "bg-yellow-500"],
      popular: true,
      textColor: "text-yellow-900",
    },
    {
      name: "Reflect",
      variant: "Designed to mirror you.",
      price: "₹1,111",
      gradient: "from-gray-400 via-gray-300 to-gray-200",
      accentGradient: "from-gray-400 to-gray-600",
      colors: ["bg-gray-300", "bg-gray-200", "bg-gray-400"],
      popular: false,
      textColor: "text-gray-700",
    },
    {
      name: "Noir",
      variant: "Presence without noise",
      price: "₹1,111",
      gradient: "from-gray-900 via-gray-800 to-black",
      accentGradient: "from-gray-700 to-gray-900",
      colors: ["bg-gray-900", "bg-black", "bg-gray-800"],
      popular: false,
      textColor: "text-gray-700",
    },
    {
      name: "Dawn",
      variant: "Where elegance begins.",
      price: "₹1,111",
      gradient: "from-rose-400 via-pink-300 to-orange-200",
      accentGradient: "from-rose-400 to-pink-500",
      colors: ["bg-rose-400", "bg-pink-300", "bg-orange-200"],
      popular: false,
      textColor: "text-rose-900",
    },
  ];

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const handleAddToCart = async (
    productName: string,
    productVariant: string,
    price: string,
  ) => {
    // Extract numeric price
    const numericPrice = parseInt(price.replace(/[^0-9]/g, ""));

    console.log("Product details:", {
      productName,
      productVariant,
      price,
      numericPrice,
    });

    if (!numericPrice || numericPrice <= 0) {
      alert("Invalid price. Please try again.");
      return;
    }

    const productDetails: ProductDetails = {
      name: productName,
      variant: productVariant,
      price: numericPrice,
      quantity: 1,
    };

    
    await initiatePayment(productDetails);
  };

  return (
    <section
      id="shop"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center py-16 px-6 lg:px-12"
    >
      <motion.div
        style={{ opacity }}
        className="max-w-7xl mx-auto w-full relative z-10"
      >
        <motion.div
          style={{ y }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 space-y-4"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
            What's your{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              1 sec story?
            </span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto tracking-wide">
            Premium metal cards with NFC technology and editable QR codes.
            Available in four luxury finishes.
          </p>
        </motion.div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              onTouchStart={() => setHoveredIndex(index)}
              className="relative group cursor-pointer"
            >
              <motion.div
                animate={{
                  rotateY: flippedIndex === index ? 180 : 0,
                }}
                transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                className="relative bg-white rounded-3xl p-6 border border-gray-200/50 shadow-lg hover:shadow-2xl transition-shadow duration-300"
                style={{
                  transformStyle: "preserve-3d",
                  willChange: "transform",
                }}
              >
                {/* Popular badge */}
                {product.popular && (
                  <div  className="absolute -top-3 -right-3 px-4 py-1.5 bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 text-white rounded-full text-xs tracking-widest shadow-lg z-10">
                    {/* POPULAR */}
                    {flippedIndex === index ? <h1 className="-scale-x-100">POPULAR</h1> : "POPULAR"}
                  </div>
                )}

                {/* Front Side */}
                <div
                  className="relative"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(0deg)",
                  }}
                >
                  {/* Card preview */}
                  <motion.div
                    animate={{
                      y: hoveredIndex === index ? -10 : 0,
                      rotateY: hoveredIndex === index ? 5 : 0,
                      rotateX: hoveredIndex === index ? -5 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="relative mb-6"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div
                      className={`aspect-[1.6/1] bg-gradient-to-br ${product.gradient} rounded-xl shadow-xl overflow-hidden`}
                    >
                      {/* Metal texture */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />

                      {/* Card content */}
                      <div className="relative h-full p-4 flex flex-col justify-between"></div>
                    </div>

                    {/* Glow effect */}
                    <motion.div
                      animate={{
                        opacity: hoveredIndex === index ? 1 : 0,
                      }}
                      className={`absolute inset-0 border-2 border-blue-400/50 rounded-xl`}
                      style={{
                        boxShadow: "0 0 30px rgba(30, 64, 175, 0.5)",
                      }}
                    />
                  </motion.div>

                  {/* Product info */}
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900 tracking-tight">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-500 tracking-wide">
                        {product.variant}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-900 tracking-wide">
                        {product.price}
                      </span>
                      <span className="text-xs text-gray-500 tracking-wider">
                        NFC + QR
                      </span>
                    </div>

                    {/* Quick view button - always visible on mobile, hover on desktop */}
                    <div className="pt-2">
                      <motion.button
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setFlippedIndex(
                            flippedIndex === index ? null : index,
                          );
                        }}
                        onTouchEnd={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setFlippedIndex(
                            flippedIndex === index ? null : index,
                          );
                        }}
                        className="w-full py-2 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white rounded-full text-sm tracking-wide hover:shadow-lg transition-shadow cursor-pointer touch-none"
                      >
                        {flippedIndex === index ? "Close" : "Quick View"}
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Back Side */}
                <div
                  className="absolute inset-0 p-6"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <div className="h-full flex flex-col justify-between">
                    <div className="space-y-4">
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                        {product.name}
                      </h3>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center justify-between">
                          <span>✓ NFC Enabled</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>✓ Editable QR Code</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>✓ Premium Metal</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>✓ Lifetime Updates</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-gray-200">
                        <p className="text-xs text-gray-500">
                          Tap to instantly share your profile, portfolio, or
                          business card
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(
                            product.name,
                            product.variant,
                            product.price,
                          );
                        }}
                        onTouchEnd={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleAddToCart(
                            product.name,
                            product.variant,
                            product.price,
                          );
                        }}
                        className="w-full py-2.5 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white rounded-full text-sm tracking-wide transition-shadow hover:shadow-xl cursor-pointer touch-none"
                      >
                        Buy now
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setFlippedIndex(null);
                        }}
                        onTouchEnd={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setFlippedIndex(null);
                        }}
                        className="w-full py-2 text-gray-600 text-sm hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors cursor-pointer touch-none"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <span className="text-gray-600 font-semibold italic">
            Also available in wood on bulk requests
          </span>
        </div>
      </motion.div>
    </section>
  );
}
