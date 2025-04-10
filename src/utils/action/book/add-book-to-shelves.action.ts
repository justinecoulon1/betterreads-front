'use server';

import { getServerErrorCode } from '@/utils/errors/error-utils';
import { BookDto } from '@/utils/dto/book.dto';
import { AddBookToShelvesStateForm } from '@/utils/action/book/types';
import BookService from '@/utils/api/book.service';
import { getSessionUser } from '@/utils/action/auth/get-session-user.action';

export async function addBookToShelves(
  state: AddBookToShelvesStateForm,
  data: FormData,
): Promise<AddBookToShelvesStateForm> {
  const isbn = state.isbn as string;
  const dataEntries = Object.fromEntries(data.entries());
  const user = await getSessionUser();

  let book: BookDto;
  try {
    book = await BookService.addBookToShelves(user.id, isbn, Object.keys(dataEntries));
    return {};
  } catch (err) {
    console.error(err);
    const errorCode = getServerErrorCode(err);
    return { error: { errorCode } };
  }
}
