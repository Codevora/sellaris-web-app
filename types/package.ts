// lib/types/package.ts
export interface Package {
 id?: string;
 name: string;
 description: string;
 price: number;
 duration: number; // in years
 features: string[];
 isFeatured: boolean;
 colorScheme: {
  // Remove the ? to make it required
  primary: string;
  secondary: string;
  text: string;
 };
 createdAt?: Date;
 updatedAt?: Date;
}
