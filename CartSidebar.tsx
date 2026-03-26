import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, ArrowRight, Trash2, ArrowLeft, CheckCircle, MessageCircle } from 'lucide-react';
import { CartItem } from '../types';
import { peekNextOrderNumber, formatOrderId, commitOrder } from '../orderStorage';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  updateQuantity: (cartId: string, delta: number) => void;
  removeItem: (cartId: string) => void;
  onCheckout: () => void;
}

const locationCodes: Record<string, string> = {
  Mahendergarh: 'MG',
  Kanina: 'KN',
  Rewari: 'RE',
  'Pali/CUH': 'P',
};

const locationWhatsAppNumbers: Record<string, string> = {
  'Pali/CUH': '918930330404',
  'Rewari': '917056660404',
  'Kanina': '919040940404',
  'Mahendergarh': '919996950404',
};

const CartSidebar = ({ isOpen, onClose, cartItems, updateQuantity, removeItem, onCheckout }: CartSidebarProps) => {
  const [view, setView] = useState<'cart' | 'checkout'>('cart');
  const [orderId, setOrderId] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    location: 'Mahendergarh'
  });

  // Calculate totals
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Reset view when sidebar opens/closes
  useEffect(() => {
    if (isOpen) {
      setView('cart');
      setFormData({ name: '', phone: '', address: '', location: 'Mahendergarh' });
      setOrderId('');
    }
  }, [isOpen]);

  // Reactively update Order ID whenever location changes (only on checkout view)
  useEffect(() => {
    if (view !== 'checkout') return;
    const code = locationCodes[formData.location] ?? 'XX';
    const nextNum = peekNextOrderNumber(code);
    setOrderId(formatOrderId(code, nextNum));
  }, [formData.location, view]);

  const handleProceedToCheckout = () => {
    setView('checkout');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const code = locationCodes[formData.location] ?? 'XX';

    // Commit order to localStorage — this increments the counter and returns the confirmed ID
    const confirmedOrderId = commitOrder(
      {
        name: formData.name,
        phone: formData.phone,
        location: formData.location,
        address: formData.address,
        items: cartItems.map(item => ({
          name: item.name,
          weight: item.selectedWeight,
          quantity: item.quantity,
          price: item.price,
        })),
        total,
      },
      code
    );

    // Construct WhatsApp Message
    const ownerNumber = locationWhatsAppNumbers[formData.location] || "918930330404";

    let message = `NEW ORDER RECEIVED — THE BAKERS\n`;
    message += `Order ID: ${confirmedOrderId}\n`;
    message += `━━━━━━━━━━━━━━━━\n`;

    message += `Customer Details\n`;
    message += `• Name: ${formData.name}\n`;
    message += `• Phone: ${formData.phone}\n`;
    message += `• Location: ${formData.location}\n`;
    message += `• Delivery Address:\n${formData.address}\n`;

    message += `━━━━━━━━━━━━━━━━\n`;
    message += `Order Items\n`;
    cartItems.forEach(item => {
      message += `• ${item.name} — ${item.selectedWeight} × ${item.quantity}\n`;
    });

    message += `━━━━━━━━━━━━━━━━\n`;
    message += `$$ Total Payable: ₹${total.toLocaleString()}`;

    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${ownerNumber}?text=${encodeURIComponent(message)}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');

    // Complete checkout process in app
    onCheckout();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-[500px] bg-dark-900 border-l border-white/10 z-[70] shadow-2xl flex flex-col"
          >
            <AnimatePresence mode="wait">
              {view === 'cart' ? (
                // CART VIEW
                <motion.div
                  key="cart"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col h-full"
                >
                  {/* Header */}
                  <div className="p-6 border-b border-white/10 flex items-center justify-between bg-dark-900/50 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                      <ShoppingBag className="text-gold-400" size={24} />
                      <h2 className="text-2xl font-serif text-white">Your Selection</h2>
                    </div>
                    <button
                      onClick={onClose}
                      className="text-gray-400 hover:text-white hover:rotate-90 transition-all duration-300"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  {/* Cart Items */}
                  <div className="flex-grow overflow-y-auto p-6 space-y-6">
                    {cartItems.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                        <ShoppingBag size={64} className="text-gray-600" />
                        <p className="text-gray-400 font-serif text-xl">Your cart is empty</p>
                        <button
                          onClick={onClose}
                          className="text-gold-400 hover:text-white underline underline-offset-4 text-sm tracking-widest uppercase"
                        >
                          Browse Menu
                        </button>
                      </div>
                    ) : (
                      cartItems.map((item) => (
                        <motion.div
                          layout
                          key={item.cartId}
                          className="flex gap-4 bg-dark-800 p-4 rounded-lg border border-white/5 group"
                        >
                          {/* Image */}
                          <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Details */}
                          <div className="flex-grow flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-white font-serif text-lg leading-tight">{item.name}</h3>
                                <p className="text-xs text-gold-400 uppercase tracking-wider mt-1">{item.selectedWeight}</p>
                              </div>
                              <button
                                onClick={() => removeItem(item.cartId)}
                                className="text-gray-600 hover:text-red-400 transition-colors"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>

                            <div className="flex justify-between items-end mt-2">
                              <div className="flex items-center bg-dark-900 rounded-sm border border-white/10">
                                <button
                                  onClick={() => updateQuantity(item.cartId, -1)}
                                  className="px-2 py-1 text-gray-400 hover:text-white disabled:opacity-30"
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus size={12} />
                                </button>
                                <span className="text-sm text-white px-2 min-w-[20px] text-center font-bold">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.cartId, 1)}
                                  className="px-2 py-1 text-gray-400 hover:text-white"
                                >
                                  <Plus size={12} />
                                </button>
                              </div>
                              <div className="text-gold-400 font-bold">
                                ₹{(item.price * item.quantity).toLocaleString()}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>

                  {/* Footer */}
                  {cartItems.length > 0 && (
                    <div className="p-6 border-t border-white/10 bg-dark-800">
                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between text-white text-lg font-serif font-bold">
                          <span>Total</span>
                          <span className="text-gold-400">₹{total.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <button
                          onClick={handleProceedToCheckout}
                          className="w-full bg-gold-500 hover:bg-gold-400 text-black py-4 rounded-sm font-bold tracking-widest flex items-center justify-center gap-2 transition-all duration-300 group"
                        >
                          PROCEED TO CHECKOUT
                          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <div className="w-full py-6 flex items-center justify-center gap-4">
                          <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-gold-400/30 to-gold-400/30"></div>
                          <span className="text-gold-400 font-serif text-xl tracking-wider">The Bakers</span>
                          <div className="h-[1px] flex-grow bg-gradient-to-l from-transparent via-gold-400/30 to-gold-400/30"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ) : (
                // CHECKOUT VIEW
                <motion.div
                  key="checkout"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col h-full bg-dark-900"
                >
                  {/* Header */}
                  <div className="p-6 border-b border-white/10 flex items-center justify-between bg-dark-900/50 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setView('cart')}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <ArrowLeft size={24} />
                      </button>
                      <h2 className="text-2xl font-serif text-white">Checkout</h2>
                    </div>
                    <div className="text-xs text-gold-400 uppercase tracking-widest border border-gold-400/30 px-2 py-1 rounded-sm">
                      Secure
                    </div>
                  </div>

                  {/* Form Content */}
                  <div className="flex-grow overflow-y-auto p-6">
                    <form id="checkout-form" onSubmit={handleFinalSubmit} className="space-y-6">

                      {/* Order ID */}
                      <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-gray-500">Order ID</label>
                        <input
                          type="text"
                          value={orderId}
                          readOnly
                          className="w-full bg-dark-800 border border-white/10 rounded-sm p-3 text-gold-400 font-mono text-sm focus:outline-none cursor-not-allowed"
                        />
                      </div>

                      {/* Personal Details */}
                      <div className="space-y-4">
                        <h3 className="text-white font-serif text-lg border-b border-white/10 pb-2">Customer Details</h3>

                        <div className="space-y-2">
                          <label className="text-xs uppercase tracking-widest text-gray-500">Full Name</label>
                          <input
                            required
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            type="text"
                            placeholder="Enter your name"
                            className="w-full bg-dark-800 border border-white/10 rounded-sm p-3 text-white focus:outline-none focus:border-gold-400 transition-colors"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs uppercase tracking-widest text-gray-500">Phone Number</label>
                          <input
                            required
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            type="tel"
                            placeholder="+91 XXXXX XXXXX"
                            className="w-full bg-dark-800 border border-white/10 rounded-sm p-3 text-white focus:outline-none focus:border-gold-400 transition-colors"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs uppercase tracking-widest text-gray-500">Location</label>
                          <select
                            required
                            name="location"
                            value={formData.location}
                            onChange={handleInputChange}
                            className="w-full bg-dark-800 border border-white/10 rounded-sm p-3 text-white focus:outline-none focus:border-gold-400 transition-colors"
                          >
                            <option value="Mahendergarh">Mahendergarh</option>
                            <option value="Kanina">Kanina</option>
                            <option value="Rewari">Rewari</option>
                            <option value="Pali/CUH">Pali / CUH</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs uppercase tracking-widest text-gray-500">Delivery Address</label>
                          <textarea
                            required
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            rows={3}
                            placeholder="Complete address with landmark"
                            className="w-full bg-dark-800 border border-white/10 rounded-sm p-3 text-white focus:outline-none focus:border-gold-400 transition-colors resize-none"
                          ></textarea>
                        </div>
                      </div>

                      {/* Order Summary */}
                      <div className="space-y-4">
                        <h3 className="text-white font-serif text-lg border-b border-white/10 pb-2">Order Summary</h3>

                        <div className="bg-dark-800 rounded-sm border border-white/5 p-4 space-y-3">
                          {cartItems.map(item => (
                            <div key={item.cartId} className="flex justify-between text-sm">
                              <div className="text-gray-300">
                                <span className="text-white font-bold">{item.quantity}x</span> {item.name}
                                <span className="text-xs text-gray-500 block">{item.selectedWeight}</span>
                              </div>
                              <div className="text-gray-400">₹{(item.price * item.quantity).toLocaleString()}</div>
                            </div>
                          ))}

                          <div className="border-t border-white/10 pt-3 flex justify-between items-center mt-2">
                            <span className="text-gray-400 text-sm">Total Amount</span>
                            <span className="text-xl font-serif text-gold-400 font-bold">₹{total.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>

                  {/* Footer Actions */}
                  <div className="p-6 border-t border-white/10 bg-dark-800">
                    <button
                      type="submit"
                      form="checkout-form"
                      className="w-full bg-[#25D366] hover:bg-[#20b858] text-white py-4 rounded-sm font-bold tracking-widest flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] shadow-lg"
                    >
                      PLACE ORDER
                      <MessageCircle size={18} />
                    </button>
                    <p className="text-center text-[10px] text-gray-500 mt-3 uppercase tracking-wider">
                      Opens WhatsApp to send details
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;