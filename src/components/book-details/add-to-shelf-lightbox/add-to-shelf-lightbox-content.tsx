import React, { useActionState } from 'react';
import { ShelfType, SmallShelfDto } from '@/utils/dto/smallShelfDto';
import styles from './add-to-shelf-lightbox-content.module.css';
import { Save, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import classNames from 'classnames';
import { addBookToShelves } from '@/utils/action/book/add-book-to-shelves.action';
import { AddBookToShelvesStateForm } from '@/utils/action/book/types';

export default function AddToShelfLightboxContent({
  shelves,
  closeLightbox,
  isbn,
}: {
  shelves: SmallShelfDto[];
  closeLightbox: () => void;
  isbn: string;
}) {
  const handleSubmit = async (state: AddBookToShelvesStateForm, data: FormData): Promise<AddBookToShelvesStateForm> => {
    const result = await addBookToShelves(state, data);
    if (result.error) {
      return { error: result.error };
    }
    closeLightbox();
    return {};
  };

  const [formState, formAction, isPending] = useActionState(handleSubmit, { isbn });
  return (
    <div className={styles.lightboxContainer} onMouseDown={(e) => e.stopPropagation()}>
      <AddToShelfLightboxHeader closeLightbox={closeLightbox} />
      <form action={formAction} className={styles.addToShelfLbShelvesContainer}>
        {shelves.map((shelf) => {
          if (shelf.type === ShelfType.USER) {
            return <AddToShelfLightboxShelfNameInput key={`shelf-checkbox-${shelf.name}`} shelf={shelf} />;
          }
        })}

        <AddToShelfLightboxSaveButton />
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

function AddToShelfLightboxShelfNameInput({ shelf }: { shelf: SmallShelfDto }) {
  return (
    <div className={styles.addToShelfLbShelveNameContainer}>
      <label className={styles.addToShelfLbShelveName} htmlFor={shelf.id.toString()}>
        <p className={styles.shelfName}>{shelf.name}</p>
      </label>
      <input className={styles.addToShelfLbShelveNameCheckbox} type="checkbox" name={shelf.id.toString()} />
    </div>
  );
}

function AddToShelfLightboxSaveButton() {
  return (
    <button type={'submit'} className={classNames(styles.addToShelfLbSaveButton, 'nbShadow')}>
      <Save className={styles.addToShelfLbSaveButtonImage} />
    </button>
  );
}
