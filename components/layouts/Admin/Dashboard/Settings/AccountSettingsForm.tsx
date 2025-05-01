"use client";

import {useEffect, useState} from "react";
import {motion} from "framer-motion";
import {
 FaUser,
 FaEnvelope,
 FaPhone,
 FaLock,
 FaSave,
 FaEdit,
} from "react-icons/fa";
import { useUserData } from "@/hooks/useUserData";
import CompanySettingsForm from "./CompanySettingsForm";
import { CompanyData } from "@/types/company";

const AccountSettingsForm = () => {
const {userData, companyData, isLoading, updateUserData, saveCompanyData} =
 useUserData();
const [isEditing, setIsEditing] = useState(false);
const [formData, setFormData] = useState({
 fullname: "",
 email: "",
 phone: "",
});

useEffect(() => {
 if (userData) {
  setFormData({
   fullname: userData.fullname || "",
   email: userData.email || "",
   phone: userData.phone || "",
  });
 }
}, [userData]);

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
 const {name, value} = e.target;
 setFormData((prev) => ({
  ...prev,
  [name]: value,
 }));
};

const handleSubmit = async (e: React.FormEvent) => {
 e.preventDefault();

 const success = await updateUserData({
  fullname: formData.fullname,
  phone: formData.phone,
 });

 if (success) {
  setIsEditing(false);
 }
};

if (isLoading) {
 return (
  <div className="flex items-center justify-center h-64">
   <motion.div
    animate={{rotate: 360}}
    transition={{duration: 1, repeat: Infinity, ease: "linear"}}
    className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full"
   />
  </div>
 );
}

