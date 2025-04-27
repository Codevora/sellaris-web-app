"use client";

import {useRouter, useSearchParams} from "next/navigation";
import {useSession} from "next-auth/react";
import {useUserSubscription} from "@/hooks/useUserSubscription";
import {useEffect, useState} from "react";
import dynamic from "next/dynamic";

// Lazy load QRCode untuk menghindari SSR issues
const QRCode = dynamic(() => import("react-qr-code"), {
 ssr: false,
});

export default function ConfirmPayment() {
 const router = useRouter();
 const searchParams = useSearchParams();
 const subscriptionId = searchParams.get("subscriptionId");
 const {data: session} = useSession();
 const {getSubscriptionById, verifyPayment} = useUserSubscription();
 const [subscription, setSubscription] = useState<any>(null);
 const [timeLeft, setTimeLeft] = useState(600); // 10 menit dalam detik
 const [paymentStatus, setPaymentStatus] = useState<
  "pending" | "success" | "failed"
 >("pending");
 const [isPolling, setIsPolling] = useState(false);
 const [loading, setLoading] = useState(true);

 // Generate random Dana reference ID
 const danaReferenceId = `DANA-${Math.floor(
  100000000 + Math.random() * 900000000
 )}`;

 const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
   .toString()
   .padStart(2, "0")}`;
 };

 // Fetch subscription details
 useEffect(() => {
  if (subscriptionId && session?.user?.id) {
   const fetchSubscription = async () => {
    const sub = await getSubscriptionById(subscriptionId);
    setSubscription(sub);
    setLoading(false);
   };
   fetchSubscription();
  }
 }, [subscriptionId, session]);

 // Timer countdown
 useEffect(() => {
  if (timeLeft <= 0) {
   setPaymentStatus("failed");
   return;
  }

  const timer = setInterval(() => {
   setTimeLeft((prev) => prev - 1);
  }, 1000);

  return () => clearInterval(timer);
 }, [timeLeft]);

 // Polling payment status
 useEffect(() => {
  if (paymentStatus === "pending" && !isPolling && subscriptionId) {
   setIsPolling(true);

   const pollInterval = setInterval(async () => {
    try {
     const result = await verifyPayment(subscriptionId);
     if (result.success) {
      setPaymentStatus("success");
      clearInterval(pollInterval);
      setTimeout(() => {
       router.push("/thank-you");
      }, 3000);
     }
    } catch (error) {
     console.error("Payment verification failed:", error);
    }
   }, 5000);

   return () => clearInterval(pollInterval);
  }
 }, [paymentStatus, isPolling, subscriptionId]);

 if (loading || !subscription) {
  return (
   <div className="max-w-4xl mx-auto py-8 px-4">Loading payment details...</div>
  );
 }

 if (paymentStatus === "success") {
  return (
   <div className="max-w-4xl mx-auto py-8 px-4 text-center">
    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
     <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
     <p>
      Thank you for your payment. You will be redirected to dashboard shortly.
     </p>
    </div>
   </div>
  );
 }

 if (paymentStatus === "failed") {
  return (
   <div className="max-w-4xl mx-auto py-8 px-4">
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
     <h2 className="text-2xl font-bold mb-2">Payment Expired</h2>
     <p>The payment session has expired. Please try again.</p>
     <button
      onClick={() =>
       router.push(`/pricing/checkout?packageId=${subscription.packageId}`)
      }
      className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
      Back to Payment Methods
     </button>
    </div>
   </div>
  );
 }

 return (
  <div className="max-w-4xl mx-auto py-8 px-4">
   <h1 className="text-2xl font-bold mb-6">Complete Your Payment</h1>

   <div className="grid md:grid-cols-2 gap-8">
    <div className="bg-white p-6 rounded-lg shadow">
     <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
     <div className="space-y-4">
      <div>
       <h3 className="text-lg font-medium">{subscription.packageName}</h3>
       <p className="text-gray-600">Subscription Package</p>
      </div>
      <div className="flex justify-between">
       <span>Reference ID:</span>
       <span className="font-mono">{danaReferenceId}</span>
      </div>
      <div className="flex justify-between">
       <span>Time Remaining:</span>
       <span className={`font-bold ${timeLeft < 60 ? "text-red-600" : ""}`}>
        {formatTime(timeLeft)}
       </span>
      </div>
      <div className="flex justify-between font-medium text-lg mt-4">
       <span>Total Amount:</span>
       <span>
        {new Intl.NumberFormat("id-ID", {
         style: "currency",
         currency: "IDR",
         minimumFractionDigits: 0,
        }).format(subscription.price)}
       </span>
      </div>
     </div>
    </div>

    <div className="bg-white p-6 rounded-lg shadow">
     <h2 className="text-xl font-semibold mb-4">Pay with Dana</h2>
     <div className="flex flex-col items-center">
      <div className="mb-6 p-4 bg-white border rounded-lg">
       <QRCode
        value={JSON.stringify({
         merchantId: "YOUR_MERCHANT_ID",
         referenceId: danaReferenceId,
         amount: subscription.price,
         customerId: session?.user?.email || "",
         itemName: subscription.packageName,
         callbackUrl: `${window.location.origin}/api/payment/dana/callback`,
        })}
        size={200}
        level="H"
       />
      </div>

      <div className="text-center mb-6">
       <p className="mb-2">Scan QR code above using Dana app</p>
       <p className="text-sm text-gray-600">or</p>
       <button className="mt-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
        Open Dana App
       </button>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 w-full">
       <div className="flex">
        <div className="flex-shrink-0">
         <svg
          className="h-5 w-5 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20">
          <path
           fillRule="evenodd"
           d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
           clipRule="evenodd"
          />
         </svg>
        </div>
        <div className="ml-3">
         <p className="text-sm text-yellow-700">
          Please complete payment within {formatTime(timeLeft)}. Make sure the
          amount matches exactly.
         </p>
        </div>
       </div>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
}
 