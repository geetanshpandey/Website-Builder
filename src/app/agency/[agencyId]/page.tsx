'use client';
import SidebarPage from "@/components/main/sidebar";
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils'; // Utility for conditional classnames
import { Acme, Archivo_Black, Caveat, Bowlby_One } from 'next/font/google';
import Link from 'next/link';


// Correctly load fonts with required 'weight' parameter
const acme = Acme({ subsets: ['latin'], weight: ['400'] });
const archivoBlack = Archivo_Black({ subsets: ['latin'], weight: ['400'] });
const caveat = Caveat({ subsets: ['latin'], weight: ['400', '700'] });
const bowlbyOne = Bowlby_One({ subsets: ['latin'], weight: ['400'] });

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <SidebarPage/>

      {/* Main Content */}
      <motion.main
        className="flex-1 flex items-center justify-center bg-gray-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <motion.div
          className="text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
           <div><h1 className="mb-4 -mt-12 text-5xl font-bold text-blue-600"><span className={`${caveat.className}`}>Create your websites</span></h1>
            <h1 className="mb-4 text-4xl font-semibold"><span className={`${caveat.className}`}>at your fingertips</span></h1>
            </div> 
          {/* Button */}
          <Link href="/agency/2/launchpad">
          <Button
            className="bg-blue-600 text-white px-12 py-6 mt-16 text-lg rounded-lg hover:bg-blue-700 transition-all"
            onClick={() => alert('Going to Launch Pad!')}
          >
            Go to Launch Pad
          </Button>
          </Link>
        </motion.div>
      </motion.main>
    </div>
  );
}