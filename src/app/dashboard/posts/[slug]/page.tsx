// src/app/dashboard/posts/[slug]/page.tsx
'use client';
import { notFound } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import { posts } from '@/lib/data';
import type { Post } from '@/lib/types';
import { FeatherRenderer } from '@/components/feather/renderer';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Eye, Share2 } from 'lucide-react';
import { SummaryCard } from '@/components/ai/summary-card';
import { SimilarPostsCard } from '@/components/ai/similar-posts-card';
import { CommentsSection } from '@/components/comments-section';

export default function PostPage({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<Post | null>(() => {
    return posts.find((p) => p.slug === params.slug) || null;
  });
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const foundPost = posts.find((p) => p.slug === params.slug);
    if (foundPost) {
      setPost(foundPost);
    } else {
        notFound();
    }
  }, [params.slug]);

  const handleLike = () => {
    if (post) {
      setPost(prevPost => {
        if (!prevPost) return null;
        const newLikeCount = isLiked ? prevPost.like_count - 1 : prevPost.like_count + 1;
        return { ...prevPost, like_count: newLikeCount };
      });
      setIsLiked(!isLiked);
    }
  };
  
  if (!post) {
    return null; // Or a loading skeleton
  }

  return (
    <div className="max-w-4xl mx-auto">
      <article>
        <header className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories.map((cat) => (
              <Badge key={cat.id} variant="secondary">{cat.name}</Badge>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold font-headline tracking-tight mb-4">
            {post.title}
          </h1>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={post.author.avatarUrl} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span>{post.author.name}</span>
            </div>
            <Separator orientation="vertical" className="h-4" />
            <time dateTime={post.published_at}>
              {format(new Date(post.published_at), 'MMMM d, yyyy')}
            </time>
          </div>
        </header>

        <SummaryCard content={post.content || post.excerpt} />

        <FeatherRenderer post={post} />

        <div className="my-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag.id} variant="outline">#{tag.name}</Badge>
            ))}
        </div>

        <Separator className="my-8" />
        
        <div className="flex items-center justify-between text-muted-foreground">
            <div className="flex items-center gap-6">
                <Button variant="ghost" size="sm" className="flex items-center gap-2" onClick={handleLike}>
                    <Heart className={`h-4 w-4 ${isLiked ? 'text-red-500 fill-current' : ''}`} /> {post.like_count} Likes
                </Button>
                <span className="flex items-center gap-2"><MessageCircle className="h-4 w-4" /> {post.comment_count} Comments</span>
                <span className="flex items-center gap-2"><Eye className="h-4 w-4" /> {post.view_count} Views</span>
            </div>
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <Share2 className="h-4 w-4" /> Share
            </Button>
        </div>

      </article>

      <aside className="mt-16 space-y-12">
        <SimilarPostsCard post={post} />
        <CommentsSection postId={post.id} />
      </aside>
    </div>
  );
}
