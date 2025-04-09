import type { Metadata } from 'next';
import '../../../globals.css';

export const metadata: Metadata = {
  title: 'BetterReads',
  description: 'Shelves',
};

export default async function ShelfDetailsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
