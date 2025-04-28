import {Metadata} from "next";
import PaymentMethodsPage from "@/components/layouts/Admin/PaymentMethodsPage";

export const metadata: Metadata = {
 title: "Payment Methods",
 description: "Manage payment methods",
};

export default function Page() {
 return <PaymentMethodsPage />;
}
