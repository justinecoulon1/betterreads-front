import { PreloadedBookInfoDto } from '@/utils/dto/book.dto';

export type BookAddFormFields = {
  title?: string;
  releaseDate?: string;
  genres?: string;
  editor?: string;
  editionLanguage?: string;
  authorsName?: string;
  description?: string;
};

export type BookAddStateForm = BookAddFormFields & {
  isbn?: string;
  errors?: BookAddFormFields & { createBookError?: string };
};

export type BookIsbnStateForm = {
  error?: {
    preloadBookInfoError?: string[];
  };
  isbn?: string;
  preloadedBookInfo?: PreloadedBookInfoDto;
};

export type AddBookToShelvesStateForm = {
  bookId?: number;
  error?: unknown;
};
