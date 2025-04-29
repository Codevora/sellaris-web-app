"use client";

import {useState} from "react";
import {motion} from "framer-motion";
import {FiRefreshCw, FiFilter, FiSearch} from "react-icons/fi";
import {useTransactions} from "@/hooks/useTransactions";
import TransactionList from "./TransactionList";
import TransactionFilter from "./TransactionFilter";
import {formatRupiah} from "@/lib/utils/formatCurrency";
import { useTransactionStats } from "@/hooks/useTransactionStats";

const TransactionPanel = () => {
 const [isFilterOpen, setIsFilterOpen] = useState(false);
 const [searchQuery, setSearchQuery] = useState("");
 const [filters, setFilters] = useState({
  status: "",
  dateFrom: "",
  dateTo: "",
  packageId: "",
 });

 // Fetch data
 const {transactions, loading, error, refresh} = useTransactions();
 const {stats} = useTransactionStats();

 // Filter transactions
 const filteredTransactions = transactions.filter((t) => {
  if (filters.status && t.status !== filters.status) return false;
  if (searchQuery) {
   const query = searchQuery.toLowerCase();
   if (
    !t.userName.toLowerCase().includes(query) &&
    !t.packageName.toLowerCase().includes(query)
   ) {
    return false;
   }
  }
  return true;
 });

 const handleFilterChange = (name: string, value: string) => {
  setFilters((prev) => ({...prev, [name]: value}));
 };

 const resetFilters = () => {
  setFilters({
   status: "",
   dateFrom: "",
   dateTo: "",
   packageId: "",
  });
  setSearchQuery("");
 };

 return (
  <div className="container mx-auto p-4">
   <motion.div
    initial={{opacity: 0, y: 20}}
    animate={{opacity: 1, y: 0}}
    transition={{duration: 0.5}}
    className="mb-8">
    <div className="flex justify-between items-center mb-6">
     <h1 className="text-3xl font-bold text-gray-800">
      Subscription Transactions
     </h1>
     <div className="flex gap-3">
      <motion.button
       whileHover={{scale: 1.05}}
       whileTap={{scale: 0.95}}
       onClick={() => setIsFilterOpen(true)}
       className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2">
       <FiFilter /> Filters
      </motion.button>
      <motion.button
       whileHover={{scale: 1.05}}
       whileTap={{scale: 0.95}}
       onClick={refresh}
       className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
       <FiRefreshCw /> Refresh
      </motion.button>
     </div>
    </div>

    {/* Search Bar */}
    <div className="relative mb-6">
     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <FiSearch className="text-gray-400" />
     </div>
     <input
      type="text"
      placeholder="Search by user or package..."
      className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
     />
    </div>

    {/* Statistics Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
     <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
      <div className="flex justify-between items-start">
       <div>
        <p className="text-sm opacity-80">Total Revenue</p>
        <p className="text-2xl font-bold mt-1">
         {stats ? formatRupiah(stats.totalRevenue) : "Loading..."}
        </p>
       </div>
      </div>
     </div>

     <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
      <div className="flex justify-between items-start">
       <div>
        <p className="text-sm opacity-80">Active Subscribers</p>
        <p className="text-2xl font-bold mt-1">
         {stats ? stats.activeSubscribers : "Loading..."}
        </p>
       </div>
      </div>
     </div>

     <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
      <div className="flex justify-between items-start">
       <div>
        <p className="text-sm opacity-80">Most Popular Package</p>
        <p className="text-2xl font-bold mt-1 truncate">
         {stats ? stats.popularPackage.name : "Loading..."}
        </p>
       </div>
      </div>
     </div>
    </div>

    {/* Transaction List */}
    {loading ? (
     <div className="flex justify-center items-center h-64">
      <motion.div
       animate={{rotate: 360}}
       transition={{repeat: Infinity, duration: 1, ease: "linear"}}
       className="rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
      />
     </div>
    ) : error ? (
     <div className="bg-white rounded-lg shadow p-6 text-center text-red-500">
      {error}
     </div>
    ) : (
     <TransactionList
      transactions={filteredTransactions}
      onRefresh={refresh}
     />
    )}
   </motion.div>

   {/* Filter Modal */}
   {isFilterOpen && (
    <TransactionFilter
     filters={filters}
     onFilterChange={handleFilterChange}
     onReset={resetFilters}
     onClose={() => setIsFilterOpen(false)}
    />
   )}
  </div>
 );
};

export default TransactionPanel;
