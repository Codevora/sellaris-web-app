import WebMasterPackagePanel from "@/components/layouts/Admin/WebMaster/Subscriptions/Packages/WebMasterPackagePanel";
import {Metadata} from "next";

export const metadata: Metadata = {
 title: "Subscription Packages",
 description: "Manage packages",
};

export default function PackagesPage() {
 return <WebMasterPackagePanel />;
}
