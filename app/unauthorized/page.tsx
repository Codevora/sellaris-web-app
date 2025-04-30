import Link from "next/link";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {redirect} from "next/navigation";
import {FaLock, FaArrowRight, FaHome} from "react-icons/fa";
import {MotionDiv, MotionButton} from "@/components/AnimatedComponent";
import Image from "next/image";

export default async function UnauthorizedPage() {
 const session = await getServerSession(authOptions);

 if (session?.user) {
  const redirectPath =
   session.user.role === "admin" ? "/admin/webmaster" : "/admin/dashboard";
  redirect(redirectPath);
 }

 return (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white overflow-hidden relative">
   {/* Floating background elements */}
   <div className="absolute inset-0 overflow-hidden">
    <MotionDiv
     animate={{
      x: [0, 20, 0],
      y: [0, 15, 0],
      transition: {duration: 15, repeat: Infinity, ease: "linear"},
     }}
     className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-blue-100/50 blur-xl"
    />
    <MotionDiv
     animate={{
      x: [0, -30, 0],
      y: [0, -20, 0],
      transition: {duration: 20, repeat: Infinity, ease: "linear"},
     }}
     className="absolute bottom-1/3 right-1/4 w-40 h-40 rounded-full bg-teal-100/50 blur-xl"
    />
   </div>

   <div className="relative z-10 w-full max-w-2xl px-4">
    <MotionDiv
     initial={{opacity: 0, y: 20}}
     animate={{opacity: 1, y: 0}}
     transition={{duration: 0.5}}
     className="bg-white/90 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
     <div className="p-8 md:p-12 text-center">
      <div className="flex justify-center mb-6">
       <div className="p-5 bg-red-100 rounded-full">
        <FaLock className="text-4xl text-red-500" />
       </div>
      </div>

      <h1 className="text-4xl font-bold text-gray-800 mb-4 font-raleway">
       Akses Dibatasi
      </h1>
      <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
       Anda tidak memiliki izin untuk mengakses halaman ini. Silakan hubungi
       administrator jika Anda merasa ini adalah kesalahan.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
       <MotionButton
        whileHover={{scale: 1.05}}
        whileTap={{scale: 0.95}}
        className="px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-500 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all">
        <Link
         href={session?.user ? "/dashboard" : "/login"}
         className="flex items-center justify-center gap-2">
         {session?.user ? (
          <>
           <FaHome /> Kembali ke Dashboard
          </>
         ) : (
          <>
           <FaArrowRight /> Login Sekarang
          </>
         )}
        </Link>
       </MotionButton>

       {session?.user && (
        <MotionButton
         whileHover={{scale: 1.05}}
         whileTap={{scale: 0.95}}
         className="px-6 py-3 border-2 border-gray-300 bg-white text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all">
         <Link
          href="/support"
          className="flex items-center justify-center gap-2">
          Hubungi Support
         </Link>
        </MotionButton>
       )}
      </div>
      <Link
       href="/"
       className="mt-4 inline-block hover:text-blue-500 hover:underline">
       Kembali ke halaman utama
      </Link>
     </div>

     <div className="bg-gray-50 p-6 text-center border-t border-gray-200">
      <div className="flex justify-center mb-4">
       {/* <Image
        src="/logo.png"
        alt="Sellaris Logo"
        width={120}
        height={40}
        className="h-8 w-auto"
       /> */}

       <h1
        className="text-2xl font-bold text-gray-800 italic"
        style={{fontFamily: "'Raleway', sans-serif"}}>
        SELLARIS
       </h1>
      </div>
      <p className="text-sm text-gray-500">
       © {new Date().getFullYear()} Sellaris. All rights reserved.
      </p>
     </div>
    </MotionDiv>
   </div>
  </div>
 );
}
