import {NextResponse} from "next/server";
import {PaymentService} from "@/lib/firebase/paymentService";

export async function GET() {
 try {
  const paymentMethods = await PaymentService.getPaymentMethods();
  return NextResponse.json(paymentMethods);
 } catch (error) {
  return NextResponse.json(
   {error: "Failed to fetch payment methods"},
   {status: 500}
  );
 }
}

export async function POST(request: Request) {
 try {
  const data = await request.json();
  const result = await PaymentService.addPaymentMethod(data);

  if (result.success) {
   return NextResponse.json({id: result.id}, {status: 201});
  } else {
   return NextResponse.json({error: result.error}, {status: 400});
  }
 } catch (error) {
  return NextResponse.json({error: "Internal server error"}, {status: 500});
 }
}
