import { NextResponse } from "next/server";
import { createUserSubscription } from "@/lib/firebase/service";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const result = await createUserSubscription(body);

        if (result.status) {
            return NextResponse.json({
                success: true,
                id: result.id
            });
        }

        return NextResponse.json(
            { success: false, error: result.message },
            { status: 400 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, error: "Failed to create subscription" },
            { status: 500 }
        );
    }
}