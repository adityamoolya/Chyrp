import Link from 'next/link';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { MessageCircle, Heart, Eye } from 'lucide-react';
import type { Post } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { FeatherIcon } from './feather-icon';

function PostCardHeader({ post }: { post: Post }) {
  return (
    <CardHeader>
      <div className="flex items-center gap-3">
        <FeatherIcon type={post.type} className="h-5 w-5 text-muted-foreground" />
        <CardTitle className="text-xl font-headline">
          <Link href={`/dashboard/posts/${post.slug}`} className="hover:text-primary transition-colors">
            {post.title}
          </Link>
        </CardTitle>
      </div>
    </CardHeader>
  );
}

function PostCardFooter({ post }: { post: Post }) {
  return (
    <CardFooter className="flex-wrap justify-between gap-y-4 text-sm text-muted-foreground">
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={post.author.avatarUrl} alt={post.author.name} />
          <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <span>{post.author.name}</span>
          <span className="mx-1">·</span>
          <time dateTime={post.published_at}>
            {formatDistanceToNow(new Date(post.published_at), { addSuffix: true })}
          </time>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1.5"><Heart className="h-4 w-4" /> {post.like_count}</span>
        <span className="flex items-center gap-1.5"><MessageCircle className="h-4 w-4" /> {post.comment_count}</span>
        <span className="flex items-center gap-1.5"><Eye className="h-4 w-4" /> {post.view_count}</span>
      </div>
    </CardFooter>
  );
}


export function PostCard({ post }: { post: Post }) {
  return (
    <Card className="flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
      {post.type === 'photo' && post.data.imageUrl && (
        <Link href={`/dashboard/posts/${post.slug}`} className="block">
          <Image
            src={post.data.imageUrl}
            alt={post.title}
            width={600}
            height={400}
            className="w-full object-cover aspect-video"
            data-ai-hint="landscape photo"
          />
        </Link>
      )}

      {post.type === 'quote' ? (
        <>
            <CardContent className="p-6 flex-grow">
                <blockquote className="text-2xl font-semibold text-center my-4 font-headline">
                &ldquo;{post.data.text}&rdquo;
                </blockquote>
                <p className="text-right text-muted-foreground">&mdash; {post.data.source}</p>
            </CardContent>
        </>
      ) : post.type === 'link' ? (
        <>
        <PostCardHeader post={post} />
        <CardContent>
            <Link href={post.data.url} target="_blank" rel="noopener noreferrer" className="block rounded-lg border hover:border-primary transition-colors">
                <div className="flex flex-col md:flex-row">
                    <div className="flex-1 p-4">
                        <h3 className="font-bold">{post.data.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{post.data.description}</p>
                        <p className="text-xs text-primary mt-2 truncate">{post.data.url}</p>
                    </div>
                    {post.data.imageUrl && 
                        <div className="md:w-1/3">
                            <Image src={post.data.imageUrl} alt={post.data.title} width={200} height={150} className="w-full h-full object-cover md:rounded-r-lg rounded-b-lg md:rounded-bl-none"/>
                        </div>
                    }
                </div>
            </Link>
        </CardContent>
        </>
      ) : (
        <>
        <PostCardHeader post={post} />
        <CardContent className="flex-grow">
            <p className="text-muted-foreground">{post.excerpt}</p>
        </CardContent>
        </>
      )}


      <div className="mt-auto">
        <PostCardFooter post={post} />
      </div>
    </Card>
  );
}
