import { betterreadsAxios } from '@/utils/api/betterreads-axios';
import { CreateReviewRequestDto, ReviewDto } from '@/utils/dto/review.dto';

class ReviewService {
  async createReview(score: number, commentary: string, bookId: number) {
    const body: CreateReviewRequestDto = {
      score,
      commentary,
      bookId,
    };
    const response = await betterreadsAxios.post<ReviewDto>(`/reviews`, body);
    return response.data;
  }
}

export default new ReviewService();
