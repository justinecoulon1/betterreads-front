'use server';

import { getServerErrorCode } from '@/utils/errors/error-utils';
import { BookDto } from '@/utils/dto/book.dto';
import { AddBookToShelvesStateForm } from '@/utils/action/book/types';
import BookService from '@/utils/api/book.service';
import { getSession } from '@/utils/action/auth/get-session.action';
import { getLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';

export async function addBookToShelves(
  state: AddBookToShelvesStateForm,
  data: FormData,
): Promise<AddBookToShelvesStateForm> {
  const isbn = state.isbn as string;
  const dataEntries = Object.fromEntries(data.entries());
  const session = await getSession();
  const user = session.user;
  if (!user) {
    const locale = await getLocale();
    redirect(`/${locale}/login`);
  }

  let book: BookDto;
  try {
    book = await BookService.addBookToShelves(user.id, isbn, Object.keys(dataEntries));
  } catch (err) {
    console.error(err);
    const errorCode = getServerErrorCode(err);
    return { error: { errorCode } };
  }
  return {
    error: { error: getServerErrorCode(null) },
  };
}
