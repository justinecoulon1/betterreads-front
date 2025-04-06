import type { Metadata } from 'next';
import '../../globals.css';

export const metadata: Metadata = {
  title: 'BetterReads',
  description: 'Books - Add',
};

export default async function AddBooksLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
