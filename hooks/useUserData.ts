import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { doc, getDoc, updateDoc, collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/init';
import { toast } from 'react-hot-toast';
import { CompanyData } from '@/types/company';

interface UserData {
    id?: string;
    fullname?: string;
    email?: string;
    phone?: string;
    role?: string;
    updated_at?: any;
    companyId?: string;
}

export const useUserData = () => {
    const { data: session } = useSession();
    const [userData, setUserData] = useState<UserData | null>(null);
    const [companyData, setCompanyData] = useState<CompanyData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchUserData = async () => {
        if (!session?.user?.email) {
            setIsLoading(false);
            return;
        }

        try {
            // Cari user berdasarkan email
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('email', '==', session.user.email));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0];
                const data = userDoc.data();

                setUserData({
                    id: userDoc.id,
                    ...data
                });

                // Jika user memiliki companyId, ambil data perusahaan
                if (data.companyId) {
                    const companyRef = doc(db, 'companies', data.companyId);
                    const companySnap = await getDoc(companyRef);

                    if (companySnap.exists()) {
                        setCompanyData({
                            id: companySnap.id,
                            ...companySnap.data()
                        });
                    }
                }
            } else {
                toast.error('User data not found in Firestore');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            toast.error('Failed to load user data');
        } finally {
            setIsLoading(false);
        }
    };

    const updateUserData = async (updatedData: Partial<UserData>) => {
        if (!userData?.id) return;

        try {
            const userRef = doc(db, 'users', userData.id);
            await updateDoc(userRef, {
                ...updatedData,
                updated_at: new Date()
            });

            toast.success('Profile updated successfully!');
            await fetchUserData(); // Refresh data
            return true;
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile');
            return false;
        }
    };

    const saveCompanyData = async (companyData: Partial<CompanyData>): Promise<boolean> => {
        if (!userData?.id) return false;

        try {
            if (companyData.id) {
                const companyRef = doc(db, 'companies', companyData.id);
                await updateDoc(companyRef, {
                    ...companyData,
                    updatedAt: new Date()
                });
            } else {
                const companyRef = await addDoc(collection(db, 'companies'), {
                    ...companyData,
                    userId: userData.id,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });

                await updateDoc(doc(db, 'users', userData.id), {
                    companyId: companyRef.id,
                });
            }

            toast.success('Company data saved successfully!');
            await fetchUserData();
            return true;
        } catch (error) {
            console.error('Error saving company data:', error);
            toast.error('Failed to save company data');
            return false;
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [session]);

    return {
        userData,
        companyData,
        isLoading,
        fetchUserData,
        updateUserData,
        saveCompanyData
    };
};