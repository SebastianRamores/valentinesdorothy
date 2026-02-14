import { motion, AnimatePresence } from "framer-motion";
import { Heart, X } from "lucide-react";
import { useState } from "react";

interface GalleryCardProps {
  src: string;
  alt: string;
  caption?: string;
  rotate?: number;
}

export function GalleryCard({ src, alt, caption, rotate = 0 }: GalleryCardProps) {
  const [isMaximized, setIsMaximized] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
        initial={{ rotate }}
        viewport={{ once: true }}
        className="relative group cursor-pointer"
        onClick={() => setIsMaximized(true)}
      >
        <div className="bg-white p-3 pb-8 rounded-sm shadow-lg transform transition-all duration-300 border border-gray-100">
          <div className="aspect-[4/3] overflow-hidden rounded-sm bg-gray-100 relative">
            <img 
              src={src} 
              alt={alt} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          
          {caption && (
            <div className="absolute bottom-2 left-0 w-full text-center">
              <p className="font-display text-gray-600 text-lg rotate-[-1deg]">{caption}</p>
            </div>
          )}
          
          {/* Tape effect */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/30 backdrop-blur-sm rotate-2 shadow-sm border border-white/40" />
        </div>
        
        <div className="absolute -bottom-2 -right-2 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <Heart className="fill-current w-6 h-6" />
        </div>
      </motion.div>

      <AnimatePresence>
        {isMaximized && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setIsMaximized(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsMaximized(false)}
                className="absolute -top-12 right-0 text-white hover:text-primary transition-colors p-2"
                aria-label="Close"
              >
                <X className="w-8 h-8" />
              </button>
              
              <div className="bg-white p-3 pb-12 rounded-sm shadow-2xl w-full h-full overflow-hidden">
                <img 
                  src={src} 
                  alt={alt} 
                  className="w-full h-full object-contain bg-gray-50 rounded-sm"
                />
                {caption && (
                  <div className="absolute bottom-4 left-0 w-full text-center">
                    <p className="font-display text-gray-700 text-2xl">{caption}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
