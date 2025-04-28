"use client";
import {signOut} from "next-auth/react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {motion, AnimatePresence} from "framer-motion";
import {FaUser, FaSignOutAlt} from "react-icons/fa";
import {FaCartShopping, FaChevronRight} from "react-icons/fa6";
import {GoGear} from "react-icons/go";
import {MdDashboard} from "react-icons/md";
import {IoIosArrowDropleft, IoIosArrowDropright} from "react-icons/io";
import {RiBankCardFill} from "react-icons/ri";

interface AdminSidebarProps {
 isCollapsed: boolean;
 setIsCollapsed: (isCollapsed: boolean) => void;
}

const links = [
 {name: "Dashboard", path: "/admin/dashboard", icon: <MdDashboard />},
 {
  name: "Packages",
  path: "/admin/dashboard/packages",
  icon: <FaCartShopping />,
 },
 {
  name: "User Management",
  path: "/admin/dashboard/user-management",
  icon: <FaUser />,
 },
 {
  name: "Payment Methods",
  path: "/admin/dashboard/payment-methods",
  icon: <RiBankCardFill />,
 },
 {name: "Settings", path: "/admin/dashboard/settings", icon: <GoGear />},
];

const sidebarVariants = {
 open: {
  width: 250,
  opacity: 1,
  transition: {type: "spring", stiffness: 300, damping: 30},
 },
 closed: {
  width: 80,
  opacity: 1,
  transition: {type: "spring", stiffness: 300, damping: 30},
 },
};

const linkVariants = {
 open: {opacity: 1, x: 0, transition: {delay: 0.1}},
 closed: {opacity: 0, x: -20},
};

const textVariants = {
 open: {opacity: 1, transition: {delay: 0.2}},
 closed: {opacity: 0},
};

export default function AdminSidebar({
 isCollapsed,
 setIsCollapsed,
}: AdminSidebarProps) {
 const pathname = usePathname();

 return (
  <motion.div
   className="fixed left-0 top-0 h-full bg-gradient-to-b from-primary/10 to-secondary/10 backdrop-blur-sm p-5 flex flex-col justify-between items-center rounded-r-[16px] shadow-lg border-r border-primary/20 overflow-visible"
   initial={false}
   animate={isCollapsed ? "closed" : "open"}
   variants={sidebarVariants}>
   <div className="flex flex-col w-full items-center overflow-visible">
    <Link href="/">
     <motion.h1
      className="text-3xl text-primary mb-10 font-bold italic"
      style={{fontFamily: "Raleway"}}
      animate={isCollapsed ? {scale: 0.8} : {scale: 1}}>
      {isCollapsed ? "..." : "SELLARIS"}
     </motion.h1>
    </Link>

    <ul className="flex flex-col gap-3 w-full overflow-visible">
     {links.map((link, index) => (
      <motion.li
       key={index}
       className="overflow-visible"
       whileHover={{scale: 1.05}}
       whileTap={{scale: 0.95}}
       variants={linkVariants}
       style={{transformOrigin: "left center"}} // This ensures scaling happens from the left
      >
       <Link
        href={link.path}
        className={`flex items-center gap-4 p-3 hover:bg-primary hover:text-white hover:text-secondary rounded-[12px] w-full transition-all duration-300 ${
         link.path === pathname
          ? "bg-primary text-white shadow-md"
          : "text-gray-700"
        }`}>
        <span className="text-xl min-w-[24px]">{link.icon}</span>
        <AnimatePresence>
         {!isCollapsed && (
          <motion.p
           className="whitespace-nowrap"
           variants={textVariants}
           initial="closed"
           animate="open"
           exit="closed">
           {link.name}
          </motion.p>
         )}
        </AnimatePresence>
        {link.path === pathname && !isCollapsed && (
         <motion.span
          className="ml-auto"
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{delay: 0.3}}>
          <FaChevronRight />
         </motion.span>
        )}
       </Link>
      </motion.li>
     ))}
    </ul>
   </div>

   <motion.button
    onClick={() => signOut()}
    className="flex items-center justify-center gap-2 bg-primary text-white w-full py-3 rounded-[12px] cursor-pointer overflow-hidden shadow-md hover:bg-primary/90 transition-colors"
    whileHover={{scale: 1.02}}
    whileTap={{scale: 0.98}}>
    <FaSignOutAlt />
    {!isCollapsed && (
     <motion.span
      variants={textVariants}
      initial="closed"
      animate="open"
      exit="closed">
      Sign Out
     </motion.span>
    )}
   </motion.button>

   <motion.button
    className="absolute -right-3 top-1/2 bg-primary text-white p-1 rounded-full shadow-lg z-10"
    onClick={() => setIsCollapsed(!isCollapsed)}
    whileHover={{scale: 1.1}}
    whileTap={{scale: 0.9}}>
    {isCollapsed ? <IoIosArrowDropright /> : <IoIosArrowDropleft />}
   </motion.button>
  </motion.div>
 );
}
