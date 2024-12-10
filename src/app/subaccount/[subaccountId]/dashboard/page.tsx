'use client';
import SidebarPage from "@/components/main/sidebar";
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Acme, Archivo_Black, Caveat, Bowlby_One } from 'next/font/google';

// Correctly load fonts with required 'weight' parameter
const acme = Acme({ subsets: ['latin'], weight: ['400'] });
const archivoBlack = Archivo_Black({ subsets: ['latin'], weight: ['400'] });
const caveat = Caveat({ subsets: ['latin'], weight: ['400', '700'] });
const bowlbyOne = Bowlby_One({ subsets: ['latin'], weight: ['400'] });

// Column Component
const Column = ({ header, value }: { header: string; value: string }) => (
  <div className="p-4 bg-white shadow-md rounded-md">
    <h3 className="text-lg font-semibold text-gray-800">{header}</h3>
    <p className="text-gray-600">{value}</p>
  </div>
);

// Cards Section
const CardsSection = () => (
  <div>
    <span className="flex text-3xl"> <span className={`${caveat.className} mb-4 text-blue-600 font-semibold`}>Dashboard</span></span>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    {[1, 2, 3, 4].map((card, idx) => (
      <Card key={idx} className="shadow-md bg-blue-50">
        <CardHeader>
          <CardTitle className="flex justify-center text-center text-3xl"><span className={`${caveat.className}`}>Card {card}</span></CardTitle>
          <CardDescription className="flex justify-center text-center">Card {card} Description</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p>Sub1: Sample Sub1</p>
          <p>Team: Sample Team</p>
        </CardContent>
      </Card>
    ))}
  </div>
  </div>
);

// Boxes Section
const BoxesSection = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 h-60">
    <div className="p-6 bg-white shadow-md rounded-md flex items-center justify-center">
      <p className=" text-4xl text-blue-600"><span className={`${caveat.className}`}>Box 1 Content</span></p>
    </div>
    <div className="p-6 bg-white shadow-md rounded-md flex items-center justify-center">
      <p className="text-blue-600 text-4xl"><span className={`${caveat.className}`}>Box 2 Content</span></p>
    </div>
  </div>
);

// Columns Section
const ColumnsSection = () => (
  <div>
    <span className="flex text-3xl"> <span className={`${caveat.className} mb-4`}>Transaction history</span></span>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <Column header="Email" value="Sample Value 1" />
    <Column header="Status" value="Sample Value 2" />
    <Column header="Date" value="Sample Value 3" />
    <Column header="Value" value="Sample Value 4" />
  </div>
  </div>
  
);

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <SidebarPage />

      {/* Main Content */}
      <motion.main
        className="flex-1 bg-gray-100 p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        {/* Cards Section */}
        <CardsSection />

        {/* Boxes Section */}
        <BoxesSection />

        {/* Columns Section */}
        <ColumnsSection />
      </motion.main>
    </div>
  );
}
