import { PostFeed } from "@/components/post-feed";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ListFilter } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
            <h1 className="text-3xl font-bold font-headline">Home Feed</h1>
            <p className="text-muted-foreground">Discover the latest posts from our community.</p>
        </div>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    <ListFilter className="mr-2 h-4 w-4" />
                    Filter
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by Feather</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Text</DropdownMenuItem>
                <DropdownMenuItem>Photo</DropdownMenuItem>
                <DropdownMenuItem>Quote</DropdownMenuItem>
                <DropdownMenuItem>Link</DropdownMenuItem>
                <DropdownMenuItem>Video</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <PostFeed />
    </div>
  );
}
