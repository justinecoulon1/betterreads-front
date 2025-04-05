import { BookDto, BookListDto, CreateBookRequestDto } from '@/utils/dto/book.dto';
import { betterreadsAxios } from '@/utils/api/betterreads-axios';

class BookService {
  async getLastAddedBooks() {
    const response = await betterreadsAxios.get<BookListDto[]>(`/books/latest`);
    return response.data;
  }

  async checkIsbn(isbn: string) {
    const response = await betterreadsAxios.get<boolean>(`/books/isbn/${isbn}`);
    return response.data;
  }

  async createBook(
    title: string,
    releaseDate: Date,
    genres: string[],
    isbn: string,
    editor: string,
    editionLanguage: string,
    authorsName: string[],
  ) {
    const body: CreateBookRequestDto = {
      title,
      releaseDate,
      genres,
      isbn,
      editor,
      editionLanguage,
      authorsName,
    };

    const response = await betterreadsAxios.post<BookDto>(`/books`, body);
    return response.data;
  }
}

export default new BookService();
