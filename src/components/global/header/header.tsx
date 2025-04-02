'use server';

import styles from './header.module.css';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import NavigationBar from '@/components/global/header/navigation-bar';
import AuthButton from '@/components/global/header/login/auth-button/auth-button';
import React from 'react';

export default async function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerDiv}>
        <Link href={'/'} className={styles.logoDiv}>
          <Image className={styles.logo} src={'/icons/logo.png'} width={512} height={512} alt={'logo'} />
          SITE
        </Link>
        <NavigationBar />
        <AuthButton />
      </div>
    </header>
  );
}
