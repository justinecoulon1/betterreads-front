'use client';

import { SmallShelfDto } from '@/utils/dto/shelf.dto';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import AddToShelfLightbox from '@/components/book-details/add-to-shelf-lightbox/add-to-shelf-lightbox';
import classNames from 'classnames';
import styles from '@/components/book-details/book-details-content.module.css';
import { redirectToLogin } from '@/utils/action/auth/redirect-to-login.action';

export default function AddToShelveButton({
  isLoggedIn,
  shelves,
  isbn,
}: {
  isLoggedIn: boolean;
  shelves: SmallShelfDto[];
  isbn: string;
}) {
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
      <AddToShelfLightbox
        closeLightbox={handleCloseLightbox}
        isLightboxOpened={isLightboxOpened}
        shelves={shelves}
        isbn={isbn}
      />
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
