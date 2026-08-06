import { getRequestConfig } from 'next-intl/server';
import { locales } from './navigation';

export default getRequestConfig(async ({ locale }) => {
  const targetLocale = locales.includes(locale as any) ? locale : 'es';

  return {
    messages: (await import(`../messages/${targetLocale}.json`)).default
  };
});
