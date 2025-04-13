import { betterreadsAxios } from '@/utils/api/betterreads-axios';
import { CreateShelfRequestDto, ShelfDto, ShelfWithLastBookDto, SmallShelfDto } from '@/utils/dto/shelf.dto';

class ShelfService {
  async getByUserId() {
    const response = await betterreadsAxios.get<ShelfWithLastBookDto[]>(`/shelves`);
    return response.data;
  }

  async getLastByUserId() {
    const response = await betterreadsAxios.get<ShelfWithLastBookDto[]>(`/shelves/latest`);
    return response.data;
  }

  async getShelfById(shelfId: number) {
    const response = await betterreadsAxios.get<ShelfDto>(`/shelves/${shelfId}`);
    return response.data;
  }

  async createShelf(name: string) {
    const body: CreateShelfRequestDto = {
      name,
    };

    const response = await betterreadsAxios.post<ShelfWithLastBookDto[]>(`/shelves`, body);
    return response.data;
  }

  async getUserReadingStatusShelves() {
    const response = await betterreadsAxios.get<ShelfWithLastBookDto[]>(`/shelves/status-shelves`);
    return response.data;
  }

  async deleteShelf(shelfId: number) {
    const response = await betterreadsAxios.delete<SmallShelfDto>(`/shelves/${shelfId}`);
    return response.data;
  }

  async getUserShelves() {
    const response = await betterreadsAxios.get<SmallShelfDto[]>(`/shelves`);
    return response.data;
  }

  async getUserShelvesContainingBook(bookId: number) {
    const response = await betterreadsAxios.get<SmallShelfDto[]>(`/shelves/containing-book/${bookId}`);
    return response.data;
  }
}

export default new ShelfService();
