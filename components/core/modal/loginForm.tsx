"use client";
import {motion} from "framer-motion";
import {signIn} from "next-auth/react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useState} from "react";

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

export default function LoginForm({
 searchParams,
}: {
 searchParams?: {callbackUrl: string};
}) {
 const {push} = useRouter();
 const [error, setError] = useState("");
 const [isLoading, setIsLoading] = useState(false);

 const callbackUrl = searchParams?.callbackUrl || "/dashboard";

 const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  setIsLoading(true);

  const formData = new FormData(e.currentTarget as HTMLFormElement);

  try {
   const res = await signIn("credentials", {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    redirect: false,
    callbackUrl,
   });

   if (!res?.error) {
    push(callbackUrl);
   } else {
    setError("Invalid Email or Password");
   }
  } catch (error) {
   setError("An unexpected error occurred");
  } finally {
   setIsLoading(false);
  }
 };

 return (
  <motion.div
   className="bg-white/90 backdrop-blur-lg w-full max-w-md rounded-2xl shadow-xl overflow-hidden"
   initial="hidden"
   animate="visible"
   variants={containerVariants}>
   <div className="p-8">
    <motion.div variants={itemVariants}>
     <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
      Selamat Datang Kembali
     </h1>
     <p className="text-center text-gray-600 mb-8">
      Mohon masukan email dan password anda.
     </p>
    </motion.div>

    {error && (
     <motion.div
      variants={itemVariants}
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {error}
     </motion.div>
    )}

    <motion.form
     onSubmit={handleLogin}
     className="space-y-6"
     variants={containerVariants}>
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
       className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
       placeholder="your@email.com"
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

     <motion.div variants={itemVariants}>
      <button
       disabled={isLoading}
       type="submit"
       className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-primary/90 focus:outline-none disabled:opacity-75">
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
        "Masuk"
       )}
      </button>
     </motion.div>
    </motion.form>

    <motion.div
     className="mt-6 text-center"
     variants={itemVariants}>
     <p className="text-sm text-gray-600">
      Belum punya akun?{" "}
      <Link
       href="/register"
       className="font-medium text-blue-600 hover:text-blue-500">
       Daftar
      </Link>
     </p>
    </motion.div>
   </div>
  </motion.div>
 );
}
