'use client'; 
import { useState } from 'react';
import { Sun, Moon } from 'lucide-react'; // Import Lucide icons
import Link from 'next/link';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { ArrowLeft, ArrowRight, Save, FilePlus, Check, UploadCloud, Globe, Menu } from "lucide-react";
import { Acme, Archivo_Black, Caveat, Bowlby_One } from 'next/font/google';
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

const Navbar = () => {

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
    <nav>
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

    </nav>
  );
};

export default Navbar;
