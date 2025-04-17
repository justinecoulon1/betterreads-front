import React, { useActionState, useEffect, useState } from 'react';
import { ShelfType, SmallShelfDto } from '@/utils/dto/shelf.dto';
import styles from './shelf-lightbox-content.module.css';
import { Save } from 'lucide-react';
import classNames from 'classnames';
import { addBookToShelves } from '@/utils/action/book/add-book-to-shelves.action';
import { AddBookToShelvesStateForm } from '@/utils/action/book/types';
import ShelfService from '@/utils/api/shelf.service';
import ShelfLightboxHeader from '@/components/book-details/add-to-shelf-lightbox/shelf-lightbox-components/shelf-lightbox-header';
import ShelfLightboxShelfNameInput from '@/components/book-details/add-to-shelf-lightbox/shelf-lightbox-components/shelf-lightbox-shelf-name-input';

export default function ShelfLightboxContent({ closeLightbox, bookId }: { closeLightbox: () => void; bookId: number }) {
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

  const [, formAction, isPending] = useActionState(handleSubmit, { bookId });
  return (
    <div className={styles.lightboxContainer} onMouseDown={(e) => e.stopPropagation()}>
      <ShelfLightboxHeader closeLightbox={closeLightbox} />
      <form action={formAction} className={styles.addToShelfLbFormContainer}>
        <div className={styles.formInnerContainer}>
          {allShelves && shelvesContainingBook ? (
            allShelves.map((shelf) => {
              if (shelf.type === ShelfType.USER) {
                return (
                  <ShelfLightboxShelfNameInput
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

function AddToShelfLightboxSaveButton({ isPending }: { isPending: boolean }) {
  return (
    <button type={'submit'} className={classNames(styles.addToShelfLbSaveButton, 'nbShadow')} disabled={isPending}>
      {isPending ? <p>Loading...</p> : <Save className={styles.addToShelfLbSaveButtonImage} />}
    </button>
  );
}
