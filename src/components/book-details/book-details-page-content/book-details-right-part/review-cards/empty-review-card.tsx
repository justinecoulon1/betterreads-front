import { CompleteBookDto } from '@/utils/dto/book.dto';
import { useTranslations } from 'next-intl';
import styles from '@/components/book-details/book-details-page-content/book-details-right-part/review-section.module.css';
import classNames from 'classnames';
import { useActionState } from 'react';
import { addReview } from '@/utils/action/review/add-review.action';

const scoreSelectOptions = ['0.5', '1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5'];

export default function EmptyReviewCard({ book }: { book: CompleteBookDto }) {
  const t = useTranslations('reviews');

  const [formState, formAction, isPending] = useActionState(addReview, { bookId: book.id });

  return (
    <form action={formAction}>
      <div className={styles.emptyReviewSectionContainer}>
        <div className={styles.scoreSelectContainerDiv}>
          <label htmlFor="score-select">Score:</label>
          <select className={styles.select} name="score" id="score-select" defaultValue={formState.score}>
            <option value="">{t('select-default-value')}</option>
            {scoreSelectOptions.map((option) => {
              return (
                <option key={`select-option-score-${option}`} value={option}>
                  {option}
                </option>
              );
            })}
          </select>
        </div>
        <div className={styles.errorDiv}>
          {formState.errors && formState.errors.score && <span>{t(formState.errors.score)}</span>}
        </div>

        <label htmlFor="commentary-textarea"></label>
        <textarea
          defaultValue={formState.commentary}
          className={styles.textarea}
          id={'commentary-textarea'}
          name={'commentary'}
          placeholder={t('commentary-textarea-placeholder')}
        />
        <div className={styles.errorDiv}>
          {formState.errors && formState.errors.commentary && <span>{t(formState.errors.commentary)}</span>}
        </div>

        <div>
          <button className={classNames('nbShadow', styles.addReviewButton)} type="submit">
            {isPending ? '...' : t('add-review')}
          </button>
        </div>
      </div>
    </form>
  );
}
