import { NextResponse } from 'next/server';
import { verifyDanaSignature } from '@/lib/dana';

export async function POST(req: Request) {
    try {
        const payload = await req.json();

        // 1. Verifikasi signature
        const isValid = verifyDanaSignature(payload);
        if (!isValid) {
            return NextResponse.json(
                { responseCode: "401", responseMessage: "INVALID_SIGNATURE" },
                { status: 401 }
            );
        }

        // 2. Proses pembaruan status pembayaran
        console.log('Payment success:', payload.referenceId);
        // TODO: Update database

        // 3. Response wajib untuk DANA
        return NextResponse.json({
            responseCode: "00000000",
            responseMessage: "SUCCESS"
        });

    } catch (error) {
        return NextResponse.json(
            { responseCode: "500", responseMessage: "INTERNAL_ERROR" },
            { status: 500 }
        );
    }
}