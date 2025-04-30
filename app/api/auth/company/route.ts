import {saveCompanyData} from "@/lib/firebase/service";
import {NextResponse} from "next/server";
import {getServerSession} from "next-auth";
import {authOptions} from "../[...nextauth]/route";

export async function POST(request: Request) {
 const session = await getServerSession(authOptions);

 // Pengecekan lebih ketat untuk session dan user
 if (!session?.user?.id) {
  return NextResponse.json(
   {
    status: false,
    message: "Unauthorized: No valid session found",
   },
   {status: 401}
  );
 }

 try {
  const req = await request.json();

  // Validasi data perusahaan yang diperlukan
  if (!req.companyName || !req.companyEmail) {
   return NextResponse.json(
    {
     status: false,
     message: "Company name and email are required",
    },
    {status: 400}
   );
  }

  const res = await saveCompanyData(session.user.id, req);

  if (!res.status) {
   return NextResponse.json(
    {
     status: false,
     message: res.message || "Failed to save company data",
    },
    {status: 400}
   );
  }

  return NextResponse.json(
   {
    status: true,
    message: res.message,
    companyId: res.companyId,
   },
   {status: 200}
  );
 } catch (error) {
  console.error("Error in company route:", error);
  return NextResponse.json(
   {
    status: false,
    message: "Internal server error",
   },
   {status: 500}
  );
 }
}
