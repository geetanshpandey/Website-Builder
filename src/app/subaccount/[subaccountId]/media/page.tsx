'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { PlusCircle, Search } from 'lucide-react';
import SubaccountSidebarPage from '@/components/main/subaccountSidebar';
import { Acme, Archivo_Black, Caveat, Bowlby_One } from 'next/font/google';

// Correctly load fonts with required 'weight' parameter
const acme = Acme({ subsets: ['latin'], weight: ['400'] });
const archivoBlack = Archivo_Black({ subsets: ['latin'], weight: ['400'] });
const caveat = Caveat({ subsets: ['latin'], weight: ['400', '700'] });
const bowlbyOne = Bowlby_One({ subsets: ['latin'], weight: ['400'] });

interface ImageItem {
  id: number;
  name: string;
  src: string;
}

export default function MediaPage() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newImageName, setNewImageName] = useState('');
  const [newImageFile, setNewImageFile] = useState<File | null>(null);

  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const handleImageCreate = () => {
    if (newImageName.trim() && newImageFile) {
      const newImage: ImageItem = {
        id: images.length + 1,
        name: newImageName,
        src: URL.createObjectURL(newImageFile), // Generate a temporary URL for preview
      };
      setImages([...images, newImage]);
      setNewImageName('');
      setNewImageFile(null);
      toggleDialog();
    } else {
      alert('Please enter an image name and select an image file.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewImageFile(e.target.files[0]);
    }
  };

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      toggleDialog();
    }
  };

  const filteredImages = images.filter((image) =>
    image.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <SubaccountSidebarPage/>

      {/* Main Content */}
      <main className="flex-1 p-6 pt-16 sm:pt-8">
        {/* Search and Upload Buttons */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
          <Search className="text-gray-500" />
            <input
              type="text"
              placeholder="Search images..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 border rounded-md w-full max-w-sm"
            />
          </div>
          <Button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all ml-8"
            onClick={toggleDialog}
          >
            <PlusCircle className="mr-2" />
            Upload Image
          </Button>
        </div>
        <div className="mb-6 flex justify-center text-center">
          <p className="text-3xl font-bold mb-2">
          <span className={`${caveat.className} text-black`}>Use images of your desired choice in one line and</span> <br/>
          <span className={`${caveat.className} text-blue-600`}>I will help you build the website your way</span>
            
          </p>
        </div>


        {/* Images Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="bg- rounded-lg shadow-md p-4 flex flex-col items-center"
            >
              <img
                src={image.src}
                alt={image.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <p className="mt-2 text-xl text-center font-semibold"> <span className={`${caveat.className} text-blue-600`}>{image.name}</span></p>
            </div>
          ))}
        </div>
      </main>

      {/* Dialog for Image Upload */}
      {isDialogOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleOutsideClick}
        >
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-bold mb-4">Upload Image</h3>
            <div className="mb-4">
              <label htmlFor="imageName" className="block font-medium">
                Image Name
              </label>
              <input
                id="imageName"
                type="text"
                value={newImageName}
                onChange={(e) => setNewImageName(e.target.value)}
                className="w-full p-2 border rounded-md mt-2"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="imageFile" className="block font-medium">
                Select Image
              </label>
              <input
                id="imageFile"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-2 border rounded-md mt-2"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <Button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
                onClick={handleImageCreate}
              >
                Create
              </Button>
              <Button
                className="bg-gray-200 text-black px-4 py-2 rounded-lg hover:bg-gray-300 transition-all"
                onClick={toggleDialog}
              >
                Close
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
