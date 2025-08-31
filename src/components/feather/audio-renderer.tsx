'use client';
import ReactPlayer from 'react-player/lazy';
import type { AudioData } from '@/lib/types';

export function AudioRenderer({ data }: { data: AudioData }) {
  return (
    <div className="my-6">
      <ReactPlayer url={data.url} width="100%" height="52px" controls />
    </div>
  );
}
