"use client";
import {Suspense} from "react";
import {useSearchParams} from "next/navigation";
import {useEffect} from "react";

function PaymentFinishContent() {
 const params = useSearchParams();
 const status = params.get("status");
 const orderId = params.get("order_id");

 useEffect(() => {
  if (status === "SUCCESS") {
   window.location.href = `/payment/success?order_id=${orderId}`;
  } else {
   window.location.href = `/payment/failed?order_id=${orderId}`;
  }
 }, [status, orderId]);

 return <div>Memproses pembayaran...</div>;
}

export default function PaymentFinish() {
 return (
  <Suspense fallback={<div>Memverifikasi status pembayaran...</div>}>
   <PaymentFinishContent />
  </Suspense>
 );
}
