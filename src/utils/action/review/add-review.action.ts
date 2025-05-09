'use server';

import { ReviewAddStateForm } from '@/utils/action/review/types';
import { getServerErrorCode } from '@/utils/errors/error-utils';
import ReviewService from '@/utils/api/review.service';

export async function addReview(state: ReviewAddStateForm, data: FormData): Promise<ReviewAddStateForm> {
  const bookId = state.bookId;
  if (!bookId) {
    throw new Error('Book not found');
  }

  const reviewScore = data.get('score') as string;
  const reviewCommentary = data.get('commentary') as string;

  if (!reviewScore) {
    return { score: reviewScore, commentary: reviewCommentary, bookId, errors: { score: 'no-score' } };
  }
  if (reviewCommentary.length > 5000) {
    return { score: reviewScore, commentary: reviewCommentary, bookId, errors: { commentary: 'commentary-too-long' } };
  }

  let newReview;
  try {
    newReview = await ReviewService.createReview(parseFloat(reviewScore), reviewCommentary, bookId);
  } catch (err) {
    console.error(err);
    const errorCode = getServerErrorCode(err);
    return {
      score: reviewScore,
      commentary: reviewCommentary,
      bookId,
      errors: { serverError: errorCode },
    };
  }

  return { bookId };
}
