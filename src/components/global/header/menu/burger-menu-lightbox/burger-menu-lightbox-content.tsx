import styles from './burger-menu-lightbox.module.css';
import classNames from 'classnames';
import { X } from 'lucide-react';
import React from 'react';
import NavigationBar from '@/components/global/header/navigation/navigation-bar';
import { ShelfWithLastBookDto } from '@/utils/dto/shelf.dto';

export default function BurgerMenuContent({
  isLoggedIn,
  closeMenuLightbox,
  userShelves,
}: {
  isLoggedIn: boolean;
  closeMenuLightbox: () => void;
  userShelves: ShelfWithLastBookDto[];
}) {
  return (
    <div className={styles.burgerMenuContentContainer} onMouseDown={(e) => e.stopPropagation()}>
      <div className={styles.burgerMenuLightboxHeader}>
        <p className={styles.burgerMenuLogoText}>BETTER-READS</p>
        <button className={classNames('nbShadow', styles.burgerMenuLightboxCloseButton)}>
          <X />
        </button>
      </div>
      <div className={styles.burgerMenuLightboxMenu}>
        <NavigationBar isLoggedIn={isLoggedIn} closeMenuLightbox={closeMenuLightbox} userShelves={userShelves} />
      </div>
    </div>
  );
}
