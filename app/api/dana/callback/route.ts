import { NextResponse } from 'next/server';
import { updateSubscriptionStatus } from '@/lib/subscriptions';

export async function POST(request: Request) {
    try {
        const payload = await request.json();

        // 1. Verifikasi signature (penting untuk production)
        // const isValid = verifyDanaSignature(payload);
        // if (!isValid) return new Response('Invalid signature', { status: 401 });

        // 2. Update status pembayaran di database
        await updateSubscriptionStatus(payload.referenceId, 'paid');

        // 3. Response ke DANA
        return NextResponse.json({
            responseCode: "00000000",
            responseMessage: "SUCCESS"
        });

    } catch (error) {
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}