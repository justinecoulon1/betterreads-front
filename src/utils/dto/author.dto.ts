import { BookDto } from '@/utils/dto/book.dto';

export type AuthorDto = {
  id: number;
  name: string;
  slug: string;
};

export type AuthorWithBooksDto = AuthorDto & {
  books: BookDto[];
};
