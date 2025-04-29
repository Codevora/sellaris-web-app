export type TransactionStatus = "pending" | "success" | "failed";

export interface Transaction {
 id?: string;
 userId: string;
 userName: string;
 packageId: string;
 packageName: string;
 amount: number;
 status: TransactionStatus;
 paymentMethod: string;
 proofOfPayment?: string;
 expiryDate: Date;
 date: Date;
 createdAt?: Date;
 updatedAt?: Date;
}

export interface TransactionStats {
 totalRevenue: number;
 pendingTransactions: number;
 activeSubscribers?: number; // Now optional
 popularPackage: {
  name: string;
  count: number;
 };
}
