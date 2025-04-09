import React from 'react';
import { ShelfType, SmallShelfDto } from '@/utils/dto/smallShelfDto';
import styles from './add-to-shelf-lightbox-content.module.css';
import { Save, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import classNames from 'classnames';

export default function AddToShelfLightboxContent({
  shelves,
  closeLightbox,
}: {
  shelves: SmallShelfDto[];
  closeLightbox: () => void;
}) {
  const t = useTranslations('add-to-shelf-lightbox');
  return (
    <div className={styles.lightboxContainer} onMouseDown={(e) => e.stopPropagation()}>
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
      <div className={styles.addToShelfLbShelvesContainer}>
        {shelves.map((shelf) => {
          if (shelf.type === ShelfType.USER) {
            return (
              <div className={styles.addToShelfLbShelveNameContainer} key={`shelf-checkbox-${shelf.name}`}>
                <label className={styles.addToShelfLbShelveName} htmlFor={shelf.name}>
                  <p className={styles.shelfName}>{shelf.name}</p>
                </label>
                <input className={styles.addToShelfLbShelveNameCheckbox} type="checkbox" name={shelf.name} />
              </div>
            );
          }
        })}
      </div>
      <div className={styles.addToShelfLbSaveButtonContainer}>
        <button
          onClick={() => {
            //TODO Call book service to add book to shelves (also change endpoint to manage multiple shelves )
            closeLightbox();
          }}
          className={classNames(styles.addToShelfLbSaveButton, 'nbShadow')}
        >
          <Save className={styles.addToShelfLbSaveButtonImage} />
        </button>
      </div>
    </div>
  );
}
