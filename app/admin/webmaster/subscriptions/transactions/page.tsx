import TransactionPanel from "@/components/layouts/Admin/WebMaster/Subscriptions/Transactions/TransactionPanel";
import {Metadata} from "next";

export const metadata: Metadata = {
 title: "Subscription Transactions",
 description: "Manage subscription transactions",
};

export default function TransactionPage() {
 return <TransactionPanel />;
}
