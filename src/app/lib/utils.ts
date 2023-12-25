import { env } from '@/env.mjs';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string | number) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
}

export function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

export function unslugify(str: string) {
  return str.replace(/-/g, ' ');
}

export function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
  );
}

export function toSentenceCase(str: string) {
  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase());
}

export function truncate(str: string, length: number) {
  return str.length > length ? `${str.substring(0, length)}...` : str;
}

export function absoluteUrl(path: string) {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`;
}

export const decimalAdjust = (value: number, exp: number = 2) => {
  const signo = value >= 0 ? 1 : -1;

  value = value * signo;
  if (exp === 0)
    //con 0 decimales
    return signo * Math.round(value);
  // round(x * 10 ^ decimales)

  let newValue = value.toString().split('e');

  value = Math.round(
    +(newValue[0] + 'e' + (newValue[1] ? +newValue[1] + exp : exp))
  );
  // x * 10 ^ (-decimales)
  newValue = value.toString().split('e');

  return (
    signo *
    Number(newValue[0] + 'e' + (newValue[1] ? +newValue[1] - exp : -exp))
  );
};
