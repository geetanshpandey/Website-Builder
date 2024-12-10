'use client'
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArrowLeft, ArrowRight, Save, FilePlus, Check, UploadCloud, Globe, Menu } from "lucide-react";
import Link from "next/link";
import SubaccountSidebarPage from "@/components/main/editorsidebar";
import { Acme, Archivo_Black, Caveat, Bowlby_One } from 'next/font/google';

// Correctly load fonts with required 'weight' parameter
const acme = Acme({ subsets: ['latin'], weight: ['400'] });
const archivoBlack = Archivo_Black({ subsets: ['latin'], weight: ['400'] });
const caveat = Caveat({ subsets: ['latin'], weight: ['400', '700'] });
const bowlbyOne = Bowlby_One({ subsets: ['latin'], weight: ['400'] });

const generateRandomId = () => {
  return Math.random().toString(36).substring(2, 10); // Generates a random alphanumeric ID
};
const subaccountId = generateRandomId();
const funnelId = generateRandomId();

const EditorPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [isDraggableDialogOpen, setIsDraggableDialogOpen] = useState(false);

  const handlePublish = () => {
    setIsPublished(!isPublished);
    setIsDialogOpen(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDraggableDialogOpen(true);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div className="h-screen flex bg-gray-100">
      {/* Main Section */}
      <div className="flex-1" onDrop={handleDrop} onDragOver={handleDragOver}>
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

            {/* Draggable Contact Button */}
            <motion.div draggable className="cursor-move">
              <Button variant="outline">
                <Menu className="w-4 h-4 mr-2" /> Contact
              </Button>
            </motion.div>
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

        {/* Draggable Dialog with Tabs */}
        <Dialog open={isDraggableDialogOpen} onOpenChange={setIsDraggableDialogOpen}>
          <DialogContent className="h-[55%]">
            <DialogHeader>
              <DialogTitle>Contact and Payment</DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="contact">
              <TabsList>
                <TabsTrigger value="contact">Contact Form</TabsTrigger>
                <TabsTrigger value="payment">Payment Form</TabsTrigger>
              </TabsList>
              <TabsContent value="contact">
                <form className="space-y-4">
                  <input type="text" placeholder="Your Name" className="w-full p-2 border rounded" />
                  <input type="email" placeholder="Your Email" className="w-full p-2 border rounded" />
                  <textarea placeholder="Message" className="w-full p-2 border rounded" rows={1}></textarea>
                  <Button>Submit</Button>
                </form>
              </TabsContent>
              <TabsContent value="payment">
                <form className="space-y-4">
                  <input type="text" placeholder="Card Number" className="w-full p-2 border rounded" />
                  <input type="text" placeholder="Expiry Date" className="w-full p-2 border rounded" />
                  <input type="text" placeholder="CVV" className="w-full p-2 border rounded" />
                  <Button>Pay</Button>
                </form>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>

      <div>
        <SubaccountSidebarPage />
      </div>
    </div>
  );
};

export default EditorPage;
