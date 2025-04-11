'use server';

import { UserDto } from '@/utils/dto/user.dto';
import ShelvesContainer from '@/components/profile/profile-section/shelves/shelves-container';
import ShelfService from '@/utils/api/shelf.service';

export default async function ProfileSection({ user }: { user: UserDto }) {
  const shelves = await ShelfService.getLastByUserId(user.id);
  const readingStatusShelves = await ShelfService.getUserReadingStatusShelves(user.id);

  return (
    <>
      {shelves ? (
        <ShelvesContainer
          shelves={readingStatusShelves}
          containerTitle={'My reading status shelves'}
          seeMoreButton={false}
        />
      ) : (
        <p>Loading</p>
      )}
      {shelves ? (
        <ShelvesContainer
          shelves={shelves}
          containerTitle={'My shelves'}
          seeMoreButton={true}
          seeMoreLink={'/profile/shelves'}
        />
      ) : (
        <p>Loading</p>
      )}
    </>
  );
}
