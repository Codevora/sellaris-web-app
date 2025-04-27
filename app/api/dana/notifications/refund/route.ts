import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const payload = await req.json();
    console.log('Refund processed:', payload.refundId);
    // TODO: Update status refund di database

    return NextResponse.json({
        responseCode: "00000000",
        responseMessage: "SUCCESS"
    });
}