"use client";

import {useState, useEffect} from "react";
import {motion} from "framer-motion";
import {FiEdit2, FiSearch, FiTrash2, FiUser} from "react-icons/fi";
import {Client} from "@/types/client";
import WebMasterClientEdit from "./WebMasterClientEdit";

export default function WebMasterClientTable() {
 const [searchTerm, setSearchTerm] = useState("");
 const [clients, setClients] = useState<Client[]>([]);
 const [filteredClients, setFilteredClients] = useState<Client[]>([]);
 const [isEditModalOpen, setIsEditModalOpen] = useState(false);
 const [selectedClient, setSelectedClient] = useState<Client | null>(null);

 useEffect(() => {
  const fetchClients = async () => {
   try {
    const res = await fetch("/api/clients");
    const data = await res.json();
    setClients(data);
    setFilteredClients(data);
   } catch (error) {
    console.error("Failed to fetch clients:", error);
   }
  };
  fetchClients();
 }, []);

 useEffect(() => {
  if (searchTerm.trim() === "") {
   setFilteredClients(clients);
  } else {
   const filtered = clients.filter(
    (client) =>
     client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     client.email.toLowerCase().includes(searchTerm.toLowerCase())
   );
   setFilteredClients(filtered);
  }
 }, [searchTerm, clients]);

 const handleDelete = async (id: string) => {
  if (confirm("Are you sure you want to delete this client?")) {
   try {
    const res = await fetch(`/api/clients/${id}`, {
     method: "DELETE",
    });

    if (res.ok) {
     setClients(clients.filter((client) => client.id !== id));
    }
   } catch (error) {
    console.error("Failed to delete client:", error);
   }
  }
 };

 const handleEdit = (client: Client) => {
  setSelectedClient(client);
  setIsEditModalOpen(true);
 };

 const handleUpdate = async (updatedClient: Client) => {
  try {
   const res = await fetch(`/api/clients/${updatedClient.id}`, {
    method: "PUT",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedClient),
   });

   if (res.ok) {
    setClients(
     clients.map((client) =>
      client.id === updatedClient.id ? updatedClient : client
     )
    );
    setIsEditModalOpen(false);
   }
  } catch (error) {
   console.error("Failed to update client:", error);
  }
 };

 const rowVariants = {
  hidden: {opacity: 0, x: -10},
  visible: (i: number) => ({
   opacity: 1,
   x: 0,
   transition: {
    delay: i * 0.05,
   },
  }),
 };

 return (
  <div>
   <div className="bg-white mb-8">
    <div className="flex justify-between items-center mb-6">
     <div className="relative w-64">
      <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
       type="text"
       placeholder="Search clients..."
       value={searchTerm}
       onChange={(e) => setSearchTerm(e.target.value)}
       className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
     </div>
    </div>

    <div className="overflow-x-auto">
     <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
       <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
         Client
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
         Email
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
         Status
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
         Joined
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
         Actions
        </th>
       </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
       {filteredClients.map((client, index) => (
        <motion.tr
         key={client.id}
         custom={index}
         initial="hidden"
         animate="visible"
         variants={rowVariants}
         whileHover={{backgroundColor: "rgba(59, 130, 246, 0.05)"}}
         className="hover:bg-blue-50">
         <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
           <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
            <FiUser className="text-blue-500" />
           </div>
           <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
             {client.name}
            </div>
            <div className="text-sm text-gray-500">{client.phone}</div>
           </div>
          </div>
         </td>
         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {client.email}
         </td>
         <td className="px-6 py-4 whitespace-nowrap">
          <span
           className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${
                       client.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                      }`}>
           {client.status}
          </span>
         </td>
         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {new Date(client.createdAt).toLocaleDateString()}
         </td>
         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
          <div className="flex gap-2">
           <button
            onClick={() => handleEdit(client)}
            className="text-blue-600 hover:text-blue-900">
            <FiEdit2 />
           </button>
           <button
            onClick={() => handleDelete(client.id)}
            className="text-red-600 hover:text-red-900">
            <FiTrash2 />
           </button>
          </div>
         </td>
        </motion.tr>
       ))}
      </tbody>
     </table>
    </div>
   </div>

   {selectedClient && (
    <WebMasterClientEdit
     isOpen={isEditModalOpen}
     onClose={() => setIsEditModalOpen(false)}
     client={selectedClient}
     onUpdate={handleUpdate}
    />
   )}
  </div>
 );
}
