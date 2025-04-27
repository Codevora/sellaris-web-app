// app/payment/dana/process/page.tsx
"use client";
import {useSearchParams} from "next/navigation";
import {Suspense, useEffect, useState} from "react";
import QRCode from "react-qr-code";

function DanaProcessContent() {
 const params = useSearchParams();
 const subscriptionId = params.get("subscriptionId");
 const [timeLeft, setTimeLeft] = useState(600); // 10 menit
 const [amount, setAmount] = useState(0); // Tambahkan state amount

 useEffect(() => {
  // Fetch subscription details untuk mendapatkan amount
  const fetchSubscription = async () => {
   const res = await fetch(`/api/subscription/${subscriptionId}`);
   const data = await res.json();
   setAmount(data.price);
  };

  if (subscriptionId) fetchSubscription();
 }, [subscriptionId]);

 useEffect(() => {
  if (timeLeft <= 0) {
   window.location.href = `/payment/failed?subscriptionId=${subscriptionId}`;
  }

  const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
  return () => clearInterval(timer);
 }, [timeLeft, subscriptionId]);

 // Format QR data sesuai spesifikasi DANA
const qrData =
 subscriptionId && amount > 0
  ? `https://m.dana.id/m/portal/qr?type=payment&merchantId=${
     process.env.NEXT_PUBLIC_DANA_MERCHANT_ID || "DEMO123"
    }&referenceId=${subscriptionId}&amount=${amount}&callbackUrl=${encodeURIComponent(
     `${window.location.origin}/api/dana/callback`
    )}&redirectUrl=${encodeURIComponent(
     `${window.location.origin}/payment/status`
    )}`
  : "";

 return (
  <div className="max-w-md mx-auto p-4 py-64">
   <h1 className="text-xl font-bold mb-4">Bayar dengan DANA</h1>
   <div className="bg-white p-4 rounded-lg border">
    {qrData ? (
     <>
      <QRCode
       value={qrData}
       size={200}
      />
      <p className="mt-4 text-sm">
       Scan QR code di atas menggunakan aplikasi DANA.
       <br />
       Waktu tersisa: {Math.floor(timeLeft / 60)}:
       {String(timeLeft % 60).padStart(2, "0")}
      </p>
     </>
    ) : (
     <p>Memuat data pembayaran...</p>
    )}
   </div>
  </div>
 );
}

export default function DanaProcessPage() {
 return (
  <Suspense fallback={<div>Loading...</div>}>
   <DanaProcessContent />
  </Suspense>
 );
}
