'use server';

import { getServerErrorCode } from '@/utils/errors/error-utils';
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

  if (Object.keys(dataEntries).length === 0) {
    return { error: { message: 'select-one' }, isbn: isbn };
  }

  try {
    await BookService.addBookToShelves(
      user.id,
      isbn,
      Object.keys(dataEntries).map((key) => parseInt(key)),
    );
    return { isbn: isbn };
  } catch (err) {
    console.error(err);
    const errorCode = getServerErrorCode(err);
    return { error: { errorCode }, isbn: isbn };
  }
}
