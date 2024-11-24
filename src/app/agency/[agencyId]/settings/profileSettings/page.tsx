'use client';

import SidebarPage from "@/components/main/sidebar";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import DatePicker from 'react-datepicker'; // Importing the external DatePicker component
import "react-datepicker/dist/react-datepicker.css"; // Import CSS for the DatePicker
import { Acme, Archivo_Black, Caveat } from 'next/font/google';

// Correctly load fonts with required 'weight' parameter
const acme = Acme({ subsets: ['latin'], weight: ['400'] });
const archivoBlack = Archivo_Black({ subsets: ['latin'], weight: ['400'] });
const caveat = Caveat({ subsets: ['latin'], weight: ['400', '700'] });

export default function ProfileSettingsPage() {
  const [companyType, setCompanyType] = useState('');
  const [description, setDescription] = useState('');
  const [formedOn, setFormedOn] = useState<Date | null>(null); // The state should handle null values
  const [targetedGrowth, setTargetedGrowth] = useState('');
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  // This function handles the date change, allowing for null as a valid value
  const handleDateChange = (date: Date | null) => {
    setFormedOn(date);
  };

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
        {/* Profile Settings Heading */}
        <h1 className={`text-5xl font-bold mb-6 text-blue-600 ${caveat.className}`}>
          Profile Settings
        </h1>

        {/* Content Container with Border */}
        <div className="w-full max-w-3xl p-8 border rounded-lg shadow-lg bg-white">
          {/* Company Type Input */}
          <div className="mb-6">
            <Label className="text-lg font-medium mb-2">Company Type</Label>
            <Input 
              className="w-full" 
              placeholder="Enter Company Type" 
              value={companyType} 
              onChange={(e) => setCompanyType(e.target.value)} 
            />
          </div>

          {/* Description Textarea */}
          <div className="mb-6">
            <Label className="text-lg font-medium mb-2">Description</Label>
            <Textarea 
              className="w-full" 
              placeholder="Enter a brief description about your company" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
            />
          </div>

          {/* Formed On Date Picker */}
          <div className="mb-6 flex items-center space-x-4">
            <Label className="text-lg font-medium mb-2">Formed On</Label>

            <div className="flex items-center space-x-2 w-full">

              <div className="relative">
                <DatePicker
                  selected={formedOn}
                  onChange={handleDateChange} // Updated the function to accept Date | null
                  open={isDatePickerOpen}
                  onClickOutside={() => setIsDatePickerOpen(false)} // Close date picker when clicked outside
                  className="w-full p-2 border rounded-md text-gray-800"
                  dateFormat="dd/MM/yyyy"
                />
                <Button 
                  variant="outline" 
                  className="absolute right-2 bg-transparent text-white p-2 rounded-md border-none"
                  onClick={() => setIsDatePickerOpen(!isDatePickerOpen)} // Toggle date picker visibility
                >
                  📅
                </Button>
              </div>
            </div>
          </div>

          {/* Targeted Growth Input */}
          <div className="mb-6">
            <Label className="text-lg font-medium mb-2">Targeted Growth</Label>
            <Input 
              className="w-full" 
              placeholder="Enter your targeted growth" 
              value={targetedGrowth} 
              onChange={(e) => setTargetedGrowth(e.target.value)} 
            />
          </div>

          {/* Save Changes Button */}
          <Button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all">
            Save Changes
          </Button>
        </div>
      </motion.main>
    </div>
  );
}
