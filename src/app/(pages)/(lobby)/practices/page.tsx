import * as React from 'react';
import { type Metadata } from 'next';
import { env } from '@/env.mjs';
import { allPractices } from 'contentlayer/generated';

import { Separator } from '@/app/components/ui/separator';
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/app/components/page-header';
import { Shell } from '@/app/components/shells/shell';

import { PostCard } from '@/app/pages/practices/components/post-card';
import { PostCardSkeleton } from '@/app/pages/practices/components/post-card-skeleton';

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: 'Practices',
  description: 'Explore the latest news and updates from the community',
};

export default function PracticesPage() {
  const posts = allPractices.filter((post) => post.published);

  return (
    <Shell className="md:pb-10">
      <PageHeader
        id="practices-header"
        aria-labelledby="practices-header-heading"
      >
        <PageHeaderHeading>Practicas del laboratorio</PageHeaderHeading>
        <PageHeaderDescription>
          Ejercicios de todos los temas vistos en el laboratorio.
        </PageHeaderDescription>
      </PageHeader>
      <Separator className="mb-2.5" />
      <section
        id="practices-posts"
        aria-labelledby="practices-posts-heading"
        className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        <React.Suspense
          fallback={Array.from({ length: 4 }).map((_, i) => (
            <PostCardSkeleton key={i} />
          ))}
        >
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </React.Suspense>
      </section>
    </Shell>
  );
}
