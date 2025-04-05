import { AuthorDto } from './author.dto';

export type BookListDto = {
  id: number;
  title: string;
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
  description: string;
};

export type CreateBookRequestDto = {
  title: string;
  releaseDate: Date;
  genres: string[];
  isbn: string;
  editor: string;
  editionLanguage: string;
  description?: string;
  authorsName: string[];
};
