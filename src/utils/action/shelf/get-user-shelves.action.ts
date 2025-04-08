'use server';

import { getServerErrorCode } from '@/utils/errors/error-utils';
import shelfService from '@/utils/api/shelf.service';
import { ShelfByUser } from '@/utils/action/shelf/types';

export async function getUserShelves(userId: number): Promise<ShelfByUser> {
  try {
    return { shelves: await shelfService.getByUserId(userId) };
  } catch (err) {
    const errorCode = getServerErrorCode(err);
    return { error: errorCode };
  }
}
