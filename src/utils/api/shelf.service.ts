import { betterreadsAxios } from '@/utils/api/betterreads-axios';
import { CreateShelfRequestDto, ShelfDto, ShelfWithLastBookDto, SmallShelfDto } from '@/utils/dto/smallShelfDto';

class ShelfService {
  async getByUserId(userId: number) {
    const response = await betterreadsAxios.get<ShelfWithLastBookDto[]>(`/shelves/${userId}`);
    return response.data;
  }

  async getLastByUserId(userId: number) {
    const response = await betterreadsAxios.get<ShelfWithLastBookDto[]>(`/shelves/latest/${userId}`);
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

    const response = await betterreadsAxios.post<ShelfWithLastBookDto[]>(`/shelves/${userId}`, body);
    return response.data;
  }

  async getUserReadingStatusShelves(userId: number) {
    const response = await betterreadsAxios.get<SmallShelfDto[]>(`/shelves/status-shelves/${userId}`);
    return response.data;
  }
}

export default new ShelfService();
