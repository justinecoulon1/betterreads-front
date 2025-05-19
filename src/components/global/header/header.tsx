'use server';

import styles from './header.module.css';
import { Link } from '@/i18n/routing';
import AuthButton from '@/components/global/header/login/auth-button/auth-button';
import React from 'react';
import HeaderSearchBar from '@/components/global/header/header-search-bar';
import HeaderBurgerMenuButton from '@/components/global/header/menu/burger-menu-button/header-burger-menu-button';
import { getSession } from '@/utils/action/auth/get-session.action';
import ShelfService from '@/utils/api/shelf.service';

export default async function Header() {
  const session = await getSession();
  const isLoggedIn = !!session.accessToken;

  const userShelves = await ShelfService.getUserReadingStatusShelves();
  return (
    <header className={styles.header}>
      <div className={styles.leftSide}>
        <HeaderBurgerMenuButton isLoggedIn={isLoggedIn} userShelves={userShelves} />
        <Link href={'/'} className={styles.logoDiv}>
          BETTER-READS
        </Link>
      </div>
      <div className={styles.rightSide}>
        <HeaderSearchBar />
        <AuthButton />
      </div>
    </header>
  );
}
