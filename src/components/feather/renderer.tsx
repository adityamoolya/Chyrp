import type { Post } from '@/lib/types';
import { TextRenderer } from './text-renderer';
import { PhotoRenderer } from './photo-renderer';
import { QuoteRenderer } from './quote-renderer';
import { LinkRenderer } from './link-renderer';
import { VideoRenderer } from './video-renderer';
import { AudioRenderer } from './audio-renderer';
import { UploaderRenderer } from './uploader-renderer';

export function FeatherRenderer({ post }: { post: Post }) {
  switch (post.type) {
    case 'text':
      return <TextRenderer content={post.content || ''} />;
    case 'photo':
      return <PhotoRenderer data={post.data} />;
    case 'quote':
      return <QuoteRenderer data={post.data} />;
    case 'link':
      return <LinkRenderer data={post.data} />;
    case 'video':
      return <VideoRenderer data={post.data} />;
    case 'audio':
      return <AudioRenderer data={post.data} />;
    case 'uploader':
      return <UploaderRenderer data={post.data} />;
    default:
      return <div className="text-destructive">Error: Unknown feather type.</div>;
  }
}
