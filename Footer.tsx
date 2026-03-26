import React from 'react';
import { Instagram } from 'lucide-react';
import { motion } from 'framer-motion';

interface FooterProps {
  onNavigate?: (href: string) => void;
}

const Footer = ({ onNavigate }: FooterProps) => {
  const [email, setEmail] = React.useState('');
  const [subscribed, setSubscribed] = React.useState(false);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(href);
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };
  return (
    <footer className="bg-black pt-16 pb-0 border-t border-white/5 text-gray-400">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="space-y-6">
            <a
              href="#home"
              onClick={(e) => handleLinkClick(e, '#home')}
              className="text-3xl font-serif text-gold-400 font-bold block hover:scale-105 transition-transform origin-left"
            >
              The Bakers
            </a>
            <p className="text-sm leading-relaxed max-w-xs">
              Crafting moments of sweetness since 2015. Every cake tells a story, every bite creates a memory.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/wowbakers.official/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-dark-800 flex items-center justify-center hover:bg-gold-400 hover:text-black transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram size={18} />
              </a>
              <span className="text-xs uppercase tracking-widest text-gray-500">Follow us</span>
            </div>
          </div>

          <div>
            <h4 className="text-white font-serif text-xl mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#menu" onClick={(e) => handleLinkClick(e, '#menu')} className="hover:text-gold-400 transition-colors">Menu</a></li>
              <li><a href="#experience" onClick={(e) => handleLinkClick(e, '#experience')} className="hover:text-gold-400 transition-colors">Experience</a></li>
              <li><a href="#story" onClick={(e) => handleLinkClick(e, '#story')} className="hover:text-gold-400 transition-colors">Our Story</a></li>
              <li><a href="#contact" onClick={(e) => handleLinkClick(e, '#contact')} className="hover:text-gold-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-white font-serif text-xl mb-6">Hours</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex justify-between">
                <span>Monday - Friday</span>
                <span className="text-white">10AM - 9PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span className="text-white">10AM - 11PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span className="text-white">10AM - 10PM</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-serif text-xl mb-6">Newsletter</h4>
            <p className="text-sm mb-4">Subscribe for latest updates and offers.</p>
            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-gold-400 text-sm font-bold flex items-center gap-2"
              >
                <span>✓ Thank you for subscribing!</span>
              </motion.div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  required
                  className="bg-dark-800 border-none outline-none px-4 py-2 text-white w-full text-sm focus:ring-1 focus:ring-gold-400/50 transition-all"
                />
                <button type="submit" className="bg-gold-500 text-black px-4 font-bold hover:bg-gold-400 transition-colors">OK</button>
              </form>
            )}
          </div>
        </div>

        <div className="border-t border-white/5 mt-16 pt-8 pb-8 text-center text-xs tracking-wider">
          <p>&copy; 2026 The Bakers. All rights reserved.</p>
          <p>Designed by KUNAL GIRI</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;