'use client';

import styles from './page.module.css';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('header');
  return (
    <div className={styles.page}>
      <main className={styles.main}>{t('main-title')}</main>
    </div>
  );
}
