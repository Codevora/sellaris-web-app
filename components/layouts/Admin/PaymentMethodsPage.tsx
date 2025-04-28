"use client";

import {useState, useEffect} from "react";
import {PaymentService} from "@/lib/firebase/paymentService";
import AddPaymentModal from "./AddPaymentModal";
import {toast} from "react-toastify";
import {FiPlus, FiEdit, FiTrash2} from "react-icons/fi";

export default function PaymentMethodsPage() {
 const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [isLoading, setIsLoading] = useState(true);

 const fetchPaymentMethods = async () => {
  try {
   setIsLoading(true);
   const data = await PaymentService.getPaymentMethods();
   setPaymentMethods(data);
  } catch (error) {
   toast.error("Failed to fetch payment methods");
   console.error(error);
  } finally {
   setIsLoading(false);
  }
 };

 useEffect(() => {
  fetchPaymentMethods();
 }, []);

 const handleDelete = async (id: string) => {
  if (confirm("Are you sure you want to delete this payment method?")) {
   const result = await PaymentService.deletePaymentMethod(id);
   if (result.success) {
    toast.success("Payment method deleted");
    fetchPaymentMethods();
   } else {
    toast.error("Failed to delete payment method");
   }
  }
 };

 return (
  <div className="p-6">
   <div className="flex justify-between items-center mb-6">
    <h1 className="text-2xl font-bold">Payment Methods</h1>
    <button
     onClick={() => setIsModalOpen(true)}
     className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
     <FiPlus /> Add Payment Method
    </button>
   </div>

   {isLoading ? (
    <div className="flex justify-center items-center h-64">
     <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
   ) : (
    <div className="bg-white rounded-lg shadow overflow-hidden">
     <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
       <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
         Name
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
         Type
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
         Details
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
         Status
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
         Actions
        </th>
       </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
       {paymentMethods.map((method) => (
        <tr key={method.id}>
         <td className="px-6 py-4 whitespace-nowrap">{method.name}</td>
         <td className="px-6 py-4 whitespace-nowrap">
          <span
           className={`px-2 py-1 text-xs rounded-full ${
            method.type === "ewallet"
             ? "bg-purple-100 text-purple-800"
             : method.type === "bank"
             ? "bg-blue-100 text-blue-800"
             : method.type === "credit_card"
             ? "bg-yellow-100 text-yellow-800"
             : "bg-green-100 text-green-800"
           }`}>
           {method.type}
          </span>
         </td>
         <td className="px-6 py-4 whitespace-nowrap">
          {method.type === "ewallet" &&
           `${method.ewalletType}: ${method.accountNumber}`}
          {method.type === "bank" &&
           `${method.bankName}: ${method.accountNumber}`}
          {method.type === "credit_card" &&
           `•••• •••• •••• ${method.cardNumber?.slice(-4)}`}
          {method.type === "cash" && "Cash payment"}
         </td>
         <td className="px-6 py-4 whitespace-nowrap">
          <span
           className={`px-2 py-1 text-xs rounded-full ${
            method.isActive
             ? "bg-green-100 text-green-800"
             : "bg-red-100 text-red-800"
           }`}>
           {method.isActive ? "Active" : "Inactive"}
          </span>
         </td>
         <td className="px-6 py-4 whitespace-nowrap">
          <button className="text-blue-500 hover:text-blue-700 mr-3">
           <FiEdit />
          </button>
          <button
           onClick={() => handleDelete(method.id)}
           className="text-red-500 hover:text-red-700">
           <FiTrash2 />
          </button>
         </td>
        </tr>
       ))}
      </tbody>
     </table>
    </div>
   )}

   <AddPaymentModal
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
    refreshData={fetchPaymentMethods}
   />
  </div>
 );
}
