import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'BetterReads',
  description: 'BetterReads - Login',
};

export default async function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
