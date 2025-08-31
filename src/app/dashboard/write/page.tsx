// src/app/dashboard/write/page.tsx
'use client';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import MDEditor from '@uiw/react-md-editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { FeatherType } from '@/lib/types';
import { FeatherIcon } from '@/components/feather-icon';
import { SeoSuggestionsDialog } from '@/components/ai/seo-suggestions-dialog';

const formSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  featherType: z.enum(['text', 'photo', 'quote', 'link', 'video', 'audio', 'uploader']),
  content: z.string().optional(),
  tags: z.string().optional(),
  // Add other feather-specific fields here
  imageUrl: z.string().url('Invalid URL').optional(),
  quoteText: z.string().optional(),
  quoteSource: z.string().optional(),
  linkUrl: z.string().url('Invalid URL').optional(),
  videoUrl: z.string().url('Invalid URL').optional(),
});

type FormData = z.infer<typeof formSchema>;

const featherTypes: FeatherType[] = ['text', 'photo', 'quote', 'link', 'video', 'audio', 'uploader'];

export default function WritePage() {
  const { register, handleSubmit, control, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      featherType: 'text',
      title: '',
    },
  });
  
  const [content, setContent] = useState<string | undefined>('');

  const featherType = watch('featherType');
  const watchedTitle = watch('title');
  const watchedContent = watch('content') || content;
  const watchedTags = watch('tags')?.split(',').map(t => t.trim()).filter(Boolean) || [];

  const onSubmit = (data: FormData) => {
    console.log({ ...data, content});
    // Handle form submission
  };

  const renderFeatherFields = () => {
    switch (featherType) {
      case 'text':
        return (
          <div data-color-mode="light" className="mt-1">
             <Label>Content</Label>
            <MDEditor
              value={content}
              onChange={setContent}
              height={400}
              preview="live"
            />
          </div>
        );
      case 'photo':
        return (
          <div>
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input id="imageUrl" {...register('imageUrl')} placeholder="https://example.com/image.jpg" />
            {errors.imageUrl && <p className="text-destructive text-sm mt-1">{errors.imageUrl.message}</p>}
          </div>
        );
      case 'quote':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="quoteText">Quote</Label>
              <Input id="quoteText" {...register('quoteText')} placeholder="The only true wisdom is..." />
            </div>
            <div>
              <Label htmlFor="quoteSource">Source</Label>
              <Input id="quoteSource" {...register('quoteSource')} placeholder="Socrates" />
            </div>
          </div>
        );
      case 'link':
         return (
          <div>
            <Label htmlFor="linkUrl">Link URL</Label>
            <Input id="linkUrl" {...register('linkUrl')} placeholder="https://example.com" />
            {errors.linkUrl && <p className="text-destructive text-sm mt-1">{errors.linkUrl.message}</p>}
          </div>
        );
      case 'video':
         return (
          <div>
            <Label htmlFor="videoUrl">Video URL</Label>
            <Input id="videoUrl" {...register('videoUrl')} placeholder="https://youtube.com/watch?v=..." />
            {errors.videoUrl && <p className="text-destructive text-sm mt-1">{errors.videoUrl.message}</p>}
          </div>
        );
      default:
        return <p className="text-muted-foreground p-8 text-center border rounded-md">Fields for '{featherType}' will appear here.</p>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold font-headline mb-6">Create a New Post</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Post Details</CardTitle>
                    <CardDescription>Start with the basics. You can add more details later.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div>
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" {...register('title')} placeholder="Your post title" />
                        {errors.title && <p className="text-destructive text-sm mt-1">{errors.title.message}</p>}
                    </div>
                     <div>
                        <Label>Feather Type</Label>
                        <Controller
                            name="featherType"
                            control={control}
                            render={({ field }) => (
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a feather type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {featherTypes.map((type) => (
                                        <SelectItem key={type} value={type}>
                                            <div className="flex items-center gap-2">
                                                <FeatherIcon type={type} />
                                                <span className="capitalize">{type}</span>
                                            </div>
                                        </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="capitalize">{featherType} Content</CardTitle>
                    <CardDescription>Add the content for your post.</CardDescription>
                </CardHeader>
                <CardContent>
                    {renderFeatherFields()}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Metadata</CardTitle>
                    <CardDescription>Add tags to help people find your post.</CardDescription>
                </CardHeader>
                <CardContent>
                     <div>
                        <Label htmlFor="tags">Tags</Label>
                        <Input id="tags" {...register('tags')} placeholder="technology, ai, design (comma-separated)" />
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
                <SeoSuggestionsDialog title={watchedTitle} content={watchedContent || ''} tags={watchedTags} />
                <Button type="submit" size="lg">Publish Post</Button>
            </div>
        </form>
    </div>
  );
}
