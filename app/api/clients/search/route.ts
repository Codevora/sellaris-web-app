import {NextResponse} from "next/server";
import {ClientManagementService} from "@/lib/firebase/clientManagementService";

export async function GET(request: Request) {
 try {
  const {searchParams} = new URL(request.url);
  const term = searchParams.get("term") || "";

  const clients = await ClientManagementService.searchClients(term);
  return NextResponse.json(clients, {status: 200});
 } catch (error) {
  return NextResponse.json({error: "Failed to search clients"}, {status: 500});
 }
}
