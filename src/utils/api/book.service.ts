import {
  BookDto,
  CreateBookRequestDto,
  PreloadedBookInfoDto,
  SmallBookDto,
  UpdateBookInShelvesRequestDto,
  UpdateBookInShelvesResponseDto,
  UpdateBookReadingStatusRequestDto,
} from '@/utils/dto/book.dto';
import { betterreadsAxios } from '@/utils/api/betterreads-axios';
import { ShelfType } from '@/utils/dto/shelf.dto';

class BookService {
  async getLastAddedBooks() {
    const response = await betterreadsAxios.get<SmallBookDto[]>(`/books/latest`);
    return response.data;
  }

  async createBook(
    title: string,
    releaseDate: Date,
    genres: string[],
    isbn: string,
    editor: string,
    editionLanguage: string,
    authorNames: string[],
    description?: string,
  ) {
    const body: CreateBookRequestDto = {
      title,
      releaseDate,
      genres,
      isbn,
      editor,
      editionLanguage,
      authorNames,
      description,
    };

    const response = await betterreadsAxios.post<BookDto>(`/books`, body);
    return response.data;
  }

  async getPreloadedBookInfo(isbn: string): Promise<PreloadedBookInfoDto> {
    const response = await betterreadsAxios.get<PreloadedBookInfoDto>(`/books/preload/${isbn}`);
    return response.data;
  }

  async getBookByIsbn(isbn: string): Promise<BookDto> {
    const response = await betterreadsAxios.get<BookDto>(`/books/isbn/${isbn}`);
    return response.data;
  }

  async getBookReadingStatus(bookId: number) {
    const response = await betterreadsAxios.get<ShelfType | undefined>(`/books/status/${bookId}`);
    return response.data;
  }

  async updateBookReadingStatus(bookId: number, shelfType: ShelfType | undefined) {
    const body: UpdateBookReadingStatusRequestDto = {
      bookId,
      statusType: shelfType,
    };
    const response = await betterreadsAxios.post<ShelfType | undefined>(`/books/update-reading-status`, body);
    return response.data;
  }

  async updateBookInShelves(bookId: number, shelvesToAddIds: number[], shelvesToDeleteIds: number[]) {
    const body: UpdateBookInShelvesRequestDto = {
      bookId,
      shelvesToAddIds,
      shelvesToDeleteIds,
    };
    const response = await betterreadsAxios.post<UpdateBookInShelvesResponseDto>(`/books/update-shelves`, body);
    return response.data;
  }
}

export default new BookService();
