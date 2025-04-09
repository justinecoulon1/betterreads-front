import { betterreadsAxios } from '@/utils/api/betterreads-axios';
import { CreateShelfRequestDto, ShelfDto, SmallShelfDto } from '@/utils/dto/smallShelfDto';

class ShelfService {
  async getByUserId(userId: number) {
    const response = await betterreadsAxios.get<SmallShelfDto[]>(`/shelves/${userId}`);
    return response.data;
  }

  async getLastByUserId(userId: number) {
    const response = await betterreadsAxios.get<SmallShelfDto[]>(`/shelves/latest/${userId}`);
    return response.data;
  }

  async getShelfById(shelfId: number, userId: number) {
    const response = await betterreadsAxios.get<ShelfDto>(`/shelves/${userId}/${shelfId}`);
    return response.data;
  }

  async createShelf(userId: number, name: string) {
    const body: CreateShelfRequestDto = {
      name,
    };

    const response = await betterreadsAxios.post<SmallShelfDto[]>(`/shelves/${userId}`, body);
    return response.data;
  }
}

export default new ShelfService();
