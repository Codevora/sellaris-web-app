"use client";

import {useState, useEffect} from "react";
import {motion} from "framer-motion";
import {FiPlus} from "react-icons/fi";
import {getPackages, deletePackage} from "@/lib/firebase/packageService";
import {Package} from "@/types/package";
import WebMasterPackageForm from "./WebMasterPackageForm";
import WebMasterPackageList from "./WebMasterPackageList";

const WebMasterPackagePanel = () => {
 const [packages, setPackages] = useState<Package[]>([]);
 const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
 const [isFormOpen, setIsFormOpen] = useState(false);
 const [isLoading, setIsLoading] = useState(true);

 useEffect(() => {
  fetchPackages();
 }, []);

 const fetchPackages = async () => {
  setIsLoading(true);
  try {
   const packagesData = await getPackages();
   setPackages(packagesData);
  } catch (error) {
   console.error("Error fetching packages:", error);
  } finally {
   setIsLoading(false);
  }
 };

 const handleAddPackage = () => {
  setSelectedPackage(null);
  setIsFormOpen(true);
 };

 const handleEditPackage = (pkg: Package) => {
  setSelectedPackage(pkg);
  setIsFormOpen(true);
 };

 const handleDeletePackage = async (id: string) => {
  if (confirm("Are you sure you want to delete this package?")) {
   try {
    await deletePackage(id);
    fetchPackages();
   } catch (error) {
    console.error("Error deleting package:", error);
   }
  }
 };

 const handleFormSubmit = () => {
  setIsFormOpen(false);
  fetchPackages();
 };

 return (
  <div className="container mx-auto     ">
   <motion.div
    initial={{opacity: 0, y: 20}}
    animate={{opacity: 1, y: 0}}
    transition={{duration: 0.5}}
    className="mb-8">
    <div className="flex justify-between items-center mb-6">
     <h1 className="text-3xl font-bold text-gray-800">Subscription Packages</h1>
     <motion.button
      whileHover={{scale: 1.05}}
      whileTap={{scale: 0.95}}
      onClick={handleAddPackage}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
      <FiPlus /> Add Package
     </motion.button>
    </div>

    {isLoading ? (
     <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
     </div>
    ) : (
     <WebMasterPackageList
      packages={packages}
      onEdit={handleEditPackage}
      onDelete={handleDeletePackage}
     />
    )}
   </motion.div>

   {isFormOpen && (
    <WebMasterPackageForm
     pkg={selectedPackage}
     onClose={() => setIsFormOpen(false)}
     onSubmit={handleFormSubmit}
    />
   )}
  </div>
 );
};

export default WebMasterPackagePanel;
