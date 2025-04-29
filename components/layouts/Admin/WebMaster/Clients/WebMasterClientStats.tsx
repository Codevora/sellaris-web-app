"use client";

import {useEffect, useState} from "react";
import {motion} from "framer-motion";
import {FiUsers, FiUserCheck, FiUserX} from "react-icons/fi";

export default function WebMasterClientStats() {
 const [stats, setStats] = useState({
  total: 0,
  active: 0,
  inactive: 0,
 });

 useEffect(() => {
  const fetchStats = async () => {
   try {
    const res = await fetch("/api/clients/stats");
    const data = await res.json();
    setStats(data);
   } catch (error) {
    console.error("Failed to fetch stats:", error);
   }
  };
  fetchStats();
 }, []);

 const statCards = [
  {
   title: "Total Clients",
   value: stats.total,
   icon: (
    <FiUsers
     className="text-blue-500"
     size={24}
    />
   ),
   bgColor: "bg-blue-50",
  },
  {
   title: "Active Clients",
   value: stats.active,
   icon: (
    <FiUserCheck
     className="text-green-500"
     size={24}
    />
   ),
   bgColor: "bg-green-50",
  },
  {
   title: "Inactive Clients",
   value: stats.inactive,
   icon: (
    <FiUserX
     className="text-yellow-500"
     size={24}
    />
   ),
   bgColor: "bg-yellow-50",
  },
 ];

 return (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
   {statCards.map((stat, index) => (
    <motion.div
     key={stat.title}
     initial={{opacity: 0, y: 20}}
     animate={{opacity: 1, y: 0}}
     transition={{delay: index * 0.1}}
     whileHover={{y: -5}}
     className={`${stat.bgColor} p-6 rounded-xl shadow-sm`}>
     <div className="flex justify-between items-center">
      <div>
       <p className="text-sm font-medium text-gray-500">{stat.title}</p>
       <p className="text-2xl font-bold mt-1">{stat.value}</p>
      </div>
      <div className="p-3 rounded-full bg-white shadow-sm">{stat.icon}</div>
     </div>
    </motion.div>
   ))}
  </div>
 );
}
