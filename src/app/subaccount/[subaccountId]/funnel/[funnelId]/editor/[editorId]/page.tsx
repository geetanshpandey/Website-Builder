'use client'
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { ArrowLeft, ArrowRight, Save, FilePlus, Check, UploadCloud, Globe, Menu } from "lucide-react";
import { Acme, Archivo_Black, Caveat, Bowlby_One } from 'next/font/google';
import Link from "next/link";
const generateRandomId = () => {
    return Math.random().toString(36).substring(2, 10); // Generates a random alphanumeric ID
  };
const subaccountId = generateRandomId();
const funnelId = generateRandomId();

// Correctly load fonts with required 'weight' parameter
const acme = Acme({ subsets: ['latin'], weight: ['400'] });
const archivoBlack = Archivo_Black({ subsets: ['latin'], weight: ['400'] });
const caveat = Caveat({ subsets: ['latin'], weight: ['400', '700'] });
const bowlbyOne = Bowlby_One({ subsets: ['latin'], weight: ['400'] });



const EditorPage = () => {
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


  return (
    <div className="h-screen flex bg-gray-100">
      {/* Main Section */}
      <div className="flex-1">
        {/* Navbar */}
        <div className="fixed top-0 left-0 right-0 bg-white shadow-sm flex justify-between items-center h-16 px-4 z-50">
            {/* Back Button */}
            <Link href={`/subaccount/${subaccountId}/funnel/${funnelId}/`}>
            <Button variant="ghost">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
            </Link>

            <div className="flex items-center gap-4">
                {/* Status Indicators */}
                <span className="w-2.5 h-2.5 bg-red-500 rounded-full hidden sm:block"></span>
                <span className="w-2.5 h-2.5 bg-green-500 rounded-full hidden sm:block"></span>
                <span className="w-2.5 h-2.5 bg-purple-500 rounded-full mr-20 hidden sm:block"></span>
                <ArrowLeft className="w-4 h-4 mr-2 hidden sm:block" />
                <ArrowRight className="w-4 h-4 mr-2 hidden sm:block" />

                {/* Draft Button */}
                <Button variant="outline">
                <FilePlus className="w-4 h-4 mr-2" /> <span className="hidden sm:block">Draft</span>
                </Button>

                {/* Publish Button */}
                <Button onClick={() => setIsDialogOpen(true)}>
                <Globe className="w-4 h-4 mr-2" />
                {isPublished ? "Unpublish" : "Publish"}
                </Button>

                {/* Save Button */}
                <Button variant="outline">
                <Save className="w-4 h-4 mr-2" /> Save
                </Button>
            </div>

            {/* Publish Confirmation Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                <DialogHeader>
                    <DialogTitle>Confirm Publish</DialogTitle>
                </DialogHeader>
                <p>Are you sure you want to {isPublished ? "unpublish" : "publish"} this content?</p>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                    </Button>
                    <Button onClick={handlePublish}>
                    <UploadCloud className="w-4 h-4 mr-2" /> {isPublished ? "Unpublish" : "Publish"}
                    </Button>
                </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>

        {/* Main Content */}
        <div className="pt-20 px-4">
          <h1 className="text-5xl font-semibold text-center mt-40"><span className={`${caveat.className}`}>Editor</span></h1>
        </div>
      </div>

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
};

export default EditorPage;
