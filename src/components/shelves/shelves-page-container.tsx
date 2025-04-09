'use client';

import { SmallShelfDto } from '@/utils/dto/smallShelfDto';
import ShelfCard from '@/components/profile/profile-section/shelves/shelf-card';
import styles from './shelves-page-container.module.css';
import { useTranslations } from 'next-intl';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';
import shelfService from '@/utils/api/shelf.service';
import { UserDto } from '@/utils/dto/user.dto';

export default function ShelvesPageContainer({ shelves, user }: { shelves: SmallShelfDto[]; user: UserDto }) {
  const t = useTranslations('my-shelves');
  const [isCreatingShelf, setIsCreatingShelf] = useState(true);
  const [shelfName, setShelfName] = useState('');
  const [userShelves, setUserShelves] = useState(shelves);
  useEffect(() => {
    setIsCreatingShelf(false);
  }, []);
  return (
    <div className={styles.shelvesPageContainer}>
      <div className={styles.shelvePageHeader}>
        <h2>{t('title')}</h2>
        <button
          onClick={() => {
            if (!isCreatingShelf) {
              setIsCreatingShelf(true);
            }
          }}
          className={classNames('nbShadow', styles.addShelfButton, isCreatingShelf && styles.disabled)}
          disabled={isCreatingShelf}
        >
          {t('add-shelf').toUpperCase()}
        </button>
        <div className={classNames(styles.animationWrapper, isCreatingShelf && styles.opacityAnimation)}>
          <div className={classNames('nbShadow', styles.shelfCreationInputContainer)}>
            <input
              className={styles.shelfCreationInput}
              placeholder={t('create-shelf-name-input-placeholder')}
              disabled={!isCreatingShelf}
              type={'text'}
              name={'shelf-name'}
              value={shelfName}
              onChange={(e) => setShelfName(e.target.value)}
            ></input>
            <button
              className={styles.validateShelfCreationButton}
              disabled={!isCreatingShelf}
              onClick={async () => {
                if (isCreatingShelf) {
                  setUserShelves(await shelfService.createShelf(user.id, shelfName));
                  setIsCreatingShelf(false);
                }
              }}
            >
              <Check className={styles.validateShelfCreationImage} />
            </button>
            <button
              className={styles.validateShelfCreationButton}
              disabled={!isCreatingShelf}
              onClick={() => {
                if (isCreatingShelf) {
                  setIsCreatingShelf(false);
                }
              }}
            >
              <X className={styles.validateShelfCreationImage} />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.shelvesCardContainer}>
        {userShelves.map((shelf) => (
          <ShelfCard key={`shelf-card-${shelf.id}`} shelf={shelf} />
        ))}
      </div>
    </div>
  );
}
