import { MainNav } from '@/app/components/layouts/main-nav';
import { MobileNav } from '@/app/components/layouts/mobile-nav';
import { ThemeToggle } from '@/app/components/layouts/theme-toggle';
import { siteConfig } from '@/app/config/site';
import { type SidebarNavItem, type MainNavItem } from '@/app/types';

interface SiteHeaderProps {
  mainNavItems?: MainNavItem[];
  sidebarNavItems?: SidebarNavItem[];
}

export const SiteHeader = ({
  mainNavItems,
  sidebarNavItems,
}: SiteHeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        <MainNav items={mainNavItems ?? siteConfig.mainNav} />
        <MobileNav
          mainNavItems={mainNavItems ?? siteConfig.mainNav}
          sidebarNavItems={sidebarNavItems}
        />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
};
