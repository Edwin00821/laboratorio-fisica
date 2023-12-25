'use client';

import { Button, type ButtonProps } from '@/app/components/ui/button';
import { cn } from '@/app/lib/utils';

interface ClientButtonProps extends ButtonProps {}

export function ClientButton({ className, ...props }: ClientButtonProps) {
  return <Button className={cn(className)} {...props} />;
}
