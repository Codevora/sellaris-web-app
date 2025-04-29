import {Metadata} from "next";
import WebMasterSettingsPage from "@/components/layouts/Admin/WebMaster/Settings/WebMasterSettingsPage";

export const metadata: Metadata = {
 title: "Settings",
 description: "Manage system settings and preferences",
};

export default function SettingsPage() {
 return <WebMasterSettingsPage />;
}
