import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const locales = ['es', 'en', 'ko'] as const;
export const defaultLocale = 'es' as const;
export const localePrefix = 'as-needed' as const;

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales, localePrefix });
