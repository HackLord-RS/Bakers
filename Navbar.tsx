import React, { useState } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'HOME', href: '#home' },
  { name: 'EXPERIENCE', href: '#experience' },
  { name: 'MENU', href: '#menu' },
  { name: 'STORY', href: '#story' },
  { name: 'CONTACT', href: '#contact' },
];

interface NavbarProps {
  cartCount: number;
  onNavigate?: (href: string) => void;
  onOpenCart?: () => void;
  onViewFullMenu?: () => void;
}

const Navbar = ({ cartCount, onNavigate, onOpenCart, onViewFullMenu }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (onNavigate) {
      onNavigate(href);
    } else {
      // Fallback for standalone usage
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-dark-900/95 backdrop-blur-md py-4 shadow-lg border-b border-white/5' : 'bg-transparent py-6'
        }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, '#home')}
          className="text-2xl font-serif font-bold text-gold-400 tracking-wider"
        >
          The <span className="text-white">Bakers</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-sm font-sans tracking-widest text-gray-300 hover:text-gold-400 transition-colors duration-300"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-6">
          <button
            onClick={onOpenCart}
            className="relative text-white hover:text-gold-400 transition-colors"
          >
            <ShoppingBag size={20} />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  key="cart-badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-2 -right-2 bg-gold-500 text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <button
            onClick={onViewFullMenu}
            className="hidden md:block bg-gold-500 hover:bg-gold-400 text-black px-6 py-2 rounded-sm text-sm font-bold tracking-widest transition-colors duration-300"
          >
            ORDER NOW
          </button>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-dark-900 border-t border-white/10"
        >
          <div className="flex flex-col p-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-gold-400 py-2 text-center"
                onClick={(e) => handleLinkClick(e, link.href)}
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={onViewFullMenu}
              className="bg-gold-500 text-black px-6 py-3 rounded-sm font-bold w-full mt-4"
            >
              ORDER NOW
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;