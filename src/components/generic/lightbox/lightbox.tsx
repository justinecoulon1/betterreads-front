import classNames from 'classnames';
import React, { ReactNode } from 'react';
import styles from './lightbox.module.css';

export default function GenericLightbox({
  isLightboxOpened,
  onLightboxClosed = () => {},
  children,
}: {
  isLightboxOpened: boolean;
  onLightboxClosed: (e: React.MouseEvent | React.KeyboardEvent) => void;
  children: ReactNode;
}) {
  return (
    <div
      className={classNames(styles.loginLightBoxContainer, { [styles.hidden]: !isLightboxOpened })}
      onMouseDown={(e) => onLightboxClosed(e)}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          onLightboxClosed(e);
        }
      }}
    >
      {isLightboxOpened && children}
    </div>
  );
}
