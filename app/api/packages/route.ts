import {NextResponse} from "next/server";
import {
 getPackages,
 addPackage,
 updatePackage,
 deletePackage,
} from "@/lib/firebase/packageService";
import {Package} from "@/types/package";

const handleError = (error: unknown, message: string) => {
 console.error(message, error);
 return NextResponse.json({error: message}, {status: 500});
};

export async function GET() {
 try {
  const packages = await getPackages();
  return NextResponse.json(packages);
 } catch (error) {
  return handleError(error, "Failed to fetch packages");
 }
}

export async function POST(request: Request) {
 try {
  const packageData: Omit<Package, "id"> = await request.json();
  const packageId = await addPackage(packageData);
  return NextResponse.json({id: packageId}, {status: 201});
 } catch (error) {
  return handleError(error, "Failed to create package");
 }
}

export async function PUT(request: Request) {
 try {
  const {id, ...packageData}: Partial<Package> & {id: string} =
   await request.json();

  if (!id) {
   return NextResponse.json({error: "Package ID is required"}, {status: 400});
  }

  await updatePackage(id, packageData);
  return NextResponse.json({success: true});
 } catch (error) {
  return handleError(error, "Failed to update package");
 }
}

export async function DELETE(request: Request) {
 try {
  const {id} = await request.json();

  if (!id) {
   return NextResponse.json({error: "Package ID is required"}, {status: 400});
  }

  await deletePackage(id);
  return NextResponse.json({success: true});
 } catch (error) {
  return handleError(error, "Failed to delete package");
 }
}
