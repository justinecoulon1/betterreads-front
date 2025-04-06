'use client';

import React, { useState } from 'react';
import BookInfoForm from '@/components/add-book/form/book-info-form';
import { BookFormStep } from '@/utils/enums/book-enum';
import IsbnForm from '@/components/add-book/form/isbn-form';
import { PreloadedBookInfoDto } from '@/utils/dto/book.dto';

export default function AddBookForm() {
  const [step, setStep] = useState(BookFormStep.CHECK_ISBN);
  const [isbn, setIsbn] = useState<string>('');
  const [preloadedBookInfo, setPreloadedBookInfo] = useState<PreloadedBookInfoDto | undefined>(undefined);
  return (
    <>
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
          <BookInfoForm isbn={isbn} preloadedBookInfo={preloadedBookInfo} />
        </>
      )}
    </>
  );
}
