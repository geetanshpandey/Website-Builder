'use client';

import { useState } from 'react';
import SubaccountSidebarPage from '@/components/main/subaccountSidebar';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Acme, Archivo_Black, Caveat, Bowlby_One } from 'next/font/google';
import Link from 'next/link';


const generateRandomId = () => {
    return Math.random().toString(36).substring(2, 10); // Generates a random alphanumeric ID
  };

// Correctly load fonts with required 'weight' parameter
const acme = Acme({ subsets: ['latin'], weight: ['400'] });
const archivoBlack = Archivo_Black({ subsets: ['latin'], weight: ['400'] });
const caveat = Caveat({ subsets: ['latin'], weight: ['400', '700'] });
const bowlbyOne = Bowlby_One({ subsets: ['latin'], weight: ['400'] });

export default function MediaPage() {
  const [isStepsSection, setIsStepsSection] = useState(true);
  const [steps, setSteps] = useState<{ name: string; pathName: string }[]>([]);
  const [isStepDialogOpen, setIsStepDialogOpen] = useState(false);
  const [isFunnelDialogOpen, setIsFunnelDialogOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<{ name: string; pathName: string } | null>(null);

  const [stepName, setStepName] = useState('');
  const [stepPathName, setStepPathName] = useState('');
  const subaccountId = generateRandomId();
  const pipelineId = generateRandomId();
  const agencyId = generateRandomId();
  const funnelId = generateRandomId();
  const editorId = generateRandomId();

  // Toggle between sections
  const toggleSection = () => {
    setIsStepsSection(!isStepsSection);
    setCurrentStep(null); // Reset main view when toggling
  };

  // Add a step
  const handleSaveStep = () => {
    if (stepName && stepPathName) {
      const newStep = { name: stepName, pathName: stepPathName };
      setSteps([...steps, newStep]);
      setStepName('');
      setStepPathName('');
      setIsStepDialogOpen(false);
    } else {
      alert('Please fill in all fields.');
    }
  };

  // Open funnel dialog
  const openFunnelDialog = () => {
    setIsFunnelDialogOpen(true);
  };

  const closeFunnelDialog = () => {
    setIsFunnelDialogOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <SubaccountSidebarPage />

      {/* Main Content */}
      <main className="flex-1 p-6 gray-100">
        {/* Toggle Slider */}
        <div className="flex justify-end mb-4">
          <div className="flex items-center space-x-4">
            <span className="text-sm">Steps</span>
            <div
              className="w-12 h-6 bg-gray-300 rounded-full relative cursor-pointer"
              onClick={toggleSection}
            >
              <motion.div
                className="w-6 h-6 bg-blue-600 rounded-full absolute top-0"
                animate={{ left: isStepsSection ? '0%' : '50%' }}
                transition={{ type: 'spring', stiffness: 300 }}
              />
            </div>
            <span className="text-sm">Settings</span>
          </div>
        </div>

        {/* Section Content */}
        {isStepsSection ? (
          // Steps Section
          currentStep === null ? (
            <div>
              <h1 className="text-4xl font-bold mb-4 text-center mt-20"><span className={`${caveat.className}`}>Steps</span></h1>
              <h1 className="text-3xl font-bold mb-4 text-center text-blue-600"><span className={`${caveat.className}`}>Create steps by yourself</span></h1>
              <h1 className="text-md mb-4 text-center text-gray-600"><span>Steps help you understand the workflow</span></h1>
              <div className='text-center'>
              <Button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                onClick={() => setIsStepDialogOpen(true)}
              >
                Create Step
              </Button>
              </div>

              {/* Steps List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg"
                    onClick={() => setCurrentStep(step)}
                  >
                    <h3 className="text-lg font-bold">{step.name}</h3>
                    <p className="text-gray-500">{step.pathName}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Editable View for Selected Step
            <div className="flex min-h-screen items-center bg-gray-100 p-8 pt-1">
            {/* Left Section */}
            <div className="flex-1 justify-center text-center min-h-screen pl-8 pr-8 bg-white rounded-lg shadow-lg h-[3.5x]">
                <h2 className="flex sm:text-5xl text-3xl font-bold text-gray-800 mb-6 sm:ml-36 mt-20 ml-8"><span className={`${caveat.className}`}>Steps</span></h2>
                <span className='text-2xl sm:ml-4'><span className={`${caveat.className}`}>Want to create more steps</span></span>
                <Button
                className="flex bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all sm:ml-32 mb-4 mt-4"
                onClick={() => setIsStepDialogOpen(true)}
                >
                Create Step
                </Button>
                <span className='text-2xl sm:ml-4'><span className={`${caveat.className}`}>Want to open editor</span></span>
                <Link href={`/subaccount/${subaccountId}/funnel/${funnelId}/editor/${editorId}/`}>
                <Button
                className="flex bg-neutral-800 text-white px-6 py-3 rounded-lg hover:bg-neutral-900 transition-all sm:ml-32 mt-4"
                >
                Open Editor
                </Button>
                </Link>
            </div>

            {/* Right Section */}
            <div className="flex-1 justify-center text-center p-8 min-h-screen bg-gray-100  ">
                <div className="bg-white p-6 pt-16 pb-40 rounded-lg shadow-lg min-h-screen ">
                <h3 className="text-3xl sm:text-5xl font-bold text-gray-800 mb-4 mt-4"><span className={`${caveat.className}`}>Page</span></h3>
                <input
                    type="text"
                    value={currentStep.name}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2 text-gray-700"
                    readOnly
                />
                <button
                    className="bg-blue-600 text-white mt-6 px-6 py-3 rounded-lg hover:bg-blue-700 transition-all w-full"
                    onClick={() => alert(`Path: ${currentStep.pathName}`)}
                >
                    {currentStep.pathName}
                </button>
                </div>
            </div>
            </div>
          )
        ) : (
          // Settings Section
          <div className="p-6 bg-gray-100 min-h-screen">
            {/* Settings Heading */}
            <h1 className="text-5xl font-bold mb-10 text-blue-600"><span className={`${caveat.className}`}>Settings</span></h1>

            {/* Row Cards */}
            <div className="space-y-6">
                {/* Funnel Product List Row */}
                <div className="flex items-center justify-between bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all">
                <span className="text-lg font-semibold text-gray-700">
                    Funnel Product List
                </span>
                <select
                    className="px-4 py-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                >
                    <option value="">-- Select a Product --</option>
                    <option value="product1">Product 1</option>
                    <option value="product2">Product 2</option>
                    <option value="product3">Product 3</option>
                    <option value="product4">Product 4</option>
                    <option value="product5">Product 5</option>
                </select>
                </div>

                {/* Funnel Details Row */}
                <div
                className="flex items-center justify-between bg-white rounded-lg shadow-md p-6 hover:shadow-lg cursor-pointer hover:bg-gray-50 transition-all"
                onClick={openFunnelDialog}
                >
                <span className="text-lg font-semibold text-gray-700">
                    Funnel Details
                </span>
                <div className="text-blue-600 text-sm font-medium">
                    Click to configure
                </div>
                </div>
            </div>

            {/* Funnel Details Dialog */}
            {isFunnelDialogOpen && (
                <div
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                onClick={(e) => {
                    if (e.target === e.currentTarget) closeFunnelDialog();
                }}
                >
                <motion.div
                    className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Funnel Details</h2>
                    {/* Add your funnel details form here */}
                    <div className="flex justify-end">
                    <button
                        className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-all"
                        onClick={closeFunnelDialog}
                    >
                        Close
                    </button>
                    </div>
                </motion.div>
                </div>
            )}
            </div>
        
        )}
      </main>

      {/* Step Dialog */}
      {isStepDialogOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsStepDialogOpen(false);
          }}
        >
          <motion.div
            className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-bold mb-4">Create Step</h2>
            <input
              type="text"
              placeholder="Step Name"
              value={stepName}
              onChange={(e) => setStepName(e.target.value)}
              className="w-full p-2 border rounded-md mb-4"
            />
            <input
              type="text"
              placeholder="Path Name"
              value={stepPathName}
              onChange={(e) => setStepPathName(e.target.value)}
              className="w-full p-2 border rounded-md mb-4"
            />
            <div className="flex justify-end space-x-4">
              <Button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                onClick={handleSaveStep}
              >
                Save
              </Button>
              <Button
                className="bg-gray-200 text-black px-4 py-2 rounded-lg hover:bg-gray-300"
                onClick={() => setIsStepDialogOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Funnel Dialog */}
      {isFunnelDialogOpen && (
        <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={(e) => {
          if (e.target === e.currentTarget) closeFunnelDialog();
        }}
      >
        <motion.div
          className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Funnel Details Heading */}
          <h2 className="text-2xl font-bold text-center mb-6">Funnel Details</h2>
      
          {/* Funnel Form Fields */}
          <form className="space-y-4">
            {/* Funnel Name */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Name</label>
              <input
                type="text"
                placeholder="Enter Funnel Name"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
      
            {/* Funnel Description */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Description</label>
              <textarea
                placeholder="Enter Funnel Description"
                rows={3}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
      
            {/* Funnel Logo */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Logo</label>
              <input
                type="file"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
      
            {/* Funnel Subdomain */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Subdomain</label>
              <input
                type="text"
                placeholder="Enter Subdomain"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </form>
      
          {/* Dialog Buttons */}
          <div className="flex justify-end space-x-4 mt-6">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              onClick={() => alert('Funnel Created!')}
            >
              Save
            </button>
            <button
              className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400"
              onClick={closeFunnelDialog}
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>      
      )}
    </div>
  );
}
