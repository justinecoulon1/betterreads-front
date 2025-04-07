import styles from './book-info-form.module.css';
import classNames from 'classnames';
import React, { useActionState } from 'react';
import { useTranslations } from 'next-intl';
import InputField from '@/components/global/inputs/input-field';
import { addBook } from '@/utils/action/book/add-book.action';
import { BookAddFormFields } from '@/utils/action/book/types';
import { PreloadedBookInfoDto } from '@/utils/dto/book.dto';
import TextArea from '@/components/global/inputs/text-area';
import CoverImage from '@/components/global/books/cover-image/cover-image';

type AddBookInputInfo = {
  fieldName: keyof BookAddFormFields;
  translationKey: string;
  type: string;
  prefilledValue?: string;
};

export default function BookInfoForm({
  isbn,
  preloadedBookInfo,
}: {
  isbn: string;
  preloadedBookInfo?: PreloadedBookInfoDto;
}) {
  const t = useTranslations('book-info-form');
  const tError = useTranslations('book-errors');

  const [formState, formAction, isPending] = useActionState(addBook, { isbn });
  const inputInfos: AddBookInputInfo[] = [
    { fieldName: 'title', translationKey: 'title', type: 'text', prefilledValue: preloadedBookInfo?.title },
    {
      fieldName: 'releaseDate',
      translationKey: 'release-date',
      type: 'date',
      prefilledValue: preloadedBookInfo?.releaseDate,
    },
    { fieldName: 'genres', translationKey: 'genres', type: 'text' },
    { fieldName: 'editor', translationKey: 'editor', type: 'text', prefilledValue: preloadedBookInfo?.editor },
    {
      fieldName: 'editionLanguage',
      translationKey: 'edition-language',
      type: 'text',
    },
    {
      fieldName: 'authorsName',
      translationKey: 'authors-name',
      type: 'text',
      prefilledValue: preloadedBookInfo?.authorNames?.join(', '),
    },
  ];

  return (
    <form action={formAction} className={styles.bookInfoForm}>
      <div className={styles.leftPart}>
        <div className={styles.coverImageInputContainer}>
          <label>{t('cover-image')}</label>
          <div className={classNames(styles.coverImageContainer, 'nbShadowDisabled')}>
            <CoverImage isbn={preloadedBookInfo?.isbn13 ?? isbn} className={styles.coverImage} />
          </div>
        </div>
        <TextArea
          containerClassName={styles.descriptionContainer}
          inputClassName={styles.description}
          label={true}
          labelText={t('description')}
          name={'description'}
          placeholder={t('description-input-placeholder')}
          defaultValue={preloadedBookInfo?.description}
          errors={formState?.errors?.description && t(formState.errors.description)}
        />
      </div>
      <div className={styles.rightPart}>
        {inputInfos.map((inputInfo) => {
          const errors = formState?.errors?.[inputInfo.fieldName];
          return (
            <InputField
              key={`add-book-input-${inputInfo.fieldName}`}
              name={inputInfo.fieldName}
              type={inputInfo.type}
              placeholder={t(`${inputInfo.translationKey}-input-placeholder`)}
              label={true}
              labelText={t(inputInfo.translationKey)}
              errors={errors && t(errors)}
              defaultValue={formState[inputInfo.fieldName] ?? inputInfo.prefilledValue}
            />
          );
        })}
        <button disabled={isPending} type="submit" className={classNames(styles.submitSaveBookButton, 'nbShadow')}>
          {t('submit-button').toUpperCase()}
        </button>
        <div className={styles.bookInfoErrorDiv}>
          {formState.errors?.createBookError && <span>{tError(formState.errors.createBookError)}</span>}
        </div>
      </div>
    </form>
  );
}
