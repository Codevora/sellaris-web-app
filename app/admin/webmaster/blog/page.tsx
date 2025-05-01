// app/admin/webmaster/blog/page.tsx
import BlogForm from "@/components/layouts/Admin/WebMaster/Blog/BlogForm";
import BlogList from "@/components/layouts/Admin/WebMaster/Blog/BlogList";
import {Metadata} from "next";

export const metadata: Metadata = {
 title: "Admin - Blog Management",
 description: "Create and manage blog posts",
};

const BlogManagementPage = () => {
 return (
  <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
   <div className="max-w-7xl mx-auto space-y-8">
    <BlogForm />
    <BlogList />
   </div>
  </div>
 );
};

export default BlogManagementPage;
