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

 // Set focus on active input
 useEffect(() => {
  inputRefs.current[activeInput]?.focus();
 }, [activeInput]);

 // Resend OTP timer
 useEffect(() => {
  if (resendTimer > 0) {
   const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
   return () => clearTimeout(timer);
  } else {
   setResendDisabled(false);
  }
 }, [resendTimer]);

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

  // Move to next input if current input is filled
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

   // Auto-login after successful verification
   const signInResponse = await signIn("credentials", {
    email,
    redirect: false,
   });

   if (signInResponse?.error) {
    throw new Error(signInResponse.error);
   }

   // Proceed to next step
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
   className="bg-white/40 backdrop-blur-lg w-full max-w-md p-6 rounded-lg">
   <div className="text-center mb-6">
    <h2 className="text-2xl font-bold text-gray-800">Verifikasi Email</h2>
    <p className="text-gray-600">
     Kode OTP telah dikirim ke <span className="font-semibold">{email}</span>
    </p>
   </div>

   <div className="flex justify-center gap-3 mb-6">
    {otp.map((_, index) => (
     <motion.div
      key={index}
      whileTap={{scale: 0.95}}
      transition={{type: "spring", stiffness: 400, damping: 17}}>
      <input
       ref={(el) => setInputRef(el, index)}
       type="text"
       value={otp[index]}
       onChange={(e) => handleChange(e, index)}
       onKeyDown={(e) => handleKeyDown(e, index)}
       onFocus={() => setActiveInput(index)}
       maxLength={1}
       className={`w-12 h-12 text-2xl text-center border rounded-lg focus:outline-none focus:ring-2 ${
        activeInput === index
         ? "border-blue-500 ring-blue-200"
         : "border-gray-300"
       }`}
       inputMode="numeric"
       pattern="[0-9]*"
      />
     </motion.div>
    ))}
   </div>

   {error && (
    <motion.div
     initial={{opacity: 0, y: -10}}
     animate={{opacity: 1, y: 0}}
     className="text-red-500 text-center mb-4 text-sm">
     {error}
    </motion.div>
   )}

   <motion.button
    whileTap={{scale: 0.98}}
    onClick={handleSubmit}
    disabled={isLoading || otp.join("").length !== 6}
    className={`w-full py-3 rounded-lg text-white font-medium ${
     isLoading || otp.join("").length !== 6
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-primary hover:bg-primary/90"
    }`}>
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
      Memverifikasi...
     </span>
    ) : (
     "Verifikasi"
    )}
   </motion.button>

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
