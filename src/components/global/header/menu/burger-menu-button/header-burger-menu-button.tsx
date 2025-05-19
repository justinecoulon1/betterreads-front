'use client';
import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './header-burger-menu-button.module.css';
import { Menu } from 'lucide-react';
import BurgerMenuLightbox from '@/components/global/header/menu/burger-menu-lightbox/burger-menu-lightbox';
import BurgerMenuContent from '@/components/global/header/menu/burger-menu-lightbox/burger-menu-lightbox-content';
import { ShelfWithLastBookDto } from '@/utils/dto/shelf.dto';

export default function HeaderBurgerMenuButton({
  isLoggedIn,
  userShelves,
}: {
  isLoggedIn: boolean;
  userShelves: ShelfWithLastBookDto[];
}) {
  const [isLightboxOpened, setLightboxOpened] = useState(false);
  const handleCloseLightbox = () => {
    setLightboxOpened(false);
  };

  const handleOpenLightbox = () => {
    setLightboxOpened(true);
  };

  return (
    <>
      <BurgerMenuLightbox isLightboxOpened={isLightboxOpened} closeLightbox={handleCloseLightbox}>
        <BurgerMenuContent isLoggedIn={isLoggedIn} closeMenuLightbox={handleCloseLightbox} userShelves={userShelves} />
      </BurgerMenuLightbox>
      <button className={classNames('nbShadow', styles.headerBurgerMenu)} onClick={() => handleOpenLightbox()}>
        <Menu />
      </button>
    </>
  );
}
