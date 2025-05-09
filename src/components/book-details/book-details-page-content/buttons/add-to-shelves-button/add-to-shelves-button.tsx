'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import ShelfLightbox from '@/components/book-details/add-to-shelf-lightbox/shelf-lightbox';
import classNames from 'classnames';
import styles from '@/components/book-details/book-details-content.module.css';
import { redirectToLogin } from '@/utils/action/auth/redirect-to-login.action';

export default function AddToShelvesButton({ isLoggedIn, bookId }: { isLoggedIn: boolean; bookId: number }) {
  const t = useTranslations('book-details');
  const [isLightboxOpened, setLightboxOpened] = useState(false);

  const handleCloseLightbox = () => {
    setLightboxOpened(false);
  };

  const handleOpenLightbox = () => {
    setLightboxOpened(true);
  };

  return (
    <>
      <ShelfLightbox closeLightbox={handleCloseLightbox} isLightboxOpened={isLightboxOpened} bookId={bookId} />
      <button
        onClick={async () => {
          if (isLoggedIn) {
            handleOpenLightbox();
          } else {
            await redirectToLogin();
          }
        }}
        className={classNames(styles.addToShelveButton, 'nbShadow')}
      >
        {t('add-to-shelf')}
      </button>
    </>
  );
}
