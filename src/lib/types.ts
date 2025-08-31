export type User = {
  id: string;
  name: string;
  avatarUrl: string;
};

export type Tag = {
  id: string;
  name: string;
  slug: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
};

export type FeatherType =
  | "text"
  | "photo"
  | "quote"
  | "link"
  | "video"
  | "audio"
  | "uploader";

export interface Post {
  id: string;
  slug: string;
  title: string;
  type: FeatherType;
  data: any;
  content?: string; // For 'text' feather
  excerpt: string;
  author: User;
  published_at: string;
  tags: Tag[];
  categories: Category[];
  like_count: number;
  comment_count: number;
  view_count: number;
}

export interface PhotoData {
  imageUrl: string;
  caption: string;
}

export interface QuoteData {
  text: string;
  source: string;
}

export interface LinkData {
  url: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface VideoData {
  url: string;
  posterUrl?: string;
}

export interface AudioData {
  url: string;
}

export interface UploaderData {
  files: { name: string; url: string; size: string }[];
}

export interface Comment {
    id: string;
    author: User;
    content: string;
    createdAt: string;
}
