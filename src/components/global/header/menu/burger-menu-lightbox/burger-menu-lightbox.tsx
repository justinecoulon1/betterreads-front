import React, { ReactNode } from 'react';
import classNames from 'classnames';
import styles from './burger-menu-lightbox.module.css';

export default function BurgerMenuLightbox({
  isLightboxOpened,
  closeLightbox = () => {},
  children,
}: {
  isLightboxOpened: boolean;
  closeLightbox: (e: React.MouseEvent | React.KeyboardEvent) => void;
  children: ReactNode;
}) {
  return (
    <div
      className={classNames(styles.burgerMenuLightBoxContainer, { [styles.hidden]: !isLightboxOpened })}
      onMouseDown={(e) => closeLightbox(e)}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          closeLightbox(e);
        }
      }}
    >
      {isLightboxOpened && children}
    </div>
  );
}
