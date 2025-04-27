"use client";
import {useSearchParams} from "next/navigation";
import {useEffect} from "react";

export default function PaymentFinish() {
 const params = useSearchParams();
 const status = params.get("status");
 const orderId = params.get("order_id");

 useEffect(() => {
  if (status === "SUCCESS") {
   // Redirect ke halaman sukses
   window.location.href = `/payment/success?order_id=${orderId}`;
  } else {
   // Redirect ke halaman gagal
   window.location.href = `/payment/failed?order_id=${orderId}`;
  }
 }, [status, orderId]);

 return <div>Memproses pembayaran...</div>;
}
