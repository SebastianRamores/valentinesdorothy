import { motion } from "framer-motion";

export function ChasingAnimation() {
  return (
    <div className="relative w-full h-24 overflow-hidden bg-pink-50/30 rounded-full border border-pink-100 my-8">
      {/* Container for the chase */}
      <motion.div
        className="absolute inset-0 flex items-center"
        animate={{
          x: ["-20%", "120%"],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="relative flex items-center gap-12">
          {/* "Cat" Placeholder */}
          <motion.div 
            className="relative w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center border-2 border-primary/30 shadow-sm"
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="text-2xl">🐱</div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full animate-ping opacity-20" />
          </motion.div>

          {/* "Mouse" Placeholder */}
          <motion.div 
            className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center border-2 border-accent/30 shadow-sm"
            animate={{ 
              y: [0, -15, 0],
              x: [0, 10, 0],
              rotate: [0, -10, 10, 0]
            }}
            transition={{
              duration: 0.4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="text-xl">🐭</div>
          </motion.div>
        </div>
      </motion.div>

      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-2 h-2 bg-primary rounded-full"
            style={{ 
              left: `${i * 25}%`, 
              top: '50%',
              transform: 'translateY(-50%)' 
            }}
          />
        ))}
      </div>
    </div>
  );
}
