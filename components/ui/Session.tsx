"use client";
import {signOut, useSession} from "next-auth/react";
import Link from "next/link";
import {useEffect, useState} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {FiUser, FiLogOut, FiGrid, FiChevronDown} from "react-icons/fi";

export default function SessionButton() {
 const {data: session, status} = useSession();
 const [isLoading, setIsLoading] = useState(true);
 const [isHovered, setIsHovered] = useState(false);
 const [isClient, setIsClient] = useState(false);

 useEffect(() => {
  setIsClient(true);
  if (status !== "loading") {
   setIsLoading(false);
  }
 }, [status]);

 if (!isClient) {
  return <div className="w-24 h-10 rounded-lg bg-white/50 animate-pulse" />;
 }

 if (isLoading) {
  return (
   <motion.div
    className="w-24 h-10 rounded-lg bg-white/50 animate-pulse"
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    transition={{duration: 0.5, ease: "easeOut"}}
   />
  );
 }

 if (session?.user) {
  return (
   <div
    className="relative"
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}>
    <motion.button
     className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-primary font-medium italic border border-white/10 hover:border-white/30 transition-all group"
     style={{fontFamily: "'Raleway', sans-serif"}}
     whileHover={{scale: 1.05}}
     whileTap={{scale: 0.95}}
     initial={{opacity: 0, y: -10}}
     animate={{opacity: 1, y: 0}}
     transition={{
      type: "spring",
      stiffness: 300,
      damping: 20,
      delay: 0.1,
     }}>
     <FiUser className="text-lg transition-colors" />
     <span className="truncate max-w-[120px]">
      {session.user.name?.split(" ")[0] || "User"}
     </span>
     <motion.span
      animate={{rotate: isHovered ? 180 : 0}}
      transition={{duration: 0.2}}>
      <FiChevronDown className="text-sm opacity-70" />
     </motion.span>
    </motion.button>

    <AnimatePresence>
     {isHovered && (
      <motion.div
       initial={{opacity: 0, y: 10}}
       animate={{opacity: 1, y: 0}}
       exit={{opacity: 0, y: 10}}
       transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
       }}
       className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white backdrop-blur-lg border border-white/10 z-50 overflow-hidden">
       <motion.div
        initial={{scale: 0.95}}
        animate={{scale: 1}}
        transition={{delay: 0.1}}>
        <Link
         href="/dashboard"
         className="flex items-center gap-3 px-4 py-3 text-primary/90 hover:text-primary hover:bg-white/10 transition-colors border-b border-white/5"
         onClick={() => setIsHovered(false)}>
         <FiGrid className="text-lg text-primary" />
         Dashboard
        </Link>
        <button
         onClick={() => {
          setIsHovered(false);
          signOut({callbackUrl: "/"});
         }}
         className="w-full flex items-center gap-3 px-4 py-3 text-primary/90 hover:text-primary cursor-pointer hover:bg-white/10 transition-colors">
         <FiLogOut className="text-lg text-primary" />
         Sign Out
        </button>
       </motion.div>
      </motion.div>
     )}
    </AnimatePresence>
   </div>
  );
 }

 return (
  <motion.div
   initial={{opacity: 0, y: -10}}
   animate={{opacity: 1, y: 0}}
   transition={{
    type: "spring",
    stiffness: 300,
    damping: 20,
    delay: 0.1,
   }}>
   <Link
    href="/login"
    className="px-6 py-2 rounded-lg bg-white text-primary font-medium italic block"
    style={{fontFamily: "'Raleway', sans-serif"}}>
    Sign In
   </Link>
  </motion.div>
 );
}
