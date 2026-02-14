import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { FloatingHearts } from "@/components/FloatingHearts";
import { GalleryCard } from "@/components/GalleryCard";
import { ChasingAnimation } from "@/components/ChasingAnimation";
import { Heart, Home, Music, Sparkles } from "lucide-react";

export default function Valentine() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial big explosion
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff69b4', '#ff1493', '#ffb6c1']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff69b4', '#ff1493', '#ffb6c1']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-background relative overflow-x-hidden">
      <FloatingHearts />
      
      {/* Header Section */}
      <header className="relative py-20 px-4 text-center z-10">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.5, duration: 1 }}
          className="mb-6 inline-block p-4 bg-white/50 backdrop-blur-sm rounded-full shadow-lg"
        >
          <Sparkles className="w-12 h-12 text-primary" />
        </motion.div>
        
        <motion.h1 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-primary mb-4 drop-shadow-sm"
        >
          Happy Valentine's Day,
          <br />
          <span className="text-accent inline-block mt-2">Dorothy!</span>
        </motion.h1>
      </header>

      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 space-y-32 relative z-10">
        
        {/* Personal Message Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-primary/10 border border-primary/10 relative overflow-hidden group hover:shadow-2xl transition-shadow duration-500">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-300 via-rose-400 to-pink-300" />
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-pink-50 rounded-full opacity-50 group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-pink-50 rounded-full opacity-50 group-hover:scale-110 transition-transform duration-700" />
            
            <h2 className="text-3xl font-display text-primary mb-6 flex items-center gap-3">
              <Heart className="fill-primary w-6 h-6" />
              My Dearest Dorothy
            </h2>
            
            <div className="prose prose-lg prose-pink text-gray-600 font-display text-xl leading-relaxed space-y-4 relative z-10">
              <p>
                From the moment you walked into my life, everything became brighter. 
                Your smile is my favorite sight, and your laughter is my favorite sound. I love you gay boy
              </p>
              
              <ChasingAnimation />

              <p>
                Every day with you is a new adventure, and I can't wait for all the 
                memories we haven't made yet. You make the ordinary feel extraordinary.
              </p>
              <p className="font-bold text-primary pt-4 text-2xl">
                I love you more than words can say.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Gallery Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerChildren}
        >
          <div className="text-center mb-12">
            <motion.div variants={fadeIn}>
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">DOROTHY PICTUUURES</h2>
              <p className="text-xl text-muted-foreground font-display">My shayla</p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 px-4">
            {/* 1 */}
            <motion.div variants={fadeIn} className="flex justify-center">
              <GalleryCard 
                src="/assets/1.jpg" 
                alt="Beautiful Flowers"
                caption="Sheshabols 🌸"
                rotate={-3}
              />
            </motion.div>
            
            {/* 2 */}
            <motion.div variants={fadeIn} className="flex justify-center md:mt-12">
              <GalleryCard 
                src="/assets/2.jpg" 
                alt="Cute Puppy"
                caption="Meowmeow 🐶"
                rotate={2}
              />
            </motion.div>
            
            {/* 3 */}
            <motion.div variants={fadeIn} className="flex justify-center">
              <GalleryCard 
                src="/assets/3.jpg" 
                alt="Sweet Treats"
                caption="Love this pic🧁"
                rotate={-2}
              />
            </motion.div>

            {/* 4 */}
            <motion.div variants={fadeIn} className="flex justify-center">
              <GalleryCard 
                src="/assets/4.jpg" 
                alt="Romantic Sunset"
                caption="#MarriageContract 🌅"
                rotate={1}
              />
            </motion.div>

            {/* 5 */}
            <motion.div variants={fadeIn} className="flex justify-center md:mt-8">
              <GalleryCard 
                src="/assets/5.jpg" 
                alt="Happy Moments"
                caption="First pic 😊"
                rotate={-1}
              />
            </motion.div>

            {/* 6 */}
            <motion.div variants={fadeIn} className="flex justify-center">
              <GalleryCard 
                src="/assets/6.jpg" 
                alt="Together"
                caption="Me & You ❤️"
                rotate={3}
              />
            </motion.div>
          </div>
        </motion.section>

        {/* Future Home Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="bg-white/60 backdrop-blur-md rounded-[2rem] p-8 md:p-12 shadow-xl border border-white"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 flex items-center justify-center gap-3">
              <Home className="w-10 h-10 mb-1" />
              Our Future Home
            </h2>
            <p className="text-xl text-muted-foreground font-display">Building our dreams together</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left: Images Grid */}
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <GalleryCard 
                  src="/assets/Bedroom.png" 
                  alt="Dream Bedroom" 
                />
                <GalleryCard 
                  src="/assets/BedroomSideView.png" 
                  alt="Cozy Living Room" 
                />
                <GalleryCard 
                  src="/assets/Vanity1.png" 
                  alt="Dream Kitchen" 
                />
                <GalleryCard 
                  src="/assets/Villa.png" 
                  alt="Garden" 
                />
                <GalleryCard 
                  src="/assets/WalkinCloset.png" 
                  alt="Bathroom" 
                />
                <GalleryCard 
                  src="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=800&auto=format&fit=crop&q=80" 
                  alt="Workspace" 
                />
              </div>
              <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                <h3 className="text-xl font-bold text-primary mb-2 font-display">Our Sanctuary</h3>
                <p className="text-gray-600">
                  Imagine waking up here together every Sunday morning, with the sun streaming in and nowhere to be.
                </p>
              </div>
            </div>

            {/* Right: Video Section */}
            <div className="relative">
              <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-lg border-4 border-white relative group">
                <iframe
                  className="w-full h-full"
                  src="/assets/Valentines.mov" // Example URL, user can change
                  title="Our Future Home"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <p className="text-center mt-4 text-muted-foreground font-display italic">
                A tour of what could be...
              </p>
            </div>
          </div>
        </motion.section>

      </main>

      {/* Footer */}
      <footer className="relative z-10 py-12 text-center bg-white/50 backdrop-blur-sm border-t border-primary/10">
        <p className="text-lg text-primary font-bold flex items-center justify-center gap-2">
          Made with <Heart className="fill-primary w-5 h-5 animate-pulse" /> for Dorothy
        </p>
        <p className="text-sm text-muted-foreground mt-2 font-display">
          Forever & Always
        </p>
      </footer>
    </div>
  );
}
