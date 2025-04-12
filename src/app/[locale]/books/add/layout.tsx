import type { Metadata } from 'next';
import '../../globals.css';
import { getSessionUser } from '@/utils/action/auth/get-session-user.action';

export const metadata: Metadata = {
  title: 'BetterReads',
  description: 'Books - Add',
};

export default async function AddBooksLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await getSessionUser();
  return children;
}
