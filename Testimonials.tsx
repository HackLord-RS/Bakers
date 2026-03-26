import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Reveal } from './Reveal';

const testimonials = [
  {
    id: 1,
    name: "Kanisha Choudhary",
    role: "Celebration Enthusiast",
    quote: "The cake was absolutely delicious, looked exactly as desscribed and stunning! Everyone at the party loved it. Highly recommend The Bakers!",
    rating: 5
  },
  {
    id: 2,
    name: "Anji Kumar",
    role: "Regular Customer",
    quote: "Their truffle cake is the best I've ever had. It's became a tradition for every family gathering now. The consistency in quality over the years is commendable.",
    rating: 5
  },
  {
    id: 3,
    name: "Manita Choudhary",
    role: "Birthday Celebrant",
    quote: "The custom baby shower cake was exactly what I dreamed of. Delicious and beautifully crafted! The team really listened to my requirements.",
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section className="bg-dark-800 py-24">
      <div className="container mx-auto px-6">

        <div className="text-center mb-20">
          <span className="text-gold-400 font-sans tracking-[0.2em] text-xs uppercase block mb-4">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-serif text-white">What Our Customers Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.2}>
              <div className="bg-dark-900 p-8 rounded-lg border border-white/5 relative hover:-translate-y-2 transition-transform duration-300">
                <Quote className="absolute top-8 right-8 text-gold-400/20" size={48} />

                <div className="mb-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} size={16} className="fill-gold-400 text-gold-400" />
                    ))}
                  </div>
                  <p className="text-gray-300 italic font-light leading-relaxed min-h-[100px]">
                    "{item.quote}"
                  </p>
                </div>

                <div className="border-t border-white/10 pt-6">
                  <h4 className="text-gold-400 font-serif text-lg">{item.name}</h4>
                  <p className="text-gray-500 text-xs uppercase tracking-wider">{item.role}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;