'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search, PlusCircle } from 'lucide-react';
import SubaccountSidebarPage from '@/components/main/subaccountSidebar';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Acme, Archivo_Black, Caveat, Bowlby_One } from 'next/font/google';

// Correctly load fonts with required 'weight' parameter
const acme = Acme({ subsets: ['latin'], weight: ['400'] });
const archivoBlack = Archivo_Black({ subsets: ['latin'], weight: ['400'] });
const caveat = Caveat({ subsets: ['latin'], weight: ['400', '700'] });
const bowlbyOne = Bowlby_One({ subsets: ['latin'], weight: ['400'] });

interface Funnel {
  id: number;
  name: string;
  desc: string;
  logoUrl: string;
  subdomain: string;
}

export default function FunnelPage() {
  const [funnels, setFunnels] = useState<Funnel[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [funnelName, setFunnelName] = useState('');
  const [funnelDesc, setFunnelDesc] = useState('');
  const [funnelLogo, setFunnelLogo] = useState<File | null>(null);
  const [subdomain, setSubdomain] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const handleSave = () => {
    if (funnelName && funnelDesc && funnelLogo && subdomain) {
      const newFunnel: Funnel = {
        id: funnels.length + 1,
        name: funnelName,
        desc: funnelDesc,
        logoUrl: URL.createObjectURL(funnelLogo), // Generate temporary URL for the logo
        subdomain,
      };

      setFunnels([...funnels, newFunnel]);
      resetForm();
      toggleDialog();
    } else {
      alert('Please fill in all fields.');
    }
  };

  const resetForm = () => {
    setFunnelName('');
    setFunnelDesc('');
    setFunnelLogo(null);
    setSubdomain('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFunnelLogo(e.target.files[0]);
    }
  };

  const filteredFunnels = funnels.filter((funnel) =>
    funnel.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <SubaccountSidebarPage />

      {/* Main Content */}
      <main className="flex-1 p-6 mt-8 sm:mt-2">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          {/* Search */}
          <div className="flex items-center space-x-2">
            <Search className="text-gray-500" />
            <input
              type="text"
              placeholder="Search funnels..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 border rounded-md w-full max-w-sm focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Create Funnel Button */}
          <Button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all shadow-md flex items-center"
            onClick={toggleDialog}
          >
            <PlusCircle className="mr-2" />
            Create Funnel
          </Button>
        </div>

        {/* Main Section */}
        <div className="text-center mt-10">
          <h1 className="text-4xl font-bold text-gray-800"><span className={`${caveat.className} text-black`}>Use images of your desired <br /> <span className='text-blue-600'>choice in one line and</span></span></h1>
          <p className="text-gray-600 text-2xl font-semibold mt-2">
          <span className={`${caveat.className} text-gray-600`}>Easily create and organize funnels to streamline your workflow.</span>
          </p>
        </div>

        {/* Funnels Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {filteredFunnels.map((funnel) => (
            <div
              key={funnel.id}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center cursor-pointer hover:shadow-lg transition-all"
              onClick={() => router.push('/subaccount/${subaccountId}/funnel/${funnelId}')}
            >
              <img
                src={funnel.logoUrl}
                alt={funnel.name}
                className="w-24 h-24 object-cover rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">{funnel.name}</h3>
              <p className="text-gray-600 text-sm">{funnel.desc}</p>
              <p className="text-blue-600 text-sm mt-2">{funnel.subdomain}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Dialog for Funnel Creation */}
      {isDialogOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) toggleDialog();
          }}
        >
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-bold mb-4 text-gray-800">Funnel Details</h2>
            <div className="mb-4">
              <label htmlFor="funnelName" className="block font-medium text-gray-600">
                Name
              </label>
              <input
                id="funnelName"
                type="text"
                value={funnelName}
                onChange={(e) => setFunnelName(e.target.value)}
                className="w-full p-2 border rounded-md mt-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="funnelDesc" className="block font-medium text-gray-600">
                Description
              </label>
              <textarea
                id="funnelDesc"
                value={funnelDesc}
                onChange={(e) => setFunnelDesc(e.target.value)}
                className="w-full p-2 border rounded-md mt-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="funnelLogo" className="block font-medium text-gray-600">
                Logo
              </label>
              <input
                id="funnelLogo"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-2 border rounded-md mt-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="subdomain" className="block font-medium text-gray-600">
                Subdomain
              </label>
              <input
                id="subdomain"
                type="text"
                value={subdomain}
                onChange={(e) => setSubdomain(e.target.value)}
                className="w-full p-2 border rounded-md mt-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <Button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all shadow-md"
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                className="bg-gray-200 text-black px-4 py-2 rounded-lg hover:bg-gray-300 transition-all shadow-md"
                onClick={toggleDialog}
              >
                Cancel
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
