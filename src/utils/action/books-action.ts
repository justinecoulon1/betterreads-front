'use server';

import BookService from '@/utils/api/book.service';
import { BookFormStep } from '@/utils/enums/book-enum';

export type BookIsbnStateForm = {
  step: BookFormStep;
  error?: {
    isbn?: string[];
  };
  isbn?: string;
};

export type BookAddStateForm = {
  errors?: {
    title?: string[];
    releaseDate?: string[];
    genres?: string[];
  };
  title?: string;
  releaseDate?: string;
  genres?: string;
};

export async function checkBookIsbn(state: BookIsbnStateForm, data: FormData): Promise<BookIsbnStateForm> {
  const isbn = data.get('isbn') as string;

  const isbnExists: boolean = await BookService.checkIsbn(isbn);

  if (isbnExists) {
    return { error: { isbn: ['book-exists'] }, step: BookFormStep.CHECK_ISBN };
  }

  return { isbn, step: BookFormStep.BOOK_INFO };
}

export async function addBook(state: BookAddStateForm, data: FormData): Promise<BookAddStateForm> {
  console.log('add book');

  return {};
}
