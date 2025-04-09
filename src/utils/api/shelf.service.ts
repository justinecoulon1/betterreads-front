import { betterreadsAxios } from '@/utils/api/betterreads-axios';
import { ShelfDto } from '@/utils/dto/shelf.dto';

class ShelfService {
  async getByUserId(userId: number) {
    const response = await betterreadsAxios.get<ShelfDto[]>(`/shelves/${userId}`);
    return response.data;
  }

  async getShelfById(shelfId: number, userId: number) {
    const response = await betterreadsAxios.get<ShelfDto>(`/shelves/${userId}/${shelfId}`);
    return response.data;
  }
}

export default new ShelfService();
