import {
  Feather,
  Type,
  Image as ImageIcon,
  MessageSquare,
  Link as LinkIcon,
  Video,
  Music,
  UploadCloud,
} from 'lucide-react';
import type { FeatherType } from '@/lib/types';
import { cn } from '@/lib/utils';

export function FeatherIcon({
  type,
  className,
}: {
  type: FeatherType;
  className?: string;
}) {
  const props = { className: cn('h-4 w-4', className) };
  switch (type) {
    case 'text':
      return <Type {...props} />;
    case 'photo':
      return <ImageIcon {...props} />;
    case 'quote':
      return <MessageSquare {...props} />;
    case 'link':
      return <LinkIcon {...props} />;
    case 'video':
      return <Video {...props} />;
    case 'audio':
      return <Music {...props} />;
    case 'uploader':
      return <UploadCloud {...props} />;
    default:
      return <Feather {...props} />;
  }
}
