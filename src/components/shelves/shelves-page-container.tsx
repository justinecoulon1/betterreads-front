'use client';

import { ShelfWithLastBookDto } from '@/utils/dto/shelf.dto';
import styles from './shelves-page-container.module.css';
import { useTranslations } from 'next-intl';
import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { Check, X } from 'lucide-react';
import { UserDto } from '@/utils/dto/user.dto';
import shelfService from '@/utils/api/shelf.service';
import ShelfCard from '@/components/profile/profile-section/shelves/shelf-card';
import Image from 'next/image';

export default function ShelvesPageContainer({ shelves, user }: { shelves: ShelfWithLastBookDto[]; user: UserDto }) {
  const t = useTranslations('my-shelves');
  const [userShelves, setUserShelves] = useState(shelves);
  return (
    <div className={styles.shelvesPageContainer}>
      <div className={styles.bannerContainer}>
        <Image className={styles.bannerImage} src="/library3.png" alt="library banner" width={3024} height={4032} />
      </div>

      <div className={styles.shelvesInnerContainer}>
        <div className={styles.shelvesHeaderContainer}>
          <h2>{t('title')}</h2>
          <div className={styles.newShelfButtonContainer}>
            <AddShelfButton
              onShelfCreation={async (shelfName) => setUserShelves(await shelfService.createShelf(user.id, shelfName))}
            />
          </div>
        </div>
        <div className={styles.shelvesContainer}>
          {userShelves.map((shelf) => (
            <ShelfCard
              key={`shelf-card-${shelf.id}`}
              shelf={shelf}
              hasButton={true}
              user={user}
              onShelfDelete={(deletedShelf) => {
                setUserShelves((shelves) => shelves.filter((shelf) => shelf.id !== deletedShelf.id));
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function AddShelfButton({ onShelfCreation }: { onShelfCreation: (shelfName: string) => void }) {
  const t = useTranslations('my-shelves');
  const [isCreatingShelf, setIsCreatingShelf] = useState(false);
  const [shelfName, setShelfName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const validateShelfCreation = () => {
    if (isCreatingShelf && shelfName) {
      onShelfCreation(shelfName);
      setIsCreatingShelf(false);
      setShelfName('');
    }
  };

  const cancelShelfCreation = () => {
    setIsCreatingShelf(false);
    setShelfName('');
  };

  useEffect(() => {
    if (isCreatingShelf) {
      inputRef.current?.focus();
    }
  }, [isCreatingShelf]);

  return (
    <div className={classNames('nbShadow', styles.addShelfButtonGlobalContainer)}>
      <div
        className={styles.animatedContainer}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            validateShelfCreation();
          } else if (e.key === 'Escape') {
            cancelShelfCreation();
          }
        }}
      >
        <input
          className={classNames(styles.shelfCreationInput, isCreatingShelf && styles.visible)}
          placeholder={t('create-shelf-name-input-placeholder')}
          disabled={!isCreatingShelf}
          type={'text'}
          name={'shelf-name'}
          value={shelfName}
          onChange={(e) => setShelfName(e.target.value)}
          ref={inputRef}
        />
      </div>
      <div className={styles.animatedContainer}>
        {isCreatingShelf ? (
          <>
            <button
              className={styles.validateShelfCreationButton}
              disabled={!isCreatingShelf}
              onClick={validateShelfCreation}
            >
              <Check className={styles.validateShelfCreationImage} />
            </button>
            <button
              className={styles.validateShelfCreationButton}
              disabled={!isCreatingShelf}
              onClick={cancelShelfCreation}
            >
              <X className={styles.validateShelfCreationImage} />
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              if (!isCreatingShelf) {
                setIsCreatingShelf(true);
              }
            }}
            className={classNames(styles.addShelfButton, !isCreatingShelf && styles.visible)}
            disabled={isCreatingShelf}
          >
            {t('add-shelf').toUpperCase()}
          </button>
        )}
      </div>
    </div>
  );
}
