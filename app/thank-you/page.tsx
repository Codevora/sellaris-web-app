"use client";

import {useEffect} from "react";
import {useRouter} from "next/navigation";

export default function ThankYouPage() {
 const router = useRouter();

 useEffect(() => {
  const timer = setTimeout(() => {
   router.push("/dashboard");
  }, 3000);

  return () => clearTimeout(timer);
 }, [router]);

 return (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
   <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
    <div className="mb-6">
     <svg
      className="w-16 h-16 mx-auto text-green-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24">
      <path
       strokeLinecap="round"
       strokeLinejoin="round"
       strokeWidth="2"
       d="M5 13l4 4L19 7"></path>
     </svg>
    </div>
    <h1 className="text-2xl font-bold text-gray-800 mb-4">Thank You!</h1>
    <p className="text-gray-600 mb-6">
     Your payment has been successfully processed. You're now being redirected
     to your dashboard.
    </p>
    <div className="flex justify-center">
     <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
    </div>
   </div>
  </div>
 );
}
