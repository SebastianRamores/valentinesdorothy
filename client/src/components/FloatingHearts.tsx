import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const HEARTS = ["❤️", "💖", "💕", "💞", "💓", "🌸"];

export function FloatingHearts() {
  const [hearts, setHearts] = useState<{ id: number; char: string; left: number; delay: number }[]>([]);

  useEffect(() => {
    // Generate static array on mount to avoid hydration mismatch
    const newHearts = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      char: HEARTS[Math.floor(Math.random() * HEARTS.length)],
      left: Math.random() * 100,
      delay: Math.random() * 20,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-2xl md:text-4xl opacity-20"
          initial={{ y: "110vh", x: `${heart.left}vw`, rotate: 0, opacity: 0 }}
          animate={{ 
            y: "-20vh", 
            rotate: 360, 
            opacity: [0, 0.4, 0.4, 0] 
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            delay: heart.delay,
            ease: "linear",
          }}
        >
          {heart.char}
        </motion.div>
      ))}
    </div>
  );
}
