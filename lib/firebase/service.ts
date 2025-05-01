import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    orderBy,
    query,
    updateDoc,
    where,

} from "firebase/firestore";
import { app, db } from "./init";
import bcrypt from "bcrypt";
import { sendVerificationEmail } from "./email";

const firestore = getFirestore(app);

export async function retrieveData(collectionName: string) {
    const snapshot = await getDocs(collection(firestore, collectionName));
    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
}

export async function retrieveDataById(collectionName: string, id: string) {
    const snapshot = await getDoc(doc(firestore, collectionName, id));
    return snapshot.data();
}

export async function register(data: {
    fullname: string;
    email: string;
    phone: string;
    password: string;
}) {
    const q = query(
        collection(firestore, "users"),
        where("email", "==", data.email)
    );
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
        return {
            status: false,
            statusCode: 400,
            message: "Email already exists",
        };
    }

    data.password = await bcrypt.hash(data.password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    try {
        const userRef = await addDoc(collection(firestore, "users"), {
            ...data,
            role: "member",
            verified: false,
            otp,
            otpExpiry: new Date(Date.now() + 15 * 60 * 1000),
            company: null,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        await sendVerificationEmail(data.email, otp, data.fullname);
        return {
            status: true,
            statusCode: 200,
            message: "Verification email sent",
            userId: userRef.id,
        };
    } catch (error) {
        console.error("Registration error:", error);
        return {
            status: false,
            statusCode: 400,
            message: "Registration failed",
        };
    }
}

export async function verifyOTP(email: string, otp: string) {
    try {
        const q = query(
            collection(firestore, "users"),
            where("email", "==", email)
        );
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            return { status: false, message: "User not found or OTP expired" };
        }

        const userDoc = snapshot.docs[0];
        const userData = userDoc.data();

        if (userData.otp !== otp) {
            return { status: false, message: "Invalid OTP" };
        }

        await updateDoc(userDoc.ref, {
            verified: true,
            otp: null,
            otpExpiry: null,
            updatedAt: new Date(),
        });

        return {
            status: true,
            message: "Verification successful",
            user: {
                id: userDoc.id,
                email: userData.email,
                fullname: userData.fullname,
                role: userData.role,
            },
        };
    } catch (error) {
        console.error("Verification error:", error);
        return { status: false, message: "Verification failed" };
    }
}

export async function saveCompanyData(userId: string, companyData: any) {
    try {
        const companyRef = await addDoc(collection(firestore, "companies"), {
            ...companyData,
            userId,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        // Update user document to reference this company
        await updateDoc(doc(firestore, "users", userId), {
            companyId: companyRef.id,
        });

        return {
            status: true,
            message: "Company data saved successfully",
            companyId: companyRef.id,
        };
    } catch (error) {
        console.error("Error saving company data:", error);
        return {
            status: false,
            message: "Failed to save company data",
        };
    }
}

export async function login({ email }: { email: string }) {
    const q = query(collection(firestore, "users"), where("email", "==", email));
    const snapshot = await getDocs(q);

    if (snapshot.empty) return null;

    const doc = snapshot.docs[0];
    const data = doc.data();

    return {
        id: doc.id,
        email: data.email,
        fullname: data.fullname,
        role: data.role,
        password: data.password,
        verified: data.verified,
    };
}

