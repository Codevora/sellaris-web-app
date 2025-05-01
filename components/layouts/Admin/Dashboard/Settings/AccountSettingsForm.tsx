"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaSave,
  FaEdit,
  FaBuilding,
  FaMapMarkerAlt,
  FaIndustry,
  FaUsers,
} from "react-icons/fa";
import { useUserData } from "@/hooks/useUserData";
import { CompanyData } from "@/types/company";

const AccountSettingsForm = () => {
  const { userData, companyData, isLoading, updateUserData, saveCompanyData } =
    useUserData();

  // Account form state
  const [isAccountEditing, setIsAccountEditing] = useState(false);
  const [accountForm, setAccountForm] = useState({
    fullname: "",
    email: "",
    phone: "",
  });

  // Company form state
  const [isCompanyEditing, setIsCompanyEditing] = useState(false);
  const [companyForm, setCompanyForm] = useState({
    companyName: "",
    companyEmail: "",
    companyPhone: "",
    companyAddress: "",
    companyIndustry: "",
    companySize: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  // Initialize forms with data
  useEffect(() => {
    if (userData) {
      setAccountForm({
        fullname: userData.fullname || "",
        email: userData.email || "",
        phone: userData.phone || "",
      });
    }

    if (companyData) {
      setCompanyForm({
        companyName: companyData.companyName || "",
        companyEmail: companyData.companyEmail || "",
        companyPhone: companyData.companyPhone || "",
        companyAddress: companyData.companyAddress || "",
        companyIndustry: companyData.companyIndustry || "",
        companySize: companyData.companySize || "",
      });
    }
  }, [userData, companyData]);

  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccountForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCompanyChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCompanyForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAccountSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const success = await updateUserData({
      fullname: accountForm.fullname,
      phone: accountForm.phone,
    });

    if (success) {
      setIsAccountEditing(false);
    }
    setIsSaving(false);
  };

  const handleCompanySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const success = await saveCompanyData(companyForm);
    if (success) {
      setIsCompanyEditing(false);
    }
    setIsSaving(false);
  };

  const industries = [
    { value: "", label: "Pilih Industri" },
    { value: "technology", label: "Teknologi" },
    { value: "finance", label: "Keuangan" },
    { value: "healthcare", label: "Kesehatan" },
    { value: "education", label: "Pendidikan" },
    { value: "manufacturing", label: "Manufaktur" },
    { value: "retail", label: "Retail" },
    { value: "other", label: "Lainnya" },
  ];

  const companySizes = [
    { value: "", label: "Pilih Ukuran" },
    { value: "1-10", label: "1-10 Karyawan" },
    { value: "11-50", label: "11-50 Karyawan" },
    { value: "51-200", label: "51-200 Karyawan" },
    { value: "201-500", label: "201-500 Karyawan" },
    { value: "501-1000", label: "501-1000 Karyawan" },
    { value: "1000+", label: "1000+ Karyawan" },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-gray-500">No user data found</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-lg"
        >
          Refresh
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Account Settings Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-md overflow-hidden"
      >
        <div className="bg-gradient-to-r from-teal-500 to-blue-500 p-6 text-white">
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <FaUser className="text-2xl" />
            Personal Information
          </h1>
          <p className="text-teal-100 mt-1">Manage your personal details</p>
        </div>

        <div className="p-6">
          <form onSubmit={handleAccountSubmit}>
            <motion.div layout className="space-y-6">
              {/* Fullname Field */}
              <div className="flex flex-col gap-2">
                <label className="text-gray-700 font-medium flex items-center gap-2">
                  <FaUser className="text-teal-500" />
                  Full Name
                </label>
                {isAccountEditing ? (
                  <motion.input
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    type="text"
                    name="fullname"
                    value={accountForm.fullname}
                    onChange={handleAccountChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    required
                  />
                ) : (
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="px-4 py-2 bg-gray-50 rounded-lg"
                  >
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
                {isAccountEditing ? (
                  <motion.input
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    type="tel"
                    name="phone"
                    value={accountForm.phone}
                    onChange={handleAccountChange}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                ) : (
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="px-4 py-2 bg-gray-50 rounded-lg"
                  >
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
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="px-4 py-2 bg-gray-50 rounded-lg capitalize"
                >
                  {userData.role}
                </motion.div>
              </div>
            </motion.div>

            <div className="mt-8 flex gap-4">
              {isAccountEditing ? (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={isSaving}
                    className="px-6 py-2 bg-teal-500 text-white rounded-lg flex items-center gap-2 shadow-md hover:bg-teal-600 transition-colors disabled:opacity-75"
                  >
                    <FaSave /> {isSaving ? "Saving..." : "Save Changes"}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => {
                      setIsAccountEditing(false);
                      setAccountForm({
                        fullname: userData.fullname || "",
                        email: userData.email || "",
                        phone: userData.phone || "",
                      });
                    }}
                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </motion.button>
                </>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => setIsAccountEditing(true)}
                  className="px-6 py-2 bg-teal-500 text-white rounded-lg flex items-center gap-2 shadow-md hover:bg-teal-600 transition-colors"
                >
                  <FaEdit /> Edit Personal Info
                </motion.button>
              )}
            </div>
          </form>
        </div>
      </motion.div>

      {/* Company Information Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-xl shadow-md overflow-hidden"
      >
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-6 text-white">
          <h2 className="text-xl font-bold flex items-center gap-3">
            <FaBuilding className="text-xl" />
            Company Information
          </h2>
          <p className="text-indigo-100 mt-1">
            {companyData?.companyName
              ? "Manage your company details"
              : "Add your company information"}
          </p>
        </div>

        <div className="p-6">
          {!isCompanyEditing ? (
            <div className="space-y-4">
              {companyForm.companyName ? (
                <div className="flex flex-col gap-1">
                  <label className="text-gray-500 text-sm flex items-center gap-2">
                    <FaBuilding className="text-indigo-500" />
                    Company Name
                  </label>
                  <p className="px-4 py-2 bg-gray-50 rounded-lg">
                    {companyForm.companyName}
                  </p>
                </div>
              ) : null}

              {companyForm.companyEmail ? (
                <div className="flex flex-col gap-1">
                  <label className="text-gray-500 text-sm flex items-center gap-2">
                    <FaEnvelope className="text-indigo-500" />
                    Company Email
                  </label>
                  <p className="px-4 py-2 bg-gray-50 rounded-lg">
                    {companyForm.companyEmail}
                  </p>
                </div>
              ) : null}

              {companyForm.companyPhone ? (
                <div className="flex flex-col gap-1">
                  <label className="text-gray-500 text-sm flex items-center gap-2">
                    <FaPhone className="text-indigo-500" />
                    Company Phone
                  </label>
                  <p className="px-4 py-2 bg-gray-50 rounded-lg">
                    {companyForm.companyPhone}
                  </p>
                </div>
              ) : null}

              {companyForm.companyAddress ? (
                <div className="flex flex-col gap-1">
                  <label className="text-gray-500 text-sm flex items-center gap-2">
                    <FaMapMarkerAlt className="text-indigo-500" />
                    Company Address
                  </label>
                  <p className="px-4 py-2 bg-gray-50 rounded-lg">
                    {companyForm.companyAddress}
                  </p>
                </div>
              ) : null}

              {companyForm.companyIndustry ? (
                <div className="flex flex-col gap-1">
                  <label className="text-gray-500 text-sm flex items-center gap-2">
                    <FaIndustry className="text-indigo-500" />
                    Industry
                  </label>
                  <p className="px-4 py-2 bg-gray-50 rounded-lg capitalize">
                    {companyForm.companyIndustry}
                  </p>
                </div>
              ) : null}

              {companyForm.companySize ? (
                <div className="flex flex-col gap-1">
                  <label className="text-gray-500 text-sm flex items-center gap-2">
                    <FaUsers className="text-indigo-500" />
                    Company Size
                  </label>
                  <p className="px-4 py-2 bg-gray-50 rounded-lg">
                    {
                      companySizes.find(
                        (size) => size.value === companyForm.companySize
                      )?.label
                    }
                  </p>
                </div>
              ) : null}

              <button
                onClick={() => setIsCompanyEditing(true)}
                className="mt-4 px-6 py-2 bg-indigo-500 text-white rounded-lg flex items-center gap-2 hover:bg-indigo-600 transition-colors"
              >
                <FaEdit />{" "}
                {companyForm.companyName
                  ? "Edit Company Info"
                  : "Add Company Info"}
              </button>
            </div>
          ) : (
            <form onSubmit={handleCompanySubmit} className="space-y-4">
              <div className="flex flex-col gap-1">
                <label className="text-gray-700 flex items-center gap-2">
                  <FaBuilding className="text-indigo-500" />
                  Company Name
                </label>
                <input
                  name="companyName"
                  type="text"
                  value={companyForm.companyName}
                  onChange={handleCompanyChange}
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
                  value={companyForm.companyEmail}
                  onChange={handleCompanyChange}
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
                  value={companyForm.companyPhone}
                  onChange={handleCompanyChange}
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
                  value={companyForm.companyAddress}
                  onChange={handleCompanyChange}
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
                  value={companyForm.companyIndustry}
                  onChange={handleCompanyChange}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {industries.map((industry) => (
                    <option key={industry.value} value={industry.value}>
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
                  value={companyForm.companySize}
                  onChange={handleCompanyChange}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {companySizes.map((size) => (
                    <option key={size.value} value={size.value}>
                      {size.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsCompanyEditing(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors disabled:opacity-75"
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>

      {/* Account Security Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white rounded-xl shadow-md overflow-hidden"
      >
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-6 text-white">
          <h2 className="text-xl font-bold flex items-center gap-3">
            <FaLock className="text-xl" />
            Account Security
          </h2>
          <p className="text-blue-100 mt-1">
            Manage your account security settings
          </p>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-800">Password</h3>
              <p className="text-sm text-gray-500">
                Last changed:{" "}
                {userData.updated_at?.toDate?.().toLocaleDateString() ||
                  "Unknown"}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors"
            >
              Change Password
            </motion.button>
          </div>

          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-medium text-gray-800">
                Two-Factor Authentication
              </h3>
              <p className="text-sm text-gray-500">
                Add an extra layer of security
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300 transition-colors"
            >
              Enable 2FA
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AccountSettingsForm;