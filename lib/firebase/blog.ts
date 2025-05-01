// services/firebase/blog.ts
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase/init";

interface Blog {
    id: string;
    title: string;
    content: string;
    imageUrl?: string;
    author: string;
    category: string;
    createdAt: string;
    updatedAt: string;
}

export const getBlogById = async (id: string): Promise<Blog | null> => {
    try {
        const docRef = doc(db, "blogs", id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            return null;
        }

        return {
            id: docSnap.id,
            ...docSnap.data()
        } as Blog;
    } catch (error) {
        console.error("Error getting blog:", error);
        throw new Error("Failed to fetch blog");
    }
};