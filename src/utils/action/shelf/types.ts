import { SmallShelfDto } from '@/utils/dto/shelf.dto';

export type ShelfByUser = {
  shelves?: SmallShelfDto[];
  error?: string;
};
