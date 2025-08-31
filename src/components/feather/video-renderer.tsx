'use client';
import ReactPlayer from 'react-player/lazy';
import type { VideoData } from '@/lib/types';

export function VideoRenderer({ data }: { data: VideoData }) {
  return (
    <div className="my-6 aspect-video w-full">
      <ReactPlayer url={data.url} width="100%" height="100%" controls />
    </div>
  );
}
