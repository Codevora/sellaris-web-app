"use client";
import {useState} from "react";
import AdminSidebar from "@/components/layouts/AdminSidebar";

export default function ClientDashboardLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

 return (
  <div className="flex min-h-screen">
   <AdminSidebar
    isCollapsed={isSidebarCollapsed}
    setIsCollapsed={setIsSidebarCollapsed}
   />

   <main
    className={`flex-1 transition-all duration-300 ease-in-out ${
     isSidebarCollapsed ? "ml-20" : "ml-[300px]"
    } p-6`}>
    {children}
   </main>
  </div>
 );
}
