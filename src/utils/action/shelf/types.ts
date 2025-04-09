import { SmallShelfDto } from '@/utils/dto/smallShelfDto';

export type ShelfByUser = {
  shelves?: SmallShelfDto[];
  error?: string;
};
