'use server';

import BookService from '@/utils/api/book.service';
import { getServerErrorCode } from '@/utils/errors/error-utils';
import { BookAddStateForm } from '@/utils/action/book/types';
import { redirect } from '@/i18n/routing';
import { getLocale } from 'next-intl/server';
import { BookDto } from '@/utils/dto/book.dto';

export async function addBook(state: BookAddStateForm, data: FormData): Promise<BookAddStateForm> {
  const isbn = state.isbn as string;
  const title = data.get('title') as string;
  const releaseDateStr = data.get('releaseDate') as string;
  const releaseDate = new Date(releaseDateStr);
  const genresStr = data.get('genres') as string;
  const genres = genresStr
    .split(', ')
    .map((genre) => genre.trim())
    .filter((genre) => !!genre);
  const editor = data.get('editor') as string;
  const editionLanguage = data.get('editionLanguage') as string;
  const authorsNameStr = data.get('authorsName') as string;
  const authorsName = authorsNameStr
    .split(', ')
    .map((authorName) => authorName.trim())
    .filter((authorName) => !!authorName);
  const description = data.get('description') as string;

  const errors: BookAddStateForm['errors'] = {};

  if (!title) {
    errors.title = 'necessary-field';
  }
  if (title.length > 200) {
    errors.title = 'title-too-long';
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

  let createdBook: BookDto;
  try {
    createdBook = await BookService.createBook(
      title,
      releaseDate,
      genres,
      isbn,
      editor,
      editionLanguage,
      authorsName,
      description,
    );
  } catch (err) {
    console.error(err);
    const errorCode = getServerErrorCode(err);
    return {
      isbn,
      authorsName: authorsNameStr,
      title,
      releaseDate: releaseDateStr,
      genres: genresStr,
      editionLanguage,
      editor,
      errors: { createBookError: errorCode },
    };
  }
  if (createdBook) {
    redirect({
      href: `/books/${createdBook.isbn13}`,
      locale: await getLocale(),
    });
  }
  return {
    errors: { createBookError: getServerErrorCode(null) },
  };
}
