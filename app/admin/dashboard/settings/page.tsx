import {Metadata} from "next";
import SettingsClientPage from "@/components/layouts/Admin/Settings/SettingsClientPage";

export const metadata: Metadata = {
 title: "Settings",
 description: "Manage system settings and preferences",
};

export default function SettingsPage() {
 return <SettingsClientPage />;
}
