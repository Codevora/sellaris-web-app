import {useState, useEffect} from "react";
import {TransactionStats} from "@/types/transaction";

export const useTransactionStats = () => {
 const [stats, setStats] = useState<TransactionStats | null>(null);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState<string | null>(null);

 const fetchStats = async () => {
  try {
   setLoading(true);
   setError(null);

   const response = await fetch("/api/transactions/stats");
   if (!response.ok) throw new Error("Failed to fetch transaction stats");

   const data = await response.json();
   setStats(data);
  } catch (err) {
   setError(err instanceof Error ? err.message : "Unknown error");
  } finally {
   setLoading(false);
  }
 };

 useEffect(() => {
  fetchStats();
 }, []);

 return {
  stats,
  loading,
  error,
  refresh: fetchStats,
 };
};
