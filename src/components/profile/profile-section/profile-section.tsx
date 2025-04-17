'use client';

import ShelvesContainer from '@/components/profile/profile-section/shelves/shelves-container';
import ShelfService from '@/utils/api/shelf.service';
import HistoryContainer from '@/components/profile/profile-section/history/history-container';
import HistoryService from '@/utils/api/history.service';
import { useEffect, useState } from 'react';
import { ShelfWithLastBookDto } from '@/utils/dto/shelf.dto';
import { PaginatedHistoryDto } from '@/utils/dto/history.dto';

export default function ProfileSection() {
  const [userShelves, setUserShelves] = useState<ShelfWithLastBookDto[] | undefined>();
  const [readingStatusShelves, setReadingStatusShelves] = useState<ShelfWithLastBookDto[] | undefined>();
  const [history, setHistory] = useState<PaginatedHistoryDto | undefined>();

  useEffect(() => {
    const fetchServerData = async () => {
      const [newUserShelves, newReadingStatusShelves, newHistory] = await Promise.all([
        ShelfService.getLastByUserId(),
        ShelfService.getUserReadingStatusShelves(),
        HistoryService.getUserReadingHistory(5, 0),
      ]);
      setUserShelves(newUserShelves);
      setReadingStatusShelves(newReadingStatusShelves);
      setHistory(newHistory);
    };
    void fetchServerData();
  }, []);

  return (
    <>
      <ShelvesContainer
        initialShelves={readingStatusShelves}
        containerTitle={'reading-status-shelves-container'}
        seeMoreButton={false}
      />
      <ShelvesContainer
        initialShelves={userShelves}
        containerTitle={'personal-shelves-container'}
        seeMoreButton={true}
        seeMoreLink={'/profile/shelves'}
      />
      <HistoryContainer
        history={history?.histories}
        containerTitle={'reading-history'}
        seeMoreButton={true}
        seeMoreLink={'/profile/history'}
      />
    </>
  );
}
