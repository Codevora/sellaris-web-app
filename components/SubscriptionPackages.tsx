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
 return (
  <section className="py-16 bg-gray-50">
   <div className="container mx-auto px-6">
    <div className="text-center mb-16">
     <h1 className="text-4xl font-bold text-gray-900 mb-4">
      Pilihan Paket Langganan
     </h1>
     <p className="text-xl text-gray-600 max-w-2xl mx-auto">
      Temukan paket yang tepat untuk kebutuhan bisnis Anda dengan fitur yang
      lengkap dan harga yang kompetitif
     </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
     {packages.map((pkg, index) => (
      <motion.div
       key={pkg.id}
       initial={{opacity: 0, y: 50}}
       whileInView={{opacity: 1, y: 0}}
       transition={{duration: 0.5, delay: index * 0.1}}
       viewport={{once: true}}
       whileHover={{y: -10}}
       className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
        pkg.isFeatured
         ? "shadow-xl border-0 transform scale-105 z-10"
         : "shadow-lg border border-gray-200"
       }`}>
       {pkg.isFeatured && (
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-blue-600"></div>
       )}

       <div
        className={`${
         pkg.isFeatured ? "bg-white" : "bg-white"
        } h-full flex flex-col`}>
        <div className="p-8">
         <div className="flex justify-between items-start mb-4">
          <h3
           className={`text-2xl font-bold ${
            pkg.isFeatured ? "text-blue-600" : "text-gray-800"
           }`}>
           {pkg.name}
          </h3>
          {pkg.isFeatured && (
           <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full flex items-center">
            <FiStar className="mr-1" /> Rekomendasi
           </span>
          )}
         </div>

         <p className="text-gray-600 mb-6">{pkg.description}</p>

         <div className="mb-8">
          <div className="text-4xl font-bold text-gray-900 mb-1">
           {formatRupiah(pkg.price)}
          </div>
          <div className="text-gray-500">{pkg.duration} tahun</div>
         </div>

         <motion.button
          whileHover={{scale: 1.03}}
          whileTap={{scale: 0.98}}
          className={`w-full py-3 px-6 rounded-lg font-medium ${
           pkg.isFeatured
            ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
            : "bg-gray-900 hover:bg-gray-800 text-white"
          } shadow-md transition-all duration-300`}
          onClick={() => onSelect && onSelect(pkg)}>
          Pilih Paket
         </motion.button>
        </div>

        <div className="border-t border-gray-200 p-8 bg-gray-50 flex-1">
         <h4 className="text-lg font-semibold text-gray-800 mb-4">
          Fitur Unggulan:
         </h4>
         <ul className="space-y-3">
          {pkg.features.map((feature, i) => (
           <li
            key={i}
            className="flex items-start">
            <div
             className={`flex-shrink-0 mt-1 mr-3 ${
              pkg.isFeatured ? "text-blue-500" : "text-gray-600"
             }`}>
             <FiCheck className="w-5 h-5" />
            </div>
            <span className="text-gray-700">{feature}</span>
           </li>
          ))}
         </ul>
        </div>
       </div>
      </motion.div>
     ))}
    </div>

    <div className="mt-12 text-center text-gray-500 text-sm">
     *Harga sudah termasuk PPN dan dapat berubah sewaktu-waktu
    </div>
   </div>
  </section>
 );
};

export default SubscriptionPackages;
