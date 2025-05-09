import { ReviewDto } from '@/utils/dto/review.dto';
import styles from '@/components/book-details/book-details-page-content/book-details-right-part/review-section.module.css';

export default function ReviewCard({ review }: { review: ReviewDto }) {
  return (
    <div className={styles.reviewCard}>
      <div>User: {review.user.name}</div>
      <p>Score: {review.score}/5</p>
      <p>Commentary: {review.commentary}</p>
    </div>
  );
}
