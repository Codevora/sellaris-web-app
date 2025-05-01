// hooks/useBlog.ts
import { useState, useEffect } from 'react';
import {
    addDoc,
    collection,
    getDocs,
    query,
    where,
    orderBy,
    limit,
    startAfter,
    DocumentData,
    QueryDocumentSnapshot,
    deleteDoc,
    doc
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '@/lib/firebase/init';

export const useBlog = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
    const [hasMore, setHasMore] = useState(true);

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

    const submitBlog = async (blogData: {
        title: string;
        content: string;
        imageFile?: File;
        author: string;
        category: string;
        excerpt: string;
    }) => {
        setIsLoading(true);
        setError(null);

        try {
            let imageUrl = '';

            if (blogData.imageFile) {
                const storageRef = ref(storage, `blog-images/${blogData.imageFile.name}`);
                await uploadBytes(storageRef, blogData.imageFile);
                imageUrl = await getDownloadURL(storageRef);
            }

            const docRef = await addDoc(collection(db, 'blogs'), {
                title: blogData.title,
                content: blogData.content,
                imageUrl,
                author: blogData.author,
                category: blogData.category,
                excerpt: blogData.excerpt,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            });

            // Add to local state
            setBlogs(prev => [{
                id: docRef.id,
                title: blogData.title,
                content: blogData.content,
                imageUrl,
                author: blogData.author,
                category: blogData.category,
                excerpt: blogData.excerpt,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            }, ...prev]);

            return docRef.id;
        } catch (err) {
            setError('Failed to submit blog. Please try again.');
            console.error('Error submitting blog:', err);
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    const fetchBlogs = async (searchTerm = '', category = '', loadMore = false) => {
        setIsLoading(true);
        setError(null);

        try {
            let q = query(
                collection(db, 'blogs'),
                orderBy('createdAt', 'desc'),
                limit(5)
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
            setHasMore(querySnapshot.docs.length === 5);
        } catch (err) {
            setError('Failed to fetch blogs. Please try again.');
            console.error('Error fetching blogs:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteBlog = async (blogId: string, imageUrl?: string) => {
        if (!window.confirm('Are you sure you want to delete this blog?')) return;

        setIsLoading(true);
        setError(null);

        try {
            // Delete image from storage if exists
            if (imageUrl) {
                const imageRef = ref(storage, imageUrl);
                await deleteObject(imageRef);
            }

            // Delete document from Firestore
            await deleteDoc(doc(db, 'blogs', blogId));

            // Remove from local state
            setBlogs(prev => prev.filter(blog => blog.id !== blogId));
        } catch (err) {
            setError('Failed to delete blog. Please try again.');
            console.error('Error deleting blog:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    return {
        submitBlog,
        fetchBlogs,
        deleteBlog,
        blogs,
        isLoading,
        error,
        hasMore
    };
};