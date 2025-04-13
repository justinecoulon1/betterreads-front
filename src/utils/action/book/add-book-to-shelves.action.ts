'use server';

import { getServerErrorCode } from '@/utils/errors/error-utils';
import { AddBookToShelvesStateForm } from '@/utils/action/book/types';
import BookService from '@/utils/api/book.service';
import { SmallShelfDto } from '@/utils/dto/shelf.dto';

export async function addBookToShelves(
  state: AddBookToShelvesStateForm,
  data: FormData,
  shelvesContainingBook: SmallShelfDto[],
): Promise<AddBookToShelvesStateForm> {
  const bookId = state.bookId as number;

  const dataEntries = Object.fromEntries(data.entries());
  const checkedShelvesIds = Object.keys(dataEntries).map((key) => parseInt(key));

  if (checkedShelvesIds.length === 0) {
    return { bookId };
  }

  const previouslyChecked = shelvesContainingBook.map((shelf) => shelf.id);
  const currentlyChecked = checkedShelvesIds;

  const shelvesToAddIds = checkedShelvesIds.filter((id) => !previouslyChecked.includes(id));
  const shelvesToRemoveIds = previouslyChecked.filter((id) => !currentlyChecked.includes(id));

  try {
    await BookService.updateBookInShelves(bookId, shelvesToAddIds, shelvesToRemoveIds);
    return { bookId };
  } catch (err) {
    console.error(err);
    const errorCode = getServerErrorCode(err);
    return { error: { errorCode }, bookId };
  }
}
