'use client';
import { useState } from 'react';
import { WandSparkles } from 'lucide-react';
import { getSeoSuggestions } from '@/lib/actions';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Skeleton } from '../ui/skeleton';
import { Badge } from '../ui/badge';
import { useToast } from '@/hooks/use-toast';

interface SeoSuggestionsDialogProps {
  title: string;
  content: string;
  tags: string[];
}

type Suggestions = {
  titleSuggestions: string[];
  keywords: string[];
  metaDescription: string;
};

export function SeoSuggestionsDialog({ title, content, tags }: SeoSuggestionsDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestions | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFetchSuggestions = async () => {
    if (!title || !content) {
      toast({
        title: 'Missing content',
        description: 'Please provide a title and content before generating SEO suggestions.',
        variant: 'destructive',
      });
      return;
    }
    setIsLoading(true);
    const result = await getSeoSuggestions({ title, content, tags });
    setSuggestions(result);
    setIsLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={handleFetchSuggestions}>
          <WandSparkles className="mr-2 h-4 w-4" />
          Get SEO Ideas
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'><WandSparkles /> AI-Powered SEO Suggestions</DialogTitle>
          <DialogDescription>
            Use these suggestions to improve your post's visibility on search engines.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-6">
          {isLoading ? (
            <div className="space-y-6">
                <div>
                    <Skeleton className="h-5 w-32 mb-2" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full mt-2" />
                </div>
                <div>
                    <Skeleton className="h-5 w-24 mb-2" />
                    <Skeleton className="h-8 w-full" />
                </div>
                 <div>
                    <Skeleton className="h-5 w-40 mb-2" />
                    <Skeleton className="h-4 w-full" />
                </div>
            </div>
          ) : suggestions ? (
            <>
              <div>
                <h4 className="font-semibold mb-2">Title Suggestions</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  {suggestions.titleSuggestions.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Keywords</h4>
                <div className="flex flex-wrap gap-2">
                  {suggestions.keywords.map((k, i) => (
                    <Badge key={i} variant="secondary">{k}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Meta Description</h4>
                <p className="text-muted-foreground text-sm p-3 border rounded-md bg-secondary/50">
                  {suggestions.metaDescription}
                </p>
              </div>
            </>
          ) : (
            <p className="text-destructive text-center py-8">Could not load suggestions.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
