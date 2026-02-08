import { useState, useRef } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { FinalYes } from "../components/FinalYes";

const noTexts = [
  "No 😐",
  "Are you sure? 🤔",
  "Really sure?? 😳",
  "What if I gift you a Diet Coke? 🥤",
  "Okay… TWO Diet Cokes 😌",
  "Free chocolates 🍫",
  "I can sing a song for you with my guitar 🎸🎶",
  "I’ll pick you up 🛵",
  "Just one date 🥺",
  "This button is tired 😭",
  "Last chance 👀",
];

export default function Valentine() {
  const [step, setStep] = useState(0);
  const [yesScale, setYesScale] = useState(1);
  const [accepted, setAccepted] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNoAction = () => {
    // Increase text and Yes button size on every attempt
    setStep((prev) => Math.min(prev + 1, noTexts.length - 1));
    setYesScale((prev) => prev + 0.25);

    // Make the button start jumping away after 2 attempts
    if (step >= 1 && containerRef.current) {
      const container = containerRef.current.getBoundingClientRect();

      // Calculate a random position within the viewport
      const randomX = (Math.random() - 0.5) * (container.width * 0.7);
      const randomY = (Math.random() - 0.5) * (container.height * 0.7);

      setNoButtonPos({ x: randomX, y: randomY });
    }
  };

  const handleYes = () => {
    // High-end confetti celebration
    const end = Date.now() + 3 * 1000;
    const colors = ["#ff4d6d", "#ff8fa3", "#ffffff"];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    setAccepted(true);
  };

  if (accepted) return <FinalYes />;

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center bg-[#fff0f3] px-4 overflow-hidden relative"
    >
      <div className="z-10 text-center max-w-2xl">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black text-[#ff4d6d] mb-12 drop-shadow-sm"
        >
          Will you go on a date with me? 💖
        </motion.h1>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 min-h-[200px]">
          <motion.button
            animate={{ scale: yesScale }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            whileHover={{ scale: yesScale + 0.05 }}
            whileTap={{ scale: yesScale - 0.05 }}
            onClick={handleYes}
            className="bg-[#ff4d6d] text-white px-12 py-5 rounded-2xl font-bold text-2xl shadow-[0_10px_0_0_#c9184a] active:shadow-none active:translate-y-2"
          >
            YES! 💘
          </motion.button>

          <motion.button
            animate={{ x: noButtonPos.x, y: noButtonPos.y }}
            transition={{ type: "spring", stiffness: 600, damping: 25 }}
            onMouseEnter={handleNoAction} // Mobile & Desktop interaction
            onClick={handleNoAction} // Ensures progress even if "caught"
            className="bg-white text-gray-500 border-2 border-gray-200 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-50 whitespace-nowrap"
          >
            {noTexts[step]}
          </motion.button>
        </div>
      </div>

      {/* Subtle Floating Hearts Background */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl"
            initial={{ y: "110vh", x: `${i * 15}%` }}
            animate={{ y: "-10vh" }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: i,
            }}
          >
            🌸
          </motion.div>
        ))}
      </div>
    </div>
  );
}
