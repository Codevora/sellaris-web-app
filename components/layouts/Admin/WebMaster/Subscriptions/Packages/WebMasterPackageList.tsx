import {motion} from "framer-motion";
import {FiEdit2, FiTrash2, FiStar, FiCheck} from "react-icons/fi";
import {Package} from "@/types/package";
import {formatRupiah} from "@/lib/utils/formatCurrency";
import {useEffect, useState} from "react";

interface WebMasterPackageListProps {
 packages: Package[];
 onEdit: (pkg: Package) => void;
 onDelete: (id: string) => void;
}

const WebMasterPackageList = ({
 packages,
 onEdit,
 onDelete,
}: WebMasterPackageListProps) => {
 if (packages.length === 0) {
  return (
   <motion.div
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    className="bg-white rounded-lg shadow p-6 text-center">
    <p className="text-gray-500">No packages found. Add your first package!</p>
   </motion.div>
  );
 }

 return (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
   {packages.map((pkg, index) => (
    <motion.div
     key={pkg.id}
     initial={{opacity: 0, y: 20}}
     animate={{opacity: 1, y: 0}}
     transition={{delay: index * 0.1}}
     className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
     <div className={`p-6 ${pkg.isFeatured ? "bg-blue-50" : "bg-white"}`}>
      <div className="flex justify-between items-start">
       <h3 className="text-xl font-semibold text-gray-800">{pkg.name}</h3>
       {pkg.isFeatured && (
        <span className="text-xs px-2 py-1 rounded-full flex items-center gap-1 bg-blue-100 text-blue-800">
         <FiStar size={12} /> Featured
        </span>
       )}
      </div>

      <div className="my-4">
       <p className="text-3xl font-bold text-gray-800">
        {formatRupiah(pkg.price)}
        <span className="text-sm font-normal text-gray-500">
         /{pkg.duration} tahun
        </span>
       </p>
       <p className="mt-2 text-gray-600">{pkg.description}</p>
      </div>

      <ul className="mb-6 space-y-2">
       {pkg.features.map((feature, i) => (
        <li
         key={i}
         className="flex items-center gap-2">
         <FiCheck className="text-blue-500" />
         <span className="text-gray-700">{feature}</span>
        </li>
       ))}
      </ul>

      <div className="flex gap-2 mt-4">
       <button
        onClick={() => onEdit(pkg)}
        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg flex items-center justify-center gap-2">
        <FiEdit2 /> Edit
       </button>
       <button
        onClick={() => pkg.id && onDelete(pkg.id)}
        className="flex-1 bg-red-100 hover:bg-red-200 text-red-800 py-2 px-4 rounded-lg flex items-center justify-center gap-2">
        <FiTrash2 /> Delete
       </button>
      </div>
     </div>
    </motion.div>
   ))}
  </div>
 );
};

export default WebMasterPackageList;
