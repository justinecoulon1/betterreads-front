import { betterreadsAxios } from '@/utils/api/betterreads-axios';
import { AuthorWithBooksDto } from '@/utils/dto/author.dto';

class AuthorService {
  async getAuthorBySlug(slug: string) {
    const response = await betterreadsAxios.get<AuthorWithBooksDto>(`/authors/slug/${slug}`);
    return response.data;
  }
}

export default new AuthorService();
