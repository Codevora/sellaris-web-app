
"use client";

import {useState} from "react";
import {motion} from "framer-motion";
import {
 FiX,
 FiCheck,
 FiClock,
 FiXCircle,

 FiEdit,
 FiAlertCircle,
} from "react-icons/fi";
import {Transaction, TransactionStatus} from "@/types/transaction";


interface TransactionDetailProps {
 transaction: Transaction;
 onClose: () => void;
 onRefresh: () => void;
 onStatusUpdate?: (id: string, status: TransactionStatus) => Promise<void>;
 isUpdating?: boolean;
 updateError?: string | null;
}

const TransactionDetail = ({
 transaction,
 onClose,
 onRefresh,
}: TransactionDetailProps) => {
 const [status, setStatus] = useState<TransactionStatus>(transaction.status);
 const [isEditing, setIsEditing] = useState(false);
 const [isUpdating, setIsUpdating] = useState(false);
 const [error, setError] = useState<string | null>(null);

 const getStatusIcon = () => {
  switch (status) {
   case "success":
    return <FiCheck className="text-green-500" />;
   case "failed":
    return <FiXCircle className="text-red-500" />;
   default:
    return <FiClock className="text-yellow-500" />;
  }
 };

 const handleStatusUpdate = async () => {
  try {
   setIsUpdating(true);
   setError(null);

   const response = await fetch("/api/transactions", {
    method: "PATCH",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify({
     id: transaction.id,
     status,
    }),
   });

   if (!response.ok) throw new Error("Failed to update transaction");

   setIsEditing(false);
   onRefresh();
  } catch (err) {
   setError(
    err instanceof Error ? err.message : "Failed to update transaction"
   );
  } finally {
   setIsUpdating(false);
  }
 };

 return (
  <motion.div
   initial={{opacity: 0}}
   animate={{opacity: 1}}
   exit={{opacity: 0}}
   className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
   <motion.div
    initial={{scale: 0.9, y: 20}}
    animate={{scale: 1, y: 0}}
    className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
    <div className="p-6">
     {error && (
      <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg flex items-center">
       <FiAlertCircle className="mr-2" /> {error}
      </div>
     )}

     <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold text-gray-800">Transaction Details</h2>
      <button
       onClick={onClose}
       className="text-gray-500 hover:text-gray-700">
       <FiX size={24} />
      </button>
     </div>

     {/* ... (rest of your existing transaction detail UI) */}

     {/* Status Section with enhanced editing */}
     <div className="mt-4">
      <h3 className="text-lg font-medium text-gray-800 mb-2">
       Transaction Status
      </h3>
      {isEditing ? (
       <div className="flex items-center space-x-3">
        <select
         value={status}
         onChange={(e) => setStatus(e.target.value as TransactionStatus)}
         className="flex-1 px-3 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
         disabled={isUpdating}>
         <option value="pending">Pending</option>
         <option value="success">Success</option>
         <option value="failed">Failed</option>
        </select>
        <motion.button
         whileHover={{scale: 1.05}}
         whileTap={{scale: 0.95}}
         onClick={handleStatusUpdate}
         disabled={isUpdating}
         className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-400">
         {isUpdating ? "Saving..." : "Save"}
        </motion.button>
        <motion.button
         whileHover={{scale: 1.05}}
         whileTap={{scale: 0.95}}
         onClick={() => setIsEditing(false)}
         disabled={isUpdating}
         className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg">
         Cancel
        </motion.button>
       </div>
      ) : (
       <div className="flex items-center space-x-3">
        <span
         className={`px-3 py-2 rounded-lg text-sm font-medium ${
          status === "success"
           ? "bg-green-100 text-green-800"
           : status === "pending"
           ? "bg-yellow-100 text-yellow-800"
           : "bg-red-100 text-red-800"
         } flex items-center`}>
         {getStatusIcon()}
         <span className="ml-2 capitalize">{status}</span>
        </span>
        <motion.button
         whileHover={{scale: 1.05}}
         whileTap={{scale: 0.95}}
         onClick={() => setIsEditing(true)}
         className="px-3 py-2 bg-gray-200 text-gray-800 rounded-lg flex items-center">
         <FiEdit className="mr-1" /> Edit
        </motion.button>
       </div>
      )}
     </div>

     {/* ... (rest of your existing transaction detail UI) */}
    </div>
   </motion.div>
  </motion.div>
 );
};

export default TransactionDetail;
