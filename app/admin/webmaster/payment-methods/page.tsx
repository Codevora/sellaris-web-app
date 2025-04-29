import {Metadata} from "next";
import PaymentMethodsWebMaster from "@/components/layouts/Admin/WebMaster/PaymentMethods/PaymentMethodsWebMaster";

export const metadata: Metadata = {
 title: "Payment Methods",
 description: "Manage payment methods",
};

export default function Page() {
 return <PaymentMethodsWebMaster />;
}
