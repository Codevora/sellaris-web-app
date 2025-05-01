// app/api/blog/route.ts
import { NextResponse } from 'next/server';
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase/init';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();

        const title = formData.get('title') as string;
        const content = formData.get('content') as string;
        const author = formData.get('author') as string;
        const category = formData.get('category') as string;
        const excerpt = formData.get('excerpt') as string;
        const imageFile = formData.get('imageFile') as File | null;

        let imageUrl = '';

        if (imageFile) {
            const storageRef = ref(storage, `blog-images/${imageFile.name}`);
            await uploadBytes(storageRef, imageFile);
            imageUrl = await getDownloadURL(storageRef);
        }

        const docRef = await addDoc(collection(db, 'blogs'), {
            title,
            content,
            imageUrl,
            author,
            category,
            excerpt,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        });

        return NextResponse.json({ success: true, id: docRef.id });
    } catch (error) {
        console.error('Error submitting blog:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to submit blog' },
            { status: 500 }
        );
    }
}