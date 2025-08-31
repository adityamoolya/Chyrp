// src/components/post-feed.tsx
"use client";

import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { posts as initialPosts } from '@/lib/data';
import type { Post } from '@/lib/types';
import { PostCard } from './post-card';
import { Skeleton } from './ui/skeleton';

export function PostFeed() {
  const [posts, setPosts] = useState<Post[]>(initialPosts.slice(0, 6));
  const [hasMore, setHasMore] = useState(true);

  const fetchMorePosts = () => {
    if (posts.length >= initialPosts.length) {
      setHasMore(false);
      return;
    }
    // Simulate API call
    setTimeout(() => {
      const newPosts = initialPosts.slice(posts.length, posts.length + 3);
      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
    }, 1500);
  };

  const loader = (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-96 w-full" />)}
    </div>
  );

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={fetchMorePosts}
      hasMore={hasMore}
      loader={loader}
      endMessage={
        <p style={{ textAlign: 'center' }} className="mt-8 text-muted-foreground">
          <b>You have seen it all</b>
        </p>
      }
      className="overflow-hidden"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </InfiniteScroll>
  );
}
