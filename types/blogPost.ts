export interface Post {
 id: string;
 title: string;
 excerpt?: string;
 content?: string;
 category?: string;
 imageUrl?: string;
 createdAt?: Date;
 author?: string;
}

export interface BlogPost {
 id?: string;
 title: string;
 excerpt: string;
 content: string;
 category: string;
 createdAt: Date;
 author: string;
}