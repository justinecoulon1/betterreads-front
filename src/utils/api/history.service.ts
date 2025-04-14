import { betterreadsAxios } from '@/utils/api/betterreads-axios';
import { PaginatedHistoryDto } from '@/utils/dto/history.dto';

class HistoryService {
  async getUserReadingHistory(limit: number, offset: number) {
    const response = await betterreadsAxios.get<PaginatedHistoryDto>(`/history`, { params: { limit, offset } });
    return response.data;
  }
}

export default new HistoryService();
