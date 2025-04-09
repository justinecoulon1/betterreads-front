import type { Metadata } from 'next';
import '../../globals.css';

export const metadata: Metadata = {
  title: 'BetterReads',
  description: 'Profile - Shelves',
};

export default async function ShelvesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
