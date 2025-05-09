import { BookDto } from '@/utils/dto/book.dto';
import styles from './review-section.module.css';
import { useTranslations } from 'next-intl';
import EmptyReviewCard from '@/components/book-details/book-details-page-content/book-details-right-part/review-cards/empty-review-card';
import ReviewCard from '@/components/book-details/book-details-page-content/book-details-right-part/review-cards/review-card';
import { useQuery } from '@tanstack/react-query';
import ReviewService from '@/utils/api/review.service';

export default function ReviewSection({ book }: { book: BookDto }) {
  const t = useTranslations('reviews');
  const { data, refetch } = useQuery({
    queryKey: [`get-book-review-info`, book.id],
    queryFn: () => ReviewService.getBookReviewInfo(book.id),
  });

  return (
    <div className={styles.reviewSectionContainer}>
      <div className={styles.reviewSectionHeader}>
        <h2>{t('review-section-header').toUpperCase()}</h2>
        <div>Score: {data?.averageScore}</div>
      </div>
      <div className={styles.reviewCardsContainer}>
        <EmptyReviewCard book={book} onReviewCreated={refetch} />
        {data && data.lastAddedReviews.map((review) => <ReviewCard key={`review-card-${review.id}`} review={review} />)}
      </div>
    </div>
  );
}
