import {Suspense} from "react";
import CheckoutForm from "@/components/pricing/CheckoutForm";

export default function CheckoutPage() {
 return (
  <Suspense fallback={<div>Loading...</div>}>
   <CheckoutForm />
  </Suspense>
 );
}
