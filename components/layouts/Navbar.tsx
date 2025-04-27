"use client";
import {motion, AnimatePresence} from "framer-motion";
import Link from "next/link";
import {useState, useEffect} from "react";
import {FiMenu, FiX} from "react-icons/fi";
import SessionButton from "@/components/ui/Session";

const floatingVariants = {
 initial: {y: -20, opacity: 0},
 animate: {
  y: 0,
  opacity: 1,
  transition: {
   type: "spring",
   stiffness: 100,
   damping: 10,
  },
 },
};

const Navbar = () => {
 const [scrolled, setScrolled] = useState(false);
 const [mobileOpen, setMobileOpen] = useState(false);
 const [isClient, setIsClient] = useState(false);
 const [hoveredItem, setHoveredItem] = useState<number | null>(null);

 useEffect(() => {
  setIsClient(true);
  const handleScroll = () => {
   setScrolled(window.scrollY > 10);
  };
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
 }, []);

 const navItems = [
  {name: "Discover", path: "/discover"},
  {name: "Gallery", path: "/gallery"},
  {name: "Pricing", path: "/pricing"},
  {name: "About", path: "/about"},
 ];

 if (!isClient) {
  return (
   <header className="fixed w-full z-50 bg-primary backdrop-blur-lg">
    <div className="container mx-auto px-6 py-4">
     <div className="flex justify-between items-center">
      <span
       className="text-3xl font-bold text-white italic"
       style={{fontFamily: "'Raleway', sans-serif"}}>
       SELLARIS
      </span>
     </div>
    </div>
   </header>
  );
 }

 return (
  <motion.header
   initial={{y: -100}}
   animate={{y: 0}}
   transition={{type: "spring", stiffness: 100}}
   className={`fixed w-full z-50 ${
    scrolled ? "bg-black/90 backdrop-blur-lg" : "bg-primary"
   }`}>
   <div className="container mx-auto px-6 py-5">
    <div className="flex justify-between items-center">
     {/* Logo with floating effect */}
     <motion.div className="relative">
      <Link href="/">
       <motion.span
        className="text-3xl font-bold italic text-white"
        style={{fontFamily: "'Raleway', sans-serif"}}
        initial="initial"
        animate="animate"
        variants={floatingVariants}>
        SELLARIS
       </motion.span>
      </Link>
      <motion.div
       className="absolute -bottom-1 left-0 h-[3px] bg-white"
       initial={{width: 0}}
       animate={{width: "100%"}}
       transition={{duration: 1, delay: 0.5}}
      />
     </motion.div>

     {/* Desktop Navigation */}
     <nav className="hidden md:flex space-x-8 items-center">
      {navItems.map((item, index) => (
       <motion.div
        key={index}
        className="relative"
        onHoverStart={() => setHoveredItem(index)}
        onHoverEnd={() => setHoveredItem(null)}>
        <Link
         href={item.path}
         className="text-white/90 hover:text-white text-lg font-medium px-3 py-2"
         style={{fontFamily: "'Raleway', sans-serif"}}>
         {item.name}
        </Link>
       </motion.div>
      ))}
     </nav>

     {/* Session Button */}
     <div className="hidden md:block">
      <SessionButton />
     </div>

     {/* Mobile Menu Button */}
     <motion.button
      className="md:hidden text-white p-2"
      whileTap={{scale: 0.9}}
      onClick={() => setMobileOpen(!mobileOpen)}>
      {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
     </motion.button>
    </div>

    {/* Mobile Menu */}
    <AnimatePresence>
     {mobileOpen && (
      <motion.div
       initial={{opacity: 0, height: 0}}
       animate={{opacity: 1, height: "auto"}}
       exit={{opacity: 0, height: 0}}
       transition={{duration: 0.3}}
       className="md:hidden overflow-hidden">
       <div className="pt-4 pb-8 space-y-6">
        {navItems.map((item, index) => (
         <motion.div
          key={index}
          initial={{x: -50, opacity: 0}}
          animate={{x: 0, opacity: 1}}
          transition={{delay: index * 0.1}}>
          <Link
           href={item.path}
           className="block text-white/90 hover:text-white text-xl px-4 py-3"
           style={{fontFamily: "'Raleway', sans-serif"}}
           onClick={() => setMobileOpen(false)}>
           {item.name}
          </Link>
         </motion.div>
        ))}
        <div className="px-4 pt-4">
         <SessionButton />
        </div>
       </div>
      </motion.div>
     )}
    </AnimatePresence>
   </div>
  </motion.header>
 );
};

export default Navbar;
