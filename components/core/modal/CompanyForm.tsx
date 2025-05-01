"use client";
import {motion} from "framer-motion";
import {useState} from "react";
import {useRouter} from "next/navigation";

const containerVariants = {
 hidden: {opacity: 0, y: 20},
 visible: {
  opacity: 1,
  y: 0,
  transition: {
   duration: 0.5,
   staggerChildren: 0.1,
  },
 },
};

const itemVariants = {
 hidden: {opacity: 0, y: 10},
 visible: {opacity: 1, y: 0},
};

interface CompanyFormProps {
 userId: string;
 initialData: {
  fullname: string;
  email: string;
  phone: string;
  password: string;
 };
 onSkip: () => void;
}

export function CompanyForm({userId, initialData, onSkip}: CompanyFormProps) {
 const [formData, setFormData] = useState({
  companyName: "",
  companyEmail: "",
  companyPhone: "",
  companyAddress: "",
  companyIndustry: "",
  companySize: "",
 });
 const [isLoading, setIsLoading] = useState(false);
 const [error, setError] = useState("");
 const router = useRouter();

 const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
 ) => {
  const {name, value} = e.target;
  setFormData((prev) => ({...prev, [name]: value}));
 };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  setError("");

  try {
   // Kirim data perusahaan ke API
   const response = await fetch("/api/auth/update-user", {
    method: "POST",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify({
     userId,
     companyData: {
      name: formData.companyName,
      email: formData.companyEmail,
      phone: formData.companyPhone,
      address: formData.companyAddress,
      industry: formData.companyIndustry,
      size: formData.companySize,
     },
    }),
   });

   if (!response.ok) {
    throw new Error("Failed to save company information");
   }

   // Redirect ke dashboard setelah berhasil
   router.push("/dashboard");
  } catch (error: any) {
   setError(error.message || "Failed to save company information");
  } finally {
   setIsLoading(false);
  }
 };

 const handleSkip = async () => {
  setIsLoading(true);
  try {
   // Langsung redirect ke dashboard
   router.push("/dashboard");
  } catch (error: any) {
   setError(error.message || "Failed to proceed");
  } finally {
   setIsLoading(false);
  }
 };

 const isFormValid = () => {
  return (
   formData.companyName &&
   formData.companyEmail &&
   formData.companyPhone &&
   formData.companyAddress
  );
 };

 return (
  <motion.div
   className="bg-white/90 w-full max-w-md overflow-hidden"
   initial="hidden"
   animate="visible"
   variants={containerVariants}>
   <div className="p-8">
    <motion.div variants={itemVariants}>
     <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
      Informasi Perusahaan
     </h1>
     <p className="text-center text-gray-600 mb-8">
      Silakan lengkapi informasi perusahaan Anda (opsional)
     </p>
    </motion.div>

    <motion.form
     onSubmit={handleSubmit}
     className="space-y-6"
     variants={containerVariants}>
     <motion.div variants={itemVariants}>
      <label
       htmlFor="companyName"
       className="block text-sm font-medium text-gray-700">
       Nama Perusahaan
      </label>
      <input
       name="companyName"
       type="text"
       value={formData.companyName}
       onChange={handleChange}
       placeholder="Nama Perusahaan"
       className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
       required
      />
     </motion.div>

     <motion.div variants={itemVariants}>
      <label
       htmlFor="companyEmail"
       className="block text-sm font-medium text-gray-700">
       Email Perusahaan
      </label>
      <input
       name="companyEmail"
       type="email"
       value={formData.companyEmail}
       onChange={handleChange}
       placeholder="Email Perusahaan"
       className="w-full p-3 border border-gray-300 rounded-lg"
       required
      />
     </motion.div>

     <motion.div variants={itemVariants}>
      <label
       htmlFor="companyPhone"
       className="block text-sm font-medium text-gray-700">
       Telepon Perusahaan
      </label>
      <input
       name="companyPhone"
       type="tel"
       value={formData.companyPhone}
       onChange={handleChange}
       placeholder="Telepon Perusahaan"
       className="w-full p-3 border border-gray-300 rounded-lg"
       required
      />
     </motion.div>

     <motion.div variants={itemVariants}>
      <label
       htmlFor="companyAddress"
       className="block text-sm font-medium text-gray-700">
       Alamat Perusahaan
      </label>
      <input
       name="companyAddress"
       type="text"
       value={formData.companyAddress}
       onChange={handleChange}
       placeholder="Alamat Perusahaan"
       className="w-full p-3 border border-gray-300 rounded-lg"
       required
      />
     </motion.div>

     <motion.div variants={itemVariants}>
      <label
       htmlFor="companyIndustry"
       className="block text-sm font-medium text-gray-700">
       Industri
      </label>
      <select
       name="companyIndustry"
       value={formData.companyIndustry}
       onChange={handleChange}
       className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all">
       <option value="">Pilih Industri</option>
       <option value="technology">Teknologi</option>
       <option value="finance">Keuangan</option>
       <option value="healthcare">Kesehatan</option>
       <option value="education">Pendidikan</option>
       <option value="manufacturing">Manufaktur</option>
       <option value="retail">Retail</option>
       <option value="other">Lainnya</option>
      </select>
     </motion.div>

     <motion.div variants={itemVariants}>
      <label
       htmlFor="companySize"
       className="block text-sm font-medium text-gray-700">
       Ukuran Perusahaan
      </label>
      <select
       name="companySize"
       value={formData.companySize}
       onChange={handleChange}
       className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all">
       <option value="">Pilih Ukuran</option>
       <option value="1-10">1-10 Karyawan</option>
       <option value="11-50">11-50 Karyawan</option>
       <option value="51-200">51-200 Karyawan</option>
       <option value="201-500">201-500 Karyawan</option>
       <option value="501-1000">501-1000 Karyawan</option>
       <option value="1000+">1000+ Karyawan</option>
      </select>
     </motion.div>

     {error && (
      <motion.div variants={itemVariants}>
       <div className="text-red-500 text-sm text-center">{error}</div>
      </motion.div>
     )}

     <motion.div
      variants={itemVariants}
      className="flex space-x-4">
      <button
       type="button"
       onClick={handleSkip}
       disabled={isLoading}
       className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-75">
       Lewati
      </button>
      <button
       type="submit"
       disabled={isLoading || !isFormValid()}
       className={`flex-1 bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 ${
        isLoading || !isFormValid() ? "opacity-75 cursor-not-allowed" : ""
       }`}>
       {isLoading ? "Memproses..." : "Simpan"}
      </button>
     </motion.div>
    </motion.form>
   </div>
  </motion.div>
 );
}
