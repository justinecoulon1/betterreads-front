import type { Metadata } from 'next';
import '../../globals.css';

export const metadata: Metadata = {
  title: 'BetterReads',
  description: 'Profile - Account',
};

export default async function ProfileAccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
