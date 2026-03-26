import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Reveal } from './Reveal';

const Story = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section id="story" ref={containerRef} className="bg-dark-900 py-24 overflow-hidden scroll-mt-28">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* Image Side with Parallax */}
          <motion.div
            style={{ y }}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="founder_img.jpeg"
                alt="Our Founder"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            </div>

            {/* Floating Badge */}
            <div className="absolute bottom-10 right-10 bg-dark-800/90 backdrop-blur-md border border-gold-400/30 p-6 rounded-lg shadow-xl text-center">
              <span className="block text-5xl font-serif text-gold-400 font-bold">2015</span>
              <span className="block text-gray-400 text-xs tracking-[0.2em] uppercase mt-1">Since</span>
            </div>
          </motion.div>

          {/* Text Side */}
          <div className="w-full lg:w-1/2">
            <Reveal>
              <span className="text-gold-400 font-sans tracking-[0.2em] text-xs uppercase block mb-4">Our Story</span>
              <h2 className="text-5xl md:text-6xl font-serif text-white mb-8">
                A Legacy of <span className="text-gold-400 italic">Passion</span>
              </h2>
              <div className="space-y-6 text-gray-400 leading-relaxed font-light text-lg">
                <p>
                  Born from a family tradition that spans generations, The Bakers started as a small home kitchen with a big dream – to bring the joy of freshly baked goods to every celebration.
                </p>
                <p>
                  Today, we've grown into a beloved destination where every recipe tells a story, and every cake is crafted with the same love and dedication that started it all.
                </p>
                <p>
                  Our master bakers combine time-honored techniques with innovative flavors, ensuring that each creation is not just a treat for the taste buds, but a work of edible art.
                </p>
              </div>

            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;