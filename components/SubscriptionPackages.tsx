// components/SubscriptionPackages.tsx
"use client";

import {motion} from "framer-motion";
import {FiCheck, FiStar} from "react-icons/fi";
import {Package} from "@/types/package";
import {formatRupiah} from "@/lib/utils/formatCurrency";

interface SubscriptionPackagesProps {
 packages: Package[];
 onSelect?: (pkg: Package) => void;
}

const SubscriptionPackages = ({
 packages,
 onSelect,
}: SubscriptionPackagesProps) => {
 const getPackageStyle = (isFeatured: boolean) => {
  return {
   border: isFeatured ? "border-blue-500" : "border-gray-300",
   bg: isFeatured ? "bg-blue-50" : "bg-white",
   text: isFeatured ? "text-blue-900" : "text-gray-800",
   button: isFeatured
    ? "bg-blue-600 hover:bg-blue-700"
    : "bg-gray-800 hover:bg-gray-900",
   selectedButton: isFeatured ? "bg-blue-800" : "bg-gray-900",
  };
 };

 return (
  <div className="py-12 px-4 sm:px-6 lg:px-8">
   <div className="max-w-7xl mx-auto">
    <div className="text-center">
     <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
      Choose Your Plan
     </h1>
     <p className="mt-4 text-xl text-gray-600">
      Select the package that fits your business needs
     </p>
    </div>

    <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
     {packages.map((pkg) => {
      const style = getPackageStyle(pkg.isFeatured);

      return (
       <motion.div
        key={pkg.id}
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.3}}
        whileHover={{scale: 1.03}}
        className={`relative rounded-lg border-2 p-8 shadow-sm transition-all duration-300 hover:shadow-md ${style.border} ${style.bg}`}
        style={{
         borderColor: pkg.colorScheme?.primary,
         backgroundColor: pkg.colorScheme?.secondary
          ? `${pkg.colorScheme.secondary}20`
          : style.bg,
        }}>
        {pkg.isFeatured && (
         <div className="absolute -top-3 -right-3 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center">
          <FiStar className="mr-1" /> Recommended
         </div>
        )}

        <div className="text-center">
         <h2
          className="text-2xl font-bold"
          style={{color: pkg.colorScheme?.text}}>
          {pkg.name}
         </h2>
         <p
          className="mt-2"
          style={{color: pkg.colorScheme?.text}}>
          {pkg.description}
         </p>
        </div>

        <div className="mt-8">
         <div className="text-center">
          <span
           className="text-4xl font-bold"
           style={{color: pkg.colorScheme?.text}}>
           {formatRupiah(pkg.price)}
          </span>
          <span
           className="text-lg font-medium"
           style={{color: pkg.colorScheme?.text}}>
           /{pkg.duration} tahun
          </span>
         </div>
        </div>

        <div className="mt-8">
         <h3
          className="text-lg font-medium"
          style={{color: pkg.colorScheme?.text}}>
          Features
         </h3>
         <ul className="mt-4 space-y-3">
          {pkg.features.map((feature) => (
           <li
            key={feature}
            className="flex items-start">
            <FiCheck
             className="h-6 w-6 flex-shrink-0"
             style={{color: pkg.colorScheme?.primary || "#3b82f6"}}
            />
            <span
             className="ml-3"
             style={{color: pkg.colorScheme?.text}}>
             {feature}
            </span>
           </li>
          ))}
         </ul>
        </div>

        <div className="mt-8">
         <motion.button
          whileHover={{scale: 1.03}}
          whileTap={{scale: 0.98}}
          className="w-full rounded-md py-3 px-4 text-center text-sm font-medium text-white"
          style={{
           backgroundColor: pkg.colorScheme?.primary || "#3b82f6",
          }}
          onClick={() => onSelect && onSelect(pkg)}>
          Select Plan
         </motion.button>
        </div>
       </motion.div>
      );
     })}
    </div>
   </div>
  </div>
 );
};

export default SubscriptionPackages;
