"use client";
import {signOut} from "next-auth/react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {FaUser} from "react-icons/fa";
import {FaPercent, FaCartShopping} from "react-icons/fa6";
import {GoGear} from "react-icons/go";
import {MdDashboard} from "react-icons/md";

const links = [
 {name: "Dashboard", path: "/admin/dashboard", icon: <MdDashboard />},
 {
  name: "Products",
  path: "/admin/dashboard/products",
  icon: <FaCartShopping />,
 },
 {
  name: "User Management",
  path: "/admin/dashboard/user-management",
  icon: <FaUser />,
 },
 {name: "Taxes", path: "/admin/dashboard/taxes", icon: <FaPercent />},
 {name: "Settings", path: "/admin/dashboard/settings", icon: <GoGear />},
];

export default function AdminSidebar() {
 const pathname = usePathname();
 return (
  <div className="fixed left-0 top-0 h-full max-w-[250px] w-full bg-white/40 p-5 flex flex-col justify-between items-center rounded-[8px] shadow-sm ">
   <ul className="flex flex-col w-full items-center">
    <Link href="/">
     <h1
      className="text-4xl text-primary"
      style={{fontFamily: "Agency FB"}}>
      9/1/1
     </h1>
    </Link>
    <ul className="flex flex-col gap-2 w-full mt-14">
     {links.map((link, index) => (
      <Link
       href={link.path}
       key={index}
       className={`flex items-center gap-4 p-2 hover:bg-primary hover:text-secondary rounded-[8px] w-full transition-all duration-500 ${
        link.path === pathname && "bg-primary text-secondary"
       }`}>
       <li className="text-xl">{link.icon}</li>
       <p>{link.name}</p>
      </Link>
     ))}
    </ul>
   </ul>
   <button
    onClick={() => signOut()}
    className="bg-primary text-secondary w-full py-2 rounded-[8px] cursor-pointer">
    Sign Out
   </button>
  </div>
 );
}
