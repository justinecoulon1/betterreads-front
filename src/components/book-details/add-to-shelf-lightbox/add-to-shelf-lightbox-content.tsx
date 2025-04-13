import React, { useActionState, useEffect, useState } from 'react';
import { ShelfType, SmallShelfDto } from '@/utils/dto/shelf.dto';
import styles from './add-to-shelf-lightbox-content.module.css';
import { Save, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import classNames from 'classnames';
import { addBookToShelves } from '@/utils/action/book/add-book-to-shelves.action';
import { AddBookToShelvesStateForm } from '@/utils/action/book/types';
import ShelfService from '@/utils/api/shelf.service';

export default function AddToShelfLightboxContent({
  closeLightbox,
  bookId,
}: {
  closeLightbox: () => void;
  bookId: number;
}) {
  const [allShelves, setAllShelves] = useState<SmallShelfDto[] | null>(null);
  const [shelvesContainingBook, setShelvesContainingBook] = useState<SmallShelfDto[] | null>(null);

  useEffect(() => {
    const fetchShelves = async () => {
      const [fetchedAllShelves, fetchedShelvesContainingBook] = await Promise.all([
        await ShelfService.getUserShelves(),
        await ShelfService.getUserShelvesContainingBook(bookId),
      ]);
      setAllShelves(fetchedAllShelves);
      setShelvesContainingBook(fetchedShelvesContainingBook);
    };
    void fetchShelves();
  }, [bookId]);

  const handleSubmit = async (state: AddBookToShelvesStateForm, data: FormData): Promise<AddBookToShelvesStateForm> => {
    const result = await addBookToShelves(state, data, shelvesContainingBook ?? []);
    if (result.error) {
      return { error: result.error, bookId: result.bookId };
    }
    closeLightbox();
    return { bookId: result.bookId };
  };

  const [formState, formAction, isPending] = useActionState(handleSubmit, { bookId });
  return (
    <div className={styles.lightboxContainer} onMouseDown={(e) => e.stopPropagation()}>
      <AddToShelfLightboxHeader closeLightbox={closeLightbox} />
      <form action={formAction} className={styles.addToShelfLbFormContainer}>
        <div className={styles.formInnerContainer}>
          {allShelves && shelvesContainingBook ? (
            allShelves.map((shelf) => {
              if (shelf.type === ShelfType.USER) {
                return (
                  <AddToShelfLightboxShelfNameInput
                    checked={!!shelvesContainingBook.find((s) => s.id === shelf.id)}
                    key={`shelf-checkbox-${shelf.name}`}
                    shelf={shelf}
                  />
                );
              }
            })
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className={styles.saveButtonContainer}>
          <AddToShelfLightboxSaveButton isPending={isPending || !allShelves || !shelvesContainingBook} />
        </div>
      </form>
    </div>
  );
}

function AddToShelfLightboxHeader({ closeLightbox }: { closeLightbox: () => void }) {
  const t = useTranslations('add-to-shelf-lightbox');
  return (
    <div className={styles.addToShelfLightboxHeader}>
      <div className={styles.addToShelfLbTitleContainer}>
        <h2>{t('add-to-shelf-lightbox-title')}</h2>
      </div>
      <div className={styles.addToShelfLbCloseButtonContainer}>
        <button onClick={closeLightbox} className={classNames(styles.addToShelfLbCloseButton, 'nbShadow')}>
          <X className={styles.addToShelfLbCloseButtonImage} />
        </button>
      </div>
    </div>
  );
}

function AddToShelfLightboxShelfNameInput({ shelf, checked }: { shelf: SmallShelfDto; checked?: boolean }) {
  return (
    <div className={styles.addToShelfLbShelveNameContainer}>
      <input
        id={shelf.id.toString()}
        className={styles.addToShelfLbShelveNameCheckbox}
        type="checkbox"
        defaultChecked={checked}
        name={shelf.id.toString()}
      />
      <label className={styles.addToShelfLbShelveName} htmlFor={shelf.id.toString()}>
        {shelf.name}
      </label>
    </div>
  );
}

function AddToShelfLightboxSaveButton({ isPending }: { isPending: boolean }) {
  return (
    <button type={'submit'} className={classNames(styles.addToShelfLbSaveButton, 'nbShadow')} disabled={isPending}>
      {isPending ? <p>Loading...</p> : <Save className={styles.addToShelfLbSaveButtonImage} />}
    </button>
  );
}
