export interface User {
    id?: string;
    fullname: string;
    email: string;
    phone: string;
    password: string;
    role: string;
    verified: boolean;
    otp?: string;
    otpExpiry?: Date;
    company: CompanyData | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface CompanyData {
    name: string;
    email: string;
    phone: string;
    address: string;
    industry: string;
    size: string;
}