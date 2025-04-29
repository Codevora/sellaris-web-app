export type TransactionStatus = "pending" | "success" | "failed" | "refunded";

export interface Transaction {
 id?: string;
 userId: string;
 userName: string;
 packageId: string;
 packageName: string;
 amount: number;
 status: TransactionStatus;
 paymentMethod: string;
 paymentDetails?: {
  provider?: string;
  transactionId?: string;
  accountNumber?: string;
 };
 date: Date;
 expiryDate: Date;
 proofOfPayment?: string;
 notes?: string;
 createdAt?: Date;
 updatedAt?: Date;
}

export interface TransactionStats {
 totalRevenue: number;
 activeSubscribers: number;
 pendingTransactions: number;
 popularPackage: {
  name: string;
  count: number;
 };
}
