import { AuthorDto } from './author.dto';
import { BookDto } from './book.dto';

export enum SearchType {
  'BOOK_TITLE' = 'BOOK_TITLE',
  'BOOK_AUTHOR' = 'BOOK_AUTHOR',
  'AUTHOR' = 'AUTHOR',
}

export type SearchResultDto = {
  items: SearchDto[];
  count: number;
  limit: number;
  offset: number;
};

export type SearchDto = {
  searchType: SearchType;
  book?: BookDto;
  author?: AuthorDto;
};
