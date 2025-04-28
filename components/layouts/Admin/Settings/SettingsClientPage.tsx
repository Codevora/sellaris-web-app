"use client";

import {useState, useEffect} from "react";
import {useSession} from "next-auth/react";
import {useTranslation} from "react-i18next";
import {motion, AnimatePresence} from "framer-motion";
import {
 SettingsService,
 type SettingsData,
} from "@/lib/firebase/settingsService";
import ProfileSection from "./ProfileSection";

import AppearanceSection from "./AppearanceSection";
 
import SystemConfigSection from "./SystemConfiguration";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import ErrorMessage from "@/components/ui/ErrorMessage";

export default function SettingsClientPage() {
 const {data: session} = useSession();
 const {t} = useTranslation();
 const [activeTab, setActiveTab] = useState("profile");
 const [settings, setSettings] = useState<SettingsData | null>(null);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState("");
 const [success, setSuccess] = useState("");

 useEffect(() => {
  const loadSettings = async () => {
   try {
    setLoading(true);
    setError("");
    if (session?.user?.id) {
     const data = await SettingsService.getSettings(session.user.id);
     setSettings(data || {userId: session.user.id});
    }
   } catch (err) {
    setError(t("settings.loadError") || "Failed to load settings");
    console.error(err);
   } finally {
    setLoading(false);
   }
  };

  loadSettings();
 }, [session, t]);

 const handleSave = async (section: string, data: any): Promise<boolean> => {
  try {
   setError("");
   setSuccess("");
   if (session?.user?.id) {
    await SettingsService.updateSettings(session.user.id, {
     [section]: data,
    });
    setSettings((prev) => ({
     ...prev,
     [section]: data,
    }));
    setSuccess(t("settings.saveSuccess") || "Settings saved successfully");
    return true;
   }
   return false;
  } catch (err) {
   setError(t("settings.saveError") || "Failed to save settings");
   console.error(err);
   return false;
  }
 };

 if (loading) {
  return (
   <div className="flex justify-center items-center h-64">
    <LoadingSpinner />
   </div>
  );
 }

 return (
  <div className="p-6 max-w-4xl mx-auto">
   <h1 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white">
    {t("settings.title")}
   </h1>

   {/* Tab Navigation */}
   <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
    {["profile", "system", "appearance"].map((tab) => (
     <button
      key={tab}
      onClick={() => setActiveTab(tab)}
      className={`px-4 py-2 font-medium text-sm focus:outline-none transition-colors ${
       activeTab === tab
        ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
        : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
      }`}>
      {t(`settings.${tab}`)}
     </button>
    ))}
   </div>

   {/* Status Messages */}
   {error && <ErrorMessage message={error} />}
   {success && (
    <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
     {success}
    </div>
   )}

   {/* Tab Content with Animation */}
   <AnimatePresence mode="wait">
    <motion.div
     key={activeTab}
     initial={{opacity: 0, y: 10}}
     animate={{opacity: 1, y: 0}}
     exit={{opacity: 0, y: -10}}
     transition={{duration: 0.2}}
     className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
     {activeTab === "profile" && (
      <ProfileSection
       settings={settings?.profile}
       onSave={handleSave}
      />
     )}
     {activeTab === "system" && (
      <SystemConfigSection
       settings={settings?.system}
       onSave={handleSave}
      />
     )}
     {activeTab === "appearance" && (
      <AppearanceSection
       settings={settings?.appearance}
       onSave={handleSave}
      />
     )}
    </motion.div>
   </AnimatePresence>
  </div>
 );
}
