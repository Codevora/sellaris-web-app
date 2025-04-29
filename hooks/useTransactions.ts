import {useState, useEffect} from "react";
import {Transaction, TransactionStatus} from "@/types/transaction";

interface UseTransactionsProps {
 status?: TransactionStatus;
 userId?: string;
 packageId?: string;
 limit?: number;
}

export const useTransactions = ({
 status,
 userId,
 packageId,
 limit,
}: UseTransactionsProps = {}) => {
 const [transactions, setTransactions] = useState<Transaction[]>([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState<string | null>(null);

 const fetchTransactions = async () => {
  try {
   setLoading(true);
   setError(null);

   let url = "/api/transactions?";
   if (status) url += `status=${status}&`;
   if (userId) url += `userId=${userId}&`;
   if (packageId) url += `packageId=${packageId}&`;
   if (limit) url += `limit=${limit}&`;

   const response = await fetch(url);
   if (!response.ok) throw new Error("Failed to fetch transactions");

   const data = await response.json();
   setTransactions(data);
  } catch (err) {
   setError(err instanceof Error ? err.message : "Unknown error");
  } finally {
   setLoading(false);
  }
 };

 useEffect(() => {
  fetchTransactions();
 }, [status, userId, packageId, limit]);

 return {
  transactions,
  loading,
  error,
  refresh: fetchTransactions,
 };
};
