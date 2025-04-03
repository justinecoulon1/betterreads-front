import styles from './book-info-form.module.css';
import classNames from 'classnames';
import React, { useActionState } from 'react';
import { useTranslations } from 'next-intl';
import AddBookInput from '@/components/add-book/form/book-form-input';
import { addBook } from '@/utils/action/books-action';

export default function BookInfoForm() {
  const t = useTranslations('book-info-form');

  const [formState, formAction, isPending] = useActionState(addBook, {});

  return (
    <form action={formAction} className={styles.bookInfoForm}>
      <AddBookInput
        name={'title'}
        type={'text'}
        placeholder={t('title-input-placeholder')}
        label={true}
        labelText={t('title')}
        errors={formState?.errors?.title && formState?.errors?.title.map((code) => t(code)).join(', ')}
      />
      <AddBookInput
        name={'release-date'}
        type={'text'}
        placeholder={t('release-date-input-placeholder')}
        label={true}
        labelText={t('release-date')}
        errors={formState?.errors?.releaseDate && formState?.errors?.releaseDate.map((code) => t(code)).join(', ')}
      />
      <AddBookInput
        name={'genres'}
        type={'text'}
        placeholder={t('genres-input-placeholder')}
        label={true}
        labelText={t('genres')}
        errors={formState?.errors?.genres && formState?.errors?.genres.map((code) => t(code)).join(', ')}
      />

      <button disabled={isPending} type="submit" className={classNames(styles.submitSaveBookButton, 'nbShadow')}>
        {t('submit-button').toUpperCase()}
      </button>
    </form>
  );
}
