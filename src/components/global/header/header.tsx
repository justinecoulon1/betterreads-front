'use server';

import styles from './header.module.css';
import { Link } from '@/i18n/routing';
import AuthButton from '@/components/global/header/login/auth-button/auth-button';
import React from 'react';
import HeaderSearchBar from '@/components/global/header/header-search-bar';
import NavigationBar from '@/components/global/header/navigation-bar';

export default async function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.firstBar}>
        <Link href={'/'} className={styles.logoDiv}>
          BETTER-READS
        </Link>
        <HeaderSearchBar />
        <AuthButton />
      </div>
      <div className={styles.secondBar}>
        <NavigationBar />
      </div>
    </header>
  );
}
