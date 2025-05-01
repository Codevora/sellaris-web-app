"use client";
import {motion} from "framer-motion";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";
import {useState, useRef, useEffect} from "react";

interface OTPVerificationProps {
 email: string;
 onVerificationSuccess: () => void;
}

export default function OTPVerification({
 email,
 onVerificationSuccess,
}: OTPVerificationProps) {
 const router = useRouter();
 const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
 const [activeInput, setActiveInput] = useState(0);
 const [error, setError] = useState("");
 const [isLoading, setIsLoading] = useState(false);
 const [resendDisabled, setResendDisabled] = useState(true);
 const [resendTimer, setResendTimer] = useState(30);

 const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

 const setInputRef = (el: HTMLInputElement | null, index: number) => {
  inputRefs.current[index] = el;
 };

 const handleChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  index: number
 ) => {
  const value = e.target.value;
  if (isNaN(Number(value))) return;

  const newOtp = [...otp];
  newOtp[index] = value.substring(value.length - 1);
  setOtp(newOtp);

  if (value && index < 5) {
   setActiveInput(index + 1);
  }
 };

 const handleKeyDown = (
  e: React.KeyboardEvent<HTMLInputElement>,
  index: number
 ) => {
  if (e.key === "Backspace" && !otp[index] && index > 0) {
   setActiveInput(index - 1);
  }
 };

 useEffect(() => {
  inputRefs.current[activeInput]?.focus();
 }, [activeInput]);

 useEffect(() => {
  // Resend OTP timer
  if (resendTimer > 0) {
   const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
   return () => clearTimeout(timer);
  } else {
   setResendDisabled(false);
  }
 }, [resendTimer]);

 const handleResendOTP = async () => {
  setResendDisabled(true);
  setResendTimer(30);
  setError("");

  try {
   const response = await fetch("/api/auth/resend-otp", {
    method: "POST",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify({email}),
   });

   const data = await response.json();

   if (!response.ok) {
    throw new Error(data.message || "Failed to resend OTP");
   }
  } catch (err) {
   const error = err as Error;
   setError(error.message);
  }
 };

const handleSubmit = async () => {
 setIsLoading(true);
 setError("");

 try {
  const otpCode = otp.join("");
  const response = await fetch("/api/auth/verify", {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
   },
   body: JSON.stringify({email, otp: otpCode}),
  });

  const data = await response.json();

  if (!response.ok) {
   throw new Error(data.message || "Verification failed");
  }

  // Auto-login setelah verifikasi berhasil
  const signInResponse = await signIn("credentials", {
   email,
   redirect: false,
  });

  if (signInResponse?.error) {
   throw new Error(signInResponse.error);
  }

  // Lanjut ke Company Form
  onVerificationSuccess();
 } catch (err) {
  const error = err as Error;
  setError(error.message);
 } finally {
  setIsLoading(false);
 }
};

 return (
  <motion.div
   initial={{opacity: 0}}
   animate={{opacity: 1}}
   className="bg-white/40 backdrop-blur-lg w-[400px] p-6 rounded-lg">
   <div className="text-center mb-6">
    <h2 className="text-2xl font-bold text-gray-800">Verifikasi Email</h2>
    <p className="text-gray-600">Kode OTP telah dikirim ke {email}</p>
   </div>

   <div className="flex justify-center gap-3 mb-6">
    {otp.map((_, index) => (
     <motion.div
      key={index}
      whileTap={{scale: 0.95}}>
      <input
       ref={(el) => setInputRef(el, index)}
       type="text"
       value={otp[index]}
       onChange={(e) => handleChange(e, index)}
       onKeyDown={(e) => handleKeyDown(e, index)}
       onFocus={() => setActiveInput(index)}
       maxLength={1}
       className="w-12 h-12 text-2xl text-center border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
      />
     </motion.div>
    ))}
   </div>

   {error && <div className="text-red-500 text-center mb-4">{error}</div>}

   <button
    onClick={handleSubmit}
    disabled={isLoading || otp.join("").length !== 6}
    className={`w-full py-3 rounded-lg text-white font-medium ${
     isLoading || otp.join("").length !== 6
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-primary hover:bg-primary/90"
    }`}>
    {isLoading ? "Memverifikasi..." : "Verifikasi"}
   </button>

   <div className="text-center mt-4 text-sm text-gray-600">
    Tidak menerima kode?{" "}
    <button
     onClick={handleResendOTP}
     disabled={resendDisabled}
     className={`${
      resendDisabled ? "text-gray-400" : "text-blue-600 hover:underline"
     }`}>
     {resendDisabled ? `Kirim ulang (${resendTimer}s)` : "Kirim ulang"}
    </button>
   </div>
  </motion.div>
 );
}
