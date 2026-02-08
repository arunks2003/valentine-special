import { motion } from "framer-motion";

export function FinalYes() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#ff8fa3] to-[#ff4d6d] text-white text-center px-4 overflow-hidden relative">
      <motion.div
        initial={{ scale: 0, rotate: -5 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", damping: 12, stiffness: 100 }}
        className="bg-white/20 backdrop-blur-xl p-10 md:p-16 rounded-[3rem] border border-white/30 shadow-2xl z-10"
      >
        <motion.div
          animate={{
            y: [0, -15, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-8xl mb-8"
        >
          🥹💖
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight drop-shadow-md">
          YAYYYYY!
        </h1>

        <p className="text-xl md:text-3xl font-medium italic opacity-90">
          I can’t wait for our date 🌹✨
        </p>

        <div className="mt-10 flex justify-center gap-6 text-4xl grayscale hover:grayscale-0 transition-all duration-500">
          <span>🥂</span>
          <span>🎬</span>
          <span>🍕</span>
        </div>
      </motion.div>

      {/* Floating Petals Effect */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-pink-100/40 pointer-events-none"
          initial={{ top: -50, left: `${Math.random() * 100}%` }}
          animate={{
            top: "110%",
            left: `${Math.random() * 100}%`,
            rotate: 360,
          }}
          transition={{
            duration: Math.random() * 7 + 5,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          🌸
        </motion.div>
      ))}
    </div>
  );
}
