"use client";

import {motion} from "framer-motion";
import {FiEye, FiCheck, FiX, FiClock, FiDownload} from "react-icons/fi";
import {Transaction} from "@/types/transaction";
import {formatRupiah} from "@/lib/utils/formatCurrency";
import {useState} from "react";
import TransactionDetail from "./TransactionDetail";

interface TransactionListProps {
 transactions: Transaction[];
 onRefresh: () => void;
}

const TransactionList = ({transactions, onRefresh}: TransactionListProps) => {
 const [selectedTransaction, setSelectedTransaction] =
  useState<Transaction | null>(null);
 const [isDetailOpen, setIsDetailOpen] = useState(false);

 const handleViewDetail = (transaction: Transaction) => {
  setSelectedTransaction(transaction);
  setIsDetailOpen(true);
 };

 const getStatusIcon = (status: string) => {
  switch (status) {
   case "success":
    return <FiCheck className="text-green-500" />;
   case "failed":
    return <FiX className="text-red-500" />;
   default:
    return <FiClock className="text-yellow-500" />;
  }
 };

 return (
  <>
   <motion.div
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    transition={{delay: 0.4}}>
    {transactions.length === 0 ? (
     <div className="bg-white rounded-lg shadow p-8 text-center">
      <p className="text-gray-500">No transactions found</p>
     </div>
    ) : (
     <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="overflow-x-auto">
       <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
         <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
           User
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
           Package
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
           Amount
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
           Status
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
           Date
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
           Actions
          </th>
         </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
         {transactions.map((transaction, index) => (
          <motion.tr
           key={transaction.id}
           initial={{opacity: 0, y: 10}}
           animate={{opacity: 1, y: 0}}
           transition={{delay: index * 0.05}}
           whileHover={{backgroundColor: "rgba(59, 130, 246, 0.05)"}}>
           <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center">
             <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              {transaction.userName.charAt(0).toUpperCase()}
             </div>
             <div className="ml-4">
              <div className="text-sm font-medium text-gray-900">
               {transaction.userName}
              </div>
              <div className="text-sm text-gray-500">{transaction.userId}</div>
             </div>
            </div>
           </td>
           <td className="px-6 py-4 whitespace-nowrap">
            <div className="text-sm text-gray-900">
             {transaction.packageName}
            </div>
            <div className="text-sm text-gray-500">
             Expires: {new Date(transaction.expiryDate).toLocaleDateString()}
            </div>
           </td>
           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {formatRupiah(transaction.amount)}
           </td>
           <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center">
             {getStatusIcon(transaction.status)}
             <span
              className={`ml-2 px-2 py-1 rounded-full text-xs ${
               transaction.status === "success"
                ? "bg-green-100 text-green-800"
                : transaction.status === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
              }`}>
              {transaction.status}
             </span>
            </div>
           </td>
           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {new Date(transaction.date).toLocaleDateString()}
           </td>
           <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
            <button
             onClick={() => handleViewDetail(transaction)}
             className="text-blue-600 hover:text-blue-900 mr-3">
             <FiEye size={18} />
            </button>
            {transaction.proofOfPayment && (
             <a
              href={transaction.proofOfPayment}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900">
              <FiDownload size={18} />
             </a>
            )}
           </td>
          </motion.tr>
         ))}
        </tbody>
       </table>
      </div>
     </div>
    )}
   </motion.div>

   {isDetailOpen && selectedTransaction && (
    <TransactionDetail
     transaction={selectedTransaction}
     onClose={() => setIsDetailOpen(false)}
     onRefresh={onRefresh}
    />
   )}
  </>
 );
};

export default TransactionList;
