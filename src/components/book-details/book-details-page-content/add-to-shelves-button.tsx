'use client';

import { SmallShelfDto } from '@/utils/dto/smallShelfDto';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import AddToShelfLightbox from '@/components/book-details/add-to-shelf-lightbox/add-to-shelf-lightbox';
import classNames from 'classnames';
import styles from '@/components/book-details/book-details-content.module.css';

export default function AddToShelveButton({ shelves, isbn }: { shelves: SmallShelfDto[]; isbn: string }) {
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
      <button onClick={() => handleOpenLightbox()} className={classNames(styles.addToShelveButton, 'nbShadow')}>
        {t('add-to-shelf')}
      </button>
    </>
  );
}
