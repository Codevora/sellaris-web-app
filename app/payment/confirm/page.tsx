import {Suspense} from "react";
import ConfirmPayment from "@/components/payment/ConfirmPayment";

export default function ConfirmPaymentPage() {
 return (
  <Suspense fallback={<div>Loading...</div>}>
   <ConfirmPayment />
  </Suspense>
 );
}
