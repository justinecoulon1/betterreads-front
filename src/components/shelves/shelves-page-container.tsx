'use client';

import { ShelfWithLastBookDto } from '@/utils/dto/shelf.dto';
import styles from './shelves-page-container.module.css';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import ShelfService from '@/utils/api/shelf.service';
import ShelfCard from '@/components/profile/profile-section/shelves/shelves-card/shelf-card';
import BannerContainer from '@/components/global/banner/banner-container';
import DoubleButtonInput from '@/components/global/inputs/input-button/double-button-input';

export default function ShelvesPageContainer() {
  const t = useTranslations('my-shelves');
  const tShelf = useTranslations('my-shelves');
  const [userShelves, setUserShelves] = useState<ShelfWithLastBookDto[] | undefined>();

  useEffect(() => {
    const fetchUserShelves = async () => {
      setUserShelves(await ShelfService.getByUserId());
    };
    void fetchUserShelves();
  }, []);

  return (
    <div className={styles.shelvesPageContainer}>
      <BannerContainer imageAlt={'library banner'} path={'/library3.png'} imageClassName={styles.bannerImage} />
      <div className={styles.shelvesInnerContainer}>
        <div className={styles.shelvesHeaderContainer}>
          <h2>{t('title')}</h2>
          <div className={styles.newShelfButtonContainer}>
            <DoubleButtonInput
              onValidating={async (shelfName) => setUserShelves(await ShelfService.createShelf(shelfName))}
              buttonText={tShelf('add-shelf').toUpperCase()}
            />
          </div>
        </div>
        <div className={styles.shelvesContainer}>
          {userShelves ? (
            <>
              {userShelves.map((shelf) => (
                <ShelfCard
                  key={`shelf-card-${shelf.id}`}
                  shelf={shelf}
                  hasButton={true}
                  onShelfDelete={(deletedShelf) => {
                    setUserShelves((shelves) => shelves?.filter((shelf) => shelf.id !== deletedShelf.id));
                  }}
                  className={styles.allShelvesPageCard}
                />
              ))}
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}
