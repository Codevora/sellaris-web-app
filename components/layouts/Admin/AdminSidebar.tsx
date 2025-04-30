"use client";
import {signOut} from "next-auth/react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {motion, AnimatePresence} from "framer-motion";
import {
 FaUser,
 FaSignOutAlt,
 FaBox,
 FaMoneyBillWave,
 FaCog,
 FaUtensils,
 FaCut,
 FaUsers,
 FaClipboardList,
 FaWarehouse,
 FaTags,
} from "react-icons/fa";
import {IoIosArrowDropright} from "react-icons/io";
import {MdDashboard, MdPointOfSale} from "react-icons/md";
import {useState} from "react";

interface AdminSidebarProps {
 isMobile: boolean;
 sidebarOpen: boolean;
 setSidebarOpen: (open: boolean) => void;
}

const adminLinks = [
 {name: "Dashboard", path: "/admin/dashboard", icon: <MdDashboard />},
 {
  name: "Transaksi",
  path: "/admin/dashboard/transactions",
  icon: <MdPointOfSale />,
  subItems: [
   {name: "Kasir", path: "/admin/dashboard/transactions/pos"},
   {name: "Riwayat Transaksi", path: "/admin/dashboard/transactions/history"},
   {name: "Pengembalian", path: "/admin/dashboard/transactions/returns"},
  ],
 },
 {
  name: "Produk & Layanan",
  path: "/admin/dashboard/products-services",
  icon: <FaBox />,
  subItems: [
   {name: "Semua Produk", path: "/admin/dashboard/products-services/products"},
   {
    name: "Kategori Produk",
    path: "/admin/dashboard/products-services/categories",
   },
   {name: "Layanan/Jasa", path: "/admin/dashboard/products-services/services"},
   {
    name: "Paket/Layanan Bundling",
    path: "/admin/dashboard/products-services/bundles",
   },
   {
    name: "Menu (F&B)",
    path: "/admin/dashboard/products-services/menu",
    icon: <FaUtensils />,
   },
   {
    name: "Layanan Barbershop",
    path: "/admin/dashboard/products-services/barber-services",
    icon: <FaCut />,
   },
  ],
 },
 {
  name: "Inventori",
  path: "/admin/dashboard/inventory",
  icon: <FaWarehouse />,
  subItems: [
   {name: "Stok Barang", path: "/admin/dashboard/inventory/stock"},
   {name: "Manajemen Gudang", path: "/admin/dashboard/inventory/warehouse"},
   {name: "Pembelian", path: "/admin/dashboard/inventory/purchasing"},
   {name: "Transfer Stok", path: "/admin/dashboard/inventory/transfers"},
   {name: "Bahan Baku (F&B)", path: "/admin/dashboard/inventory/ingredients"},
  ],
 },
 {
  name: "Pelanggan",
  path: "/admin/dashboard/customers",
  icon: <FaUsers />,
  subItems: [
   {name: "Data Pelanggan", path: "/admin/dashboard/customers/list"},
   {name: "Membership", path: "/admin/dashboard/customers/membership"},
   {name: "Riwayat Transaksi", path: "/admin/dashboard/customers/history"},
   {name: "Reservasi", path: "/admin/dashboard/customers/reservations"},
   {name: "Antrian (Barbershop)", path: "/admin/dashboard/customers/queue"},
  ],
 },
 {
  name: "Karyawan",
  path: "/admin/dashboard/employees",
  icon: <FaUser />,
  subItems: [
   {name: "Data Karyawan", path: "/admin/dashboard/employees/list"},
   {name: "Shift Kerja", path: "/admin/dashboard/employees/shifts"},
   {name: "Komisi", path: "/admin/employees/dashboard/commissions"},
   {name: "Akses Sistem", path: "/admin/dashboard/employees/access"},
   {name: "Teknisi (Jasa)", path: "/admin/dashboard/employees/technicians"},
  ],
 },
 {
  name: "Promosi",
  path: "/admin/dashboard/promotions",
  icon: <FaTags />,
  subItems: [
   {name: "Diskon", path: "/admin/dashboard/promotions/discounts"},
   {name: "Voucher", path: "/admin/dashboard/promotions/vouchers"},
   {name: "Paket Promo", path: "/admin/dashboard/promotions/bundles"},
   {name: "Loyalty Program", path: "/admin/dashboard/promotions/loyalty"},
  ],
 },
 {
  name: "Laporan",
  path: "/admin/dashboard/reports",
  icon: <FaClipboardList />,
  subItems: [
   {name: "Penjualan", path: "/admin/dashboard/reports/sales"},
   {name: "Laba Rugi", path: "/admin/dashboard/reports/profit-loss"},
   {name: "Stok", path: "/admin/dashboard/reports/inventory"},
   {name: "Kasir", path: "/admin/dashboard/reports/cashier"},
   {name: "Analisis Produk", path: "/admin/dashboard/reports/product-analysis"},
   {name: "Laporan Pajak", path: "/admin/dashboard/reports/tax"},
  ],
 },
 {
  name: "Keuangan",
  path: "/admin/dashboard/finance",
  icon: <FaMoneyBillWave />,
  subItems: [
   {name: "Kas/Bank", path: "/admin/dashboard/finance/cash"},
   {name: "Pengeluaran", path: "/admin/dashboard/finance/expenses"},
   {name: "Hutang/Piutang", path: "/admin/dashboard/finance/debts"},
   {name: "Rekonsiliasi", path: "/admin/dashboard/finance/reconciliation"},
  ],
 },
 {
  name: "Pengaturan",
  path: "/admin/dashboard/settings",
  icon: <FaCog />,
  subItems: [
   {name: "Pengaturan Akun", path: "/admin/dashboard/settings/account"},
   {name: "Toko/Outlet", path: "/admin/dashboard/settings/store"},
   {name: "Printer", path: "/admin/dashboard/settings/printers"},
   {name: "Perangkat", path: "/admin/dashboard/settings/devices"},
   {name: "Integrasi Pembayaran", path: "/admin/dashboard/settings/payments"},
   {name: "Pajak", path: "/admin/dashboard/settings/tax"},
   {name: "Template Nota", path: "/admin/dashboard/settings/receipt-templates"},
  ],
 },
];

