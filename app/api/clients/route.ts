import {NextResponse} from "next/server";
import {ClientManagementService} from "@/lib/firebase/clientManagementService";

export async function GET() {
 try {
  const clients = await ClientManagementService.getClients();
  return NextResponse.json(clients, {status: 200});
 } catch (error) {
  return NextResponse.json({error: "Failed to fetch clients"}, {status: 500});
 }
}
