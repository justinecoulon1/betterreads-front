import { BookDto, BookListDto } from '@/utils/dto/book.dto';

export enum ShelfType {
  'READ' = 'READ',
  'TO_READ' = 'TO_READ',
  'READING' = 'READING',
  'USER' = 'USER',
}

export type SmallShelfDto = {
  id: number;
  name: string;
  createdAt: Date;
  type: ShelfType;
};

export type ShelfDto = SmallShelfDto & {
  books: BookDto[];
};

export type ShelfWithLastBookDto = SmallShelfDto & {
  books: BookListDto[];
};

export type CreateShelfRequestDto = {
  name: string;
};
