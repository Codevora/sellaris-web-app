import { NextResponse } from "next/server";
import { getFirestore } from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/init";

export async function POST(request: Request) {
    const { userId, companyData } = await request.json();

    try {
        const userRef = doc(db, "users", userId);

        await updateDoc(userRef, {
            company: {
                name: companyData.name,
                email: companyData.email,
                phone: companyData.phone,
                address: companyData.address,
                industry: companyData.industry,
                size: companyData.size,
            },
            updatedAt: new Date(),
        });

        return NextResponse.json({
            status: true,
            message: "Company data saved successfully",
        });
    } catch (error) {
        console.error("Error saving company data:", error);
        return NextResponse.json(
            {
                status: false,
                message: "Failed to save company data",
            },
            { status: 500 }
        );
    }
}