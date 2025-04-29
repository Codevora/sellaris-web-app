import {NextResponse} from "next/server";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {SettingsService} from "@/lib/firebase/settingsService";

export async function GET() {
 const session = await getServerSession(authOptions);

 if (!session?.user?.id) {
  return NextResponse.json({error: "Unauthorized"}, {status: 401});
 }

 try {
  const settings = await SettingsService.getSettings(session.user.id);
  return NextResponse.json(settings);
 } catch (error) {
  console.error("Error getting settings:", error);
  return NextResponse.json({error: "Failed to get settings"}, {status: 500});
 }
}

export async function PATCH(request: Request) {
 const session = await getServerSession(authOptions);

 if (!session?.user?.id) {
  return NextResponse.json({error: "Unauthorized"}, {status: 401});
 }

 try {
  const data = await request.json();
  await SettingsService.updateSettings(session.user.id, data);
  return NextResponse.json({success: true});
 } catch (error) {
  console.error("Error updating settings:", error);
  return NextResponse.json({error: "Failed to update settings"}, {status: 500});
 }
}
