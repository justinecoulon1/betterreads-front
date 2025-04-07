'use client';

import { Link, usePathname } from '@/i18n/routing';
import classNames from 'classnames';
import styles from '@/components/global/header/navigation-bar.module.css';
import { useTranslations } from 'next-intl';

export default function NavigationBarLink({ path, translationKey }: { path: string; translationKey: string }) {
  const t = useTranslations('header');
  const activePage = usePathname();
  return (
    <Link className={classNames(activePage === path && styles.activeLink)} href={path}>
      <span>{t(translationKey).toUpperCase()}</span>
    </Link>
  );
}
