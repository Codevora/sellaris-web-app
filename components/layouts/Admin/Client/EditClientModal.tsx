"use client";

import {useState} from "react";
import {motion} from "framer-motion";
import {FiX} from "react-icons/fi";
import {Client} from "@/types/client";

interface EditClientModalProps {
 isOpen: boolean;
 onClose: () => void;
 client: Client;
 onUpdate: (client: Client) => void;
}

export default function EditClientModal({
 isOpen,
 onClose,
 client,
 onUpdate,
}: EditClientModalProps) {
 const [formData, setFormData] = useState<Client>(client);

 const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
 ) => {
  const {name, value} = e.target;
  setFormData((prev) => ({...prev, [name]: value}));
 };

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  onUpdate(formData);
 };

 if (!isOpen) return null;

 return (
  <motion.div
   initial={{opacity: 0}}
   animate={{opacity: 1}}
   className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
   <motion.div
    initial={{y: -20, opacity: 0}}
    animate={{y: 0, opacity: 1}}
    className="bg-white rounded-xl p-6 w-full max-w-md">
    <div className="flex justify-between items-center mb-4">
     <h2 className="text-xl font-bold">Edit Client</h2>
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
      <label className="block text-sm font-medium text-gray-700 mb-1">
       Name
      </label>
      <input
       type="text"
       name="name"
       value={formData.name}
       onChange={handleChange}
       required
       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
     </div>

     <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
       Email
      </label>
      <input
       type="email"
       name="email"
       value={formData.email}
       onChange={handleChange}
       required
       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
     </div>

     <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
       Phone
      </label>
      <input
       type="tel"
       name="phone"
       value={formData.phone}
       onChange={handleChange}
       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
     </div>

     <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
       Status
      </label>
      <select
       name="status"
       value={formData.status}
       onChange={handleChange}
       className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
       <option value="active">Active</option>
       <option value="inactive">Inactive</option>
      </select>
     </div>

     <div className="flex justify-end gap-3 pt-4">
      <button
       type="button"
       onClick={onClose}
       className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
       Cancel
      </button>
      <button
       type="submit"
       className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
       Update Client
      </button>
     </div>
    </form>
   </motion.div>
  </motion.div>
 );
}
