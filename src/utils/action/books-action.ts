'use server';

import BookService from '@/utils/api/book.service';
import { BookFormStep } from '@/utils/enums/book-enum';
import { redirect } from 'next/navigation';

export type BookIsbnStateForm = {
  step: BookFormStep;
  error?: {
    isbn?: string[];
  };
  isbn?: string;
};

export type BookAddFormFields = {
  title?: string;
  releaseDate?: string;
  genres?: string;
  editor?: string;
  editionLanguage?: string;
  authorsName?: string;
};

export type BookAddStateForm = BookAddFormFields & {
  isbn?: string;
  errors?: BookAddFormFields;
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
  const isbn = state.isbn as string;
  const title = data.get('title') as string;
  const releaseDateStr = data.get('release-date') as string;
  const releaseDate = new Date(releaseDateStr);
  const genresStr = data.get('genres') as string;
  const genres = genresStr
    .split(', ')
    .map((genre) => genre.trim())
    .filter((genre) => !!genre);
  const editor = data.get('editor') as string;
  const editionLanguage = data.get('edition-language') as string;
  const authorsNameStr = data.get('author-name') as string;
  const authorsName = authorsNameStr
    .split(', ')
    .map((authorName) => authorName.trim())
    .filter((authorName) => !!authorName);

  const errors: BookAddStateForm['errors'] = {};

  if (!title) {
    errors.title = 'necessary-field';
  }
  if (!releaseDateStr || !releaseDate || isNaN(releaseDate.getFullYear())) {
    errors.releaseDate = 'necessary-field';
  }
  if (genres.length === 0) {
    errors.genres = 'necessary-field';
  }
  if (!editor) {
    errors.editor = 'necessary-field';
  }
  if (!editionLanguage) {
    errors.editionLanguage = 'necessary-field';
  }
  if (authorsName.length === 0) {
    errors.authorsName = 'necessary-field';
  }

  if (Object.keys(errors).length > 0) {
    return {
      isbn,
      authorsName: authorsNameStr,
      title,
      releaseDate: releaseDateStr,
      genres: genresStr,
      editionLanguage,
      editor,
      errors,
    };
  }

  const createdBook = await BookService.createBook(
    title,
    releaseDate,
    genres,
    isbn,
    editor,
    editionLanguage,
    authorsName,
  );
  redirect('/');
}
