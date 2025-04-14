import { betterreadsAxios } from '@/utils/api/betterreads-axios';
import { SearchResultDto } from '@/utils/dto/search.dto';

class SearchService {
  async getPaginatedSearchData(text: string, limit: number, offset: number) {
    const response = await betterreadsAxios.get<SearchResultDto>(`/search`, { params: { text, limit, offset } });
    return response.data;
  }
}

export default new SearchService();
