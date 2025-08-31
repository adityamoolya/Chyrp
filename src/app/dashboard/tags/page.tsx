import { tags } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tags as TagsIcon } from 'lucide-react';

export default function TagsPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TagsIcon className="h-6 w-6" />
            All Tags
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            {tags.map((tag) => (
              <Badge key={tag.id} variant="secondary" className="text-lg px-4 py-2">
                #{tag.name}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
