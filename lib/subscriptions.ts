// lib/subscriptions.ts
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase/init";

export async function getSubscriptionById(subscriptionId: string) {
    try {
        const docRef = doc(db, "userSubscriptions", subscriptionId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            return {
                id: docSnap.id,
                price: data.price,
                status: data.status,
                // tambahkan field lain yang diperlukan
            };
        }
        return null;
    } catch (error) {
        console.error("Error fetching subscription:", error);
        throw error;
    }
}

export async function updateSubscriptionStatus(subscriptionId: string, status: string) {
    try {
        const docRef = doc(db, "userSubscriptions", subscriptionId);
        await updateDoc(docRef, {
            status,
            updatedAt: new Date()
        });
    } catch (error) {
        console.error("Error updating subscription:", error);
        throw error;
    }
}