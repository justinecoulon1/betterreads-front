'use server';

import styles from './header.module.css';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import NavigationBar from '@/components/global/header/navigation-bar';
import AuthButton from '@/components/global/header/login/auth-button/auth-button';
import React from 'react';
import HeaderSearchBar from '@/components/global/header/header-search-bar';

export default async function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerDiv}>
        <Link href={'/'} className={styles.logoDiv}>
          <Image className={styles.logo} src={'/icons/logo.png'} width={512} height={512} alt={'logo'} />
          BETTER-READS
        </Link>
        <NavigationBar />
        <div className={styles.searchBarAndAuthButtonContainer}>
          <HeaderSearchBar />
          <AuthButton />
        </div>
      </div>
    </header>
  );
}
