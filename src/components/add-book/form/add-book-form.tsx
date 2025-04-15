'use client';

import React, { useState } from 'react';
import BookInfoForm from '@/components/add-book/form/book-info-form';
import { BookFormStep } from '@/utils/enums/book-enum';
import IsbnForm from '@/components/add-book/form/isbn-form';
import { PreloadedBookInfoDto } from '@/utils/dto/book.dto';
import styles from './add-book-form.module.css';
import { useTranslations } from 'next-intl';

export default function AddBookForm() {
  const t = useTranslations('books-add');
  const [step, setStep] = useState(BookFormStep.CHECK_ISBN);
  const [isbn, setIsbn] = useState<string>('');
  const [shouldStay, setShouldStay] = useState<boolean>(false);
  const [preloadedBookInfo, setPreloadedBookInfo] = useState<PreloadedBookInfoDto | undefined>(undefined);
  return (
    <>
      <div className={styles.shouldStayAfterAddingContainer}>
        <input
          type="checkbox"
          name={'shouldStay'}
          id={'shouldStay'}
          onChange={(e) => setShouldStay(e.target.checked)}
        />
        <label htmlFor="shouldStay">{t('should-stay')}</label>
      </div>
      {step === BookFormStep.CHECK_ISBN && (
        <IsbnForm
          onBookInfoPreloaded={(newIsbn, newPreloadedBookInfo) => {
            setIsbn(newIsbn);
            setPreloadedBookInfo(newPreloadedBookInfo);
            setStep(BookFormStep.BOOK_INFO);
          }}
        />
      )}
      {step === BookFormStep.BOOK_INFO && (
        <>
          <IsbnForm isbn={isbn} isDisabled={true} />
          <BookInfoForm
            isbn={isbn}
            preloadedBookInfo={preloadedBookInfo}
            shouldStay={shouldStay}
            onBookAdd={(newIsbn, newShouldStay) => {
              setIsbn(newIsbn);
              setStep(BookFormStep.CHECK_ISBN);
              setShouldStay(newShouldStay);
            }}
          />
        </>
      )}
    </>
  );
}
