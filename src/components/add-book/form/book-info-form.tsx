import styles from './book-info-form.module.css';
import classNames from 'classnames';
import React, { useActionState } from 'react';
import { useTranslations } from 'next-intl';
import AddBookInput from '@/components/add-book/form/book-form-input';
import { addBook, BookAddFormFields } from '@/utils/action/books-action';

type InputInfo = {
  fieldName: keyof BookAddFormFields;
  translationKey: string;
  type: string;
};

export default function BookInfoForm({ isbn }: { isbn: string }) {
  const t = useTranslations('book-info-form');

  const [formState, formAction, isPending] = useActionState(addBook, { isbn });
  const inputInfos: InputInfo[] = [];
  inputInfos.push(
    { fieldName: 'title', translationKey: 'title', type: 'text' },
    { fieldName: 'releaseDate', translationKey: 'release-date', type: 'date' },
    { fieldName: 'genres', translationKey: 'genres', type: 'text' },
    { fieldName: 'editor', translationKey: 'editor', type: 'text' },
    { fieldName: 'editionLanguage', translationKey: 'edition-language', type: 'text' },
    { fieldName: 'authorsName', translationKey: 'authors-name', type: 'text' },
  );
  return (
    <form action={formAction} className={styles.bookInfoForm}>
      {inputInfos.map((inputInfo) => {
        const errors = formState?.errors?.[inputInfo.fieldName];
        return (
          <AddBookInput
            key={`add-book-input-${inputInfo.fieldName}`}
            name={inputInfo.fieldName}
            type={inputInfo.type}
            placeholder={t(`${inputInfo.translationKey}-input-placeholder`)}
            label={true}
            labelText={t(inputInfo.translationKey)}
            errors={errors && t(errors)}
            defaultValue={formState.title}
          />
        );
      })}
      <button disabled={isPending} type="submit" className={classNames(styles.submitSaveBookButton, 'nbShadow')}>
        {t('submit-button').toUpperCase()}
      </button>
    </form>
  );
}
