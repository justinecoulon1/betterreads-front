import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'BetterReads',
  description: 'Profile',
};

export default async function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
