'use server';

import { getLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';

export async function redirectToLogin(): Promise<never> {
  const locale = await getLocale();
  return redirect(`/${locale}/login`);
}
