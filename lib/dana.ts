import crypto from 'crypto';

export function verifyDanaSignature(payload: any): boolean {
    const secretKey = process.env.DANA_SECRET_KEY!;
    const signature = payload.signature;

    // 1. Susun string untuk verifikasi (sesuai dokumentasi DANA)
    const stringToSign = `${payload.referenceId}${payload.amount}${payload.status}`;

    // 2. Generate HMAC-SHA256
    const generatedSignature = crypto
        .createHmac('sha256', secretKey)
        .update(stringToSign)
        .digest('hex');

    // 3. Bandingkan signature
    return generatedSignature === signature;
}