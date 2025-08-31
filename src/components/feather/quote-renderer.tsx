import type { QuoteData } from '@/lib/types';

export function QuoteRenderer({ data }: { data: QuoteData }) {
  return (
    <div className="my-6 border-l-4 border-primary pl-8 py-4">
      <blockquote className="text-2xl md:text-4xl font-headline italic text-foreground">
        &ldquo;{data.text}&rdquo;
      </blockquote>
      <cite className="block text-right mt-4 text-lg text-muted-foreground not-italic">&mdash; {data.source}</cite>
    </div>
  );
}
