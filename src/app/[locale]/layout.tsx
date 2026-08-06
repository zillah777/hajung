import React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Forum, Inter } from 'next/font/google';
import '../globals.css';

// Load fonts via next/font — avoids <link> hydration mismatch
const forum = Forum({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-forum',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  display: 'swap',
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover' as const,
  themeColor: '#0A0B0A',
};

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  return {
    title: 'HAJUNG (하정) | Korean Izakaya & Fusion Dining — Gwanak-gu, Seoul',
    description: '하정식당 (㗿靖食堂) — A cozy Korean izakaya in Bongcheon-dong, Gwanak-gu, Seoul. Fusion cuisine, Japanese-style dishes, solo diners welcome (혼술 환영). Open Mon–Fri 17:30, Sat 17:00.',
    keywords: ['하정식당', 'Hajung', 'Korean Izakaya Seoul', 'Gwanak-gu restaurant', '혼술', '관악구 맛집', 'fusion dining Seoul'],
    appleWebApp: {
      capable: true,
      statusBarStyle: 'black-translucent' as const,
      title: 'HAJUNG 하정',
    },
    openGraph: {
      title: '하정식당 (HAJUNG) | Izakaya & Fusion — Gwanak-gu, Seoul',
      description: '편안하고 즐거운 하정식당. 보라매로 22, 관악구.',
      locale: locale,
      type: 'website',
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${forum.variable} ${inter.variable} dark scroll-smooth`}
    >
      <body
        className="bg-[#0A0B0A] text-[#EFE7D2] font-sans antialiased"
      >
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
