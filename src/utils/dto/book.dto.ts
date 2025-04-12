import { AuthorDto } from './author.dto';
import { ShelfType } from '@/utils/dto/shelf.dto';

export type BookListDto = {
  id: number;
  title: string;
  isbn13: string;
  authors: AuthorDto[];
};

export type BookDto = {
  id: number;
  title: string;
  createdAt: Date;
  genres: string[];
  authors: AuthorDto[];
  isbn10: string;
  isbn13: string;
  releaseDate: Date;
  editor: string;
  editionLanguage: string;
  description?: string;
};

export type CreateBookRequestDto = {
  title: string;
  releaseDate: Date;
  genres: string[];
  isbn: string;
  editor: string;
  editionLanguage: string;
  description?: string;
  authorNames: string[];
};

export type PreloadedBookInfoDto = {
  isbn13: string;
  description?: string;
  pages?: number;
  releaseDate?: string;
  authorNames?: string[];
  title?: string;
  editionLanguage?: string;
  editor?: string;
};

export type AddBookToShelvesRequestDto = {
  isbn: string;
  shelvesId: number[];
};

export type UpdateBookReadingStatusRequestDto = {
  bookId: number;
  statusType: ShelfType | undefined;
};
