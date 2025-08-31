import type { UploaderData } from '@/lib/types';
import { Download } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function UploaderRenderer({ data }: { data: UploaderData }) {
  return (
    <div className="my-6">
      <Card>
        <CardContent className="p-4">
          <ul className="space-y-3">
            {data.files.map((file, index) => (
              <li key={index} className="flex items-center justify-between p-3 rounded-md bg-secondary">
                <div>
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-muted-foreground">{file.size}</p>
                </div>
                <Button variant="ghost" size="icon" asChild>
                  <a href={file.url} download>
                    <Download className="h-5 w-5" />
                  </a>
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
