import { BookListDto } from '@/utils/dto/book.dto';
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
}

export default new BookService();
