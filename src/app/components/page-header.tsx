// Modified from: https://github.com/shadcn-ui/ui/blob/main/apps/www/components/page-header.tsx

import { cva, type VariantProps } from 'class-variance-authority';
import { Balancer } from 'react-wrap-balancer';

import { Separator } from '@/app/components/ui/separator';
import { cn } from '@/app/lib/utils';

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  separated?: boolean;
}

const PageHeader = ({
  className,
  children,
  as: Comp = 'section',
  separated = false,
  ...props
}: PageHeaderProps) => {
  return (
    <Comp className={cn('grid gap-1', className)} {...props}>
      {children}
      {separated ? <Separator className="mt-2.5" /> : null}
    </Comp>
  );
};

const headingVariants = cva(
  'font-bold leading-tight tracking-tighter lg:leading-[1.1]',
  {
    variants: {
      size: {
        default: 'text-3xl md:text-4xl',
        sm: 'text-2xl md:text-3xl',
        lg: 'text-4xl md:text-5xl',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

interface PageHeaderHeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const PageHeaderHeading = ({
  className,
  size,
  as: Comp = 'h1',
  ...props
}: PageHeaderHeadingProps) => {
  return (
    <Comp className={cn(headingVariants({ size, className }))} {...props} />
  );
};

const descriptionVariants = cva('max-w-[750px] text-muted-foreground', {
  variants: {
    size: {
      default: 'text-base sm:text-lg',
      sm: 'text-sm sm:text-base',
      lg: 'text-lg sm:text-xl',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

interface PageHeaderDescriptionProps
  extends React.ComponentProps<typeof Balancer>,
    VariantProps<typeof descriptionVariants> {}

const PageHeaderDescription = ({
  className,
  size,
  ...props
}: PageHeaderDescriptionProps) => {
  return (
    <Balancer
      as="p"
      className={cn(descriptionVariants({ size, className }))}
      {...props}
    />
  );
};

export { PageHeader, PageHeaderDescription, PageHeaderHeading };