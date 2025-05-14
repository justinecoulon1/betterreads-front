import SeeMoreLink from '@/components/generic/see-more-button/see-more-link';
import styles from './review-container.module.css';
import { useTranslations } from 'next-intl';
import { UserReviewDto } from '@/utils/dto/review.dto';

export default function ReviewContainer({
  containerTitle,
  seeMoreButton,
  seeMoreLink,
  reviews,
}: {
  containerTitle: string;
  seeMoreButton: boolean;
  seeMoreLink?: string;
  reviews: UserReviewDto[] | undefined;
}) {
  const t = useTranslations('review-containers');
  return (
    <div className={styles.reviewContainer}>
      <div className={styles.reviewHeaderContainer}>
        <h2>{t(containerTitle)}</h2>
        {seeMoreButton && seeMoreLink && <SeeMoreLink path={seeMoreLink} />}
      </div>
      <div className={styles.reviewListContainer}>
        {reviews ? (
          <>
            {reviews.map((review) => (
              <LongReviewCard key={`long-review-card-${review.id}`} review={review} />
            ))}
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

function LongReviewCard({ review }: { review: UserReviewDto }) {
  return (
    <div className={styles.reviewHistoryCard}>
      {review.book.title} - Score: {review.score}
    </div>
  );
}
