"use client";
import {motion} from "framer-motion";
import {useState} from "react";
import OTPVerification from "@/components/core/otp-verification";
import Link from "next/link";

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

export default function RegisterForm() {
 const [error, setError] = useState("");
 const [isLoading, setIsLoading] = useState(false);
 const [email, setEmail] = useState("");
 const [showOtp, setShowOtp] = useState(false);

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setError("");
  setIsLoading(true);

  const formData = new FormData(e.currentTarget);
  const data = {
   fullname: formData.get("fullname") as string,
   email: formData.get("email") as string,
   phone: formData.get("phone") as string,
   password: formData.get("password") as string,
  };

  if (!data.email || !data.password) {
   setError("Email and password are required");
   setIsLoading(false);
   return;
  }

  try {
   const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
   });

   const result = await res.json();

   if (!res.ok) {
    throw new Error(result.message || "Registration failed");
   }

   setEmail(data.email);
   setShowOtp(true);
  } catch (error: any) {
   setError(error.message);
  } finally {
   setIsLoading(false);
  }
 };

 if (showOtp) {
  return <OTPVerification email={email} />;
 }

 return (
  <motion.div
   className="bg-white/90 backdrop-blur-lg w-full max-w-md rounded-2xl shadow-xl overflow-hidden"
   initial="hidden"
   animate="visible"
   variants={containerVariants}>
   <div className="p-8">
    <motion.div variants={itemVariants}>
     <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
      Selamat Datang
     </h1>
     <p className="text-center text-gray-600 mb-8">
      Daftarkan diri anda untuk menikmati layanan kami.
     </p>
    </motion.div>

    <motion.form
     onSubmit={handleSubmit}
     className="space-y-6"
     variants={containerVariants}>
     <motion.div variants={itemVariants}>
      <label
       htmlFor="fullname"
       className="block text-sm font-medium text-gray-700">
       Nama
      </label>
      <input
       required
       name="fullname"
       type="text"
       placeholder="Full Name"
       className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
      />
     </motion.div>

     <motion.div variants={itemVariants}>
      <label
       htmlFor="email"
       className="block text-sm font-medium text-gray-700">
       Email
      </label>
      <input
       required
       name="email"
       type="email"
       placeholder="Email"
       className="w-full p-3 border border-gray-300 rounded-lg"
      />
     </motion.div>

     <motion.div variants={itemVariants}>
      <label
       htmlFor="phone"
       className="block text-sm font-medium text-gray-700">
       No. Handphone
      </label>
      <input
       required
       name="phone"
       type="tel"
       placeholder="No. Handphone"
       className="w-full p-3 border border-gray-300 rounded-lg"
      />
     </motion.div>

     <motion.div variants={itemVariants}>
      <label
       htmlFor="password"
       className="block text-sm font-medium text-gray-700">
       Password
      </label>
      <input
       required
       name="password"
       type="password"
       className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
       placeholder="••••••••"
      />
     </motion.div>

     {error && <div className="text-red-500 text-sm text-center">{error}</div>}

     <motion.div variants={itemVariants}>
      <button
       type="submit"
       disabled={isLoading}
       className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-primary/90 focus:outline-none focus:ring-2 disabled:opacity-75">
       {isLoading ? (
        <span className="flex items-center justify-center">
         <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24">
          <circle
           className="opacity-25"
           cx="12"
           cy="12"
           r="10"
           stroke="currentColor"
           strokeWidth="4"></circle>
          <path
           className="opacity-75"
           fill="currentColor"
           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
         </svg>
         Memproses...
        </span>
       ) : (
        "Daftar"
       )}
      </button>
     </motion.div>
    </motion.form>

    <motion.div
     className="mt-6 text-center"
     variants={itemVariants}>
     <p className="text-sm text-gray-600">
      Sudah punya akun?{" "}
      <Link
       href="/login"
       className="font-medium text-blue-600 hover:text-blue-500">
       Masuk
      </Link>
     </p>
    </motion.div>
   </div>
  </motion.div>
 );
}
