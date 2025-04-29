"use client";

import {useState} from "react";
import {useTranslation} from "react-i18next";
import {SettingsService} from "@/lib/firebase/settingsService";
import ErrorMessage from "@/components/ui/ErrorMessage";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const currencies = [
 {code: "IDR", name: "Indonesian Rupiah"},
 {code: "USD", name: "US Dollar"},
 {code: "EUR", name: "Euro"},
];

const timezones = [
 {value: "Asia/Jakarta", label: "Asia/Jakarta (WIB)"},
 {value: "Asia/Singapore", label: "Asia/Singapore"},
 {value: "UTC", label: "UTC"},
 {value: "America/New_York", label: "America/New_York (EST)"},
 {value: "Europe/London", label: "Europe/London (GMT)"},
];

interface WebMasterSystemConfigSectionProps {
 settings?: {
  currency?: string;
  timezone?: string;
  businessHours?: {
   start: string;
   end: string;
  };
 };
 onSave: (section: string, data: any) => Promise<boolean>;
}

export default function WebMasterSystemConfigSection({
 settings,
 onSave,
}: WebMasterSystemConfigSectionProps) {
 const {t} = useTranslation();
 const [config, setConfig] = useState({
  currency: settings?.currency || "IDR",
  timezone: settings?.timezone || "Asia/Jakarta",
  businessHours: settings?.businessHours || {start: "08:00", end: "17:00"},
 });
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState("");

 const handleSubmit = async () => {
  try {
   setLoading(true);
   setError("");
   const success = await onSave("system", config);
   if (!success) {
    throw new Error("Failed to save system settings");
   }
  } catch (err) {
   setError(t("settings.saveError") || "Failed to save settings");
   console.error(err);
  } finally {
   setLoading(false);
  }
 };

 return (
  <div className="space-y-6">
   {error && <ErrorMessage message={error} />}

   {/* Business Hours */}
   <div>
    <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
     Business Hours
    </h3>
    <div className="flex gap-4">
     <div className="flex-1">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
       Opening Time
      </label>
      <input
       type="time"
       value={config.businessHours.start}
       onChange={(e) =>
        setConfig({
         ...config,
         businessHours: {...config.businessHours, start: e.target.value},
        })
       }
       className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
       disabled={loading}
      />
     </div>
     <div className="flex-1">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
       Closing Time
      </label>
      <input
       type="time"
       value={config.businessHours.end}
       onChange={(e) =>
        setConfig({
         ...config,
         businessHours: {...config.businessHours, end: e.target.value},
        })
       }
       className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
       disabled={loading}
      />
     </div>
    </div>
   </div>

   {/* Currency */}
   <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
     Default Currency
    </label>
    <select
     value={config.currency}
     onChange={(e) => setConfig({...config, currency: e.target.value})}
     className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
     disabled={loading}>
     {currencies.map((currency) => (
      <option
       key={currency.code}
       value={currency.code}>
       {currency.name} ({currency.code})
      </option>
     ))}
    </select>
   </div>

   {/* Timezone */}
   <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
     Timezone
    </label>
    <select
     value={config.timezone}
     onChange={(e) => setConfig({...config, timezone: e.target.value})}
     className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
     disabled={loading}>
     {timezones.map((tz) => (
      <option
       key={tz.value}
       value={tz.value}>
       {tz.label}
      </option>
     ))}
    </select>
   </div>

   <div className="pt-4">
    <button
     onClick={handleSubmit}
     disabled={loading}
     className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-colors">
     {loading ? (
      <span className="flex items-center justify-center">
       <LoadingSpinner className="mr-2" />
       {t("settings.saving")}
      </span>
     ) : (
      t("settings.save")
     )}
    </button>
   </div>
  </div>
 );
}
