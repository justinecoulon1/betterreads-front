import type { Metadata } from 'next';
import { Athiti } from 'next/font/google';
import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Header from '@/components/global/header/header';

const athiti = Athiti({
  variable: '--font-athiti',
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'BetterReads',
  description: 'BetterReads: Your reading companion!',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();
  return (
    <html lang="en">
      <NextIntlClientProvider messages={messages}>
        <body className={athiti.variable}>
          <Header />
          <main>{children}</main>
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
