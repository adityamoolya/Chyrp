import { categories } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LayoutGrid } from 'lucide-react';
import Link from 'next/link';

export default function CategoriesPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LayoutGrid className="h-6 w-6" />
            All Categories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
               <Link href={`/dashboard/categories/${category.slug}`} key={category.id}>
                <Badge variant="outline" className="text-lg px-4 py-2 cursor-pointer hover:bg-accent">
                  {category.name}
                </Badge>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
