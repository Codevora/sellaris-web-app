"use client";

import {useState, useEffect} from "react";
import {
 PaymentService,
 type PaymentMethod,
} from "@/lib/firebase/paymentService";
import {toast} from "react-toastify";
import {FiX} from "react-icons/fi";
import {motion} from "framer-motion";

const paymentTypes = [
 {value: "ewallet", label: "E-Wallet"},
 {value: "bank", label: "Bank"},
 {value: "credit_card", label: "Credit Card"},
 {value: "cash", label: "Cash"},
];

const ewalletTypes = [
 {value: "gopay", label: "GoPay"},
 {value: "ovo", label: "OVO"},
 {value: "dana", label: "DANA"},
 {value: "shopeepay", label: "ShopeePay"},
 {value: "linkaja", label: "LinkAja"},
];

export default function WebMasterEditModal({
 isOpen,
 onClose,
 payment,
 refreshData,
}: {
 isOpen: boolean;
 onClose: () => void;
 payment: PaymentMethod;
 refreshData: () => void;
}) {
 const [formData, setFormData] = useState<PaymentMethod>({
  id: "",
  name: "",
  type: "ewallet",
  isActive: true,
  ewalletType: "gopay",
  bankName: "",
  accountNumber: "",
  accountName: "",
  cardNumber: "",
  cardHolder: "",
  expiryDate: "",
  cvv: "",
  createdAt: new Date(),
  updatedAt: new Date(),
 });
 const [isSubmitting, setIsSubmitting] = useState(false);

 useEffect(() => {
  if (payment) {
   setFormData(payment);
  }
 }, [payment]);

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
   if (!formData.id) {
    toast.error("Payment method ID is missing");
    return;
   }

   const updateData: Partial<PaymentMethod> = {
    name: formData.name,
    type: formData.type,
    isActive: formData.isActive,
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
   };

   const result = await PaymentService.updatePaymentMethod(
    formData.id,
    updateData
   );

   if (result.success) {
    toast.success("Payment method updated successfully!");
    refreshData();
    onClose();
   } else {
    toast.error(result.error?.toString() || "Failed to update payment method");
   }
  } catch (error) {
   toast.error(
    error instanceof Error ? error.message : "An unknown error occurred"
   );
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
     <h2 className="text-xl font-bold">Edit Payment Method</h2>
     <button
      onClick={onClose}
      className="text-gray-500 hover:text-gray-700">
      <FiX size={24} />
     </button>
    </div>

    <form
     onSubmit={handleSubmit}
     className="space-y-4">
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
      <select
       value={formData.type}
       onChange={(e) => setFormData({...formData, type: e.target.value as any})}
       className="w-full p-2 border rounded"
       disabled>
       {paymentTypes.map((type) => (
        <option
         key={type.value}
         value={type.value}>
         {type.label}
        </option>
       ))}
      </select>
     </div>

     {formData.type === "ewallet" && (
      <>
       <div>
        <label className="block mb-1 font-medium">E-Wallet Type</label>
        <select
         value={formData.ewalletType}
         onChange={(e) =>
          setFormData({
           ...formData,
           ewalletType: e.target.value as typeof formData.ewalletType,
          })
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

     <div className="flex justify-end pt-4">
      <button
       type="button"
       onClick={onClose}
       className="px-4 py-2 border border-gray-300 rounded mr-3">
       Cancel
      </button>
      <button
       type="submit"
       disabled={isSubmitting}
       className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50">
       {isSubmitting ? "Updating..." : "Update"}
      </button>
     </div>
    </form>
   </motion.div>
  </div>
 );
}
