// components/layouts/Admin/Packages/PackageList.tsx
import {motion} from "framer-motion";
import {FiEdit2, FiTrash2, FiStar, FiCheck} from "react-icons/fi";
import {Package} from "@/types/package";
import {formatRupiah} from "@/lib/utils/formatCurrency";
import {useEffect, useState} from "react";

// Default color scheme for packages that don't have one
const DEFAULT_COLOR_SCHEME = {
 primary: "#3b82f6", // blue-500
 secondary: "#bfdbfe", // blue-200
 text: "#1e3a8a", // blue-900
};

interface WebMasterPackageListProps {
 packages: Package[];
 onEdit: (pkg: Package) => void;
 onDelete: (id: string) => void;
}

const WebMasterPackageList = ({onEdit, onDelete}: WebMasterPackageListProps) => {
 const [packages, setPackages] = useState<Package[]>([]);
 const [_isLoading, setIsLoading] = useState(true);

 useEffect(() => {
  const fetchPackages = async () => {
   try {
    const response = await fetch("/api/packages");
    if (!response.ok) throw new Error("Failed to fetch packages");
    const data = await response.json();
    setPackages(data);
   } catch (error) {
    console.error("Error:", error);
   } finally {
    setIsLoading(false);
   }
  };

  fetchPackages();
 }, []);
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
   {packages.map((pkg, index) => {
    const colorScheme = pkg.colorScheme || DEFAULT_COLOR_SCHEME;

    return (
     <motion.div
      key={pkg.id}
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      transition={{delay: index * 0.1}}
      className="bg-white rounded-xl shadow-md overflow-hidden"
      style={{
       borderLeft: `4px solid ${colorScheme.primary}`,
       backgroundColor: pkg.isFeatured
        ? `${colorScheme.secondary}40` // Add opacity to secondary color
        : "white",
      }}>
      <div className="p-6">
       <div className="flex justify-between items-start">
        <h3
         className="text-xl font-semibold"
         style={{color: colorScheme.text}}>
         {pkg.name}
        </h3>
        {pkg.isFeatured && (
         <span
          className="text-xs px-2 py-1 rounded-full flex items-center gap-1"
          style={{
           backgroundColor: `${colorScheme.primary}20`,
           color: colorScheme.text,
          }}>
          <FiStar size={12} /> Featured
         </span>
        )}
       </div>

       <div className="my-4">
        <p
         className="text-3xl font-bold"
         style={{color: colorScheme.text}}>
         {formatRupiah(pkg.price)}
         <span
          className="text-sm font-normal"
          style={{color: `${colorScheme.text}aa`}}>
          /{pkg.duration} tahun
         </span>
        </p>
        <p
         className="mt-2"
         style={{color: `${colorScheme.text}cc`}}>
         {pkg.description}
        </p>
       </div>

       <ul className="mb-6 space-y-2">
        {pkg.features.map((feature, i) => (
         <li
          key={i}
          className="flex items-center gap-2">
          <span style={{color: colorScheme.primary}}>
           <FiCheck />
          </span>
          <span style={{color: colorScheme.text}}>{feature}</span>
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
    );
   })}
  </div>
 );
};

export default WebMasterPackageList;
