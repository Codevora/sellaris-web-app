// /services/paymentService.ts
export const checkPaymentStatus = async (subscriptionId: string) => {
    // Dalam implementasi nyata, ini akan memanggil API Anda
    // yang kemudian memverifikasi status pembayaran dengan payment gateway

    // Simulasi: 70% success, 20% pending, 10% failed
    const random = Math.random();

    if (random < 0.7) {
        return "paid";
    } else if (random < 0.9) {
        return "pending";
    } else {
        return "failed";
    }
};