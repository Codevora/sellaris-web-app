import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { app } from "@/lib/firebase/init";

const db = getFirestore(app);

// Simulasi verifikasi signature Dana
export const verifyDanaSignature = (payload: any): boolean => {
    // Di implementasi real, ini akan memverifikasi signature dari Dana
    // menggunakan secret key merchant
    return true; // Untuk development, selalu return true
};

// Simulasi pembuatan QR Code Dana
export const generateDanaQRCode = (subscription: any, userId: string) => {
    const referenceId = `DANA-${Math.floor(100000000 + Math.random() * 900000000)}`;

    return {
        qrData: JSON.stringify({
            merchantId: 'YOUR_MERCHANT_ID',
            referenceId,
            amount: subscription.price,
            customerId: userId,
            itemName: subscription.packageName,
            callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/dana/callback`
        }),
        referenceId,
    };
};

// Update payment status
export const updatePaymentStatus = async (subscriptionId: string, status: 'paid' | 'failed') => {
    try {
        const subscriptionRef = doc(db, "userSubscriptions", subscriptionId);
        await updateDoc(subscriptionRef, {
            paymentStatus: status,
            updatedAt: new Date(),
        });
        return { success: true };
    } catch (error) {
        console.error('Failed to update payment status:', error);
        return { success: false, error };
    }
};