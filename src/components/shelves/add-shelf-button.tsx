import { useTranslations } from 'next-intl';
import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import styles from '@/components/shelves/shelves-page-container.module.css';
import { Check, X } from 'lucide-react';

export default function AddShelfButton({ onShelfCreation }: { onShelfCreation: (shelfName: string) => void }) {
  const t = useTranslations('my-shelves');
  const [isCreatingShelf, setIsCreatingShelf] = useState(false);
  const [shelfName, setShelfName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const validateShelfCreation = () => {
    if (isCreatingShelf && shelfName) {
      onShelfCreation(shelfName);
      setIsCreatingShelf(false);
      setShelfName('');
    }
  };

  const cancelShelfCreation = () => {
    setIsCreatingShelf(false);
    setShelfName('');
  };

  useEffect(() => {
    if (isCreatingShelf) {
      inputRef.current?.focus();
    }
  }, [isCreatingShelf]);

  return (
    <div className={classNames('nbShadow', styles.addShelfButtonGlobalContainer)}>
      <div
        className={styles.animatedContainer}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            validateShelfCreation();
          } else if (e.key === 'Escape') {
            cancelShelfCreation();
          }
        }}
      >
        <input
          className={classNames(styles.shelfCreationInput, isCreatingShelf && styles.visible)}
          placeholder={t('create-shelf-name-input-placeholder')}
          disabled={!isCreatingShelf}
          type={'text'}
          name={'shelf-name'}
          value={shelfName}
          onChange={(e) => setShelfName(e.target.value)}
          ref={inputRef}
        />
      </div>
      <div className={styles.animatedContainer}>
        {isCreatingShelf ? (
          <>
            <button
              className={styles.validateShelfCreationButton}
              disabled={!isCreatingShelf}
              onClick={validateShelfCreation}
            >
              <Check className={styles.validateShelfCreationImage} />
            </button>
            <button
              className={styles.validateShelfCreationButton}
              disabled={!isCreatingShelf}
              onClick={cancelShelfCreation}
            >
              <X className={styles.validateShelfCreationImage} />
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              if (!isCreatingShelf) {
                setIsCreatingShelf(true);
              }
            }}
            className={classNames(styles.addShelfButton, !isCreatingShelf && styles.visible)}
            disabled={isCreatingShelf}
          >
            {t('add-shelf').toUpperCase()}
          </button>
        )}
      </div>
    </div>
  );
}
