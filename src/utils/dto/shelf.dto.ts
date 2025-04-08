export enum ShelfType {
  'READ' = 'READ',
  'TO_READ' = 'TO_READ',
  'READING' = 'READING',
  'USER' = 'USER',
}

export type ShelfDto = {
  id: number;
  name: string;
  createdAt: Date;
  type: ShelfType;
};

export type CreateShelfRequestDto = {
  name: string;
};
