import {
 collection,
 addDoc,
 getDocs,
 doc,
 updateDoc,
 deleteDoc,
 query,
 where,
} from "firebase/firestore";
import {db} from "./init";

export type PaymentMethod = {
 id?: string;
 name: string;
 type: "ewallet" | "bank" | "credit_card" | "cash";
 ewalletType?: "gopay" | "ovo" | "dana" | "shopeepay" | "linkaja";
 bankName?: string;
 accountNumber?: string;
 accountName?: string;
 cardNumber?: string;
 cardHolder?: string;
 expiryDate?: string;
 cvv?: string;
 isActive: boolean;
 createdAt?: Date;
 updatedAt?: Date;
};

export const PaymentService = {
 async addPaymentMethod(
  data: Omit<PaymentMethod, "id" | "createdAt" | "updatedAt">
 ) {
  try {
   if (data.type === "ewallet" && !data.ewalletType) {
    throw new Error("E-wallet type is required");
   }
   if (
    (data.type === "bank" || data.type === "ewallet") &&
    !data.accountNumber
   ) {
    throw new Error("Account number is required");
   }
   if (
    data.type === "credit_card" &&
    (!data.cardNumber || !data.cardHolder || !data.expiryDate || !data.cvv)
   ) {
    throw new Error("All credit card details are required");
   }

   const paymentData = {
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
   };

   const docRef = await addDoc(collection(db, "paymentMethods"), paymentData);
   return {success: true, id: docRef.id};
  } catch (error: any) {
   console.error("Error adding payment method:", error);
   return {success: false, error: error.message};
  }
 },

 async getPaymentMethods() {
  try {
   const snapshot = await getDocs(collection(db, "paymentMethods"));
   return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
   })) as PaymentMethod[];
  } catch (error) {
   console.error("Error getting payment methods:", error);
   return [];
  }
 },

 async checkPaymentMethodExists(type: string, identifier: string) {
  try {
   let q;
   if (type === "credit_card") {
    q = query(
     collection(db, "paymentMethods"),
     where("cardNumber", "==", identifier)
    );
   } else {
    q = query(
     collection(db, "paymentMethods"),
     where("accountNumber", "==", identifier)
    );
   }

   const snapshot = await getDocs(q);
   return !snapshot.empty;
  } catch (error) {
   console.error("Error checking payment method:", error);
   return false;
  }
 },

 async updatePaymentMethod(id: string, data: Partial<PaymentMethod>) {
  try {
   await updateDoc(doc(db, "paymentMethods", id), {
    ...data,
    updatedAt: new Date(),
   });
   return {success: true};
  } catch (error) {
   console.error("Error updating payment method:", error);
   return {success: false, error};
  }
 },

 async deletePaymentMethod(id: string) {
  try {
   await deleteDoc(doc(db, "paymentMethods", id));
   return {success: true};
  } catch (error) {
   console.error("Error deleting payment method:", error);
   return {success: false, error};
  }
 },
};
