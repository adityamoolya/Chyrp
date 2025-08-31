'use client';
import Image from 'next/image';
import Zoom from 'react-medium-image-zoom';
import type { PhotoData } from '@/lib/types';

export function PhotoRenderer({ data }: { data: PhotoData }) {
  return (
    <div className="my-6">
      <Zoom>
        <Image
          src={data.imageUrl}
          alt={data.caption}
          width={1200}
          height={800}
          className="w-full h-auto rounded-lg shadow-lg"
          data-ai-hint="landscape photo"
        />
      </Zoom>
      {data.caption && <p className="text-center text-muted-foreground mt-4 text-sm">{data.caption}</p>}
    </div>
  );
}
