"use client";

import {useState} from "react";
import {PaymentService} from "@/lib/firebase/paymentService";
import {toast} from "react-toastify";
import {FiX, FiCreditCard, FiDollarSign, FiSmartphone} from "react-icons/fi";
import {RiBankCardFill} from "react-icons/ri";
import {motion, AnimatePresence} from "framer-motion";

const paymentTypes = [
 {value: "ewallet", label: "E-Wallet", icon: <FiSmartphone />},
 {value: "bank", label: "Bank", icon: <RiBankCardFill />},
 {value: "credit_card", label: "Credit Card", icon: <FiCreditCard />},
 {value: "cash", label: "Cash", icon: <FiDollarSign />},
];

const ewalletTypes = [
 {value: "gopay", label: "GoPay"},
 {value: "ovo", label: "OVO"},
 {value: "dana", label: "DANA"},
 {value: "shopeepay", label: "ShopeePay"},
 {value: "linkaja", label: "LinkAja"},
];

export default function AddPaymentModal({
 isOpen,
 onClose,
 refreshData,
}: {
 isOpen: boolean;
 onClose: () => void;
 refreshData: () => void;
}) {
 const [formData, setFormData] = useState({
  name: "",
  type: "ewallet",
  ewalletType: "gopay",
  bankName: "",
  accountNumber: "",
  accountName: "",
  cardNumber: "",
  cardHolder: "",
  expiryDate: "",
  cvv: "",
  isActive: true,
 });
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [step, setStep] = useState(1);

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
   const result = await PaymentService.addPaymentMethod({
    name: formData.name,
    type: formData.type as any,
    ...(formData.type === "ewallet" && {
     ewalletType: formData.ewalletType,
     accountNumber: formData.accountNumber,
    }),
    ...(formData.type === "bank" && {
     bankName: formData.bankName,
     accountNumber: formData.accountNumber,
     accountName: formData.accountName,
    }),
    ...(formData.type === "credit_card" && {
     cardNumber: formData.cardNumber,
     cardHolder: formData.cardHolder,
     expiryDate: formData.expiryDate,
     cvv: formData.cvv,
    }),
    isActive: formData.isActive,
   });

   if (result.success) {
    toast.success("Payment method added!");
    refreshData();
    onClose();
   } else {
    toast.error(result.error || "Failed to add payment method");
   }
  } catch (error) {
   toast.error("An error occurred");
   console.error(error);
  } finally {
   setIsSubmitting(false);
  }
 };

 if (!isOpen) return null;

 return (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
   <motion.div
    initial={{scale: 0.9, opacity: 0}}
    animate={{scale: 1, opacity: 1}}
    className="bg-white rounded-lg p-6 w-full max-w-md">
    <div className="flex justify-between items-center mb-4">
     <h2 className="text-xl font-bold">Add Payment Method</h2>
     <button
      onClick={onClose}
      className="text-gray-500 hover:text-gray-700">
      <FiX size={24} />
     </button>
    </div>

    {step === 1 && (
     <div className="space-y-4">
      <div>
       <label className="block mb-1 font-medium">Payment Name</label>
       <input
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        className="w-full p-2 border rounded"
        required
       />
      </div>

      <div>
       <label className="block mb-1 font-medium">Payment Type</label>
       <div className="grid grid-cols-2 gap-2">
        {paymentTypes.map((type) => (
         <button
          key={type.value}
          type="button"
          onClick={() => setFormData({...formData, type: type.value as any})}
          className={`flex items-center justify-center p-3 border rounded ${
           formData.type === type.value
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300"
          }`}>
          <span className="mr-2">{type.icon}</span>
          {type.label}
         </button>
        ))}
       </div>
      </div>

      <div className="flex justify-end pt-4">
       <button
        type="button"
        onClick={() => setStep(2)}
        disabled={!formData.name}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50">
        Next
       </button>
      </div>
     </div>
    )}

    {step === 2 && (
     <form
      onSubmit={handleSubmit}
      className="space-y-4">
      {formData.type === "ewallet" && (
       <>
        <div>
         <label className="block mb-1 font-medium">E-Wallet Type</label>
         <select
          value={formData.ewalletType}
          onChange={(e) =>
           setFormData({...formData, ewalletType: e.target.value as any})
          }
          className="w-full p-2 border rounded"
          required>
          {ewalletTypes.map((type) => (
           <option
            key={type.value}
            value={type.value}>
            {type.label}
           </option>
          ))}
         </select>
        </div>
        <div>
         <label className="block mb-1 font-medium">Account Number</label>
         <input
          type="text"
          value={formData.accountNumber}
          onChange={(e) =>
           setFormData({...formData, accountNumber: e.target.value})
          }
          className="w-full p-2 border rounded"
          required
         />
        </div>
       </>
      )}

      {formData.type === "bank" && (
       <>
        <div>
         <label className="block mb-1 font-medium">Bank Name</label>
         <input
          type="text"
          value={formData.bankName}
          onChange={(e) => setFormData({...formData, bankName: e.target.value})}
          className="w-full p-2 border rounded"
          required
         />
        </div>
        <div>
         <label className="block mb-1 font-medium">Account Number</label>
         <input
          type="text"
          value={formData.accountNumber}
          onChange={(e) =>
           setFormData({...formData, accountNumber: e.target.value})
          }
          className="w-full p-2 border rounded"
          required
         />
        </div>
        <div>
         <label className="block mb-1 font-medium">Account Name</label>
         <input
          type="text"
          value={formData.accountName}
          onChange={(e) =>
           setFormData({...formData, accountName: e.target.value})
          }
          className="w-full p-2 border rounded"
          required
         />
        </div>
       </>
      )}

      {formData.type === "credit_card" && (
       <>
        <div>
         <label className="block mb-1 font-medium">Card Number</label>
         <input
          type="text"
          value={formData.cardNumber}
          onChange={(e) =>
           setFormData({...formData, cardNumber: e.target.value})
          }
          className="w-full p-2 border rounded"
          placeholder="1234 5678 9012 3456"
          required
         />
        </div>
        <div>
         <label className="block mb-1 font-medium">Card Holder</label>
         <input
          type="text"
          value={formData.cardHolder}
          onChange={(e) =>
           setFormData({...formData, cardHolder: e.target.value})
          }
          className="w-full p-2 border rounded"
          required
         />
        </div>
        <div className="grid grid-cols-2 gap-4">
         <div>
          <label className="block mb-1 font-medium">Expiry Date</label>
          <input
           type="text"
           value={formData.expiryDate}
           onChange={(e) =>
            setFormData({...formData, expiryDate: e.target.value})
           }
           className="w-full p-2 border rounded"
           placeholder="MM/YY"
           required
          />
         </div>
         <div>
          <label className="block mb-1 font-medium">CVV</label>
          <input
           type="text"
           value={formData.cvv}
           onChange={(e) => setFormData({...formData, cvv: e.target.value})}
           className="w-full p-2 border rounded"
           maxLength={3}
           required
          />
         </div>
        </div>
       </>
      )}

      <div className="flex items-center">
       <input
        type="checkbox"
        id="isActive"
        checked={formData.isActive}
        onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
        className="mr-2"
       />
       <label htmlFor="isActive">Active</label>
      </div>

      <div className="flex justify-between pt-4">
       <button
        type="button"
        onClick={() => setStep(1)}
        className="px-4 py-2 border rounded">
        Back
       </button>
       <button
        type="submit"
        disabled={isSubmitting}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50">
        {isSubmitting ? "Saving..." : "Save"}
       </button>
      </div>
     </form>
    )}
   </motion.div>
  </div>
 );
}
