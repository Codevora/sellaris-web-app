"use client";

import {useState} from "react";
import {motion} from "framer-motion";
import {
 FiX,
 FiCheck,
 FiClock,
 FiXCircle,
 FiDownload,
 FiEdit,
 FiCalendar,
 FiDollarSign,
 FiUser,
 FiPackage,
} from "react-icons/fi";
import {Transaction, TransactionStatus} from "@/types/transaction";
import {formatRupiah} from "@/lib/utils/formatCurrency";

interface TransactionDetailProps {
 transaction: Transaction;
 onClose: () => void;
 onRefresh: () => void;
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
    method: "PUT",
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
      <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">{error}</div>
     )}

     <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold text-gray-800">Transaction Details</h2>
      <button
       onClick={onClose}
       className="text-gray-500 hover:text-gray-700">
       <FiX size={24} />
      </button>
     </div>

     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div className="bg-gray-50 p-4 rounded-lg">
       <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <FiUser /> User Information
       </h3>
       <div className="space-y-2">
        <p>
         <span className="font-medium">Name:</span> {transaction.userName}
        </p>
        <p>
         <span className="font-medium">User ID:</span> {transaction.userId}
        </p>
       </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
       <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <FiPackage /> Package Information
       </h3>
       <div className="space-y-2">
        <p>
         <span className="font-medium">Package:</span> {transaction.packageName}
        </p>
        <p>
         <span className="font-medium">Package ID:</span>{" "}
         {transaction.packageId}
        </p>
        <p>
         <span className="font-medium">Expiry Date:</span>{" "}
         {new Date(transaction.expiryDate).toLocaleDateString()}
        </p>
       </div>
      </div>
     </div>

     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div className="bg-gray-50 p-4 rounded-lg">
       <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <FiDollarSign /> Payment Information
       </h3>
       <div className="space-y-2">
        <p>
         <span className="font-medium">Amount:</span>{" "}
         {formatRupiah(transaction.amount)}
        </p>
        <p>
         <span className="font-medium">Payment Method:</span>{" "}
         {transaction.paymentMethod || "N/A"}
        </p>
        <div className="flex items-center">
         <span className="font-medium mr-2">Status:</span>
         {isEditing ? (
          <div className="flex items-center gap-2">
           <select
            value={status}
            onChange={(e) => setStatus(e.target.value as TransactionStatus)}
            className="px-2 py-1 border rounded"
            disabled={isUpdating}>
            <option value="pending">Pending</option>
            <option value="success">Success</option>
            <option value="failed">Failed</option>
           </select>
           <button
            onClick={handleStatusUpdate}
            disabled={isUpdating}
            className="px-2 py-1 bg-blue-500 text-white rounded disabled:bg-gray-400">
            {isUpdating ? "Saving..." : "Save"}
           </button>
           <button
            onClick={() => setIsEditing(false)}
            disabled={isUpdating}
            className="px-2 py-1 bg-gray-200 rounded">
            Cancel
           </button>
          </div>
         ) : (
          <div className="flex items-center gap-2">
           <span
            className={`px-2 py-1 rounded-full text-xs flex items-center ${
             status === "success"
              ? "bg-green-100 text-green-800"
              : status === "pending"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
            }`}>
            {getStatusIcon()}
            <span className="ml-1">{status}</span>
           </span>
           <button
            onClick={() => setIsEditing(true)}
            className="text-blue-600 hover:text-blue-800">
            <FiEdit size={16} />
           </button>
          </div>
         )}
        </div>
       </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
       <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <FiCalendar /> Transaction Dates
       </h3>
       <div className="space-y-2">
        <p>
         <span className="font-medium">Transaction Date:</span>{" "}
         {new Date(transaction.date).toLocaleString()}
        </p>
        <p>
         <span className="font-medium">Created At:</span>{" "}
         {transaction.createdAt
          ? new Date(transaction.createdAt).toLocaleString()
          : "N/A"}
        </p>
        <p>
         <span className="font-medium">Updated At:</span>{" "}
         {transaction.updatedAt
          ? new Date(transaction.updatedAt).toLocaleString()
          : "N/A"}
        </p>
       </div>
      </div>
     </div>

     {transaction.proofOfPayment && (
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
       <h3 className="text-lg font-semibold mb-3">Proof of Payment</h3>
       <div className="flex items-center gap-4">
        <div className="w-32 h-32 bg-gray-200 rounded-lg overflow-hidden">
         <img
          src={transaction.proofOfPayment}
          alt="Proof of Payment"
          className="w-full h-full object-cover"
         />
        </div>
        <a
         href={transaction.proofOfPayment}
         target="_blank"
         rel="noopener noreferrer"
         className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
         <FiDownload /> Download
        </a>
       </div>
      </div>
     )}

     <div className="mt-6 flex justify-end">
      <button
       onClick={onClose}
       className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
       Close
      </button>
     </div>
    </div>
   </motion.div>
  </motion.div>
 );
};

export default TransactionDetail;
