import {db} from "./init";
import {
 collection,
 addDoc,
 getDocs,
 query,
 where,
 orderBy,
 doc,
 updateDoc,
 deleteDoc,
 getDoc,
 limit,
} from "firebase/firestore";
import {Transaction, TransactionStatus} from "@/types/transaction";

const transactionCollection = collection(db, "transactions");

interface GetTransactionsParams {
 userId?: string;
 status?: TransactionStatus;
 packageId?: string;
 limit?: number;
}

export const getTransactions = async (
 params?: GetTransactionsParams
): Promise<Transaction[]> => {
 try {
  let q = query(transactionCollection, orderBy("date", "desc"));

  if (params?.userId) {
   q = query(q, where("userId", "==", params.userId));
  }

  if (params?.status) {
   q = query(q, where("status", "==", params.status));
  }

  if (params?.packageId) {
   q = query(q, where("packageId", "==", params.packageId));
  }

  if (params?.limit) {
   q = query(q, limit(params.limit));
  }

  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
   id: doc.id,
   ...doc.data(),
   date: doc.data().date?.toDate(),
   expiryDate: doc.data().expiryDate?.toDate(),
   createdAt: doc.data().createdAt?.toDate(),
   updatedAt: doc.data().updatedAt?.toDate(),
  })) as Transaction[];
 } catch (error) {
  console.error("Error fetching transactions:", error);
  throw error;
 }
};

export const getTransactionById = async (
 id: string
): Promise<Transaction | null> => {
 try {
  const docRef = doc(transactionCollection, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
   return {
    id: docSnap.id,
    ...docSnap.data(),
    date: docSnap.data().date?.toDate(),
    expiryDate: docSnap.data().expiryDate?.toDate(),
    createdAt: docSnap.data().createdAt?.toDate(),
    updatedAt: docSnap.data().updatedAt?.toDate(),
   } as Transaction;
  }
  return null;
 } catch (error) {
  console.error("Error getting transaction:", error);
  throw error;
 }
};

export const addTransaction = async (
 transactionData: Omit<Transaction, "id">
): Promise<string> => {
 try {
  const docRef = await addDoc(transactionCollection, {
   ...transactionData,
   status: transactionData.status || "pending",
   createdAt: new Date(),
   updatedAt: new Date(),
  });
  return docRef.id;
 } catch (error) {
  console.error("Error adding transaction:", error);
  throw error;
 }
};

export const updateTransaction = async (
 id: string,
 transactionData: Partial<Transaction>
): Promise<void> => {
 try {
  const transactionRef = doc(transactionCollection, id);
  await updateDoc(transactionRef, {
   ...transactionData,
   updatedAt: new Date(),
  });
 } catch (error) {
  console.error("Error updating transaction:", error);
  throw error;
 }
};

export const updateTransactionStatus = async (
 id: string,
 status: TransactionStatus
): Promise<void> => {
 try {
  const transactionRef = doc(transactionCollection, id);
  await updateDoc(transactionRef, {
   status,
   updatedAt: new Date(),
  });
 } catch (error) {
  console.error("Error updating transaction status:", error);
  throw error;
 }
};

export const deleteTransaction = async (id: string): Promise<void> => {
 try {
  const transactionRef = doc(transactionCollection, id);
  await deleteDoc(transactionRef);
 } catch (error) {
  console.error("Error deleting transaction:", error);
  throw error;
 }
};
