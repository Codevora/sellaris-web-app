"use client";
import {motion, AnimatePresence} from "framer-motion";
import Link from "next/link";
import {useState, useEffect} from "react";
import {FiMenu, FiX} from "react-icons/fi";
import SessionButton from "@/components/ui/Session";

const Navbar = () => {
 const [scrolled, setScrolled] = useState(false);
 const [mobileOpen, setMobileOpen] = useState(false);

 useEffect(() => {
  const handleScroll = () => {
   setScrolled(window.scrollY > 20);
  };
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
 }, []);

 // Tutup mobile menu ketika scroll
 useEffect(() => {
  const handleScroll = () => {
   if (mobileOpen) {
    setMobileOpen(false);
   }
  };
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
 }, [mobileOpen]);

 const navItems = [
  {name: "Tentang Kami", path: "/about"},
  {name: "Fitur", path: "/features"},
  {name: "Harga", path: "/pricing"},
  {name: "Blog", path: "/gallery"},
  {name: "Karir", path: "/career"},
  {name: "Kontak", path: "/contact"},
 ];

 return (
  <motion.header
   initial={{y: -100}}
   animate={{y: 0}}
   transition={{type: "spring", stiffness: 100}}
   className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${
    scrolled
     ? "bg-gradient-to-br from-teal-600 to-teal-700 backdrop-blur-md py-4 2xl:py-5"
     : "bg-gradient-to-br from-teal-600 to-teal-700 py-5 2xl:py-6"
   }`}>
   <div className="container mx-auto px-4">
    <div className="flex justify-between items-center">
     {/* Logo */}
     <Link
      href="/"
      className="z-50">
      <motion.span
       className="text-3xl font-bold italic text-white"
       style={{fontFamily: "'Raleway', sans-serif"}}
       whileHover={{scale: 1.05}}>
       SELLARIS
      </motion.span>
     </Link>

     {/* Desktop Navigation */}
     <nav className="hidden md:flex items-center space-x-6">
      {navItems.map((item) => (
       <Link
        key={item.path}
        href={item.path}
        className="text-white/90 hover:text-white text-lg font-medium px-3 py-2 transition-colors relative group">
        {item.name}
        <span className="absolute bottom-0 left-1/2 h-0.5 bg-white transform -translate-x-1/2 w-0 group-hover:w-3/4 transition-all duration-300" />
       </Link>
      ))}
      <div className="ml-4">
       <SessionButton />
      </div>
     </nav>

     {/* Mobile Menu Button */}
     <button
      className="md:hidden text-white p-2 z-50"
      onClick={() => setMobileOpen(!mobileOpen)}
      aria-label="Toggle menu">
      {mobileOpen ? (
       <FiX
        size={28}
        className="text-white"
       />
      ) : (
       <FiMenu
        size={28}
        className="text-white"
       />
      )}
     </button>
    </div>

    {/* Mobile Menu - Solusi Fixed */}
    <AnimatePresence>
     {mobileOpen && (
      <motion.div
       initial={{opacity: 0, y: -20}}
       animate={{opacity: 1, y: 0}}
       exit={{opacity: 0, y: -20}}
       transition={{duration: 0.3}}
       className="md:hidden fixed inset-0 bg-teal-700 pt-20 px-6 z-40 h-screen overflow-y-auto"
       style={{
        background: "linear-gradient(to bottom right, #0d9488, #0e7490)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
       }}>
       <div className="flex flex-col space-y-6 pb-8">
        {navItems.map((item) => (
         <Link
          key={item.path}
          href={item.path}
          className="text-white text-2xl font-medium py-3 border-b border-white/10 hover:text-teal-100 transition-colors"
          onClick={() => setMobileOpen(false)}>
          {item.name}
         </Link>
        ))}
        <div className="pt-4">
         <SessionButton
          mobile
          onClose={() => setMobileOpen(false)}
         />
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
