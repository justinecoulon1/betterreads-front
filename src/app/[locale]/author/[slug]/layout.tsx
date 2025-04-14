import type { Metadata } from 'next';
import '../../globals.css';

export const metadata: Metadata = {
  title: 'BetterReads',
  description: 'Author',
};

export default async function AuthorDetailsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
