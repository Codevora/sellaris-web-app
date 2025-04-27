import { NextResponse } from "next/server";
import { updateDoc, doc, getFirestore } from "firebase/firestore";
import { app } from "@/lib/firebase/init";

const db = getFirestore(app);

export async function POST(req: Request) {
    try {
        const payload = await req.json();

        // Di production, verifikasi signature Dana
        // const isValid = verifyDanaSignature(payload);
        // if (!isValid) {
        //   return NextResponse.json({ success: false, error: "Invalid signature" }, { status: 400 });
        // }

        // Update payment status
        const subscriptionRef = doc(db, "userSubscriptions", payload.referenceId);
        await updateDoc(subscriptionRef, {
            paymentStatus: 'paid',
            updatedAt: new Date(),
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Dana callback error:', error);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}