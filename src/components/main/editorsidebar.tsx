import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronDown, ChevronUp, Menu, X } from 'lucide-react'; // Lucide Icons
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input'; // Assuming you use ShadCN components
import { Button } from '@/components/ui/button'; // Assuming you use ShadCN components
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Acme, Archivo_Black, Caveat, Bowlby_One } from 'next/font/google';
import Link from "next/link";

// Correctly load fonts with required 'weight' parameter
const caveat = Caveat({ subsets: ['latin'], weight: ['400', '700'] });
const generateRandomId = () => {
    return Math.random().toString(36).substring(2, 10); // Generates a random alphanumeric ID
  };

export default function SubaccountSidebarPage() {

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isPublished, setIsPublished] = useState(false);
  
    const handlePublish = () => {
      setIsPublished(!isPublished);
      setIsDialogOpen(false);
    };
      const [isOpen, setIsOpen] = useState(false);
    const [selectedElement, setSelectedElement] = useState("");
    const [property, setProperty] = useState("");
  
    const handleElementChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedElement(e.target.value);
    };
  
    const handlePropertyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setProperty(e.target.value);
    };
  
    const handleSubmit = () => {
      // Perform actions based on selected element and property
      console.log("Selected Element:", selectedElement);
      console.log("Property:", property);
      setIsOpen(false);
    };
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [showHamburger, setShowHamburger] = useState(false); // State to control hamburger visibility

  const sidebarRef = useRef<HTMLDivElement>(null); // Ref for sidebar
  const subaccountId = generateRandomId();
  const pipelineId = generateRandomId();
  const agencyId = generateRandomId();

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
    <div className="h-screen flex">
      {/* Sidebar */}
        <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isSidebarOpen ? 0 : "100%" }}
        transition={{ duration: 0.5 }}
        className={`fixed right-0 top-0 pt-12 h-full bg-white shadow-lg w-80 border-l z-10 `}
        >
        {/* Sidebar Content */}
        <div className="p-4 flex flex-col h-full overflow-y-auto">
        {/* Close Button */}
        <div className="flex justify-end z-50">
            <Button
            variant="ghost"
            onClick={() => setIsSidebarOpen(false)}
            >
            Close
            </Button>
        </div>

        {/* Sidebar Dynamic Content */}
        <div className="">
            <h2 className="text-xl font-semibold mb-4 -mt-8">Styles</h2>
            {/* Typography */}
            <div>
            <h3 className="font-medium mb-2">Typography</h3>
            <input
                type="text"
                placeholder="Text description"
                className="w-full mb-4 p-2 border rounded"
            />
            </div>

            {/* Color */}
            <div>
            <label className="block mb-2 font-medium">Color</label>
            <input type="color" className="w-full mb-4" />
            </div>

            {/* Weight, Margin, Padding */}
            <div>
            <label className="block mb-2 font-medium">Weight</label>
            <input
                type="number"
                placeholder="Weight"
                className="w-full mb-4 p-2 border rounded"
            />
            </div>
            <h3 className="font-semibold p-2 mb-2 text-center">Margin</h3>
            <div className="flex gap-4">
            <div>
                <label className="block font-medium">M-x</label>
                <input
                type="number"
                placeholder="x"
                className="w-full mb-2 p-2 border rounded"
                />
            </div>
            <div>
                <label className="block font-medium">M-y</label>
                <input
                type="number"
                placeholder="y"
                className="w-full mb-2 p-2 border rounded"
                />
            </div>
            </div>
            <div className="flex gap-4">
            <div>
                <label className="block font-medium">M-t</label>
                <input
                type="number"
                placeholder="Top"
                className="w-full mb-2 p-2 border rounded"
                />
            </div>
            <div>
                <label className="block font-medium">M-b</label>
                <input
                type="number"
                placeholder="Bottom"
                className="w-full mb-2 p-2 border rounded"
                />
            </div>
            </div>
            <h3 className="font-semibold p-2 mb-2 text-center">Padding</h3>
            <div className="flex gap-4">
            <div>
                <label className="block font-medium">P-x</label>
                <input
                type="number"
                placeholder="x"
                className="w-full mb-2 p-2 border rounded"
                />
            </div>
            <div>
                <label className="block font-medium">P-y</label>
                <input
                type="number"
                placeholder="y"
                className="w-full mb-2 p-2 border rounded"
                />
            </div>
            </div>
            <div className="flex gap-4">
            <div>
                <label className="block font-medium">P-t</label>
                <input
                type="number"
                placeholder="Top"
                className="w-full mb-2 p-2 border rounded"
                />
            </div>
            <div>
                <label className="block font-medium">P-b</label>
                <input
                type="number"
                placeholder="Bottom"
                className="w-full mb-2 p-2 border rounded"
                />
            </div>
            </div>
            <h3 className="font-semibold p-2 mb-2 text-center">Flex</h3>
            <div className="flex justify-center text-center gap-4">
            <div>
                <Button className="bg-neutral-700">Justify-Center</Button>
            </div>
            <div>
                <Button className="bg-neutral-700">Justify-end</Button>
            </div>
            </div>

        </div>

        {/* Add/Delete Elements */}
        <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Elements</h3>
            <div className="bg-white shadow-md rounded-lg p-4 border">
                <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-blue-500 rounded-full"></span>
                    Text
                </li>
                <li className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-purple-500 rounded-full"></span>
                    Video
                </li>
                <li className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>
                    Contact
                </li>
                <li className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></span>
                    Stripe
                </li>
                <li className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-red-500 rounded-full"></span>
                    Line
                </li>
                </ul>

                <div className="flex items-center justify-between mt-6">
                <div>
                    {/* Trigger Button */}
                    <Button
                        variant="outline"
                        className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100"
                        onClick={() => setIsOpen(true)}
                    >
                        <span className="text-xl font-bold text-green-500">+</span>
                        Add Element
                    </Button>

                    {/* Dialog */}
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add a New Element</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            {/* Dropdown for Element Type */}
                            <div>
                            <label htmlFor="elementType" className="block text-sm font-medium text-gray-700">
                                Element Type
                            </label>
                            <select
                                id="elementType"
                                value={selectedElement}
                                onChange={handleElementChange}
                                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            >
                                <option value="">Select Element</option>
                                <option value="text">Text</option>
                                <option value="video">Video</option>
                                <option value="contact">Contact</option>
                                <option value="stripe">Stripe</option>
                                <option value="line">Line</option>
                            </select>
                            </div>

                            {/* Property Input (e.g., Text Content, URL, etc.) */}
                            <div>
                            <label htmlFor="property" className="block text-sm font-medium text-gray-700">
                                Property
                            </label>
                            <input
                                type="text"
                                id="property"
                                value={property}
                                onChange={handlePropertyChange}
                                placeholder={`Enter ${selectedElement} property`}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsOpen(false)}>
                            Cancel
                            </Button>
                            <Button onClick={handleSubmit}>Add</Button>
                        </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    </div>
                <Button
                    variant="destructive"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-red-300 rounded-lg shadow-sm hover:bg-red-100 text-black"
                >
                    <span className="text-xl font-bold text-red-500">-</span>
                    Remove
                </Button>
                </div>
            </div>
            </div>
        </div>
        </motion.div>

        {/* Sidebar Toggle Button */}
        {!isSidebarOpen && (
        <Button
        onClick={() => setIsSidebarOpen(true)}
        className="fixed right-4 top-20"
        ><Menu className="w-4 h-4 mr-2" />
        Open
        </Button>
        )}
    </div>
  );
}

