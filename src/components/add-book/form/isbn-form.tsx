import { useTranslations } from 'next-intl';
import React, { useActionState } from 'react';
import classNames from 'classnames';
import { Search } from 'lucide-react';
import styles from './isbn-form.module.css';
import { BookIsbnStateForm } from '@/utils/action/book/types';
import { getPreloadedBookInfo } from '@/utils/action/book/get-preloaded-info.action';
import { PreloadedBookInfoDto } from '@/utils/dto/book.dto';

export default function IsbnForm({
  isbn,
  isDisabled = false,
  onBookInfoPreloaded = () => {},
}: {
  isbn?: string;
  isDisabled?: boolean;
  onBookInfoPreloaded?: (isbn: string, preloadedBookInfo: PreloadedBookInfoDto) => void;
}) {
  const t = useTranslations('books-add');
  const tErrors = useTranslations('book-errors');

  const handleSubmit = async (state: BookIsbnStateForm, data: FormData) => {
    const stateForm = await getPreloadedBookInfo(state, data);
    if (!stateForm.error && stateForm.preloadedBookInfo) {
      onBookInfoPreloaded(stateForm.isbn ?? '', stateForm.preloadedBookInfo);
    }
    return stateForm;
  };

  const [formState, formAction, isPending] = useActionState(handleSubmit, {});
  const disabled = isDisabled || isPending;
  return (
    <form action={formAction} className={styles.isbnForm}>
      <div className={classNames(styles.bookIsbnInput, disabled ? 'nbShadowDisabled' : 'nbShadow')}>
        <input
          className={classNames(styles.isbnInput, disabled && styles.inputDisabled)}
          disabled={disabled}
          id={'isbn-book-input-isbn'}
          name={'isbn'}
          type="text"
          placeholder={t('isbn-input-placeholder')}
          defaultValue={isbn ?? formState.isbn ?? ''}
        />
        <button
          type="submit"
          disabled={disabled}
          className={classNames(styles.submitBookIsbnButton, disabled && styles.buttonDisabled)}
        >
          {isPending ? t('submitting') : <Search className={styles.searchIcon} />}
        </button>
      </div>

      <div className={styles.isbnErrorDiv}>
        {formState.error?.preloadBookInfoError && (
          <span>{formState.error?.preloadBookInfoError.map((code) => tErrors(code)).join(', ')}</span>
        )}
      </div>
    </form>
  );
}
