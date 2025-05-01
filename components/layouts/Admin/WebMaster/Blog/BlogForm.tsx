// app/admin/webmaster/blog/components/BlogForm.tsx
"use client";

import {useState, useRef, ChangeEvent} from "react";
import {useBlog} from "@/hooks/useBlog";
import {MotionButton, MotionDiv} from "@/components/AnimatedComponent";
import {FaArrowRightLong, FaImage} from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";

const BlogForm = () => {
 const {submitBlog, isLoading, error} = useBlog();
 const [formData, setFormData] = useState({
  title: "",
  content: "",
  author: "",
  category: "",
  excerpt: "",
 });
 const [imageFile, setImageFile] = useState<File | null>(null);
 const [imagePreview, setImagePreview] = useState<string | null>(null);
 const fileInputRef = useRef<HTMLInputElement>(null);

 const handleChange = (
  e: React.ChangeEvent<
   HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >
 ) => {
  const {name, value} = e.target;
  setFormData((prev) => ({
   ...prev,
   [name]: value,
  }));
 };

 const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files[0]) {
   const file = e.target.files[0];
   setImageFile(file);

   // Create preview
   const reader = new FileReader();
   reader.onloadend = () => {
    setImagePreview(reader.result as string);
   };
   reader.readAsDataURL(file);
  }
 };

 const removeImage = () => {
  setImageFile(null);
  setImagePreview(null);
  if (fileInputRef.current) {
   fileInputRef.current.value = "";
  }
 };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const blogData = {
   ...formData,
   imageFile: imageFile || undefined,
  };

  const result = await submitBlog(blogData);

  if (result) {
   // Reset form on success
   setFormData({
    title: "",
    content: "",
    author: "",
    category: "",
    excerpt: "",
   });
   removeImage();
  }
 };

 return (
  <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100">
   <h1 className="text-3xl font-bold text-gray-800 mb-6">
    Create New Blog Post
   </h1>

   {error && (
    <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg border border-red-100">
     {error}
    </div>
   )}

   <form
    onSubmit={handleSubmit}
    className="space-y-6">
    <div className="space-y-2">
     <label
      htmlFor="title"
      className="block text-sm font-medium text-gray-700">
      Title
     </label>
     <input
      type="text"
      id="title"
      name="title"
      value={formData.title}
      onChange={handleChange}
      required
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
     />
    </div>

    <div className="space-y-2">
     <label
      htmlFor="excerpt"
      className="block text-sm font-medium text-gray-700">
      Excerpt (Short Description)
     </label>
     <textarea
      id="excerpt"
      name="excerpt"
      value={formData.excerpt}
      onChange={handleChange}
      required
      rows={3}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
     />
    </div>

    <div className="space-y-2">
     <label
      htmlFor="content"
      className="block text-sm font-medium text-gray-700">
      Content
     </label>
     <textarea
      id="content"
      name="content"
      value={formData.content}
      onChange={handleChange}
      required
      rows={8}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
     />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
     <div className="space-y-2">
      <label
       htmlFor="author"
       className="block text-sm font-medium text-gray-700">
       Author
      </label>
      <input
       type="text"
       id="author"
       name="author"
       value={formData.author}
       onChange={handleChange}
       required
       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
      />
     </div>

     <div className="space-y-2">
      <label
       htmlFor="category"
       className="block text-sm font-medium text-gray-700">
       Category
      </label>
      <select
       id="category"
       name="category"
       value={formData.category}
       onChange={handleChange}
       required
       className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all">
       <option value="">Select a category</option>
       <option value="Retail">Retail</option>
       <option value="F&B">F&B</option>
       <option value="Analytics">Analytics</option>
       <option value="Technology">Technology</option>
      </select>
     </div>
    </div>

    {/* <div className="space-y-2">
     <label className="block text-sm font-medium text-gray-700">
      Featured Image
     </label>

     {imagePreview ? (
      <div className="relative">
       <img
        src={imagePreview}
        alt="Preview"
        className="w-full h-64 object-cover rounded-lg border border-gray-200"
       />
       <button
        type="button"
        onClick={removeImage}
        className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-all">
        <FaTimes className="text-gray-600" />
       </button>
      </div>
     ) : (
      <div
       className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-teal-500 transition-all"
       onClick={() => fileInputRef.current?.click()}>
       <FaImage className="mx-auto text-3xl text-gray-400 mb-2" />
       <p className="text-gray-500">Click to upload an image</p>
       <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
       />
      </div>
     )}
    </div> */}

    <div className="pt-4">
     <MotionButton
      type="submit"
      disabled={isLoading}
      whileHover={{scale: 1.02}}
      whileTap={{scale: 0.98}}
      className={`w-full flex items-center justify-center px-6 py-3 rounded-lg ${
       isLoading ? "bg-teal-400" : "bg-teal-500 hover:bg-teal-600"
      } text-white font-medium transition-all`}>
      {isLoading ? (
       "Publishing..."
      ) : (
       <>
        Publish Blog Post <FaArrowRightLong className="ml-2" />
       </>
      )}
     </MotionButton>
    </div>
   </form>
  </div>
 );
};

export default BlogForm;
