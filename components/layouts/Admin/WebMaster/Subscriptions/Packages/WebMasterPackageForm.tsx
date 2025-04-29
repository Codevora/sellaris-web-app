"use client";

import {useState, useEffect} from "react";
import {motion} from "framer-motion";
import {FiX, FiCheck} from "react-icons/fi";
import {HexColorPicker} from "react-colorful";
import {addPackage, updatePackage} from "@/lib/firebase/packageService";
import {Package} from "@/types/package";

interface PackageFormProps {
 pkg: Package | null;
 onClose: () => void;
 onSubmit: () => void;
}

const DEFAULT_COLOR_SCHEME = {
 primary: "#3b82f6",
 secondary: "#bfdbfe",
 text: "#1e3a8a",
};

const WebMasterPackageForm = ({pkg, onClose, onSubmit}: PackageFormProps) => {
 const [formData, setFormData] = useState<Omit<Package, "id">>({
  name: "",
  description: "",
  price: 0,
  duration: 1,
  features: [""],
  isFeatured: false,
  colorScheme: DEFAULT_COLOR_SCHEME,
 });

 const [featureInput, setFeatureInput] = useState("");
 const [activeColorPicker, setActiveColorPicker] = useState<
  "primary" | "secondary" | "text" | null
 >(null);

 useEffect(() => {
  if (pkg) {
   setFormData({
    name: pkg.name,
    description: pkg.description,
    price: pkg.price,
    duration: pkg.duration,
    features: pkg.features,
    isFeatured: pkg.isFeatured,
    colorScheme: pkg.colorScheme || DEFAULT_COLOR_SCHEME,
   });
  }
 }, [pkg]);

 const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
 ) => {
  const {name, value, type} = e.target;
  setFormData((prev) => ({
   ...prev,
   [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
  }));
 };

 const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const {name, value} = e.target;
  setFormData((prev) => ({
   ...prev,
   [name]: name === "duration" ? parseInt(value) || 1 : parseFloat(value) || 0,
  }));
 };

 const handleColorChange = (
  color: string,
  type: "primary" | "secondary" | "text"
 ) => {
  setFormData((prev) => ({
   ...prev,
   colorScheme: {
    ...prev.colorScheme,
    [type]: color,
   },
  }));
 };

 const addFeature = () => {
  if (featureInput.trim()) {
   setFormData((prev) => ({
    ...prev,
    features: [...prev.features, featureInput.trim()],
   }));
   setFeatureInput("");
  }
 };

 const removeFeature = (index: number) => {
  setFormData((prev) => ({
   ...prev,
   features: prev.features.filter((_, i) => i !== index),
  }));
 };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
   const url = pkg?.id ? `/api/packages` : "/api/packages";
   const method = pkg?.id ? "PUT" : "POST";

   const body = pkg?.id ? {id: pkg.id, ...formData} : formData;

   const response = await fetch(url, {
    method,
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
   });

   if (!response.ok) throw new Error("Failed to save package");

   onSubmit();
  } catch (error) {
   console.error("Error saving package:", error);
   alert("Failed to save package. Please try again.");
  }
 };

 return (
  <motion.div
   initial={{opacity: 0}}
   animate={{opacity: 1}}
   exit={{opacity: 0}}
   className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
   <motion.div
    initial={{scale: 0.9, y: 20}}
    animate={{scale: 1, y: 0}}
    className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
    <div className="p-6">
     <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold text-gray-800">
       {pkg ? "Edit Package" : "Add New Package"}
      </h2>
      <button
       onClick={onClose}
       className="text-gray-500 hover:text-gray-700">
       <FiX size={24} />
      </button>
     </div>

     <form onSubmit={handleSubmit}>
      <div className="space-y-4">
       <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
         Package Name
        </label>
        <input
         type="text"
         name="name"
         value={formData.name}
         onChange={handleChange}
         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
         required
        />
       </div>

       <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
         Description
        </label>
        <textarea
         name="description"
         value={formData.description}
         onChange={handleChange}
         rows={3}
         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
         required
        />
       </div>

       <div className="grid grid-cols-2 gap-4">
        <div>
         <label className="block text-sm font-medium text-gray-700 mb-1">
          Harga (IDR)
         </label>
         <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleNumberChange}
          min="0"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          required
         />
        </div>

        <div>
         <label className="block text-sm font-medium text-gray-700 mb-1">
          Durasi (Tahun)
         </label>
         <input
          type="number"
          name="duration"
          value={formData.duration}
          onChange={handleNumberChange}
          min="1"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          required
         />
        </div>
       </div>

       <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
         Color Scheme
        </label>
        <div className="grid grid-cols-3 gap-4">
         <div>
          <label className="block text-xs text-gray-500 mb-1">
           Primary Color
          </label>
          <div className="flex items-center gap-2">
           <div
            className="w-8 h-8 rounded-md cursor-pointer border border-gray-300"
            style={{backgroundColor: formData.colorScheme.primary}}
            onClick={() =>
             setActiveColorPicker(
              activeColorPicker === "primary" ? null : "primary"
             )
            }
           />
           <span className="text-sm">{formData.colorScheme.primary}</span>
          </div>
         </div>

         <div>
          <label className="block text-xs text-gray-500 mb-1">
           Secondary Color
          </label>
          <div className="flex items-center gap-2">
           <div
            className="w-8 h-8 rounded-md cursor-pointer border border-gray-300"
            style={{backgroundColor: formData.colorScheme.secondary}}
            onClick={() =>
             setActiveColorPicker(
              activeColorPicker === "secondary" ? null : "secondary"
             )
            }
           />
           <span className="text-sm">{formData.colorScheme.secondary}</span>
          </div>
         </div>

         <div>
          <label className="block text-xs text-gray-500 mb-1">Text Color</label>
          <div className="flex items-center gap-2">
           <div
            className="w-8 h-8 rounded-md cursor-pointer border border-gray-300"
            style={{backgroundColor: formData.colorScheme.text}}
            onClick={() =>
             setActiveColorPicker(activeColorPicker === "text" ? null : "text")
            }
           />
           <span className="text-sm">{formData.colorScheme.text}</span>
          </div>
         </div>
        </div>

        {activeColorPicker && (
         <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <HexColorPicker
           color={formData.colorScheme[activeColorPicker]}
           onChange={(color) => handleColorChange(color, activeColorPicker)}
          />
          <div className="mt-2 flex justify-end">
           <button
            type="button"
            onClick={() => setActiveColorPicker(null)}
            className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md">
            Close Picker
           </button>
          </div>
         </div>
        )}
       </div>

       <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
         Features
        </label>
        <div className="space-y-2">
         {formData.features.map((feature, index) => (
          <div
           key={index}
           className="flex items-center gap-2">
           <span className="flex-1 bg-gray-100 px-3 py-2 rounded-lg">
            {feature}
           </span>
           <button
            type="button"
            onClick={() => removeFeature(index)}
            className="text-red-500 hover:text-red-700 p-2">
            <FiX />
           </button>
          </div>
         ))}
         <div className="flex gap-2">
          <input
           type="text"
           value={featureInput}
           onChange={(e) => setFeatureInput(e.target.value)}
           placeholder="Add new feature"
           className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
          <button
           type="button"
           onClick={addFeature}
           className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-200">
           Add
          </button>
         </div>
        </div>
       </div>

       <div className="flex items-center">
        <input
         type="checkbox"
         id="isFeatured"
         name="isFeatured"
         checked={formData.isFeatured}
         onChange={handleChange}
         className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label
         htmlFor="isFeatured"
         className="ml-2 block text-sm text-gray-700">
         Mark as featured package
        </label>
       </div>
      </div>

      <div className="mt-6 flex justify-end gap-3">
       <button
        type="button"
        onClick={onClose}
        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
        Cancel
       </button>
       <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
        <FiCheck /> Save Package
       </button>
      </div>
     </form>
    </div>
   </motion.div>
  </motion.div>
 );
};

export default WebMasterPackageForm;
