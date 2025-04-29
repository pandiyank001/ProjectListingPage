import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, CreditCard } from 'lucide-react';

const Footer: React.FC = () => {
  const [email, setEmail] = useState<string>('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Subscribing email: ${email}`);
    setEmail('');
  };

  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-sm font-bold mb-4">BE THE FIRST TO KNOW</h3>
            <p className="text-sm">Sign up for updates from mettā muse.</p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 mt-4">
              <input
                type="email"
                placeholder="Enter your e-mail..."
                className="bg-transparent border border-gray-600 py-2 px-3 text-sm w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="border border-gray-600 py-2 px-4 text-sm"
              >
                SUBSCRIBE
              </motion.button>
            </form>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold mb-4">CONTACT US</h3>
            <p className="text-sm">+44 221 193 5380</p>
            <p className="text-sm">customercare@mettamuse.com</p>
            
            <div className="mt-6">
              <h3 className="text-sm font-bold mb-4">CURRENCY</h3>
              <div className="flex items-center gap-2">
                <span className="inline-block w-6 h-4 bg-red-500 relative">
                  <span className="absolute inset-0 flex items-center justify-center text-xs">$</span>
                </span>
                <span className="text-sm">USD</span>
              </div>
              <p className="text-xs mt-2">Transactions will be completed in Euros and a currency reference is available on hover.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-xl font-bold">mettā muse</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:underline">About Us</a></li>
                <li><a href="#" className="hover:underline">Stories</a></li>
                <li><a href="#" className="hover:underline">Artisans</a></li>
                <li><a href="#" className="hover:underline">Boutiques</a></li>
                <li><a href="#" className="hover:underline">Contact Us</a></li>
                <li><a href="#" className="hover:underline">EU Compliances Docs</a></li>
              </ul>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-sm font-bold">QUICK LINKS</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:underline">Orders & Shipping</a></li>
                <li><a href="#" className="hover:underline">Join/Login as a Seller</a></li>
                <li><a href="#" className="hover:underline">Payment & Pricing</a></li>
                <li><a href="#" className="hover:underline">Return & Refunds</a></li>
                <li><a href="#" className="hover:underline">FAQs</a></li>
                <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-sm font-bold">FOLLOW US</h3>
              <div className="flex space-x-4">
                <motion.a 
                  href="#" 
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Instagram size={20} />
                </motion.a>
                <motion.a 
                  href="#" 
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Linkedin size={20} />
                </motion.a>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold">mettā muse ACCEPTS</h3>
              <div className="flex flex-wrap gap-2">
                <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
                  <span className="text-black text-xs">G Pay</span>
                </div>
                <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
                  <div className="w-6 h-6 bg-red-500 rounded-full"></div>
                </div>
                <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
                  <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                </div>
                <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
                  <span className="text-black text-xs">AMEX</span>
                </div>
                <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
                  <span className="text-black text-xs">Apple</span>
                </div>
                <div className="w-12 h-8 bg-purple-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs">Shop</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-gray-400">
          <p>Copyright © 2023 mettamuse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;