'use client';

import styles from './header.module.css';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import NavigationBar from '@/components/global/header/navigation-bar';
import AuthButtons from '@/components/global/header/auth-buttons';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerDiv}>
        <Link href={'/public'} className={styles.logoDiv}>
          <Image className={styles.logo} src={'/icons/logo.png'} width={512} height={512} alt={'logo'} />
          SITE
        </Link>
        <NavigationBar />
        <AuthButtons />
      </div>
    </header>
  );
}
