'use client';

import { Link, usePathname } from '@/i18n/routing';
import classNames from 'classnames';
import styles from '@/components/global/header/navigation/navigation-bar.module.css';
import { useTranslations } from 'next-intl';

export default function NavigationBarSubLink({
  path,
  translationKey,
  closeMenuLightbox,
}: {
  path: string;
  translationKey: string;
  closeMenuLightbox: () => void;
}) {
  const t = useTranslations('header');
  const activePage = usePathname();
  return (
    <Link className={classNames(activePage === path && styles.activeLink)} href={path} onClick={closeMenuLightbox}>
      <span>{t(translationKey)}</span>
    </Link>
  );
}
