import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface HeroProps {
  onExploreClick?: () => void;
  onStoryClick?: () => void;
}

const Hero = ({ onExploreClick, onStoryClick }: HeroProps) => {
  return (
    <section
      id="home"
      className="relative w-full overflow-hidden -mt-0"
      style={{ height: '110vh', marginTop: 0 }}
    >
      {/* Static background and content container */}
      <div className="relative h-screen w-full flex items-center justify-center">
        {/* Static background image */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: 'url(/static_hero_img.avif)',
            opacity: 0.7
          }}
        />

        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900/60 via-dark-900/40 to-dark-900 pointer-events-none"></div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4 max-w-4xl mx-auto">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center justify-center gap-4 mb-4"
            >
              <div className="h-[1px] w-12 bg-gold-400"></div>
              <span className="text-gold-400 font-sans tracking-[0.2em] text-sm uppercase">Est. Since 2015</span>
              <div className="h-[1px] w-12 bg-gold-400"></div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-gold-400 to-white/80 mb-6"
            >
              THE BAKERS
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-xl md:text-2xl text-gray-300 font-serif italic mb-10 tracking-wide"
            >
              Luxury Bakery Cum Café <br />
              <span className="text-gray-400 text-base md:text-lg not-italic mt-2 block font-sans">"Freshly baked experiences, crafted daily"</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-col md:flex-row gap-4 justify-center"
            >
              <button
                onClick={onExploreClick}
                className="bg-gold-500 hover:bg-gold-400 text-black px-8 py-3 rounded-sm font-bold tracking-widest transition-all hover:scale-105 duration-300"
              >
                EXPLORE MENU
              </button>
              <button
                onClick={onStoryClick}
                className="bg-transparent border border-white/20 hover:border-gold-400 text-white hover:text-gold-400 px-8 py-3 rounded-sm font-bold tracking-widest transition-all duration-300"
              >
                OUR STORY
              </button>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 z-20"
        >
          <span className="text-[10px] uppercase tracking-[0.2em]">Scroll to Explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ChevronDown size={20} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;