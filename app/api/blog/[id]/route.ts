import { NextResponse } from 'next/server';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/init';

interface BlogData {
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

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const docRef = doc(db, 'blogs', params.id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
            return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
        }

        const blogData = {
            id: docSnap.id,
            ...docSnap.data()
        } as BlogData;

        return NextResponse.json(blogData);
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to fetch blog' },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const formData = await request.formData();
        const blogRef = doc(db, 'blogs', params.id);

        const updateData: Partial<BlogData> = {
            title: formData.get('title') as string,
            content: formData.get('content') as string,
            author: formData.get('author') as string,
            category: formData.get('category') as string,
            excerpt: formData.get('excerpt') as string,
            updatedAt: new Date().toISOString()
        };

        await updateDoc(blogRef, updateData);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to update blog' },
            { status: 500 }
        );
    }
}