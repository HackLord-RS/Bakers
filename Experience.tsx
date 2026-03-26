import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Reveal } from './Reveal';

const stats = [
  { label: 'Cakes Delivered', value: '10K+' },
  { label: 'Years of Excellence', value: '8+' },
  { label: 'Signature Recipes', value: '50+' },
  { label: 'Happy Customers', value: '15K+' },
  { label: 'Current Outlets', value: '4 Outlets' },
];

const features = [
  {
    id: "01",
    title: "Artisan Craftsmanship",
    description: "Every cake is hand-decorated by our master bakers with meticulous attention to detail. We believe that true luxury lies in the imperfections of human touch.",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=2889&auto=format&fit=crop",
    align: "left"
  },
  {
    id: "02",
    title: "Premium Ingredients",
    description: "We source only the finest Belgian chocolate, French butter, and seasonal fruits from local organic farms. Quality is not just a standard, it's our obsession.",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2944&auto=format&fit=crop",
    align: "right"
  },
  {
    id: "03",
    title: "Baked Fresh Daily",
    description: "Our ovens start at dawn to ensure every bite is at its freshest peak. We don't believe in overnight storage; if it's not fresh, it's not The Bakers.",
    image: "https://plus.unsplash.com/premium_photo-1690214491960-d447e38d0bd0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZnJlc2glMjBjYWtlJTIwYmFrZXxlbnwwfHwwfHx8MA%3D%3D",
    align: "left"
  }
];

const Experience = () => {
  return (
    <section id="experience" className="bg-dark-900 py-24 relative overflow-hidden scroll-mt-28">

      {/* Header */}
      <div className="container mx-auto px-6 mb-20 text-center">
        <Reveal width="100%">
          <span className="text-gold-400 font-sans tracking-[0.2em] text-xs md:text-sm uppercase block mb-4">Step Inside</span>
          <h2 className="text-4xl md:text-6xl font-serif text-gold-400 mb-6">The Experience</h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-light">
            More than a bakery – it's a journey through flavors, aromas, and unforgettable moments.
          </p>
        </Reveal>
      </div>

      {/* Stats Grid */}
      <div className="container mx-auto px-6 mb-32">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className={index === stats.length - 1 ? 'col-span-2 md:col-span-1 flex justify-center' : ''}>
              <div className={index === stats.length - 1 ? 'w-1/2 md:w-full' : 'w-full'}>
                <Reveal delay={index * 0.1}>
                  <div className="text-center p-6 border border-white/5 bg-white/5 rounded-lg hover:bg-white/10 transition-colors duration-300">
                    <div className="text-3xl md:text-4xl font-serif text-gold-400 mb-2">{stat.value}</div>
                    <div className="text-xs font-sans tracking-widest text-gray-400 uppercase">{stat.label}</div>
                  </div>
                </Reveal>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Scroll Sections */}
      <div className="container mx-auto px-6 space-y-32">
        {features.map((feature, index) => (
          <div
            key={feature.id}
            className={`flex flex-col ${feature.align === 'left' ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-20`}
          >
            {/* Image Side */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2 relative group"
            >
              <div className="overflow-hidden rounded-lg aspect-[4/3]">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
              </div>
              {/* Decorative border */}
              <div className={`absolute -bottom-4 -right-4 w-full h-full border border-gold-400/30 rounded-lg -z-10 ${feature.align === 'left' ? 'translate-x-4 translate-y-4' : '-translate-x-4 translate-y-4'}`}></div>
            </motion.div>

            {/* Text Side */}
            <div className="w-full lg:w-1/2">
              <Reveal>
                <span className="text-gold-500 font-sans font-bold text-sm tracking-widest mb-4 block">
                  {feature.id}
                </span>
                <h3 className="text-3xl md:text-5xl font-serif text-white mb-6">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-lg font-light">
                  {feature.description}
                </p>
                <div className="mt-8 w-20 h-[1px] bg-gradient-to-r from-gold-400 to-transparent"></div>
              </Reveal>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;