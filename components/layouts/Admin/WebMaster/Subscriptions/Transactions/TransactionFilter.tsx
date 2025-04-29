"use client";

import {motion} from "framer-motion";
import {FiX, FiFilter} from "react-icons/fi";

interface TransactionFilterProps {
 filters: {
  status: string;
  dateFrom: string;
  dateTo: string;
  packageId: string;
 };
 onFilterChange: (name: string, value: string) => void;
 onReset: () => void;
 onClose: () => void;
}

const TransactionFilter = ({
 filters,
 onFilterChange,
 onReset,
 onClose,
}: TransactionFilterProps) => {
 return (
  <motion.div
   initial={{opacity: 0}}
   animate={{opacity: 1}}
   exit={{opacity: 0}}
   className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
   <motion.div
    initial={{scale: 0.9, y: 20}}
    animate={{scale: 1, y: 0}}
    className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
    <div className="p-6">
     <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
       <FiFilter /> Filter Transactions
      </h2>
      <button
       onClick={onClose}
       className="text-gray-500 hover:text-gray-700">
       <FiX size={24} />
      </button>
     </div>

     <div className="space-y-4">
      <div>
       <label className="block text-sm font-medium text-gray-700 mb-1">
        Status
       </label>
       <select
        value={filters.status}
        onChange={(e) => onFilterChange("status", e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="success">Success</option>
        <option value="failed">Failed</option>
       </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
       <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
         From Date
        </label>
        <input
         type="date"
         value={filters.dateFrom}
         onChange={(e) => onFilterChange("dateFrom", e.target.value)}
         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
       </div>
       <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
         To Date
        </label>
        <input
         type="date"
         value={filters.dateTo}
         onChange={(e) => onFilterChange("dateTo", e.target.value)}
         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
       </div>
      </div>

      <div>
       <label className="block text-sm font-medium text-gray-700 mb-1">
        Package ID
       </label>
       <input
        type="text"
        value={filters.packageId}
        onChange={(e) => onFilterChange("packageId", e.target.value)}
        placeholder="Enter package ID"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
       />
      </div>
     </div>

     <div className="mt-6 flex justify-end gap-3">
      <motion.button
       whileHover={{scale: 1.05}}
       whileTap={{scale: 0.95}}
       type="button"
       onClick={onReset}
       className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
       Reset Filters
      </motion.button>
      <motion.button
       whileHover={{scale: 1.05}}
       whileTap={{scale: 0.95}}
       type="button"
       onClick={onClose}
       className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
       Apply Filters
      </motion.button>
     </div>
    </div>
   </motion.div>
  </motion.div>
 );
};

export default TransactionFilter;
