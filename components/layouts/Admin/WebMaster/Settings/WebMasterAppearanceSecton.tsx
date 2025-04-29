"use client";

import {useState, useEffect} from "react";
import {useTheme} from "next-themes";
import {useTranslation} from "react-i18next";
import {SettingsService} from "@/lib/firebase/settingsService";
import ErrorMessage from "@/components/ui/ErrorMessage";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const themes = [
 {
  id: "light",
  name: "Light",
  class: "bg-white border border-gray-200",
 },
 {
  id: "dark",
  name: "Dark",
  class: "bg-gray-900 border border-gray-700",
 },
 {
  id: "system",
  name: "System",
  class: "bg-gradient-to-r from-gray-100 to-gray-800 border border-gray-300",
 },
];

const colors = [
 {id: "blue", name: "Blue", class: "bg-blue-500"},
 {id: "green", name: "Green", class: "bg-green-500"},
 {id: "red", name: "Red", class: "bg-red-500"},
 {id: "purple", name: "Purple", class: "bg-purple-500"},
 {id: "orange", name: "Orange", class: "bg-orange-500"},
];

interface WebMasterAppearanceSectionProps {
 settings?: {
  theme?: "light" | "dark" | "system";
  accentColor?: string;
 };
 onSave: (section: string, data: any) => Promise<boolean>;
}

export default function WebMasterAppearanceSection({
 settings,
 onSave,
}: WebMasterAppearanceSectionProps) {
 const {theme, setTheme} = useTheme();
 const {t} = useTranslation();
 const [selectedTheme, setSelectedTheme] = useState(theme || "system");
 const [selectedColor, setSelectedColor] = useState(
  settings?.accentColor || "blue"
 );
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState("");

 useEffect(() => {
  if (settings?.theme) {
   setSelectedTheme(settings.theme);
  }
  if (settings?.accentColor) {
   setSelectedColor(settings.accentColor);
  }
 }, [settings]);

 const handleSave = async () => {
  try {
   setLoading(true);
   setError("");
   const success = await onSave("appearance", {
    theme: selectedTheme,
    accentColor: selectedColor,
   });
   if (!success) {
    throw new Error("Failed to save appearance settings");
   }
  } catch (err) {
   setError(t("settings.saveError") || "Failed to save settings");
   console.error(err);
  } finally {
   setLoading(false);
  }
 };

 return (
  <div className="space-y-8">
   {error && <ErrorMessage message={error} />}

   {/* Theme Selection */}
   <div>
    <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
     Theme
    </h3>
    <div className="grid grid-cols-3 gap-4">
     {themes.map((t) => (
      <div key={t.id}>
       <input
        type="radio"
        id={`theme-${t.id}`}
        name="theme"
        checked={selectedTheme === t.id}
        onChange={() => {
         setSelectedTheme(t.id);
         setTheme(t.id);
        }}
        className="hidden peer"
        disabled={loading}
       />
       <label
        htmlFor={`theme-${t.id}`}
        className={`block p-4 border rounded-md cursor-pointer transition-colors ${
         selectedTheme === t.id
          ? "border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800"
          : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
        }`}>
        <div className={`w-full h-8 rounded ${t.class}`} />
        <span className="block mt-2 text-center text-sm font-medium text-gray-800 dark:text-gray-200">
         {t.name}
        </span>
       </label>
      </div>
     ))}
    </div>
   </div>

   {/* Color Selection */}
   <div>
    <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
     Accent Color
    </h3>
    <div className="flex gap-3">
     {colors.map((color) => (
      <div
       key={color.id}
       className="flex flex-col items-center">
       <button
        onClick={() => setSelectedColor(color.id)}
        className={`h-10 w-10 rounded-full ${
         color.class
        } transition-transform ${
         selectedColor === color.id
          ? "ring-2 ring-offset-2 ring-blue-500 scale-110"
          : "hover:scale-105"
        }`}
        aria-label={color.name}
        disabled={loading}
       />
       <span className="text-xs mt-1 text-gray-700 dark:text-gray-300">
        {color.name}
       </span>
      </div>
     ))}
    </div>
   </div>

   <div className="pt-4">
    <button
     onClick={handleSave}
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
