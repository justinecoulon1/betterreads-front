import { getServerErrorCode } from '@/utils/errors/error-utils';
import shelfService from '@/utils/api/shelf.service';
import { ShelfDto } from '@/utils/dto/shelf.dto';

export async function getUserShelves(userId: number): Promise<ShelfDto[] | null> {
  try {
    return await shelfService.getByUserId(userId);
  } catch (err) {
    const errorCode = getServerErrorCode(err);
    return null;
  }
}
