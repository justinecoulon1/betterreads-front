'use server';

import BookService from '@/utils/api/book.service';
import { getServerErrorCode } from '@/utils/errors/error-utils';
import { BookIsbnStateForm } from '@/utils/action/book/types';
import { PreloadedBookInfoDto } from '@/utils/dto/book.dto';

export async function getPreloadedBookInfo(state: BookIsbnStateForm, data: FormData): Promise<BookIsbnStateForm> {
  const isbn = data.get('isbn') as string;
  if (!isbn) {
    return { error: { preloadBookInfoError: ['invalid-isbn'] } };
  }

  try {
    const preloadedBookInfo: PreloadedBookInfoDto = await BookService.getPreloadedBookInfo(isbn);

    return { isbn, preloadedBookInfo };
  } catch (err) {
    const errorCode = getServerErrorCode(err);
    return { error: { preloadBookInfoError: [errorCode] } };
  }
}
