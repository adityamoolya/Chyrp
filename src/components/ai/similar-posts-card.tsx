'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Star } from 'lucide-react';
import { getSimilarPosts } from '@/lib/actions';
import type { Post } from '@/lib/types';
import { Skeleton } from '../ui/skeleton';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

type SimilarPost = {
  postId: string;
  title: string;
  excerpt: string;
  similarityScore: number;
};

export function SimilarPostsCard({ post }: { post: Post }) {
  const [similarPosts, setSimilarPosts] = useState<SimilarPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSimilarPosts() {
      setIsLoading(true);
      const result = await getSimilarPosts({
        postId: post.id,
        content: post.content || post.excerpt,
        tags: post.tags.map((t) => t.name),
      });
      setSimilarPosts(result);
      setIsLoading(false);
    }
    fetchSimilarPosts();
  }, [post]);

  return (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <span>Similar Posts</span>
            </CardTitle>
        </CardHeader>
        <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        ) : similarPosts.length > 0 ? (
          <ul className="space-y-4">
            {similarPosts.map((p) => (
              <li key={p.postId}>
                <Link href={`/dashboard/posts/${p.postId}`} className="block p-3 rounded-md hover:bg-secondary">
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold text-foreground">{p.title}</h4>
                    <Badge variant="outline" className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-accent-foreground fill-current" /> 
                        {p.similarityScore.toFixed(2)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{p.excerpt}</p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">No similar posts found.</p>
        )}
        </CardContent>
    </Card>
  );
}
