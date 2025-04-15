'use server';

import { UserDto } from '@/utils/dto/user.dto';
import ShelvesContainer from '@/components/profile/profile-section/shelves/shelves-container';
import ShelfService from '@/utils/api/shelf.service';
import HistoryContainer from '@/components/profile/profile-section/history/history-container';
import HistoryService from '@/utils/api/history.service';

export default async function ProfileSection({ user }: { user: UserDto }) {
  const shelves = await ShelfService.getLastByUserId();
  const readingStatusShelves = await ShelfService.getUserReadingStatusShelves();
  const history = await HistoryService.getUserReadingHistory(5, 0);

  return (
    <>
      {readingStatusShelves ? (
        <ShelvesContainer
          initialShelves={readingStatusShelves}
          containerTitle={'My reading status shelves'}
          seeMoreButton={false}
        />
      ) : (
        <p>Loading</p>
      )}
      {shelves ? (
        <ShelvesContainer
          initialShelves={shelves}
          containerTitle={'My shelves'}
          seeMoreButton={true}
          seeMoreLink={'/profile/shelves'}
          user={user}
        />
      ) : (
        <p>Loading</p>
      )}
      {history ? (
        <HistoryContainer
          history={history.histories}
          containerTitle={'My Reading History'}
          seeMoreButton={true}
          seeMoreLink={'/profile/history'}
        />
      ) : (
        <p>Loading</p>
      )}
    </>
  );
}