export default function AdminSidebar({
 isMobile,
 sidebarOpen,
 setSidebarOpen,
}: AdminSidebarProps) {
 const pathname = usePathname();
 const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
  {}
 );

 const toggleItemExpand = (path: string) => {
  setExpandedItems((prev) => {
   // Hanya membuka satu submenu dalam satu waktu
   const newState = Object.keys(prev).reduce((acc, key) => {
    acc[key] = false;
    return acc;
   }, {} as Record<string, boolean>);

   return {
    ...newState,
    [path]: !prev[path],
   };
  });
 };

 const isActive = (path: string, exact: boolean = false) => {
  if (exact) {
   return pathname === path;
  }
  return (
   pathname.startsWith(path) &&
   (path === "/admin" ? pathname === "/admin" : true)
  );
 };

 const handleLinkClick = (path: string, hasSubItems: boolean) => {
  if (isMobile && !hasSubItems) {
   setSidebarOpen(false);
  }
 };

 return (
  <>
   <AnimatePresence>
    {(sidebarOpen || !isMobile) && (
     <motion.div
      initial={isMobile ? {x: -280} : {x: 0}}
      animate={isMobile ? {x: sidebarOpen ? 0 : -280} : {x: 0}}
      exit={{x: -280}}
      transition={{type: "spring", stiffness: 300, damping: 30}}
      className={`fixed left-0 top-0 h-full w-[280px] bg-gradient-to-br from-teal-600 to-teal-700 text-white p-5 flex flex-col rounded-r-xl shadow-xl z-40 ${
       isMobile && !sidebarOpen ? "hidden" : ""
      }`}>
      {/* Main content container with scroll */}
      <div className="flex flex-col w-full h-full">
       {/* Scrollable menu area */}
       <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-600">
        <Link
         href="/"
         onClick={() => isMobile && setSidebarOpen(false)}>
         <h1
          className="text-3xl font-bold mb-8 italic text-white text-center"
          style={{fontFamily: "'Raleway', sans-serif"}}>
          SELLARIS
         </h1>
        </Link>

        <ul className="flex flex-col gap-2 w-full">
         {adminLinks.map((link) => (
          <li
           key={link.path}
           className="overflow-visible">
           <div className="flex flex-col">
            <Link
             href={link.path}
             className={`flex items-center gap-3 p-3 rounded-lg hover:bg-teal-700/50 transition-all ${
              isActive(link.path, link.path === "/admin")
               ? "bg-teal-700 font-medium"
               : ""
             }`}
             onClick={(e) => {
              if (link.subItems) {
               e.preventDefault();
               toggleItemExpand(link.path);
              }
              handleLinkClick(link.path, !!link.subItems);
             }}>
             <span className="text-xl min-w-[24px] flex justify-center">
              {link.icon}
             </span>
             <span className="flex-1 text-left">{link.name}</span>
             {link.subItems && (
              <motion.span
               animate={{
                rotate: expandedItems[link.path] ? 90 : 0,
               }}>
               <IoIosArrowDropright />
              </motion.span>
             )}
            </Link>

            {link.subItems && expandedItems[link.path] && (
             <motion.ul
              initial={{opacity: 0, height: 0}}
              animate={{opacity: 1, height: "auto"}}
              exit={{opacity: 0, height: 0}}
              className="ml-8 pl-3 border-l-2 border-blue-400/30">
              {link.subItems.map((subItem) => (
               <li
                key={subItem.path}
                className="py-1.5">
                <Link
                 href={subItem.path}
                 className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded hover:bg-teal-700/30 ${
                  pathname === subItem.path
                   ? "text-white font-medium"
                   : "text-white"
                 }`}
                 onClick={() => handleLinkClick(subItem.path, false)}>
                 <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                 {subItem.name}
                </Link>
               </li>
              ))}
             </motion.ul>
            )}
           </div>
          </li>
         ))}
        </ul>
       </div>

       {/* Fixed footer */}
       <div className="w-full pt-4 pb-2">
        <motion.button
         onClick={() => signOut()}
         className="flex items-center gap-3 bg-teal-800 hover:bg-teal-600 text-white w-full py-2.5 px-4 rounded-lg cursor-pointer transition-colors"
         whileHover={{scale: 1.02}}
         whileTap={{scale: 0.98}}>
         <FaSignOutAlt />
         <span>Keluar</span>
        </motion.button>
       </div>
      </div>
     </motion.div>
    )}
   </AnimatePresence>

   {/* Overlay for mobile */}
   {isMobile && sidebarOpen && (
    <div
     className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
     onClick={() => setSidebarOpen(false)}
    />
   )}
  </>
 );
}
