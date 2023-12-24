import '@/app/styles/globals.css';

import type { Metadata, Viewport } from 'next';
import { env } from '@/env.mjs';

import { SiteFooter } from '@/app/components/layouts/site-footer';
import { SiteHeader } from '@/app/components/layouts/site-header';
import { ThemeProvider } from '@/app/components/providers/theme-provider';
import { TailwindIndicator } from '@/app/components/tailwind-indicator';
import { Toaster } from '@/app/components/ui/toaster';
import { siteConfig } from '@/app/config/site';
import { fontHeading, fontMono, fontSans } from '@/app/lib/fonts';
import { cn } from '@/app/lib/utils';

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ['nextjs', 'react'],
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  colorScheme: 'dark light',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head />
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
          fontMono.variable,
          fontHeading.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
          <TailwindIndicator />
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
