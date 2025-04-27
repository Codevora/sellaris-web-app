import AdminSidebar from "@/components/layouts/AdminSidebar";

export default function Layout({children}: {children: React.ReactNode}) {
 return (
  <div className="flex h-screen ">
   <AdminSidebar />
   <main className="ml-64 p-5 bg-white w-full">{children}</main>
  </div>
 );
}
