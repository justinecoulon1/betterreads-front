import { BookDto, BookListDto, CreateBookRequestDto, PreloadedBookInfoDto } from '@/utils/dto/book.dto';
import { betterreadsAxios } from '@/utils/api/betterreads-axios';

class BookService {
  async getLastAddedBooks() {
    const response = await betterreadsAxios.get<BookListDto[]>(`/books/latest`);
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
}

export default new BookService();
