// hooks/usePublicBlog.ts
import { useState, useEffect } from 'react';
import {
    getDocs,
    collection,
    query,
    where,
    orderBy,
    limit,
    startAfter,
    DocumentData,
    QueryDocumentSnapshot
} from 'firebase/firestore';
import { db } from '@/lib/firebase/init';

export const usePublicBlog = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
    const [hasMore, setHasMore] = useState(true);
    const [categories, setCategories] = useState<string[]>([]);

    interface Blog {
        id: string;
        title: string;
        content: string;
        imageUrl?: string;
        author: string;
        category: string;
        excerpt: string;
        createdAt: string;
        updatedAt: string;
    }

    const fetchBlogs = async (searchTerm = '', category = '', loadMore = false) => {
        if (!loadMore) {
            setIsLoading(true);
            setBlogs([]);
        }
        setError(null);

        try {
            let q = query(
                collection(db, 'blogs'),
                orderBy('createdAt', 'desc'),
                limit(6)
            );

            if (searchTerm) {
                q = query(
                    q,
                    where('title', '>=', searchTerm),
                    where('title', '<=', searchTerm + '\uf8ff')
                );
            }

            if (category) {
                q = query(q, where('category', '==', category));
            }

            if (loadMore && lastVisible) {
                q = query(q, startAfter(lastVisible));
            }

            const querySnapshot = await getDocs(q);
            const newBlogs = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Blog[];

            if (loadMore) {
                setBlogs(prev => [...prev, ...newBlogs]);
            } else {
                setBlogs(newBlogs);
            }

            setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1] || null);
            setHasMore(querySnapshot.docs.length === 6);

            // Get unique categories
            if (!loadMore) {
                const categoriesQuery = await getDocs(collection(db, 'blogs'));
                const uniqueCategories = Array.from(
                    new Set(categoriesQuery.docs.map(doc => doc.data().category))
                );
                setCategories(uniqueCategories);
            }
        } catch (err) {
            setError('Failed to fetch blogs. Please try again later.');
            console.error('Error fetching blogs:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    return {
        blogs,
        categories,
        isLoading,
        error,
        fetchBlogs,
        hasMore
    };
};