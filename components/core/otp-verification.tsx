"use client";
import {motion} from "framer-motion";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";
import {useState, useRef, useEffect} from "react";

export default function OTPVerification({email}: {email: string}) {
 const router = useRouter();
 const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
 const [activeInput, setActiveInput] = useState(0);
 const [error, setError] = useState("");
 const [isLoading, setIsLoading] = useState(false);

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
  if (inputRefs.current[activeInput]) {
   inputRefs.current[activeInput]?.focus();
  }
 }, [activeInput]);

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

   const signInResponse = await signIn("credentials", {
    email,
    redirect: false,
   });

   if (signInResponse?.error) {
    throw new Error(signInResponse.error);
   }

   router.push("/member/dashboard");
  } catch (error: any) {
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
    <h2 className="text-2xl font-bold text-gray-800">Verify Email</h2>
    <p className="text-gray-600">Code sent to {email}</p>
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
    {isLoading ? "Verifying..." : "Verify"}
   </button>

   <div className="text-center mt-4 text-sm text-gray-600">
    Didn't receive code?{" "}
    <button className="text-blue-600 hover:underline">Resend</button>
   </div>
  </motion.div>
 );
}
