"use client";
import {signOut} from "next-auth/react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {motion} from "framer-motion";
import {
 FaUser,
 FaSignOutAlt,
 FaBoxes,
 FaMoneyBillWave,
 FaChartLine,
 FaServer,
 FaCog,
 FaWallet,
} from "react-icons/fa";
import {RiShieldKeyholeFill} from "react-icons/ri";
import {IoIosArrowDropright} from "react-icons/io";
import {MdDashboard} from "react-icons/md";
import {useState} from "react";

const webmasterLinks = [
 {name: "Dashboard", path: "/admin/webmaster", icon: <MdDashboard />},
 {
  name: "Subscriptions",
  path: "/admin/webmaster/subscriptions",
  icon: <FaMoneyBillWave />,
  subItems: [
   {name: "Packages", path: "/admin/webmaster/subscriptions/packages"},
   {name: "Transactions", path: "/admin/webmaster/subscriptions/transactions"},
  ],
 },
 {
  name: "Clients",
  path: "/admin/webmaster/clients",
  icon: <FaUser />,
  subItems: [
   {name: "All Clients", path: "/admin/webmaster/clients"},
   {name: "Client Tickets", path: "/admin/webmaster/clients/tickets"},
  ],
 },
 {
  name: "Resources",
  path: "/admin/webmaster/resources",
  icon: <FaBoxes />,
  subItems: [
   {name: "Server Allocation", path: "/admin/webmaster/resources/servers"},
   {name: "API Keys", path: "/admin/webmaster/resources/api"},
  ],
 },
 {
  name: "Analytics",
  path: "/admin/webmaster/analytics",
  icon: <FaChartLine />,
 },
 {
  name: "Payment Methods",
  path: "/admin/webmaster/payment-methods",
  icon: <FaWallet />,
 },
 {
  name: "System",
  path: "/admin/webmaster/system",
  icon: <FaServer />,
  subItems: [
   {name: "Logs", path: "/admin/webmaster/system/logs"},
   {name: "Maintenance", path: "/admin/webmaster/system/maintenance"},
  ],
 },
 {
  name: "Security",
  path: "/admin/webmaster/security",
  icon: <RiShieldKeyholeFill />,
 },
 {
  name: "Settings",
  path: "/admin/webmaster/settings",
  icon: <FaCog />,
 },
];

export default function WebMasterSidebar() {
 const pathname = usePathname();
 const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>(
  {}
 );

 const toggleItemExpand = (path: string) => {
  setExpandedItems((prev) => ({
   ...prev,
   [path]: !prev[path],
  }));
 };

 // Fungsi untuk mengecek apakah link aktif
 const isActive = (path: string, exact: boolean = false) => {
  if (exact) {
   return pathname === path;
  }
  return (
   pathname.startsWith(path) &&
   (path === "/admin/webmaster" ? pathname === "/admin/webmaster" : true)
  );
 };

 return (
  <div className="fixed left-0 top-0 h-full w-[280px] bg-gradient-to-b from-blue-900/90 to-blue-800/90 text-white p-5 flex flex-col rounded-r-xl shadow-xl z-50">
   {/* Main content container */}
   <div className="flex flex-col w-full h-full">
    {/* Header and menu items */}
    <div className="flex-1 overflow-y-auto">
     <Link href="/admin/webmaster">
      <h1
       className="text-3xl font-bold mb-8 italic text-white text-center"
       style={{fontFamily: "'Raleway', sans-serif"}}>
       SELLARIS
      </h1>
     </Link>

     <ul className="flex flex-col gap-2 w-full">
      {webmasterLinks.map((link) => (
       <li
        key={link.path}
        className="overflow-visible">
        <div className="flex flex-col">
         <Link
          href={link.path}
          className={`flex items-center gap-3 p-3 rounded-lg hover:bg-blue-700/50 transition-all ${
           isActive(link.path, link.path === "/admin/webmaster")
            ? "bg-blue-700/80 font-medium"
            : ""
          }`}
          onClick={(e) => {
           if (link.subItems) {
            e.preventDefault();
            toggleItemExpand(link.path);
           }
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
           className="ml-8 pl-3 border-l-2 border-blue-600/30">
           {link.subItems.map((subItem) => (
            <li
             key={subItem.path}
             className="py-1.5">
             <Link
              href={subItem.path}
              className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded hover:bg-blue-700/30 ${
               pathname === subItem.path
                ? "text-blue-200 font-medium"
                : "text-blue-100"
              }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
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

    {/* Footer with sign out button */}
    <div className="w-full pt-4 pb-2">
     <motion.button
      onClick={() => signOut()}
      className="flex items-center gap-3 bg-blue-700 hover:bg-blue-600 text-white w-full py-2.5 px-4 rounded-lg cursor-pointer transition-colors"
      whileHover={{scale: 1.02}}
      whileTap={{scale: 0.98}}>
      <FaSignOutAlt />
      <span>Sign Out</span>
     </motion.button>
    </div>
   </div>
  </div>
 );
}
