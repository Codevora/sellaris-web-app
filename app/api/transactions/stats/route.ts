import {NextResponse} from "next/server";
import {getTransactions} from "@/lib/firebase/transactionService";
import {TransactionStats} from "@/types/transaction";

export async function GET() {
 try {
  const transactions = await getTransactions();

  // Calculate total revenue (only successful transactions)
  const totalRevenue = transactions
   .filter((t) => t.status === "success")
   .reduce((sum, t) => sum + t.amount, 0);

  // Calculate active subscribers (successful transactions not expired)
  const activeSubscribers = new Set(
   transactions
    .filter(
     (t) => t.status === "success" && new Date(t.expiryDate) > new Date()
    )
    .map((t) => t.userId)
  ).size;

  // Calculate pending transactions
  const pendingTransactions = transactions.filter(
   (t) => t.status === "pending"
  ).length;

  // Find most popular package
  const packageCounts = transactions.reduce((acc, t) => {
   acc[t.packageId] = (acc[t.packageId] || 0) + 1;
   return acc;
  }, {} as Record<string, number>);

  const popularPackageId =
   Object.entries(packageCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "";
  const popularPackageName =
   transactions.find((t) => t.packageId === popularPackageId)?.packageName ||
   "N/A";

  const stats: TransactionStats = {
   totalRevenue,
   activeSubscribers,
   pendingTransactions,
   popularPackage: {
    name: popularPackageName,
    count: packageCounts[popularPackageId] || 0,
   },
  };

  return NextResponse.json(stats);
 } catch (error) {
  return NextResponse.json(
   {error: "Failed to fetch transaction stats"},
   {status: 500}
  );
 }
}
