import Link from 'next/link';
import Image from 'next/image';
import type { LinkData } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';

export function LinkRenderer({ data }: { data: LinkData }) {
  return (
    <div className="my-6">
      <Card className="overflow-hidden transition-shadow hover:shadow-md">
        <Link href={data.url} target="_blank" rel="noopener noreferrer" className="block">
          <CardContent className="p-0">
             <div className="flex flex-col sm:flex-row">
                {data.imageUrl && (
                    <div className="sm:w-1/3">
                        <Image
                            src={data.imageUrl}
                            alt={data.title}
                            width={400}
                            height={300}
                            className="w-full h-48 sm:h-full object-cover"
                            data-ai-hint="abstract background"
                        />
                    </div>
                )}
                <div className="flex-1 p-6">
                    <h3 className="text-xl font-bold font-headline flex items-center gap-2">
                        {data.title} <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </h3>
                    <p className="text-muted-foreground mt-2">{data.description}</p>
                    <p className="text-primary/80 mt-4 text-sm truncate">{data.url}</p>
                </div>
            </div>
          </CardContent>
        </Link>
      </Card>
    </div>
  );
}
