import {NextResponse} from "next/server";
import {
 getTransactions,
 addTransaction,
 updateTransaction,
 deleteTransaction,
 getTransactionById,
} from "@/lib/firebase/transactionService";
import {Transaction, TransactionStatus} from "@/types/transaction";

export async function GET(request: Request) {
 try {
  const {searchParams} = new URL(request.url);
  const userId = searchParams.get("userId");
  const status = searchParams.get("status") as TransactionStatus | null;
  const packageId = searchParams.get("packageId");

  // Build query filters
  const filters = {
   ...(userId && {userId}),
   ...(status && {status}),
   ...(packageId && {packageId}),
  };

  const transactions = await getTransactions(filters);
  return NextResponse.json(transactions);
 } catch (error) {
  return NextResponse.json(
   {error: "Failed to fetch transactions"},
   {status: 500}
  );
 }
}

export async function POST(request: Request) {
 try {
  const transactionData: Omit<Transaction, "id"> = await request.json();

  // Validate required fields
  if (
   !transactionData.userId ||
   !transactionData.packageId ||
   !transactionData.amount
  ) {
   return NextResponse.json({error: "Missing required fields"}, {status: 400});
  }

  const transactionId = await addTransaction(transactionData);
  return NextResponse.json({id: transactionId}, {status: 201});
 } catch (error) {
  return NextResponse.json(
   {error: "Failed to create transaction"},
   {status: 500}
  );
 }
}

export async function PUT(request: Request) {
 try {
  const {id, ...updateData}: Partial<Transaction> & {id: string} =
   await request.json();

  if (!id) {
   return NextResponse.json(
    {error: "Transaction ID is required"},
    {status: 400}
   );
  }

  await updateTransaction(id, updateData);
  return NextResponse.json({success: true});
 } catch (error) {
  return NextResponse.json(
   {error: "Failed to update transaction"},
   {status: 500}
  );
 }
}

export async function DELETE(request: Request) {
 try {
  const {id} = await request.json();

  if (!id) {
   return NextResponse.json(
    {error: "Transaction ID is required"},
    {status: 400}
   );
  }

  await deleteTransaction(id);
  return NextResponse.json({success: true});
 } catch (error) {
  return NextResponse.json(
   {error: "Failed to delete transaction"},
   {status: 500}
  );
 }
}
