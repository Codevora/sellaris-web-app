"use client";

import { CompanyData } from "@/types/company";
import {motion} from "framer-motion";
import {useState, useEffect} from "react";
import {
 FaBuilding,
 FaEnvelope,
 FaPhone,
 FaMapMarkerAlt,
 FaIndustry,
 FaUsers,
} from "react-icons/fa";

interface CompanySettingsFormProps {
 initialData?: Partial<CompanyData>;
 onSave: (data: Partial<CompanyData>) => Promise<boolean>;
}

const CompanySettingsForm = ({
 initialData,
 onSave,
}: CompanySettingsFormProps) => {
 const [formData, setFormData] = useState({
  companyName: "",
  companyEmail: "",
  companyPhone: "",
  companyAddress: "",
  companyIndustry: "",
  companySize: "",
 });
 const [isEditing, setIsEditing] = useState(false);
 const [isLoading, setIsLoading] = useState(false);

 useEffect(() => {
  if (initialData) {
   setFormData({
    companyName: initialData.companyName || "",
    companyEmail: initialData.companyEmail || "",
    companyPhone: initialData.companyPhone || "",
    companyAddress: initialData.companyAddress || "",
    companyIndustry: initialData.companyIndustry || "",
    companySize: initialData.companySize || "",
   });
  }
 }, [initialData]);

 const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
 ) => {
  const {name, value} = e.target;
  setFormData((prev) => ({...prev, [name]: value}));
 };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  const success = await onSave(formData);
  if (success) {
   setIsEditing(false);
  }

  setIsLoading(false);
 };

 const industries = [
  {value: "", label: "Pilih Industri"},
  {value: "technology", label: "Teknologi"},
  {value: "finance", label: "Keuangan"},
  {value: "healthcare", label: "Kesehatan"},
  {value: "education", label: "Pendidikan"},
  {value: "manufacturing", label: "Manufaktur"},
  {value: "retail", label: "Retail"},
  {value: "other", label: "Lainnya"},
 ];

 const companySizes = [
  {value: "", label: "Pilih Ukuran"},
  {value: "1-10", label: "1-10 Karyawan"},
  {value: "11-50", label: "11-50 Karyawan"},
  {value: "51-200", label: "51-200 Karyawan"},
  {value: "201-500", label: "201-500 Karyawan"},
  {value: "501-1000", label: "501-1000 Karyawan"},
  {value: "1000+", label: "1000+ Karyawan"},
 ];

 return (
  <motion.div
   initial={{opacity: 0, y: 20}}
   animate={{opacity: 1, y: 0}}
   transition={{duration: 0.5, delay: 0.3}}
   className="mt-8 bg-white rounded-xl shadow-md overflow-hidden">
   <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6 text-white">
    <h2 className="text-xl font-bold flex items-center gap-3">
     <FaBuilding className="text-xl" />
     Company Information
    </h2>
    <p className="text-indigo-100 mt-1">Manage your company details</p>
   </div>

   <div className="p-6">
    {!isEditing ? (
     <div className="space-y-4">
      {formData.companyName ? (
       <div className="flex flex-col gap-1">
        <label className="text-gray-500 text-sm">Company Name</label>
        <p className="px-4 py-2 bg-gray-50 rounded-lg">
         {formData.companyName}
        </p>
       </div>
      ) : null}

      {formData.companyEmail ? (
       <div className="flex flex-col gap-1">
        <label className="text-gray-500 text-sm">Company Email</label>
        <p className="px-4 py-2 bg-gray-50 rounded-lg">
         {formData.companyEmail}
        </p>
       </div>
      ) : null}

      {formData.companyPhone ? (
       <div className="flex flex-col gap-1">
        <label className="text-gray-500 text-sm">Company Phone</label>
        <p className="px-4 py-2 bg-gray-50 rounded-lg">
         {formData.companyPhone}
        </p>
       </div>
      ) : null}

      {formData.companyAddress ? (
       <div className="flex flex-col gap-1">
        <label className="text-gray-500 text-sm">Company Address</label>
        <p className="px-4 py-2 bg-gray-50 rounded-lg">
         {formData.companyAddress}
        </p>
       </div>
      ) : null}

      {formData.companyIndustry ? (
       <div className="flex flex-col gap-1">
        <label className="text-gray-500 text-sm">Industry</label>
        <p className="px-4 py-2 bg-gray-50 rounded-lg capitalize">
         {formData.companyIndustry}
        </p>
       </div>
      ) : null}

      {formData.companySize ? (
       <div className="flex flex-col gap-1">
        <label className="text-gray-500 text-sm">Company Size</label>
        <p className="px-4 py-2 bg-gray-50 rounded-lg">
         {
          companySizes.find((size) => size.value === formData.companySize)
           ?.label
         }
        </p>
       </div>
      ) : null}

      <button
       onClick={() => setIsEditing(true)}
       className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors">
       {formData.companyName ? "Edit Company Info" : "Add Company Info"}
      </button>
     </div>
    ) : (
     <form
      onSubmit={handleSubmit}
      className="space-y-4">
      <div className="flex flex-col gap-1">
       <label className="text-gray-700 flex items-center gap-2">
        <FaBuilding className="text-indigo-500" />
        Company Name
       </label>
       <input
        name="companyName"
        type="text"
        value={formData.companyName}
        onChange={handleChange}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
       />
      </div>

      <div className="flex flex-col gap-1">
       <label className="text-gray-700 flex items-center gap-2">
        <FaEnvelope className="text-indigo-500" />
        Company Email
       </label>
       <input
        name="companyEmail"
        type="email"
        value={formData.companyEmail}
        onChange={handleChange}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
       />
      </div>

      <div className="flex flex-col gap-1">
       <label className="text-gray-700 flex items-center gap-2">
        <FaPhone className="text-indigo-500" />
        Company Phone
       </label>
       <input
        name="companyPhone"
        type="tel"
        value={formData.companyPhone}
        onChange={handleChange}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
       />
      </div>

      <div className="flex flex-col gap-1">
       <label className="text-gray-700 flex items-center gap-2">
        <FaMapMarkerAlt className="text-indigo-500" />
        Company Address
       </label>
       <input
        name="companyAddress"
        type="text"
        value={formData.companyAddress}
        onChange={handleChange}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
       />
      </div>

      <div className="flex flex-col gap-1">
       <label className="text-gray-700 flex items-center gap-2">
        <FaIndustry className="text-indigo-500" />
        Industry
       </label>
       <select
        name="companyIndustry"
        value={formData.companyIndustry}
        onChange={handleChange}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
        {industries.map((industry) => (
         <option
          key={industry.value}
          value={industry.value}>
          {industry.label}
         </option>
        ))}
       </select>
      </div>

      <div className="flex flex-col gap-1">
       <label className="text-gray-700 flex items-center gap-2">
        <FaUsers className="text-indigo-500" />
        Company Size
       </label>
       <select
        name="companySize"
        value={formData.companySize}
        onChange={handleChange}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
        {companySizes.map((size) => (
         <option
          key={size.value}
          value={size.value}>
          {size.label}
         </option>
        ))}
       </select>
      </div>

      <div className="flex gap-4 mt-6">
       <button
        type="button"
        onClick={() => setIsEditing(false)}
        className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
        Cancel
       </button>
       <button
        type="submit"
        disabled={isLoading}
        className="flex-1 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors disabled:opacity-75">
        {isLoading ? "Saving..." : "Save Changes"}
       </button>
      </div>
     </form>
    )}
   </div>
  </motion.div>
 );
};

export default CompanySettingsForm;
