import { useTranslations } from 'next-intl';
import styles from '@/components/book-details/add-to-shelf-lightbox/shelf-lightbox-content.module.css';
import classNames from 'classnames';
import { X } from 'lucide-react';
import React from 'react';

export default function ShelfLightboxHeader({ closeLightbox }: { closeLightbox: () => void }) {
  const t = useTranslations('add-to-shelf-lightbox');
  return (
    <div className={styles.addToShelfLightboxHeader}>
      <div className={styles.addToShelfLbTitleContainer}>
        <h2>{t('add-to-shelf-lightbox-title')}</h2>
      </div>
      <div className={styles.addToShelfLbCloseButtonContainer}>
        <button onClick={closeLightbox} className={classNames(styles.addToShelfLbCloseButton, 'nbShadow')}>
          <X className={styles.addToShelfLbCloseButtonImage} />
        </button>
      </div>
    </div>
  );
}
