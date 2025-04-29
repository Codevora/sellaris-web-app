"use client";
import {signOut, useSession} from "next-auth/react";
import Link from "next/link";
import {useState, useEffect} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {FiUser, FiLogOut, FiGrid, FiChevronDown} from "react-icons/fi";

type SessionButtonProps = {
 mobile?: boolean;
 onClose?: () => void;
};

export default function SessionButton({
 mobile = false,
 onClose,
}: SessionButtonProps) {
 const {data: session} = useSession();
 const [menuOpen, setMenuOpen] = useState(false);
 const [isClient, setIsClient] = useState(false);

 useEffect(() => {
  setIsClient(true);
 }, []);

 if (!isClient) {
  return <div className="w-32 h-10 bg-white/10 rounded-lg animate-pulse" />;
 }

 const toggleMenu = () => {
  setMenuOpen(!menuOpen);
 };

 const handleItemClick = () => {
  setMenuOpen(false);
  onClose?.();
 };

 if (session?.user) {
  return (
   <div className={`relative ${mobile ? "w-full" : ""}`}>
    {/* Main Button */}
    <motion.button
     className={`flex items-center gap-2 ${
      mobile
       ? "w-full justify-between px-5 py-4 bg-white/10 rounded-lg"
       : "px-4 py-2 rounded-lg hover:bg-white/10"
     } text-white font-medium transition-all`}
     onClick={toggleMenu}
     whileTap={{scale: 0.95}}>
     <div className="flex items-center gap-2">
      <FiUser className="text-lg" />
      <span className="truncate max-w-[120px]">
       {session.user.name?.split(" ")[0] || "User"}
      </span>
     </div>
     <motion.span
      animate={{rotate: menuOpen ? 180 : 0}}
      transition={{duration: 0.2}}>
      <FiChevronDown className="text-sm opacity-80" />
     </motion.span>
    </motion.button>

    {/* Dropdown Menu */}
    <AnimatePresence>
     {menuOpen && (
      <motion.div
       initial={{opacity: 0, y: 10}}
       animate={{opacity: 1, y: 0}}
       exit={{opacity: 0, y: 10}}
       transition={{type: "spring", stiffness: 300, damping: 30}}
       className={`absolute ${
        mobile ? "left-0 right-0 mt-2" : "right-0 mt-2"
       } bg-white rounded-lg shadow-xl overflow-hidden z-50 min-w-[200px]`}>
       <motion.div
        initial={{scale: 0.95}}
        animate={{scale: 1}}
        transition={{delay: 0.1}}>
        <Link
         href="/dashboard"
         className="flex items-center gap-3 px-5 py-3 text-gray-800 hover:bg-gray-100 transition-colors border-b border-gray-100"
         onClick={handleItemClick}>
         <FiGrid className="text-lg" />
         <span>Dashboard</span>
        </Link>
        <button
         onClick={() => {
          handleItemClick();
          signOut({callbackUrl: "/"});
         }}
         className="w-full flex items-center gap-3 px-5 py-3 text-gray-800 hover:bg-gray-100 transition-colors">
         <FiLogOut className="text-lg" />
         <span>Sign Out</span>
        </button>
       </motion.div>
      </motion.div>
     )}
    </AnimatePresence>
   </div>
  );
 }

 return (
  <Link
   href="/login"
   className={`${
    mobile
     ? "w-full text-center px-5 py-4 bg-white/10 rounded-lg"
     : "px-6 py-2 rounded-lg hover:bg-white/10"
   } text-white font-medium transition-colors`}
   onClick={onClose}>
   Sign In
  </Link>
 );
}