if (!userData) {
 return (
  <div className="flex items-center justify-center h-64">
   <p className="text-gray-500">No user data found</p>
   <button
    onClick={() => window.location.reload()}
    className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-lg">
    Refresh
   </button>
  </div>
 );
}

 return (
  <div className="max-w-4xl mx-auto p-6">
   <motion.div
    initial={{opacity: 0, y: 20}}
    animate={{opacity: 1, y: 0}}
    transition={{duration: 0.5}}
    className="bg-white rounded-xl shadow-md overflow-hidden">
    <div className="bg-gradient-to-r from-teal-500 to-blue-500 p-6 text-white">
     <h1 className="text-2xl font-bold flex items-center gap-3">
      <FaUser className="text-2xl" />
      Account Settings
     </h1>
     <p className="text-teal-100 mt-1">Manage your personal information</p>
    </div>

    <div className="p-6">
     <form onSubmit={handleSubmit}>
      <motion.div
       layout
       className="space-y-6">
       {/* Fullname Field */}
       <div className="flex flex-col gap-2">
        <label className="text-gray-700 font-medium flex items-center gap-2">
         <FaUser className="text-teal-500" />
         Full Name
        </label>
        {isEditing ? (
         <motion.input
          initial={{opacity: 0, x: -10}}
          animate={{opacity: 1, x: 0}}
          type="text"
          name="fullname"
          value={formData.fullname}
          onChange={handleInputChange}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          required
         />
        ) : (
         <motion.p
          initial={{opacity: 0, x: -10}}
          animate={{opacity: 1, x: 0}}
          className="px-4 py-2 bg-gray-50 rounded-lg">
          {userData.fullname || "Not set"}
         </motion.p>
        )}
       </div>

       {/* Email Field */}
       <div className="flex flex-col gap-2">
        <label className="text-gray-700 font-medium flex items-center gap-2">
         <FaEnvelope className="text-teal-500" />
         Email Address
        </label>
        <motion.p className="px-4 py-2 bg-gray-50 rounded-lg">
         {userData.email}
        </motion.p>
        <p className="text-sm text-gray-500">Email cannot be changed</p>
       </div>

       {/* Phone Field */}
       <div className="flex flex-col gap-2">
        <label className="text-gray-700 font-medium flex items-center gap-2">
         <FaPhone className="text-teal-500" />
         Phone Number
        </label>
        {isEditing ? (
         <motion.input
          initial={{opacity: 0, x: -10}}
          animate={{opacity: 1, x: 0}}
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
         />
        ) : (
         <motion.p
          initial={{opacity: 0, x: -10}}
          animate={{opacity: 1, x: 0}}
          className="px-4 py-2 bg-gray-50 rounded-lg">
          {userData.phone || "Not set"}
         </motion.p>
        )}
       </div>

       {/* Role Field (readonly) */}
       <div className="flex flex-col gap-2">
        <label className="text-gray-700 font-medium flex items-center gap-2">
         <FaLock className="text-teal-500" />
         Account Role
        </label>
        <motion.div
         initial={{opacity: 0}}
         animate={{opacity: 1}}
         className="px-4 py-2 bg-gray-50 rounded-lg capitalize">
         {userData.role}
        </motion.div>
       </div>
      </motion.div>

      <div className="mt-8 flex gap-4">
       {isEditing ? (
        <>
         <motion.button
          whileHover={{scale: 1.05}}
          whileTap={{scale: 0.95}}
          type="submit"
          className="px-6 py-2 bg-teal-500 text-white rounded-lg flex items-center gap-2 shadow-md hover:bg-teal-600 transition-colors">
          <FaSave /> Save Changes
         </motion.button>
         <motion.button
          whileHover={{scale: 1.05}}
          whileTap={{scale: 0.95}}
          type="button"
          onClick={() => {
           setIsEditing(false);
           setFormData({
            fullname: userData.fullname || "",
            email: userData.email || "",
            phone: userData.phone || "",
           });
          }}
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
          Cancel
         </motion.button>
        </>
       ) : (
        <motion.button
         whileHover={{scale: 1.05}}
         whileTap={{scale: 0.95}}
         type="button"
         onClick={() => setIsEditing(true)}
         className="px-6 py-2 bg-teal-500 text-white rounded-lg flex items-center gap-2 shadow-md hover:bg-teal-600 transition-colors">
         <FaEdit /> Edit Profile
        </motion.button>
       )}
      </div>
     </form>
    </div>
   </motion.div>

   <CompanySettingsForm
    initialData={companyData || undefined}
    onSave={async (data: Partial<CompanyData>) => {
     const result = await saveCompanyData(data);
     return result !== undefined ? result : false;
    }}
   />

   {/* Account Security Section */}
   <motion.div
    initial={{opacity: 0, y: 20}}
    animate={{opacity: 1, y: 0}}
    transition={{duration: 0.5, delay: 0.2}}
    className="mt-8 bg-white rounded-xl shadow-md overflow-hidden">
    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-6 text-white">
     <h2 className="text-xl font-bold flex items-center gap-3">
      <FaLock className="text-xl" />
      Account Security
     </h2>
     <p className="text-blue-100 mt-1">Manage your account security settings</p>
    </div>

    <div className="p-6 space-y-6">
     <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
      <div>
       <h3 className="font-medium text-gray-800">Password</h3>
       <p className="text-sm text-gray-500">
        Last changed:{" "}
        {userData.updated_at?.toDate?.().toLocaleDateString() || "Unknown"}
       </p>
      </div>
      <motion.button
       whileHover={{scale: 1.05}}
       whileTap={{scale: 0.95}}
       className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors">
       Change Password
      </motion.button>
     </div>

     <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
      <div>
       <h3 className="font-medium text-gray-800">Two-Factor Authentication</h3>
       <p className="text-sm text-gray-500">Add an extra layer of security</p>
      </div>
      <motion.button
       whileHover={{scale: 1.05}}
       whileTap={{scale: 0.95}}
       className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300 transition-colors">
       Enable 2FA
      </motion.button>
     </div>
    </div>
   </motion.div>
  </div>
 );
};

export default AccountSettingsForm;
