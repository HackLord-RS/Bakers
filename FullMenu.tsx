import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowLeft, ChevronRight } from 'lucide-react';
import { MenuItem } from '../types';
import { menuItems, categories, fastFoodSubCategories, shakesAndCombosSubCategories } from './Menu';

interface FullMenuProps {
  addToCart: (item: MenuItem, quantity: number, weight: string) => void;
  onBack: () => void;
  onCustomOrder?: () => void;
}

interface MenuCardProps {
  item: MenuItem;
  addToCart: (item: MenuItem, quantity: number, weight: string) => void;
  index: number;
}

const MenuCard: React.FC<MenuCardProps> = ({ item, addToCart, index }) => {
  const [weight, setWeight] = useState(Object.keys(item.prices)[0]);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart(item, quantity, weight);
    setQuantity(1); // Reset quantity after adding
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-dark-800 rounded-md overflow-hidden border border-white/5 hover:border-gold-400/30 group flex flex-col"
    >
      <div className="relative aspect-[5/3] overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {item.isBestseller && (
          <div className="absolute top-2 left-2 bg-white text-black text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider">
            Bestseller
          </div>
        )}
      </div>

      <div className="p-4 flex-grow flex flex-col">
        <div className="flex gap-1.5 mb-2">
          {item.tags?.map(tag => (
            <span key={tag} className="text-[9px] text-gold-400 uppercase tracking-wider border border-gold-400/20 px-1.5 py-0.5 rounded-sm">
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-base font-serif text-white mb-1">{item.name}</h3>
        <p className="text-gray-400 text-xs mb-3 line-clamp-2 flex-grow">{item.description}</p>

        {/* Weight Selection */}
        <div className="flex flex-wrap gap-1.5 mb-4 min-h-[22px]">
          {Object.keys(item.prices).length > 1 && Object.keys(item.prices).map((pKey) => (
            <button
              key={pKey}
              onClick={() => setWeight(pKey)}
              className={`text-[10px] font-bold px-2 py-0.5 rounded-sm border transition-colors ${weight === pKey ? 'bg-gold-500 text-black border-gold-500' : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30'}`}
            >
              {pKey}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-white/10 pt-3 mt-auto">
          <div className="text-sm font-serif text-gold-400">₹{item.prices[weight].toLocaleString()}</div>

          <div className="flex items-center gap-2">
            {/* Quantity Control */}
            <div className="flex items-center bg-dark-700 rounded-sm border border-white/10">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-2 py-0.5 text-gray-400 hover:text-white transition-colors text-sm"
              >
                -
              </button>
              <span className="text-xs text-white px-1 min-w-[16px] text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-2 py-0.5 text-gray-400 hover:text-white transition-colors text-sm"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="bg-gold-500 p-1.5 rounded-sm text-black hover:bg-gold-400 transition-colors hover:scale-105 active:scale-95"
            >
              <ShoppingBag size={13} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const FullMenu = ({ addToCart, onBack, onCustomOrder }: FullMenuProps) => {
  return (
    <div className="min-h-screen bg-dark-900 pt-32 pb-24">
      {/* Header */}
      <div className="container mx-auto px-6 mb-16">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gold-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-sans tracking-widest text-sm font-bold">BACK TO HOME</span>
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6">Full Collection</h1>
          <p className="text-gray-400 font-light italic text-lg">"Explore our complete range of handcrafted delicacies"</p>
        </motion.div>
      </div>

      {/* Menu Categories */}
      <div className="container mx-auto px-6 space-y-20">
        {categories.map((category) => {
          const categoryItems = menuItems.filter(item => item.category === category);
          if (categoryItems.length === 0) return null;

          return (
            <div key={category}>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-10"
              >
                <h2 className="text-3xl font-serif text-gold-400">{category}</h2>
                <div className="h-[1px] flex-grow bg-white/10"></div>
              </motion.div>

              {category === "Fast Food Items" || category === "Shakes & Combos" ? (
                <div className="space-y-16">
                  {(category === "Fast Food Items" ? fastFoodSubCategories : shakesAndCombosSubCategories).map((subCat) => {
                    const subItems = categoryItems.filter(item => item.subCategory === subCat);
                    if (subItems.length === 0) return null;
                    return (
                      <div key={subCat}>
                        <h3 className="text-xl font-serif text-white/80 mb-6 pl-4 border-l-2 border-gold-400/50">{subCat}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                          {subItems.map((item, index) => (
                            <MenuCard
                              key={item.id}
                              item={item}
                              addToCart={addToCart}
                              index={index}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {categoryItems.map((item, index) => (
                    <MenuCard
                      key={item.id}
                      item={item}
                      addToCart={addToCart}
                      index={index}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Customize CTA */}
      <div className="container mx-auto px-6 mt-20 flex justify-center">
        <button
          onClick={onCustomOrder}
          className="group inline-flex items-center gap-2 border border-white/20 text-gray-300 px-10 py-4 rounded-sm font-bold tracking-widest hover:border-gold-400 hover:text-gold-400 transition-all duration-300 text-sm"
        >
          ✦ CUSTOMIZE YOUR CAKE
          <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default FullMenu;