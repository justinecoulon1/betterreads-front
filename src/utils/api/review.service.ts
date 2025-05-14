import { betterreadsAxios } from '@/utils/api/betterreads-axios';
import {
  BookReviewInfoDto,
  CreateReviewRequestDto,
  PaginatedReviewDto,
  ReviewDto,
  UserReviewDto,
} from '@/utils/dto/review.dto';

class ReviewService {
  async getBookReviewInfo(bookId: number): Promise<BookReviewInfoDto> {
    const response = await betterreadsAxios.get<BookReviewInfoDto>(`/reviews/${bookId}`);
    return response.data;
  }

  async getLastByUserId(): Promise<UserReviewDto[]> {
    const response = await betterreadsAxios.get<UserReviewDto[]>(`/reviews/last`);
    return response.data;
  }

  async createReview(score: number, commentary: string, bookId: number): Promise<ReviewDto> {
    const body: CreateReviewRequestDto = {
      score,
      commentary,
      bookId,
    };
    const response = await betterreadsAxios.post<ReviewDto>(`/reviews`, body);
    return response.data;
  }

  async getUserReviews(limit: number, offset: number) {
    const response = await betterreadsAxios.get<PaginatedReviewDto>(`/reviews`, { params: { limit, offset } });
    return response.data;
  }
}

export default new ReviewService();
