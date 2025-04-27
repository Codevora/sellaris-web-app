export interface SubscriptionPackage {
    id?: string;
    name: string;
    description: string;
    duration: number;
    price: number;
    features: string[];
    isActive: boolean;
    isRecommended?: boolean;
    created_at?: Date;
    updated_at?: Date;
}
// types/subscription.ts
export interface UserSubscription {
    id: string;
    userId: string;
    packageId: string;
    packageName: string;
    price: number;
    duration: number;
    startDate: Date;
    endDate: Date;
    status: 'active' | 'expired' | 'canceled';
    paymentStatus: 'pending' | 'paid' | 'failed';
    paymentMethod: 'bank-transfer' | 'credit-card' | 'e-wallet'; // Tambahkan ini
    createdAt: Date;
    updatedAt: Date;
}

// Buat tipe untuk membuat subscription baru
export type CreateUserSubscription = Omit<UserSubscription,
    'id' | 'status' | 'paymentStatus' | 'createdAt' | 'updatedAt'>;