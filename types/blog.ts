export interface BlogPost {
 id?: string;
 title: string;
 excerpt: string;
 content: string;
 category: string;
 createdAt: Date;
 author: string;
 tags?: string[];
}

export interface Comment {
 id: string;
 content: string;
 author: string;
 authorId: string;
 createdAt: Date;
 postId: string;
}

export interface PostWithComments {
 id: string;
 title: string;
 commentCount: number;
}
