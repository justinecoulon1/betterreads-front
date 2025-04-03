import classNames from 'classnames';
import React, { ReactNode } from 'react';
import styles from './lightbox.module.css';

export default function GenericLightbox({
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
      className={classNames(styles.loginLightBoxContainer, { [styles.hidden]: !isLightboxOpened })}
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
