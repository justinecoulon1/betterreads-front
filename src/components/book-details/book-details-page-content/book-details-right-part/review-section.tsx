import { CompleteBookDto } from '@/utils/dto/book.dto';
import styles from './review-section.module.css';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { ReviewDto } from '@/utils/dto/review.dto';
import EmptyReviewCard from '@/components/book-details/book-details-page-content/book-details-right-part/review-cards/empty-review-card';
import ReviewCard from '@/components/book-details/book-details-page-content/book-details-right-part/review-cards/review-card';

export default function ReviewSection({ book }: { book: CompleteBookDto }) {
  const t = useTranslations('reviews');
  const [reviews, setReviews] = useState<ReviewDto[] | undefined>(book.reviews);

  return (
    <div className={styles.reviewSectionContainer}>
      <div className={styles.reviewSectionHeader}>
        <h2>{t('review-section-header').toUpperCase()}</h2>
        <div>Score: {book.averageScore}</div>
      </div>
      <div className={styles.reviewCardsContainer}>
        <EmptyReviewCard book={book} />
        {reviews && reviews.map((review) => <ReviewCard key={`review-card-${review.id}`} review={review} />)}
      </div>
    </div>
  );
}
