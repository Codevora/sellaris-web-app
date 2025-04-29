// app/pricing/PricingWrapper.tsx
"use client";

import {useState, useEffect} from "react";
import SubscriptionPackages from "@/components/SubscriptionPackages";
import {Package} from "@/types/package";

export default function PricingWrapper() {
 const [packages, setPackages] = useState<Package[]>([]);
 const [isLoading, setIsLoading] = useState(true);

 useEffect(() => {
  const fetchPackages = async () => {
   try {
    const response = await fetch("/api/packages");
    if (!response.ok) throw new Error("Failed to fetch packages");
    const data = await response.json();
    setPackages(data);
   } catch (error) {
    console.error("Error fetching packages:", error);
   } finally {
    setIsLoading(false);
   }
  };

  fetchPackages();
 }, []);

 const handleSelectPackage = (pkg: Package) => {
  // Handle package selection
  console.log("Selected package:", pkg);
  // Example: Redirect to checkout
  // window.location.href = `/checkout?packageId=${pkg.id}`;
 };

 if (isLoading) {
  return (
   <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
   </div>
  );
 }

 return (
  <SubscriptionPackages
   packages={packages}
   onSelect={handleSelectPackage}
  />
 );
}
