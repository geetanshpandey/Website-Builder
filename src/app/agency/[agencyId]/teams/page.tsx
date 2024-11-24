'use client';
import SidebarPage from "@/components/main/sidebar";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Acme, Archivo_Black, Caveat, Bowlby_One } from 'next/font/google';

// Correctly load fonts with required 'weight' parameter
const acme = Acme({ subsets: ['latin'], weight: ['400'] });
const archivoBlack = Archivo_Black({ subsets: ['latin'], weight: ['400'] });
const caveat = Caveat({ subsets: ['latin'], weight: ['400', '700'] });
const bowlbyOne = Bowlby_One({ subsets: ['latin'], weight: ['400'] });

export default function TeamPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const handleCreateTeam = () => {
    console.log("Email:", email);
    console.log("Role:", role);
    // Add logic to handle team creation here.
    toggleDialog();
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <SidebarPage />

      {/* Main Content */}
      <motion.main
        className="flex-1 flex flex-col p-6 bg-gray-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        {/* Team Heading with Create Team Button */}
        <motion.div
          className="flex justify-between items-center mb-8 mt-8 md:mt-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className={`text-3xl font-bold text-blue-600 ${caveat.className}`}>
            <span className="text-black">All</span> Teams
          </h1>

          {/* Create Team Button */}
          <Button
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all"
            onClick={toggleDialog}
          >
            Create Team
          </Button>
        </motion.div>

        {/* Team 1 Card */}
        <motion.div
          className="w-full px-4 sm:px-6 flex flex-col justify-center bg-gradient-to-r from-gray-100 to-indigo-100 text-black p-6 rounded-lg shadow-md hover:shadow-lg transition-all"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h3 className="text-lg md:text-xl font-semibold">Team 1</h3>
          <p className="text-sm md:text-base mt-2">Details of your team 1.</p>
        </motion.div>
      </motion.main>

      {/* Dialog */}
      {isDialogOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              toggleDialog();
            }
          }}
        >
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Dialog Header */}
            <h2 className={`text-4xl font-bold mb-4 text-center text-blue-600 ${caveat.className}`}>Add a Team</h2>

            {/* Email Input */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter team email"
              />
            </div>

            {/* Role Dropdown */}
            <div className="mb-4">
              <label htmlFor="role" className="block text-sm font-medium mb-2">
                Select a Role
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-600"
              >
                <option value="Admin">Select a role</option>
                <option value="Admin">Agency Admin</option>
                <option value="Editor">Subaccount-User</option>
                <option value="Viewer">Subaccount-guest</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-4">
              <Button
                className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
                onClick={toggleDialog}
              >
                Cancel
              </Button>
              <Button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                onClick={handleCreateTeam}
              >
                Create
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
