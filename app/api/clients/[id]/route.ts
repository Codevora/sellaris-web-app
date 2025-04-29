import {NextResponse} from "next/server";
import {ClientManagementService} from "@/lib/firebase/clientManagementService";
import {Client} from "@/types/client";

export async function GET(request: Request, {params}: {params: {id: string}}) {
 try {
  const client = await ClientManagementService.getClientById(params.id);

  if (!client) {
   return NextResponse.json({error: "Client not found"}, {status: 404});
  }

  return NextResponse.json(client, {status: 200});
 } catch (error) {
  return NextResponse.json({error: "Failed to fetch client"}, {status: 500});
 }
}

export async function PUT(request: Request, {params}: {params: {id: string}}) {
 try {
  const updateData: Partial<Client> = await request.json();

  await ClientManagementService.updateClient(params.id, updateData);
  return NextResponse.json({success: true}, {status: 200});
 } catch (error) {
  return NextResponse.json({error: "Failed to update client"}, {status: 500});
 }
}

export async function DELETE(
 request: Request,
 {params}: {params: {id: string}}
) {
 try {
  await ClientManagementService.deleteClient(params.id);
  return NextResponse.json({success: true}, {status: 200});
 } catch (error) {
  return NextResponse.json({error: "Failed to delete client"}, {status: 500});
 }
}
