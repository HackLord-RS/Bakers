import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, MessageCircle, Upload, ImagePlus, Trash2 } from 'lucide-react';
import { peekNextOrderNumber, formatOrderId, commitOrder } from '../orderStorage';

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

const cakeFlavors = [
  'Chocolate Truffle',
  'Red Velvet',
  'Black Forest',
  'Butterscotch',
  'Strawberry',
  'Vanilla',
  'Pineapple',
  'Pistachio Raspberry',
  'Belgian Chocolate',
  'Cheese Cake',
  'Custom / Other',
];

interface CustomOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CustomOrderModal = ({ isOpen, onClose }: CustomOrderModalProps) => {
  const [orderId, setOrderId] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    location: 'Mahendergarh',
    flavor: cakeFlavors[0],
    weight: '1 Pound',
    description: '',
  });

  // Reset on open/close
  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '', phone: '', address: '', location: 'Mahendergarh',
        flavor: cakeFlavors[0], weight: '1 Pound', description: '',
      });
      setImages([]);
      setImagePreviews([]);
      setOrderId('');
    }
  }, [isOpen]);

  // Auto-compute Order ID from location
  useEffect(() => {
    if (!isOpen) return;
    const code = locationCodes[formData.location] ?? 'XX';
    const nextNum = peekNextOrderNumber(code);
    setOrderId(formatOrderId(code, nextNum));
  }, [formData.location, isOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []) as File[];
    const remaining = 2 - images.length;
    const newFiles = files.slice(0, remaining);
    setImages(prev => [...prev, ...newFiles]);
    newFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = ev => {
        setImagePreviews(prev => [...prev, ev.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
    // Reset file input so same file can be re-selected
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const code = locationCodes[formData.location] ?? 'XX';

    const confirmedOrderId = commitOrder(
      {
        name: formData.name,
        phone: formData.phone,
        location: formData.location,
        address: formData.address,
        items: [
          {
            name: `Custom Cake — ${formData.flavor}`,
            weight: formData.weight,
            quantity: 1,
            price: 0,
          },
        ],
        total: 0,
      },
      code
    );

    const ownerNumber = locationWhatsAppNumbers[formData.location] || '918305762078';
    let msg = `CUSTOMIZED ORDER -- THE BAKERS\n`;
    msg += `Order ID: ${confirmedOrderId}\n`;
    msg += `━━━━━━━━━━━━━━━━\n`;

    msg += `Customer Details\n`;
    msg += `• Name: ${formData.name}\n`;
    msg += `• Phone: ${formData.phone}\n`;
    msg += `• Location: ${formData.location}\n`;
    msg += `• Delivery Address:\n${formData.address}\n`;

    msg += `━━━━━━━━━━━━━━━━\n`;
    msg += `Order Details\n`;
    msg += `• Cake Flavor: ${formData.flavor}\n`;
    msg += `• Cake Weight: ${formData.weight}\n`;
    msg += `• Customer's Description:\n${formData.description}\n`;

    if (images.length > 0) {
      msg += `━━━━━━━━━━━━━━━━\n`;
      msg += `Reference Images\n`;
      msg += `${images.length} image(s) attached -- <b>please send them in this chat</b>:\n`;
      images.forEach((img, i) => {
        msg += `  ${i + 1}. ${img.name}\n`;
      });
    }

    msg += `━━━━━━━━━━━━━━━━\n`;
    msg += `Note: Price will be confirmed by the baker after reviewing the description.`;

    window.open(`https://wa.me/${ownerNumber}?text=${encodeURIComponent(msg)}`, '_blank');
    onClose();
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
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]"
          />

          {/* Modal Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-[500px] bg-dark-900 border-l border-white/10 z-[70] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-dark-900/50 backdrop-blur-md flex-shrink-0">
              <div className="flex items-center gap-3">
                <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                  <ArrowLeft size={24} />
                </button>
                <div>
                  <h2 className="text-2xl font-serif text-white">Customized Order</h2>
                  <p className="text-xs text-gold-400 tracking-widest uppercase">Build your dream cake</p>
                </div>
              </div>
              <div className="text-xs text-gold-400 uppercase tracking-widest border border-gold-400/30 px-2 py-1 rounded-sm">
                Custom
              </div>
            </div>

            {/* Scrollable Form */}
            <div className="flex-grow overflow-y-auto p-6">
              <form id="custom-order-form" onSubmit={handleSubmit} className="space-y-6">

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

                {/* Customer Details */}
                <div className="space-y-4">
                  <h3 className="text-white font-serif text-lg border-b border-white/10 pb-2">Customer Details</h3>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gray-500">Full Name</label>
                    <input
                      required name="name" value={formData.name} onChange={handleInputChange}
                      type="text" placeholder="Enter your name"
                      className="w-full bg-dark-800 border border-white/10 rounded-sm p-3 text-white focus:outline-none focus:border-gold-400 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gray-500">Phone Number</label>
                    <input
                      required name="phone" value={formData.phone} onChange={handleInputChange}
                      type="tel" placeholder="+91 XXXXX XXXXX"
                      className="w-full bg-dark-800 border border-white/10 rounded-sm p-3 text-white focus:outline-none focus:border-gold-400 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gray-500">Location</label>
                    <select
                      required name="location" value={formData.location} onChange={handleInputChange}
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
                      required name="address" value={formData.address} onChange={handleInputChange}
                      rows={3} placeholder="Complete address with landmark"
                      className="w-full bg-dark-800 border border-white/10 rounded-sm p-3 text-white focus:outline-none focus:border-gold-400 transition-colors resize-none"
                    />
                  </div>
                </div>

                {/* Order Summary */}
                <div className="space-y-4">
                  <h3 className="text-white font-serif text-lg border-b border-white/10 pb-2">Order Summary</h3>

                  {/* Cake Flavor */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gray-500">Cake Flavor</label>
                    <select
                      required name="flavor" value={formData.flavor} onChange={handleInputChange}
                      className="w-full bg-dark-800 border border-white/10 rounded-sm p-3 text-white focus:outline-none focus:border-gold-400 transition-colors"
                    >
                      {cakeFlavors.map(f => (
                        <option key={f} value={f}>{f}</option>
                      ))}
                    </select>
                  </div>

                  {/* Cake Weight */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gray-500">Cake Weight</label>
                    <div className="flex gap-3">
                      {['1 Pound', '2 Pound', '3 Pound'].map(w => (
                        <button
                          key={w}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, weight: w }))}
                          className={`flex-1 py-2 text-sm font-bold rounded-sm border transition-colors ${formData.weight === w
                            ? 'bg-gold-500 text-black border-gold-500'
                            : 'bg-transparent text-gray-400 border-white/10 hover:border-gold-400 hover:text-gold-400'
                            }`}
                        >
                          {w}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Cake Description */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gray-500">Cake Description</label>
                    <textarea
                      required name="description" value={formData.description} onChange={handleInputChange}
                      rows={4}
                      placeholder="Describe your dream cake — theme, decoration style, message on cake, colors, occasion, any special requests..."
                      className="w-full bg-dark-800 border border-white/10 rounded-sm p-3 text-white focus:outline-none focus:border-gold-400 transition-colors resize-none"
                    />
                  </div>

                  {/* Image Upload */}
                  <div className="space-y-3">
                    <label className="text-xs uppercase tracking-widest text-gray-500">
                      Reference Images <span className="text-gray-600 normal-case tracking-normal">(max 2)</span>
                    </label>

                    {/* Previews */}
                    {imagePreviews.length > 0 && (
                      <div className="flex gap-3">
                        {imagePreviews.map((src, i) => (
                          <div key={i} className="relative w-24 h-24 rounded-sm overflow-hidden border border-white/10 group">
                            <img src={src} alt={`ref-${i}`} className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => removeImage(i)}
                              className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-red-400"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Upload Button */}
                    {images.length < 2 && (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full border border-dashed border-white/20 hover:border-gold-400/50 rounded-sm p-4 flex items-center justify-center gap-2 text-gray-400 hover:text-gold-400 transition-colors group"
                      >
                        <ImagePlus size={18} className="group-hover:scale-110 transition-transform" />
                        <span className="text-sm tracking-widest uppercase font-bold">
                          {images.length === 0 ? 'Upload Reference Images' : 'Add Another Image'}
                        </span>
                      </button>
                    )}

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />

                    {images.length > 0 && (
                      <p className="text-[11px] text-gray-500 tracking-wide">
                        {images.length} image(s) selected. After WhatsApp opens, please send them in the chat too.
                      </p>
                    )}
                  </div>
                </div>

              </form>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 bg-dark-800 flex-shrink-0">
              <button
                type="submit"
                form="custom-order-form"
                className="w-full bg-[#25D366] hover:bg-[#20b858] text-white py-4 rounded-sm font-bold tracking-widest flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] shadow-lg"
              >
                PLACE ORDER
                <MessageCircle size={18} />
              </button>
              <p className="text-center text-[10px] text-gray-500 mt-3 uppercase tracking-wider">
                Opens WhatsApp to send your customized order
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CustomOrderModal;
