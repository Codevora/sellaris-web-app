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

export interface UserSubscription {
    id?: string;
    userId: string;
    packageId: string;
    packageName: string;
    startDate: Date;
    endDate: Date;
    price: number;
    duration: number;
    status: "active" | "expired" | "canceled";
    paymentStatus: "pending" | "paid" | "failed";
    paymentMethod?: "bank-transfer" | "credit-card" | "e-wallet";
    createdAt?: Date;
    updatedAt?: Date;
}