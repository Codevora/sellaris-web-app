"use client";

import {FiAlertTriangle} from "react-icons/fi";
import {motion} from "framer-motion";

export default function WebMasterDeleteModal({
 isOpen,
 onClose,
 onConfirm,
 itemName,
}: {
 isOpen: boolean;
 onClose: () => void;
 onConfirm: () => void;
 itemName: string;
}) {
 if (!isOpen) return null;

 return (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
   <motion.div
    initial={{scale: 0.9, opacity: 0}}
    animate={{scale: 1, opacity: 1}}
    className="bg-white rounded-lg p-6 w-full max-w-md">
    <div className="flex items-start">
     <div className="mr-3 mt-1 text-red-500">
      <FiAlertTriangle size={24} />
     </div>
     <div>
      <h3 className="text-lg font-bold">Delete Payment Method</h3>
      <p className="mt-2 text-gray-600">
       Are you sure you want to delete{" "}
       <span className="font-semibold">{itemName}</span>? This action cannot be
       undone.
      </p>
     </div>
    </div>

    <div className="flex justify-end gap-3 mt-6">
     <button
      onClick={onClose}
      className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">
      Cancel
     </button>
     <button
      onClick={onConfirm}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
      Delete
     </button>
    </div>
   </motion.div>
  </div>
 );
}
