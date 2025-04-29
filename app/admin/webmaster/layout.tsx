import WebMasterSidebar from "@/components/layouts/Admin/WebMaster/WebMasterSidebar";

export const metadata = {
 title: "Dashboard",
 description: "Dashboard",
};

export default function ClientDashboardLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return (
  <div className="flex min-h-screen">
   <WebMasterSidebar />
   <main className="ml-[290px] p-6 w-full">{children}</main>
  </div>
 );
}
