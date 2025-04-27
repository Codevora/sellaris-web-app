"use client";

import {useRouter, useSearchParams} from "next/navigation";
import {Suspense, useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import {checkPaymentStatus} from "@/services/paymentService";

function DanaPaymentContent() {
 const router = useRouter();
 const searchParams = useSearchParams();
 const subscriptionId = searchParams.get("subscriptionId");
 const amount = Number(searchParams.get("amount"));
 const {data: session} = useSession();
 const [timeLeft, setTimeLeft] = useState(600); // 10 menit dalam detik
 const [isPaid, setIsPaid] = useState(false);
 const [isFailed, setIsFailed] = useState(false);

 // Format waktu (MM:SS)
 const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
   .toString()
   .padStart(2, "0")}`;
 };

 // Simulasi QR Code DANA (dalam implementasi nyata, ini dari API pembayaran)
 const danaQRCode = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=DANA_PAYMENT_${subscriptionId}_${amount}`;

 // Cek status pembayaran setiap 10 detik
 useEffect(() => {
  if (!subscriptionId || isPaid || isFailed) return;

  const interval = setInterval(async () => {
   try {
    const status = await checkPaymentStatus(subscriptionId);
    if (status === "paid") {
     setIsPaid(true);
     clearInterval(interval);
     setTimeout(() => router.push("/dashboard"), 3000);
    } else if (status === "failed") {
     setIsFailed(true);
     clearInterval(interval);
    }
   } catch (error) {
    console.error("Error checking payment status:", error);
   }
  }, 10000); // Cek setiap 10 detik

  return () => clearInterval(interval);
 }, [subscriptionId, isPaid, isFailed, router]);

 // Timer countdown
 useEffect(() => {
  if (timeLeft <= 0 || isPaid || isFailed) return;

  const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
  return () => clearTimeout(timer);
 }, [timeLeft, isPaid, isFailed]);

 // Jika waktu habis
 useEffect(() => {
  if (timeLeft <= 0 && !isPaid) {
   setIsFailed(true);
  }
 }, [timeLeft, isPaid]);

 if (isPaid) {
  return (
   <div className="max-w-md mx-auto text-center py-12">
    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
     <h2 className="font-bold text-xl mb-2">Payment Successful!</h2>
     <p>
      Thank you for your payment. You will be redirected to dashboard shortly.
     </p>
    </div>
   </div>
  );
 }

 if (isFailed) {
  return (
   <div className="max-w-md mx-auto text-center py-12">
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
     <h2 className="font-bold text-xl mb-2">Payment Failed</h2>
     <p className="mb-4">
      {timeLeft <= 0
       ? "Payment time has expired. Please try again."
       : "Payment failed. Please try again."}
     </p>
     <button
      onClick={() =>
       router.push(`/pricing/checkout?packageId=${subscriptionId}`)
      }
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
      Try Again
     </button>
    </div>
   </div>
  );
 }

 return (
  <div className="max-w-md mx-auto py-8 px-4">
   <h1 className="text-2xl font-bold mb-6 text-center">DANA Payment</h1>

   <div className="bg-white p-6 rounded-lg shadow">
    <div className="text-center mb-6">
     <div className="text-red-500 font-bold text-lg mb-2">
      Time remaining: {formatTime(timeLeft)}
     </div>
     <p className="text-gray-600 mb-4">
      Please complete your payment within 10 minutes
     </p>
    </div>

    <div className="flex flex-col items-center mb-6">
     <img
      src={danaQRCode}
      alt="DANA QR Code"
      className="w-48 h-48 mb-4 border border-gray-200"
     />
     <p className="text-center text-gray-600 mb-2">
      Scan this QR code using DANA app to pay
     </p>
     <p className="text-center font-bold text-lg">
      {new Intl.NumberFormat("id-ID", {
       style: "currency",
       currency: "IDR",
       minimumFractionDigits: 0,
      }).format(amount)}
     </p>
    </div>

    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
     <p className="text-yellow-700">
      <strong>Important:</strong> Please pay the exact amount to complete your
      payment.
     </p>
    </div>

    <div className="text-center text-gray-500 text-sm">
     <p>Payment will be verified automatically</p>
     <p>Do not close this page until payment is complete</p>
    </div>
   </div>
  </div>)
}

export default function DanaPaymentPage() {
 return (
  <Suspense fallback={<div>Loading...</div>}>
   <DanaPaymentContent />
  </Suspense>
 );
}
