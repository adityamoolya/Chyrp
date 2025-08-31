// src/components/comments-section.tsx
'use client';

import { useState, useMemo } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { comments as initialComments } from '@/lib/data';
import type { Comment as CommentType } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export function CommentsSection({ postId }: { postId: string }) {
  const [comments, setComments] = useState<CommentType[]>(initialComments);
  const { toast } = useToast();

  const [num1, num2] = useMemo(() => [Math.floor(Math.random() * 10) + 1, Math.floor(Math.random() * 10) + 1], []);
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const content = formData.get('comment') as string;
    const captcha = formData.get('captcha') as string;

    if (parseInt(captcha) !== num1 + num2) {
      toast({
        title: 'Incorrect CAPTCHA',
        description: 'Please solve the math problem correctly.',
        variant: 'destructive',
      });
      return;
    }

    if (content.trim()) {
      const newComment: CommentType = {
        id: (comments.length + 1).toString(),
        author: { id: '0', name: 'Guest', avatarUrl: 'https://picsum.photos/100' },
        content,
        createdAt: new Date().toISOString(),
      };
      setComments([newComment, ...comments]);
      e.currentTarget.reset();
      toast({
        title: 'Comment submitted',
        description: 'Your comment is pending approval.',
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Comments ({comments.length})</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea name="comment" placeholder="Write a comment..." required />
            <div className="flex items-center gap-4">
              <Label htmlFor="captcha" className="whitespace-nowrap">
                {num1} + {num2} = ?
              </Label>
              <Input id="captcha" name="captcha" type="number" required placeholder="Your answer" />
              <Button type="submit">Post Comment</Button>
            </div>
          </form>
        </div>
        <ul className="space-y-6">
          {comments.map((comment) => (
            <li key={comment.id} className="flex gap-4">
              <Avatar>
                <AvatarImage src={comment.author.avatarUrl} alt={comment.author.name} />
                <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{comment.author.name}</span>
                  <time className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                  </time>
                </div>
                <p className="text-muted-foreground mt-1">{comment.content}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
