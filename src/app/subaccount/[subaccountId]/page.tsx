'use client';
import SubaccountSidebarPage from "@/components/main/subaccountSidebar";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import LoginPage from "@/components/main/agencyForm"; // Replace with the correct path to your LoginPage component
import { Acme, Archivo_Black, Caveat, Bowlby_One } from "next/font/google";
import { Plus } from "lucide-react";

// Correctly load fonts with required 'weight' parameter
const acme = Acme({ subsets: ["latin"], weight: ["400"] });
const archivoBlack = Archivo_Black({ subsets: ["latin"], weight: ["400"] });
const caveat = Caveat({ subsets: ["latin"], weight: ["400", "700"] });
const bowlbyOne = Bowlby_One({ subsets: ["latin"], weight: ["400"] });

export default function SubaccountPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <SubaccountSidebarPage />

      {/* Main Content */}
      <motion.main
        className="flex-1 flex flex-col p-6 bg-gray-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        {/* Subaccount Heading with Create Subaccount Button */}
        <motion.div
          className="flex justify-between items-center mb-8 mt-8 md:mt-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className={`text-3xl font-bold text-blue-600 ${caveat.className}`}>
            <span className="text-black">All</span> Subaccounts
          </h1>

          {/* Create Subaccount Button */}
          <Button
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all"
            onClick={toggleDialog}
          > <Plus className="font-bold"></Plus>
            Create Subaccount
          </Button>
        </motion.div>

        {/* Subaccount 1 Card */}
        <motion.div
          className="w-full px-4 sm:px-6 flex flex-col justify-center bg-gradient-to-r from-gray-100 to-indigo-100 text-black p-6 rounded-lg shadow-md hover:shadow-lg transition-all"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h3 className="text-lg md:text-xl font-semibold">Subaccount 1</h3>
          <p className="text-sm md:text-base mt-2">Details of your subaccount 1.</p>
        </motion.div>
      </motion.main>

      {/* Dialog Implementation */}
      {isDialogOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={(e) => {
            // Close the dialog if the click is on the backdrop, not inside the dialog
            if (e.target === e.currentTarget) {
              toggleDialog();
            }
          }}
        >
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl max-h-[80vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* LoginPage Component */}
            <LoginPage />

            {/* Close Button */}
            <Button
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all"
              onClick={toggleDialog}
            >
              Close
            </Button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
