// /hooks/useUserSubscription.ts
import { useState, useEffect } from "react";
import {
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    query,
    where,
    getDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase/init";

export interface UserSubscription {
    id?: string;
    userId: string;
    packageId: string;
    packageName: string;
    startDate: Date;
    endDate: Date;
    price: number;
    duration: number;
    status: "active" | "expired" | "canceled";
    paymentStatus: "pending" | "paid" | "failed";
    createdAt?: Date;
    updatedAt?: Date;
}

export const useUserSubscription = (userId?: string) => {
    const [subscriptions, setSubscriptions] = useState<UserSubscription[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const fetchSubscriptions = async (id: string) => {
        try {
            setLoading(true);
            const q = query(
                collection(db, "userSubscriptions"),
                where("userId", "==", id)
            );
            const querySnapshot = await getDocs(q);
            const data: UserSubscription[] = [];
            querySnapshot.forEach((doc) => {
                const docData = doc.data();
                data.push({
                    id: doc.id,
                    userId: docData.userId,
                    packageId: docData.packageId,
                    packageName: docData.packageName,
                    price: docData.price,
                    duration: docData.duration,
                    startDate: docData.startDate.toDate(),
                    endDate: docData.endDate.toDate(),
                    status: docData.status,
                    paymentStatus: docData.paymentStatus,
                    createdAt: docData.createdAt?.toDate(),
                    updatedAt: docData.updatedAt?.toDate(),
                });
            });
            setSubscriptions(data);
        } catch (err) {
            setError("Failed to fetch subscriptions");
            console.error("Error fetching subscriptions:", err);
        } finally {
            setLoading(false);
        }
    };

    const getSubscriptionById = async (id: string) => {
        try {
            setLoading(true);
            const docSnap = await getDoc(doc(db, "userSubscriptions", id));
            if (docSnap.exists()) {
                const data = docSnap.data();
                return {
                    id: docSnap.id,
                    userId: data.userId,
                    packageId: data.packageId,
                    packageName: data.packageName,
                    price: data.price,
                    duration: data.duration,
                    startDate: data.startDate.toDate(),
                    endDate: data.endDate.toDate(),
                    status: data.status,
                    paymentStatus: data.paymentStatus,
                    createdAt: data.createdAt?.toDate(),
                    updatedAt: data.updatedAt?.toDate(),
                };
            }
            return null;
        } catch (err) {
            setError("Failed to fetch subscription");
            console.error("Error fetching subscription:", err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const verifyPayment = async (subscriptionId: string) => {
        try {
            setLoading(true);
            const docRef = doc(db, "userSubscriptions", subscriptionId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                if (data.paymentStatus === 'paid') {
                    return { success: true };
                }

                // Simulasi verifikasi pembayaran
                // Di real implementation, ini akan memanggil API pembayaran
                await updateDoc(docRef, {
                    paymentStatus: 'paid',
                    updatedAt: new Date(),
                });

                return { success: true };
            }
            return { success: false, error: "Subscription not found" };
        } catch (err) {
            setError("Failed to verify payment");
            console.error("Error verifying payment:", err);
            return { success: false, error: "Verification failed" };
        } finally {
            setLoading(false);
        }
    };


    const createSubscription = async (data: UserSubscription) => {
        try {
            // 1. Simpan data subscription ke database
            const subscriptionResponse = await fetch('/api/subscriptions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...data,
                    paymentStatus: 'pending', // Status awal
                    status: 'active' // Status subscription
                }),
            });

            const subscriptionResult = await subscriptionResponse.json();

            if (!subscriptionResponse.ok) {
                throw new Error(subscriptionResult.message || 'Failed to create subscription');
            }

            // 2. Jika metode pembayaran e-wallet (DANA), buat transaksi pembayaran
            if (data.paymentMethod === 'e-wallet') {
                const paymentResponse = await fetch('/api/payment/dana/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        subscriptionId: subscriptionResult.id,
                        amount: data.price,
                        userId: data.userId
                    }),
                });

                const paymentResult = await paymentResponse.json();

                if (!paymentResponse.ok) {
                    throw new Error(paymentResult.message || 'Failed to create DANA payment');
                }

                // Gabungkan hasil
                return {
                    ...subscriptionResult,
                    paymentData: paymentResult
                };
            }

            return subscriptionResult;

        } catch (error) {
            console.error('Error in createSubscription:', error);
            throw error;
        }
    };

    const cancelSubscription = async (subscriptionId: string) => {
        try {
            setLoading(true);
            await updateDoc(doc(db, "userSubscriptions", subscriptionId), {
                status: "canceled",
                updatedAt: new Date(),
            });
            setSubscriptions(
                subscriptions.map((sub) =>
                    sub.id === subscriptionId ? { ...sub, status: "canceled" } : sub
                )
            );
            return { success: true };
        } catch (err) {
            setError("Failed to cancel subscription");
            console.error("Error canceling subscription:", err);
            return { success: false };
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchSubscriptions(userId);
        }
    }, [userId]);

    return {
        subscriptions,
        loading,
        error,
        createSubscription,
        cancelSubscription,
        fetchSubscriptions, 
        getSubscriptionById, 
        verifyPayment,
    };
};
