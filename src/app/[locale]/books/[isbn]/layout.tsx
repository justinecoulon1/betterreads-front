import type { Metadata } from 'next';
import '../../globals.css';

export const metadata: Metadata = {
  title: 'BetterReads',
  description: 'Book - Details',
};

export default async function BooksLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
