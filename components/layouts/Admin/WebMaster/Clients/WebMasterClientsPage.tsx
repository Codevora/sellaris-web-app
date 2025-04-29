"use client";
import {motion} from "framer-motion";
import {FiUsers} from "react-icons/fi";
import WebMasterClientTable from ".//WebMasterClientTable";
import WebMasterClientStats from "./WebMasterClientStats";

export default function WebMasterClientsPage() {
 const containerVariants = {
  hidden: {opacity: 0},
  visible: {
   opacity: 1,
   transition: {
    staggerChildren: 0.1,
   },
  },
 };

 const itemVariants = {
  hidden: {y: 20, opacity: 0},
  visible: {
   y: 0,
   opacity: 1,
   transition: {
    duration: 0.5,
   },
  },
 };

 return (
  <motion.div
   initial="hidden"
   animate="visible"
   variants={containerVariants}
   className="p-6">
   <div className="flex justify-between items-center mb-8">
    <motion.h1
     variants={itemVariants}
     className="text-3xl font-bold flex items-center gap-2">
     <FiUsers className="text-blue-500" /> Client Management
    </motion.h1>
   </div>

   <motion.div
    variants={itemVariants}
    className="mb-8">
    <WebMasterClientStats />
    <WebMasterClientTable />
   </motion.div>
  </motion.div>
 );
}
