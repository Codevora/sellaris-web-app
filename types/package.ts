// lib/types/package.ts
export interface Package {
 id?: string;
 name: string;
 description: string;
 price: number;
 duration: number; // in years
 features: string[];
 isFeatured: boolean;
 createdAt?: Date;
 updatedAt?: Date;
}
