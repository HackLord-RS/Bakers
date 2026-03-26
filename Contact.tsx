import React, { useRef, useState } from 'react';
import { MapPin, Phone, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Reveal } from './Reveal';

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Using Web3Forms - a free form backend service
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: 'YOUR_WEB3FORMS_ACCESS_KEY', // You'll need to get this from web3forms.com
          subject: `New Contact Form Message from ${formData.name} - The Bakers`,
          from_name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          to_email: 'thewowwbakers@gmail.com'
        })
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        // Reset form after successful submission
        setTimeout(() => {
          setFormData({ name: '', email: '', phone: '', message: '' });
          setSubmitStatus('idle');
        }, 5000);
      } else {
        throw new Error('Form submission failed');
      }

    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');

      // Fallback to mailto if API fails
      const subject = encodeURIComponent(`New Contact Form Message from ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Phone: ${formData.phone}\n\n` +
        `Message:\n${formData.message}`
      );

      const mailtoLink = `mailto:thewowwbakers@gmail.com?subject=${subject}&body=${body}`;
      window.open(mailtoLink, '_blank');

    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <section id="contact" className="bg-dark-900 py-24 relative scroll-mt-28">
      <div className="container mx-auto px-6">

        <div className="text-center mb-16">
          <span className="text-gold-400 font-sans tracking-[0.2em] text-xs uppercase block mb-4">Get In Touch</span>
          <h2 className="text-5xl font-serif text-white mb-4">Contact Us</h2>
          <p className="text-gray-400 font-light">Ready to order or have questions? We'd love to hear from you</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">

          {/* Info Side */}
          <div className="space-y-8">
            <Reveal delay={0.1}>
              <div className="flex items-start gap-6 bg-dark-800 p-8 rounded-lg border border-white/5">
                <div className="bg-gold-500/10 p-3 rounded-full text-gold-400">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-serif text-white mb-2">Visit Us (HQ)</h3>
                  <p className="text-gray-400">Parshuram Chowk, Masani Rd<br />Mahendergarh,Haryana,123031</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="flex items-start gap-6 bg-dark-800 p-8 rounded-lg border border-white/5">
                <div className="bg-gold-500/10 p-3 rounded-full text-gold-400">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-serif text-white mb-2">Call Us</h3>
                  <p className="text-gold-400 text-lg font-bold">+91 99969 50404</p>
                  <p className="text-gray-500 text-sm">For orders & inquiries</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex items-start gap-6 bg-dark-800 p-8 rounded-lg border border-white/5">
                <div className="bg-gold-500/10 p-3 rounded-full text-gold-400">
                  <Clock size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-serif text-white mb-2">Opening Hours</h3>
                  <p className="text-gray-400">Mon - Sun: 10:00 AM - 9:00 PM</p>
                  <p className="text-gray-500 text-sm">Open all days</p>
                </div>
              </div>
            </Reveal>

            {/* Map Placeholder */}
            <div className="h-48 rounded-lg overflow-hidden relative grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2948&auto=format&fit=crop"
                alt="Map"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <button
                  onClick={() => window.open('https://www.google.com/maps/place/The+bakerss/@28.266106,76.150154,17z/data=!3m1!4b1!4m6!3m5!1s0x3912bffcd02117d1:0xcb137f7667932c0e!8m2!3d28.266106!4d76.150154!16s%2Fg%2F11p64s0ch4?entry=ttu&g_ep=EgoyMDI2MDMyMy4xIKXMDSoASAFQAw%3D%3D', '_blank')}
                  className="border border-gold-400 text-gold-400 px-6 py-2 rounded-sm text-sm font-bold uppercase tracking-widest hover:bg-gold-400 hover:text-black transition-colors"
                >
                  View on Map
                </button>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-dark-800 p-8 md:p-12 rounded-lg border border-white/5">
            <h3 className="text-2xl font-serif text-white mb-8">Send Message</h3>

            {/* Success/Error Messages */}
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-sm flex items-center gap-3">
                <CheckCircle className="text-green-400" size={20} />
                <p className="text-green-400 text-sm">Message sent successfully! We'll get back to you soon.</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-sm flex items-center gap-3">
                <AlertCircle className="text-red-400" size={20} />
                <p className="text-red-400 text-sm">Something went wrong. Please try again or call us directly.</p>
              </div>
            )}

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-500">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    required
                    className="w-full bg-dark-900 border border-white/10 rounded-sm p-4 text-white focus:outline-none focus:border-gold-400 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-500">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    required
                    className="w-full bg-dark-900 border border-white/10 rounded-sm p-4 text-white focus:outline-none focus:border-gold-400 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-gray-500">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+91 98765 43210"
                  required
                  className="w-full bg-dark-900 border border-white/10 rounded-sm p-4 text-white focus:outline-none focus:border-gold-400 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-gray-500">Message</label>
                <textarea
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your order or inquiry..."
                  required
                  className="w-full bg-dark-900 border border-white/10 rounded-sm p-4 text-white focus:outline-none focus:border-gold-400 transition-colors resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gold-500 hover:bg-gold-400 text-black py-4 rounded-sm font-bold tracking-widest flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={18} />
                {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;