// components/SubscriptionPackages.tsx
"use client";

import {motion} from "framer-motion";
import {FiCheck, FiStar} from "react-icons/fi";
import {Package} from "@/types/package";
import {formatRupiah} from "@/lib/utils/formatCurrency";
import {FaArrowRightLong} from "react-icons/fa6";

interface SubscriptionPackagesProps {
 packages: Package[];
 onSelect?: (pkg: Package) => void;
}

const SubscriptionPackages = ({
 packages,
 onSelect,
}: SubscriptionPackagesProps) => {
 return (
  <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
   {/* Floating background elements */}
   <div className="absolute inset-0 overflow-hidden">
    <motion.div
     animate={{
      x: [0, 100, 0],
      y: [0, 50, 0],
      transition: {duration: 20, repeat: Infinity, ease: "linear"},
     }}
     className="absolute top-1/4 left-1/4 w-40 h-40 rounded-full bg-teal-500/10 blur-xl"
    />
    <motion.div
     animate={{
      x: [0, -80, 0],
      y: [0, -60, 0],
      transition: {duration: 25, repeat: Infinity, ease: "linear"},
     }}
     className="absolute bottom-1/4 right-1/3 w-48 h-48 rounded-full bg-blue-500/10 blur-xl"
    />
   </div>

   <div className="container mx-auto px-6 relative z-10">
    <div className="text-center mb-16">
     <motion.h1
      initial={{opacity: 0, y: 20}}
      whileInView={{opacity: 1, y: 0}}
      transition={{duration: 0.6}}
      viewport={{once: true}}
      className="text-4xl font-bold text-gray-900 mb-4">
      Pilihan Paket Langganan
     </motion.h1>
     <motion.p
      initial={{opacity: 0, y: 20}}
      whileInView={{opacity: 1, y: 0}}
      transition={{duration: 0.6, delay: 0.2}}
      viewport={{once: true}}
      className="text-xl text-gray-600 max-w-2xl mx-auto">
      Temukan paket yang tepat untuk kebutuhan bisnis Anda dengan fitur yang
      lengkap dan harga yang kompetitif
     </motion.p>
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
         ? "shadow-xl border-0 transform scale-[1.02] z-10"
         : "shadow-lg border border-gray-200"
       }`}>
       {pkg.isFeatured && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-blue-500"></div>
       )}

       <div
        className={`${
         pkg.isFeatured ? "bg-white" : "bg-white"
        } h-full flex flex-col`}>
        <div className="p-8">
         <div className="flex justify-between items-start mb-4">
          <h3
           className={`text-2xl font-bold ${
            pkg.isFeatured ? "text-teal-600" : "text-gray-800"
           }`}>
           {pkg.name}
          </h3>
          {pkg.isFeatured && (
           <motion.span
            animate={{scale: [1, 1.05, 1]}}
            transition={{duration: 2, repeat: Infinity}}
            className="bg-gradient-to-r from-teal-100 to-blue-100 text-teal-800 text-xs font-semibold px-3 py-1 rounded-full flex items-center">
            <FiStar className="mr-1" /> Rekomendasi
           </motion.span>
          )}
         </div>

         <p className="text-gray-600 mb-6">{pkg.description}</p>

         <div className="mb-8">
          <div className="text-4xl font-bold text-gray-900 mb-1">
           {formatRupiah(pkg.price)}
           <span className="text-lg font-normal text-gray-500">/tahun</span>
          </div>
          <div className="text-gray-500">{pkg.duration} tahun</div>
         </div>

         <motion.button
          whileHover={{scale: 1.03}}
          whileTap={{scale: 0.98}}
          className={`w-full py-3 px-6 rounded-lg font-medium ${
           pkg.isFeatured
            ? "bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white"
            : "bg-gray-900 hover:bg-gray-800 text-white"
          } shadow-md transition-all duration-300 flex items-center justify-center gap-2`}
          onClick={() => onSelect && onSelect(pkg)}>
          Pilih Paket
          <FaArrowRightLong className="text-sm" />
         </motion.button>
        </div>

        <div className="border-t border-gray-200 p-8 bg-gray-50 flex-1">
         <h4 className="text-lg font-semibold text-gray-800 mb-4">
          Fitur Unggulan:
         </h4>
         <ul className="space-y-3">
          {pkg.features.map((feature, i) => (
           <motion.li
            key={i}
            initial={{opacity: 0, x: -10}}
            whileInView={{opacity: 1, x: 0}}
            transition={{duration: 0.3, delay: i * 0.05}}
            viewport={{once: true}}
            className="flex items-start">
            <div
             className={`flex-shrink-0 mt-1 mr-3 ${
              pkg.isFeatured ? "text-teal-500" : "text-gray-600"
             }`}>
             <FiCheck className="w-5 h-5" />
            </div>
            <span className="text-gray-700">{feature}</span>
           </motion.li>
          ))}
         </ul>
        </div>
       </div>

       {/* Floating decoration for featured package */}
       {pkg.isFeatured && (
        <>
         <motion.div
          animate={{rotate: 360}}
          transition={{duration: 20, repeat: Infinity, ease: "linear"}}
          className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-teal-500/10"
         />
         <motion.div
          animate={{rotate: -360}}
          transition={{duration: 25, repeat: Infinity, ease: "linear"}}
          className="absolute -bottom-8 -left-8 w-16 h-16 rounded-full bg-blue-500/10"
         />
        </>
       )}
      </motion.div>
     ))}
    </div>

    <motion.div
     initial={{opacity: 0}}
     whileInView={{opacity: 1}}
     transition={{delay: 0.4}}
     viewport={{once: true}}
     className="mt-12 text-center text-gray-500 text-sm">
     *Harga sudah termasuk PPN dan dapat berubah sewaktu-waktu
    </motion.div>
   </div>
  </section>
 );
};

export default SubscriptionPackages;
