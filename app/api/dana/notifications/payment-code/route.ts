import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const payload = await req.json();
    console.log('Payment code generated:', payload.paymentCode);
    // Contoh: Simpan payment code untuk virtual account

    return NextResponse.json({
        responseCode: "00000000",
        responseMessage: "SUCCESS"
    });
}