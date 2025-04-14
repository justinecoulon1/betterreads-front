import { BookDto } from '@/utils/dto/book.dto';

export enum HistoryStatus {
  'READ' = 'READ',
  'TO_READ' = 'TO_READ',
  'READING' = 'READING',
}

export type HistoryDto = {
  id: number;
  createdAt: Date;
  oldStatus: HistoryStatus;
  newStatus: HistoryStatus;
  book: BookDto;
};

export type PaginatedHistoryDto = {
  histories: HistoryDto[];
  totalCount: number;
};
