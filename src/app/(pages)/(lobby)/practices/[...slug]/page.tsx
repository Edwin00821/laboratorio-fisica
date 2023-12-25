import '@/app/styles/mdx.css';

import { type Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { allPractices } from 'contentlayer/generated';

import { siteConfig } from '@/app/config/site';
import { absoluteUrl, cn, formatDate } from '@/app/lib/utils';

import { AspectRatio } from '@/app/components/ui/aspect-ratio';
import { buttonVariants } from '@/app/components/ui/button';
import { Separator } from '@/app/components/ui/separator';
import { Icons } from '@/app/components/icons';
import { Mdx } from '@/app/components/mdx/mdx-components';
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/app/components/page-header';
import { MdxPager } from '@/app/components/pagers/mdx-pager';
import { PlaceholderImage } from '@/app/components/placeholder-image';
import { Shell } from '@/app/components/shells/shell';

interface PageProps {
  params: {
    slug: string[];
  };
}

// eslint-disable-next-line @typescript-eslint/require-await
async function getPageFromParams(params: PageProps['params']) {
  const slug = params?.slug?.join('/') ?? '';
  const page = allPractices.find((page) => page.slugAsParams === slug);

  if (!page) {
    null;
  }

  return page;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const page = await getPageFromParams(params);

  if (!page) {
    return {};
  }

  const url = absoluteUrl('/');

  const ogUrl = new URL(`${url}/api/og`);
  ogUrl.searchParams.set('title', page.title);
  ogUrl.searchParams.set('type', siteConfig.name);
  ogUrl.searchParams.set('mode', 'light');

  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
      type: 'article',
      url: absoluteUrl(page.slug),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
      images: [ogUrl.toString()],
    },
  };
}

// eslint-disable-next-line @typescript-eslint/require-await
export async function generateStaticParams(): Promise<PageProps['params'][]> {
  return allPractices.map((page) => ({
    slug: page.slugAsParams.split('/'),
  }));
}

export default async function PracticePage({ params }: PageProps) {
  const page = await getPageFromParams(params);

  if (!page) {
    notFound();
  }

  // Remove the /pages prefix from the slug
  const formattedPage = {
    ...page,
    slug: page.slug.replace(/^\/pages/, ''),
  };

  const formattedPages = allPractices.map((page) => ({
    ...page,
    slug: page.slug.replace(/^\/pages/, ''),
  }));

  return (
    <Shell as="article" variant="markdown">
      <PageHeader>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          {page.date && (
            <time dateTime={page.date} className="block">
              Publicado el {formatDate(page.date)}
            </time>
          )}
          {page.date ? <div>•</div> : null}
          <div>{page.readingTime}min</div>
        </div>
        <PageHeaderHeading>{page.title}</PageHeaderHeading>
        <PageHeaderDescription>{page.description}</PageHeaderDescription>
      </PageHeader>
      {page.image ? (
        <AspectRatio ratio={16 / 9}>
          <img
            src={page.image}
            alt={page.title}
            className="h-full w-full rounded-md border bg-muted object-center"
          />
        </AspectRatio>
      ) : (
        <PlaceholderImage asChild />
      )}
      <Separator className="my-4" />
      <Mdx code={page.body.code} />
      <MdxPager
        currentItem={formattedPage}
        allItems={formattedPages}
        className="my-4"
      />
      <Link
        href="/"
        className={cn(
          buttonVariants({
            variant: 'ghost',
            className: 'mx-auto mt-4 w-fit',
          })
        )}
      >
        <Icons.chevronLeft className="mr-2 h-4 w-4" aria-hidden="true" />
        Mira todas las prácticas
        <span className="sr-only">See all posts</span>
      </Link>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css"
        integrity="sha384-Xi8rHCmBmhbuyyhbI88391ZKP2dmfnOl4rT9ZfRI7mLTdk1wblIUnrIq35nqwEvC"
        crossOrigin="anonymous"
      />
    </Shell>
  );
}
