import { ShelfDto } from '@/utils/dto/shelf.dto';

export type ShelfByUser = {
  shelves?: ShelfDto[];
  error?: string;
};
