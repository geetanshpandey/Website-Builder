'use client';
import SidebarPage from "@/components/main/sidebar";
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Acme, Archivo_Black, Caveat, Bowlby_One } from 'next/font/google';

// Correctly load fonts with required 'weight' parameter
const acme = Acme({ subsets: ['latin'], weight: ['400'] });
const archivoBlack = Archivo_Black({ subsets: ['latin'], weight: ['400'] });
const caveat = Caveat({ subsets: ['latin'], weight: ['400', '700'] });
const bowlbyOne = Bowlby_One({ subsets: ['latin'], weight: ['400'] });

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <SidebarPage />

      {/* Main Content */}
      <motion.main
        className="flex-1 flex flex-col items-center justify-center bg-gray-100 p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        {/* Let's Get Started Heading */}
        <h1 className={`text-5xl font-bold mb-12 -mt-24 text-blue-600 ${caveat.className}`}>
          Let’s Get Started
        </h1>

        {/* Connect to Stripe Section */}
        <div className="flex items-center space-x-4 mb-6">
          <Label className="text-lg font-medium">
            <span className={`text-3xl font-bold mb-8 ${caveat.className}`} >Connect to Stripe </span></Label>
          <Button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all">
            <span className={`text-xl font-bold ${caveat.className}`}>Connect</span>
          </Button>
        </div>

        {/* Agency Logo and Circular Section on Same Line */}
        <div className="flex items-center space-x-6 mb-6 mt-6">
          <Label className="text-lg font-medium">Agency Logo</Label>
          <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-gray-200 border border-dashed border-gray-400 cursor-pointer hover:bg-gray-300">
            <span className="text-sm text-gray-500">Add Name</span>
          </div>
        </div>

        {/* Checkbox */}
        <div className="flex items-center">
          <Checkbox id="fill-details" />
          <Label
            htmlFor="fill-details"
            className="ml-2 text-lg font-medium text-gray-700"
          >
            Fill existing details
          </Label>
        </div>
      </motion.main>
    </div>
  );
}
