"use client";
import {useSearchParams} from "next/navigation";
import {useEffect} from "react";

export default function PaymentStatus() {
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
