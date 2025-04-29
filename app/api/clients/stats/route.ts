import {NextResponse} from "next/server";
import {ClientManagementService} from "@/lib/firebase/clientManagementService";

export async function GET() {
 try {
  const stats = await ClientManagementService.getClientCount();
  return NextResponse.json(stats, {status: 200});
 } catch (error) {
  return NextResponse.json(
   {error: "Failed to fetch client stats"},
   {status: 500}
  );
 }
}
