'use client';
import { useState, useEffect } from 'react';
import { Wand2 } from 'lucide-react';
import { getSummary } from '@/lib/actions';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Skeleton } from '../ui/skeleton';

export function SummaryCard({ content }: { content: string }) {
  const [summary, setSummary] = useState<{ summary: string; bulletPoints: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSummary() {
      setIsLoading(true);
      const result = await getSummary(content);
      setSummary(result);
      setIsLoading(false);
    }
    fetchSummary();
  }, [content]);

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm my-6">
      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1" className="border-b-0">
          <AccordionTrigger className="p-4 text-lg font-semibold hover:no-underline">
            <div className="flex items-center gap-2">
              <Wand2 className="h-5 w-5 text-primary" />
              <span>AI Summary (TL;DR)</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4">
            {isLoading ? (
                <div className='space-y-2'>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                </div>
            ) : summary ? (
              <div className="space-y-4">
                <p className="text-muted-foreground">{summary.summary}</p>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  {summary.bulletPoints.split('\n').map((point, index) => (
                    <li key={index}>{point.replace(/^- /, '')}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-destructive">Could not generate summary.</p>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
