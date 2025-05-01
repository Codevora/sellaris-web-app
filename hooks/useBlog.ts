"use client";

import {useState, useEffect} from "react";
import {db} from "@/lib/firebase/init";
import {
 collection,
 addDoc,
 getDocs,
 doc,
 updateDoc,
 deleteDoc,
} from "firebase/firestore";

export interface BlogPost {
 id?: string;
 title: string;
 content: string;
 imageUrl: string;
 createdAt: Date;
}

export const useBlog = () => {
 const [posts, setPosts] = useState<BlogPost[]>([]);
 const [loading, setLoading] = useState<boolean>(true);
 const [error, setError] = useState<string | null>(null);

 // Fetch all blog posts
 const fetchPosts = async () => {
  try {
   setLoading(true);
   const querySnapshot = await getDocs(collection(db, "blogPosts"));
   const postsData = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt.toDate(),
   })) as BlogPost[];
   setPosts(postsData);
   setError(null);
  } catch (err) {
   setError("Failed to fetch blog posts");
   console.error("Error fetching documents: ", err);
  } finally {
   setLoading(false);
  }
 };

 // Add new blog post
 const addPost = async (post: Omit<BlogPost, "id" | "createdAt">) => {
  try {
   setLoading(true);
   const docRef = await addDoc(collection(db, "blogPosts"), {
    ...post,
    createdAt: new Date(),
   });
   await fetchPosts(); // Refresh the list
   return docRef.id;
  } catch (err) {
   setError("Failed to add blog post");
   console.error("Error adding document: ", err);
   throw err;
  } finally {
   setLoading(false);
  }
 };

 // Update existing blog post
 const updatePost = async (id: string, post: Partial<BlogPost>) => {
  try {
   setLoading(true);
   const postRef = doc(db, "blogPosts", id);
   await updateDoc(postRef, post);
   await fetchPosts(); // Refresh the list
  } catch (err) {
   setError("Failed to update blog post");
   console.error("Error updating document: ", err);
   throw err;
  } finally {
   setLoading(false);
  }
 };

 // Delete blog post
 const deletePost = async (id: string) => {
  try {
   setLoading(true);
   await deleteDoc(doc(db, "blogPosts", id));
   await fetchPosts(); // Refresh the list
  } catch (err) {
   setError("Failed to delete blog post");
   console.error("Error deleting document: ", err);
   throw err;
  } finally {
   setLoading(false);
  }
 };

 // Initialize with posts
 useEffect(() => {
  fetchPosts();
 }, []);

 return {
  posts,
  loading,
  error,
  addPost,
  updatePost,
  deletePost,
  fetchPosts,
 };
};
