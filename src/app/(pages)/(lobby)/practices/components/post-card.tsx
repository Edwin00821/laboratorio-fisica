import Link from 'next/link';
import { type Practice } from 'contentlayer/generated';

import { formatDate } from '@/app/lib/utils';

import { AspectRatio } from '@/app/components/ui/aspect-ratio';
import {
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import { PlaceholderImage } from '@/app/components/placeholder-image';

interface PostCardProps {
  post: Practice;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link key={post.slug} href={post.slug}>
      <span className="sr-only">{post.title}</span>
      <article className="flex flex-col space-y-2.5">
        <AspectRatio ratio={16 / 9}>
          {post.image ? (
            <img
              src={post.image}
              alt={post.title}
              sizes="(min-width: 1024px) 384px, (min-width: 768px) 288px, (min-width: 640px) 224px, 100vw"
              className="h-full w-full rounded-lg object-cover"
            />
          ) : (
            <PlaceholderImage asChild />
          )}
        </AspectRatio>
        <div className="space-y-2">
          <CardHeader className="space-y-2.5 p-0">
            <CardTitle className="line-clamp-1">{post.title}</CardTitle>
            <CardDescription className="line-clamp-2">
              {post.description}
            </CardDescription>
          </CardHeader>
          <CardDescription>{formatDate(post.date)}</CardDescription>
        </div>
      </article>
    </Link>
  );
}
