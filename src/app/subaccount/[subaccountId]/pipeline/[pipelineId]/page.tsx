'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Acme, Caveat } from 'next/font/google';
import SubaccountSidebarPage from '@/components/main/subaccountSidebar';

// Correctly load fonts with required 'weight' parameter
const acme = Acme({ subsets: ['latin'], weight: ['400'] });
const caveat = Caveat({ subsets: ['latin'], weight: ['400', '700'] });

// Define the type for a pipeline item
interface PipelineItem {
  detail: string;
  date: string;
}

// Define the type for a lane
interface Lane {
  id: number;
  name: string;
  items: PipelineItem[];
}

export default function PipelinePage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [lanes, setLanes] = useState<Lane[]>([{ id: 1, name: 'Lane 1', items: [] }, { id: 2, name: 'Lane 2', items: [] }, { id: 3, name: 'Lane 3', items: [] }]);
  const [newPipelineDetail, setNewPipelineDetail] = useState('');
  const [selectedLane, setSelectedLane] = useState<Lane | null>(null);

  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const addLane = () => {
    const newLane: Lane = {
      id: lanes.length + 1,
      name: `Lane ${lanes.length + 1}`,
      items: [],
    };
    setLanes([...lanes, newLane]);
  };

  const handlePipelineCreate = () => {
    if (newPipelineDetail.trim() && selectedLane) {
      const newItem: PipelineItem = {
        detail: newPipelineDetail,
        date: new Date().toLocaleString(),
      };

      // Update the selected lane with the new item
      const updatedLanes = lanes.map((lane) => {
        if (lane.id === selectedLane.id) {
          return { ...lane, items: [...lane.items, newItem] };
        }
        return lane;
      });

      setLanes(updatedLanes);
      setNewPipelineDetail(''); // Clear the input field
      toggleDialog(); // Close the dialog after creating the item
    } else {
      alert('Please enter pipeline details and select a lane.');
    }
  };

  const handleDragStart = (event: React.DragEvent, laneId: number, index: number) => {
    event.dataTransfer.setData('dragItem', JSON.stringify({ laneId, index }));
  };

  const handleDrop = (event: React.DragEvent, laneId: number) => {
    const draggedItemData = event.dataTransfer.getData('dragItem');
    const { laneId: sourceLaneId, index } = JSON.parse(draggedItemData);

    if (sourceLaneId === laneId) return;

    const sourceLane = lanes.find((lane) => lane.id === sourceLaneId);
    const targetLane = lanes.find((lane) => lane.id === laneId);

    if (sourceLane && targetLane) {
      const movedItem = sourceLane.items[index];
      sourceLane.items.splice(index, 1); // Remove from source lane
      targetLane.items.push(movedItem); // Add to target lane

      setLanes([...lanes]); // Update lanes state
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault(); // Allow drop
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="fixed top-0 left-0  h-full text-white z-50">
        <SubaccountSidebarPage />
      </div>

      {/* Main Content */}
      <motion.main
        className="flex-1 flex flex-col p-6 bg-white ml-2 sm:ml-64"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="flex justify-between items-center fixed top-0 right-0 bg-white p-4 sm:flex-row sm:justify-between sm:items-center bg-none">
            <h1 className="text-5xl font-bold mr-1 sm:mr-32 text-center"><span className={`${caveat.className} ml-10`}>All <span className='text-blue-600'>Pipeline</span></span></h1>
            {/* Button Container */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-4 sm:mt-0 ml-6 sm:ml-1">
                {/* Create Pipeline Button */}
                <Button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all text-sm"
                onClick={toggleDialog}
                >
                <PlusCircle className="" />
                <span>Create</span>
                </Button>

                {/* Add Lane Button */}
                <Button
                className="bg-gray-200 text-black px-4 py-2 rounded-lg hover:bg-gray-400 transition-all text-sm"
                onClick={addLane}
                >
                <PlusCircle className="" />
                Add Lane
                </Button>
            </div>
            </div>
                    

        <div className="flex space-x-4 mb-8 mt-16 bg-white">
          {/* Render lanes */}
          {lanes.map((lane) => (
            <div
              key={lane.id}
              className="flex-1 bg-blue-50 p-4 rounded-lg shadow-md h-[62vh] mt-20 sm:mt-2 overflow-y-auto sm:h-[75vh]"
              onDragOver={handleDragOver}
              onDrop={(event) => handleDrop(event, lane.id)}
              onClick={() => setSelectedLane(lane)}  // Set selected lane when clicked
            >
              <h3 className="text-lg font-semibold">{lane.name}</h3>
              {lane.items.map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-sm mt-4"
                  draggable
                  onDragStart={(e) => handleDragStart(e, lane.id, index)}
                >
                  <p>{item.detail}</p>
                  <small>{item.date}</small>
                </div>
              ))}
            </div>
          ))}
        </div>

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
            {/* Pipeline Detail Input */}
            <div className="mb-4">
              <label htmlFor="detail" className="block text-lg font-medium">
                Pipeline Detail
              </label>
              <input
                id="detail"
                type="text"
                value={newPipelineDetail}
                onChange={(e) => setNewPipelineDetail(e.target.value)}
                className="w-full p-2 border rounded-md mt-2"
              />
            </div>

            {/* Lane Selection */}
            <div className="mb-4">
              <label htmlFor="lane" className="block text-lg font-medium">
                Select Lane
              </label>
              <select
                id="lane"
                className="w-full p-2 border rounded-md mt-2"
                onChange={(e) => {
                  const laneId = parseInt(e.target.value);
                  setSelectedLane(lanes.find(lane => lane.id === laneId) || null);
                }}
                value={selectedLane?.id || ''}
              >
                <option value="">--Select Lane--</option>
                {lanes.map(lane => (
                  <option key={lane.id} value={lane.id}>
                    {lane.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Create Button */}
            <Button
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all"
              onClick={handlePipelineCreate}  // Create the pipeline
            ><PlusCircle className="mr-2" />
              Create
            </Button>

            {/* Close Button */}
            <Button
              className="mt-4 ml-2 bg-gray300 text-black px-4 py-2 rounded-lg hover:bg-red-700 transition-all"
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
