// app/api/subscriptions/route.ts
import { NextResponse } from 'next/server';
import { CreateUserSubscription } from '@/types/subscription';

export async function POST(request: Request) {
    try {
        const subscriptionData: CreateUserSubscription = await request.json();

        // Simpan ke database
        // ...

        return NextResponse.json({
            success: true,
            id: "generated-id" // Ganti dengan ID sebenarnya
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}