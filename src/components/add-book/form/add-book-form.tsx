'use client';

import React, { useActionState, useId } from 'react';
import styles from './add-book-form.module.css';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import { Search } from 'lucide-react';
import BookInfoForm from '@/components/add-book/form/book-info-form';
import { BookFormStep } from '@/utils/enums/book-enum';
import { checkBookIsbn } from '@/utils/action/books-action';

export default function AddBookForm() {
  const inputId = useId();
  const t = useTranslations('books-add');

  const [formState, formAction, isPending] = useActionState(checkBookIsbn, {
    step: BookFormStep.CHECK_ISBN,
  });
  return (
    <>
      <form action={formAction} className={styles.isbnForm}>
        <div className={classNames(styles.bookIsbnInput, 'nbShadow')}>
          <input
            className={classNames(styles.isbnInput, !!formState.isbn && styles.inputDisabled)}
            disabled={!!formState.isbn}
            id={inputId + '-isbn'}
            name={'isbn'}
            type="text"
            placeholder={t('isbn-input-placeholder')}
            defaultValue={formState.isbn ?? ''}
          />
          <button
            type="submit"
            disabled={isPending || !!formState.isbn}
            className={classNames(styles.submitBookIsbnButton, !!formState.isbn && styles.buttonDisabled)}
          >
            {isPending ? t('submitting') : <Search />}
          </button>
        </div>

        <div className={styles.isbnErrorDiv}>
          {formState.error?.isbn && <span>{formState.error?.isbn.map((code) => t(code)).join(', ')}</span>}
        </div>
      </form>
      {/*{formState.step === BookFormStep.BOOK_INFO && <BookInfoForm  />}*/}
      {!!formState.isbn && <BookInfoForm isbn={formState.isbn} />}
    </>
  );
}
