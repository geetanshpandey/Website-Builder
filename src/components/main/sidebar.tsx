import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown, ChevronUp, Menu, X, Users2, Users } from 'lucide-react'; // Lucide Icons
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input'; // Assuming you use ShadCN components
import { Button } from '@/components/ui/button'; // Assuming you use ShadCN components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'; // Correct imports from ShadCN UI
import {Caveat } from 'next/font/google';
import Link from 'next/link';
import {
    Briefcase, // Agency Info
    Home as Dashboard, // Dashboard
    Rocket as Launchpad, // Launchpad
    CreditCard as Billing, // Billing
    Users as Subaccounts, // Subaccounts
    Users2 as Team, // Team
    Settings, // Settings
  } from "lucide-react";
  import { FileText } from "lucide-react";

import Home from '@/app/page';
  

// Correctly load fonts with required 'weight' parameter
const caveat = Caveat({ subsets: ['latin'], weight: ['400', '700'] });

export default function SidebarPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showHamburger, setShowHamburger] = useState(false); // State to control hamburger visibility

  const sidebarRef = useRef<HTMLDivElement>(null); // Ref for sidebar

  // Close sidebar when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsSidebarOpen(false);
      }
    };
    

    // Listen for clicks outside
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Clean up the event listener on component unmount
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Delayed visibility of hamburger icon when the sidebar is closed
  useEffect(() => {
    if (!isSidebarOpen) {
      const timer = setTimeout(() => {
        setShowHamburger(true);
      }, 200); // Delay of 1 second

      return () => clearTimeout(timer); // Cleanup timer if component is unmounted or state changes
    } else {
      setShowHamburger(false); // Hide the hamburger immediately when the sidebar opens
    }
  }, [isSidebarOpen]);

  return (
    <div className="min-h-screen flex">
      {/* Hamburger Icon for Mobile (visible when sidebar is closed) */}
      <div className="md:hidden absolute top-4 left-2 z-40">
        {showHamburger && !isSidebarOpen && (
          <Button
            variant="outline"
            onClick={() => setIsSidebarOpen(true)}
            className="text-black  border-none bg-transparent"
          >
            <Menu className="text-black" />
          </Button>
        )}
      </div>

      {/* Sidebar (Mobile and Desktop) */}
      <div
        ref={sidebarRef} // Attach ref to sidebar container
        className={`w-64 bg-gradient-to-r from-indigo-100 to-blue-100 text-black flex flex-col p-6 space-y-8 fixed md:static z-30 ${
          isSidebarOpen ? 'left-0' : '-left-64'
        } transition-all ease-in-out duration-300 md:left-0`}
      >
        {/* Close Button for Mobile (visible when sidebar is open) */}
        <div className="md:hidden absolute top-2 right-2 z-40">
          {isSidebarOpen && (
            <Button
              variant="outline"
              onClick={() => setIsSidebarOpen(false)}
              className="text-black"
            >
              <X className="text-black" />
            </Button>
          )}
        </div>

        {/* Agency Logo */}
        <motion.div
          className="flex justify-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center -mt-8">
            <img
              src="/path-to-your-logo.png" // Add your logo path here
              alt="Agency Logo"
              className="w-16 h-16 rounded-full object-cover"
            />
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          className="flex items-center mt-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="relative w-full -mt-4">
            <Input
              type="text"
              placeholder="Search..."
              className="w-full pt-2 pl-10 pr-3 rounded-md bg-white text-gray-800 placeholder-gray-400"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </motion.div>
        {/* Navigation Links with Separators */}
        <motion.div
          className="mt-1 space-y-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >  
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                variant="default"
                className="-ml-8 text-black font-semibold flex items-center w-full -mt-4 bg-transparent hover:bg-transparent"
                ><Briefcase className="h-4 w-4" />
                Agency Info
                {isDropdownOpen ? (
                    <ChevronUp className="" />
                ) : (
                    <ChevronDown className="" />
                )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem
                onClick={() => setActiveTab('subaccount1')}
                className={activeTab === 'subaccount1' ? 'bg-gray-300' : ''}
                ><Subaccounts className="h-4 w-4" />
                Subaccount-1
                </DropdownMenuItem>
                
                {/* Wrap "Agency form Settings" with Link */}
                <DropdownMenuItem
                    onClick={() => setActiveTab('subaccount2')} // Optional if you want to change the activeTab
                    className={activeTab === 'subaccount2' ? 'bg-gray-300' : ''}
                ><Subaccounts className="h-4 w-4" />
                    Subaccount-2
                </DropdownMenuItem>

            </DropdownMenuContent>
            </DropdownMenu>
          <Link href="/agency/2/dashboard">
          <Button
            variant="link"
            className={`w-full text-left font-semibold -ml-12 ${
              activeTab === 'launchpad' ? 'text-black' : ''
            }`}
            onClick={() => setActiveTab('launchpad')}
          > <Dashboard className="h-4 w-4" />
            Dashboard
          </Button>
          </Link>


          <Link href="/agency/2/launchpad">
          <Button
            variant="link"
            className={`w-full text-left font-semibold -ml-12 ${
              activeTab === 'launchpad' ? 'text-black' : ''
            }`}
            onClick={() => setActiveTab('launchpad')}
          > <Launchpad className="h-4 w-4" />
            Launchpad
          </Button>
          </Link>

          <Link href="/agency/2/billing">
          <Button
            variant="link"
            className={`w-full text-left font-semibold -ml-16 ${
              activeTab === 'launchpad' ? 'text-black' : ''
            }`}
            onClick={() => setActiveTab('launchpad')}
          > <Billing className="h-4 w-4" />
            Billing
          </Button>
          </Link>

          <Link href="/agency/2/all-subaccounts">
          <Button
            variant="link"
            className={`w-full text-left font-semibold -ml-12 ${
              activeTab === 'launchpad' ? 'text-black' : ''
            }`}
            onClick={() => setActiveTab('launchpad')}
          >   <Subaccounts className="h-4 w-4 ml-4" />
              <span className=''> Subaccounts</span>
          </Button>
          </Link>

          <Link href="/agency/2/teams">
          <Button
            variant="link"
            className={`w-full text-left font-semibold -ml-20 ${
              activeTab === 'launchpad' ? 'text-black' : ''
            }`}
            onClick={() => setActiveTab('launchpad')}
          > <Team className="h-4 w-4 ml-6" />
            <span className=''> Team</span>
          </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                variant="default"
                className="-ml-12 text-black font-semibold flex items-center w-full -mt-4 bg-transparent hover:bg-transparent"
                ><Settings className="h-4 w-4" />
                Settings
                {isDropdownOpen ? (
                    <ChevronUp className="" />
                ) : (
                    <ChevronDown className="" />
                )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
            <Link href="/agency/2/settings/profileSettings">
                <DropdownMenuItem
                    onClick={() => setActiveTab('subaccount2')} // Optional if you want to change the activeTab
                    className={activeTab === 'subaccount2' ? 'bg-gray-300' : ''}
                >   <Subaccounts className="h-4 w-4" />
                    Profile Settings
                </DropdownMenuItem>
                </Link>
                
                {/* Wrap "Agency form Settings" with Link */}
                <Link href="/agency/2/settings/agencyFormSettings">
                <DropdownMenuItem
                    onClick={() => setActiveTab('subaccount2')} // Optional if you want to change the activeTab
                    className={activeTab === 'subaccount2' ? 'bg-gray-300' : ''}
                ><FileText/>
                    Agency form Settings
                </DropdownMenuItem>
                </Link>
            </DropdownMenuContent>
            </DropdownMenu>
        </motion.div>
      </div>
    </div>
  );
}
