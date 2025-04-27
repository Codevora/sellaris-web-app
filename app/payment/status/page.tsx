"use client";
import {useSearchParams} from "next/navigation";
import {Suspense, useEffect} from "react";

function PaymentStatusContent() {
 const params = useSearchParams();
 const status = params.get("status");
 const orderId = params.get("order_id");

 useEffect(() => {
  if (status === "SUCCESS") {
   window.location.href = `/payment/success?orderId=${orderId}`;
  } else {
   window.location.href = `/payment/failed?orderId=${orderId}`;
  }
 }, [status, orderId]);

 return <div>Processing payment status...</div>;
}

export default function PaymentStatus() {
return (
 <Suspense fallback={<div>Loading...</div>}>
  <PaymentStatusContent />
 </Suspense>
)
}
