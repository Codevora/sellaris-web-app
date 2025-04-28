"use client";

import {useState} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useSession} from "next-auth/react";
import {useTranslation} from "react-i18next";
import {SettingsService} from "@/lib/firebase/settingsService";
import ErrorMessage from "@/components/ui/ErrorMessage";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
 

const schema = yup.object().shape({
 name: yup.string().required("Name is required"),
 email: yup.string().email("Invalid email").required("Email is required"),
 currentPassword: yup.string().when("newPassword", {
  is: (newPassword: string) => !!newPassword,
  then: (schema) => schema.required("Current password is required"),
 }),
 newPassword: yup
  .string()
  .min(8, "Password must be at least 8 characters")
  .matches(
   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
   "Password must contain at least one uppercase, one lowercase, and one number"
  ),
 confirmPassword: yup
  .string()
  .oneOf([yup.ref("newPassword")], "Passwords must match"),
});

interface ProfileSectionProps {
 settings?: {
  name?: string;
  photoURL?: string;
 };
 onSave: (section: string, data: any) => Promise<boolean>;
}

export default function ProfileSection({
 settings,
 onSave,
}: ProfileSectionProps) {
 const {data: session} = useSession();
 const {t} = useTranslation();
 const [photo, setPhoto] = useState(settings?.photoURL || "");
 const [uploading, setUploading] = useState(false);
 const [saveError, setSaveError] = useState("");

 const {
  register,
  handleSubmit,
  formState: {errors, isSubmitting},
  reset,
  setError: setFormError,
 } = useForm({
  resolver: yupResolver(schema),
  defaultValues: {
   name: settings?.name || session?.user?.name || "",
   email: session?.user?.email || "",
   currentPassword: "",
   newPassword: "",
   confirmPassword: "",
  },
 });

 const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  if (!e.target.files?.[0]) return;

  try {
   setUploading(true);
   const file = e.target.files[0];

   // Validate file type and size
   if (!file.type.startsWith("image/")) {
    throw new Error("Only image files are allowed");
   }
   if (file.size > 5 * 1024 * 1024) {
    // 5MB
    throw new Error("File size must be less than 5MB");
   }

   const photoURL = await SettingsService.uploadFile(
    session?.user?.id || "",
    file
   );
   setPhoto(photoURL);
   await onSave("profile", {photoURL});
  } catch (error) {
   setSaveError(
    error instanceof Error ? error.message : "Failed to upload photo"
   );
  } finally {
   setUploading(false);
  }
 };

 const handlePhotoRemove = async () => {
  try {
   if (!photo) return;

   await SettingsService.deleteFile(photo);
   setPhoto("");
   await onSave("profile", {photoURL: null});
  } catch (error) {
   setSaveError("Failed to remove photo");
   console.error(error);
  }
 };

 const onSubmit = async (data: any) => {
  try {
   const profileData: any = {name: data.name};

   if (data.newPassword) {
    profileData.password = data.newPassword;
   }

   const success = await onSave("profile", profileData);

   if (success) {
    reset({
     currentPassword: "",
     newPassword: "",
     confirmPassword: "",
    });
   }
  } catch (error) {
   setSaveError(t("settings.saveError") || "Failed to save profile");
   console.error(error);
  }
 };

 return (
  <div className="space-y-6">
   {/* Photo Upload */}
   <div className="flex items-center gap-4">
    <div className="relative h-24 w-24 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
     {photo ? (
      <img
       src={photo}
       alt="Profile"
       className="h-full w-full object-cover"
      />
     ) : (
      <div className="h-full w-full flex items-center justify-center text-2xl font-medium text-gray-600 dark:text-gray-300">
       {session?.user?.name?.charAt(0).toUpperCase()}
      </div>
     )}
     {uploading && (
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
       <LoadingSpinner />
      </div>
     )}
    </div>
    <div>
     <h3 className="text-lg font-medium text-gray-800 dark:text-white">
      {t("settings.profilePicture")}
     </h3>
     <div className="flex gap-2 mt-2">
      <label className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors">
       {t("settings.change")}
       <input
        type="file"
        className="hidden"
        onChange={handlePhotoUpload}
        accept="image/*"
        disabled={uploading}
       />
      </label>
      <button
       onClick={handlePhotoRemove}
       disabled={!photo || uploading}
       className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors">
       {t("settings.remove")}
      </button>
     </div>
    </div>
   </div>

   {/* Error Message */}
   {saveError && <ErrorMessage message={saveError} />}

   {/* Profile Form */}
   <form
    onSubmit={handleSubmit(onSubmit)}
    className="space-y-4">
    <div>
     <label
      htmlFor="name"
      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      {t("settings.name")}
     </label>
     <input
      id="name"
      type="text"
      {...register("name")}
      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
       errors.name
        ? "border-red-500 focus:ring-red-500"
        : "border-gray-300 dark:border-gray-600 focus:ring-blue-500 dark:bg-gray-700"
      }`}
      disabled={isSubmitting}
     />
     {errors.name && (
      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
       {errors.name.message}
      </p>
     )}
    </div>

    <div>
     <label
      htmlFor="email"
      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      {t("settings.email")}
     </label>
     <input
      id="email"
      type="email"
      {...register("email")}
      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
      disabled
     />
    </div>

    {/* Password Fields */}
    <div className="border-t pt-6 mt-6">
     <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
      {t("settings.changePassword")}
     </h3>

     <div className="space-y-4">
      <div>
       <label
        htmlFor="currentPassword"
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {t("settings.currentPassword")}
       </label>
       <input
        id="currentPassword"
        type="password"
        {...register("currentPassword")}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
         errors.currentPassword
          ? "border-red-500 focus:ring-red-500"
          : "border-gray-300 dark:border-gray-600 focus:ring-blue-500 dark:bg-gray-700"
        }`}
        disabled={isSubmitting}
       />
       {errors.currentPassword && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
         {errors.currentPassword.message}
        </p>
       )}
      </div>

      <div>
       <label
        htmlFor="newPassword"
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {t("settings.newPassword")}
       </label>
       <input
        id="newPassword"
        type="password"
        {...register("newPassword")}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
         errors.newPassword
          ? "border-red-500 focus:ring-red-500"
          : "border-gray-300 dark:border-gray-600 focus:ring-blue-500 dark:bg-gray-700"
        }`}
        disabled={isSubmitting}
       />
       {errors.newPassword && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
         {errors.newPassword.message}
        </p>
       )}
      </div>

      <div>
       <label
        htmlFor="confirmPassword"
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {t("settings.confirmPassword")}
       </label>
       <input
        id="confirmPassword"
        type="password"
        {...register("confirmPassword")}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
         errors.confirmPassword
          ? "border-red-500 focus:ring-red-500"
          : "border-gray-300 dark:border-gray-600 focus:ring-blue-500 dark:bg-gray-700"
        }`}
        disabled={isSubmitting}
       />
       {errors.confirmPassword && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
         {errors.confirmPassword.message}
        </p>
       )}
      </div>
     </div>
    </div>

    <div className="pt-4">
     <button
      type="submit"
      disabled={isSubmitting}
      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-colors">
      {isSubmitting ? (
       <span className="flex items-center justify-center">
        <LoadingSpinner className="mr-2" />
        {t("settings.saving")}
       </span>
      ) : (
       t("settings.save")
      )}
     </button>
    </div>
   </form>
  </div>
 );
}
