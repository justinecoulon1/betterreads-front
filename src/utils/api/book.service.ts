import { BookListDto, CreateBookRequestDto } from '@/utils/dto/book.dto';
import { betterreadsAxios } from '@/utils/api/betterreads-axios';
import { UserDto } from '@/utils/dto/user.dto';

class BookService {
  async getLastAddedBooks() {
    const response = await betterreadsAxios.get<BookListDto[]>(`/books/latest`);
    return response.data;
  }

  async checkIsbn(isbn: string) {
    const response = await betterreadsAxios.get<boolean>(`/books/isbn/${isbn}`);
    return response.data;
  }

  async createBook(title: string, releaseDate: Date, genres: string[], isbn: string) {
    const body: CreateBookRequestDto = {
      title,
      releaseDate,
      genres,
      isbn,
    };

    const response = await betterreadsAxios.post<UserDto>(`/users`, body);
    return response.data;
  }
}

export default new BookService();
