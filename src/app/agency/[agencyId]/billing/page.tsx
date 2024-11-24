'use client';
import SidebarPage from "@/components/main/sidebar";
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Acme, Archivo_Black, Caveat, Bowlby_One } from 'next/font/google';

// Correctly load fonts with required 'weight' parameter
const acme = Acme({ subsets: ['latin'], weight: ['400'] });
const archivoBlack = Archivo_Black({ subsets: ['latin'], weight: ['400'] });
const caveat = Caveat({ subsets: ['latin'], weight: ['400', '700'] });
const bowlbyOne = Bowlby_One({ subsets: ['latin'], weight: ['400'] });

export default function BillingPage() {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <SidebarPage />

      {/* Main Content */}
      <motion.main
        className="flex-1 flex flex-col text-center p-6 bg-gray-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        {/* Billing Options Heading */}
        <motion.h1
          className={`text-5xl font-bold mb-8 text-blue-600 ${caveat.className}`}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Billing Options
        </motion.h1>

        {/* Billing Options Row */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10 w-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {['Option 1', 'Option 2', 'Option 3', 'Option 4'].map((option, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center justify-center p-3 bg-white shadow-sm rounded-lg hover:shadow-md transition-all cursor-pointer"
            >
              <span className="text-md font-semibold text-gray-800">{option}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Billing History Heading */}
        <motion.h2
          className={`text-3xl font-semibold mb-6 text-gray-800 ${caveat.className}`}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Billing History
        </motion.h2>

        {/* History Row */}
        <motion.div
          className="w-full px-4 sm:px-6 flex flex-col justify-center text-left bg-gradient-to-r from-blue-600 to-indigo-100 text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold">History 1</h3>
          <p className="text-sm mt-2">Details of your previous transactions.</p>
        </motion.div>
      </motion.main>
    </div>
  );
}

