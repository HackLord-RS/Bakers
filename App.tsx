import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Menu from './components/Menu';
import Story from './components/Story';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FullMenu from './components/FullMenu';
import CartSidebar from './components/CartSidebar';
import CustomOrderModal from './components/CustomOrderModal';
import { MenuItem, CartItem } from './types';

const App = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isFullMenuOpen, setIsFullMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCustomOrderOpen, setIsCustomOrderOpen] = useState(false);
  const [scrollToSection, setScrollToSection] = useState<string | null>(null);

  // Smooth scroll behavior for anchor links
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  // Handle post-navigation scrolling
  useEffect(() => {
    if (!isFullMenuOpen && scrollToSection) {
      // Small timeout to ensure DOM is rendered
      const timer = setTimeout(() => {
        const element = document.getElementById(scrollToSection);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
        setScrollToSection(null);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isFullMenuOpen, scrollToSection]);

  const addToCart = (item: MenuItem, quantity: number = 1, weight: string = "1 Pound") => {
    setCartItems(prev => {
      const cartId = `${item.id}-${weight}`;
      const existingItem = prev.find(i => i.cartId === cartId);

      const selectedPrice = item.prices[weight] || item.price;

      if (existingItem) {
        return prev.map(i =>
          i.cartId === cartId
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }

      return [...prev, { ...item, cartId, quantity, selectedWeight: weight, price: selectedPrice }];
    });
    setIsCartOpen(true);
  };

  const updateCartQuantity = (cartId: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.cartId === cartId) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const removeFromCart = (cartId: string) => {
    setCartItems(prev => prev.filter(item => item.cartId !== cartId));
  };

  const handleCheckout = () => {
    alert("Order processing initiated! (Simulation)");
    setCartItems([]);
    setIsCartOpen(false);
  };

  const handleNavigate = (href: string) => {
    const sectionId = href.replace('#', '');

    if (isFullMenuOpen) {
      setIsFullMenuOpen(false);
      setScrollToSection(sectionId);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-dark-900 text-white font-sans selection:bg-gold-500 selection:text-black">
      <Navbar
        cartCount={totalItems}
        onNavigate={handleNavigate}
        onOpenCart={() => setIsCartOpen(true)}
        onViewFullMenu={() => setIsFullMenuOpen(true)}
      />

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        updateQuantity={updateCartQuantity}
        removeItem={removeFromCart}
        onCheckout={handleCheckout}
      />

      <CustomOrderModal
        isOpen={isCustomOrderOpen}
        onClose={() => setIsCustomOrderOpen(false)}
      />

      {isFullMenuOpen ? (
        <FullMenu
          addToCart={addToCart}
          onBack={() => setIsFullMenuOpen(false)}
          onCustomOrder={() => setIsCustomOrderOpen(true)}
        />
      ) : (
        <main>
          <Hero
            onExploreClick={() => handleNavigate('#menu')}
            onStoryClick={() => handleNavigate('#story')}
          />
          <Experience />
          <Menu
            addToCart={addToCart}
            onViewFull={() => setIsFullMenuOpen(true)}
            onCustomOrder={() => setIsCustomOrderOpen(true)}
          />
          <Story />
          <Testimonials />
          <Contact />
        </main>
      )}

      {!isFullMenuOpen && <Footer onNavigate={handleNavigate} />}
    </div>
  );
};

export default App;