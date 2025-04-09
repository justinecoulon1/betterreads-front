import { BookDto } from '@/utils/dto/book.dto';

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

export type CreateShelfRequestDto = {
  name: string;
};
