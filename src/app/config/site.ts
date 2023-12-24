import type { FooterItem, MainNavItem } from '@/app/types';

export type SiteConfig = typeof siteConfig;

const links = {
  twitter: 'https://twitter.com/edwinperez008',
  github: 'https://github.com/Edwin00821/laboratorio-fisica',
  githubAccount: 'https://github.com/Edwin00821',
  discord: 'https://discord.com/users/edwin00821',
};

export const siteConfig = {
  name: 'Laboratorio de Física',
  description:
    'Laboratorio de Física de la Escuela Superior de Cómputo del Instituto Politécnico Nacional.',
  url: 'https://laboratorio-fisica.vercel.app',
  links,
  mainNav: [
    {
      title: 'Inicio',
      items: [
        {
          title: 'Prácticas',
          href: '/practices',
          description: 'Ejercicios sobre todos los temas.',
          items: [],
        },
        {
          title: 'Referencias',
          href: '/references',
          description: 'Referencias sobre el contenido del curso.',
          items: [],
        },
      ],
    },
  ] satisfies MainNavItem[],
  footerNav: [
    {
      title: 'Credits',
      items: [
        {
          title: 'Taxonomy',
          href: 'https://tx.shadcn.com/',
          external: true,
        },
        {
          title: 'shadcn/ui',
          href: 'https://ui.shadcn.com',
          external: true,
        },
      ],
    },

    {
      title: 'Social',
      items: [
        {
          title: 'Twitter',
          href: links.twitter,
          external: true,
        },
        {
          title: 'GitHub',
          href: links.githubAccount,
          external: true,
        },
        {
          title: 'Discord',
          href: links.discord,
          external: true,
        },
      ],
    },
    {
      title: 'Lofi',
      items: [
        {
          title: 'beats to study to',
          href: 'https://www.youtube.com/watch?v=jfKfPfyJRdk',
          external: true,
        },
        {
          title: 'beats to chill to',
          href: 'https://www.youtube.com/watch?v=rUxyKA_-grg',
          external: true,
        },
        {
          title: 'a fresh start',
          href: 'https://www.youtube.com/watch?v=rwionZbOryo',
          external: true,
        },
        {
          title: 'coffee to go',
          href: 'https://www.youtube.com/watch?v=2gliGzb2_1I',
          external: true,
        },
      ],
    },
  ] satisfies FooterItem[],
};
