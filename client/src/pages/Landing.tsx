import { useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { useCreateResponse } from "@/hooks/use-response";
import { FloatingHearts } from "@/components/FloatingHearts";
import confetti from "canvas-confetti";

export default function Landing() {
  const [, setLocation] = useLocation();
  const [noCount, setNoCount] = useState(0);
  const [yesScale, setYesScale] = useState(1);
  const createResponse = useCreateResponse();
  
  const handleNoClick = () => {
    setNoCount((prev) => prev + 1);
    setYesScale((prev) => prev + 0.5); // Grow significantly each time
  };

  const handleYesClick = async () => {
    // Stop background music if playing (will be handled by the global audio component)
    const audio = document.getElementById('bg-music') as HTMLAudioElement;
    if (audio) {
      // optional: fade out or stop
    }

    // Trigger instant joy
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff69b4', '#ff1493', '#ffb6c1']
    });

    try {
      // Record the response
      await createResponse.mutateAsync({
        accepted: true,
        noClickCount: noCount,
        responderName: "Dorothy" // Default, could be dynamic if needed
      });
    } catch (e) {
      console.error("Failed to record response", e);
      // Continue anyway, don't block love!
    }

    // Small delay to let the confetti pop before navigating
    setTimeout(() => {
      setLocation("/valentine");
    }, 800);
  };

  const getNoButtonText = () => {
    const phrases = [
      "No",
      "Are you sure?",
      "Really sure?",
      "Think again!",
      "Last chance!",
      "Surely not?",
      "You might regret this!",
      "Give it another thought!",
      "Are you absolutely certain?",
      "This could be a mistake!",
      "Have a heart!",
      "Don't be so cold!",
      "Change of heart?",
      "Wouldn't you reconsider?",
      "Is that your final answer?",
      "You're breaking my heart ;(",
    ];

    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden relative selection:bg-primary/20">
      <FloatingHearts />
      
      <div className="z-10 text-center max-w-2xl mx-auto">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12"
        >
          <div className="w-24 h-24 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-primary/20">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <Heart className="w-12 h-12 text-primary fill-primary" />
            </motion.div>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary drop-shadow-sm px-4 leading-tight">
            Dorothy, will you be my Valentine?
          </h1>
        </motion.div>

        <div className="flex flex-col items-center justify-center gap-6 min-h-[100px] relative">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <motion.button
              onClick={handleYesClick}
              style={{ 
                scale: yesScale,
                zIndex: 50 // Ensure yes button stays on top as it grows
              }}
              whileHover={{ scale: yesScale * 1.05 }}
              whileTap={{ scale: yesScale * 0.95 }}
              className="px-8 py-4 bg-primary text-primary-foreground text-2xl font-bold rounded-2xl shadow-xl shadow-primary/30 hover:shadow-2xl hover:bg-primary/90 transition-colors duration-200 min-w-[150px]"
            >
              Yes 💖
            </motion.button>

            <AnimatePresence>
              {noCount < 15 && (
                <motion.button
                  onClick={handleNoClick}
                  layout
                  initial={{ opacity: 1 }}
                  animate={{ 
                    x: noCount > 0 ? [0, -10, 10, -10, 10, 0] : 0 
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.4 }}
                  className="px-8 py-4 bg-white text-muted-foreground text-xl font-bold rounded-2xl border-2 border-border shadow-md hover:bg-gray-50 transition-colors duration-200 min-w-[150px]"
                >
                  {getNoButtonText()}
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-4 text-sm text-muted-foreground/50 font-display">
        Made with ❤️
      </div>
    </div>
  );
}
