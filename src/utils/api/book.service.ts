import { BookListDto } from '@/utils/dto/book.dto';
import { betterreadsAxios } from '@/utils/api/betterreads-axios';

class BookService {
  async getLastAddedBooks() {
    const response = await betterreadsAxios.get<BookListDto[]>(`/books/latest`);
    return response.data;
  }
}

export default new BookService();
