import { useTranslations } from 'next-intl';
import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './double-button-input.module.css';
import { Check, X } from 'lucide-react';

export default function DoubleButtonInput({
  onValidating,
  buttonText,
}: {
  onValidating: (inputValue: string) => void;
  buttonText: string;
}) {
  const t = useTranslations('my-shelves');
  const [isInputDisplayed, setIsInputDisplayed] = useState(false);
  const [inputContent, setInputContent] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const validate = () => {
    if (isInputDisplayed && inputContent) {
      onValidating(inputContent);
      setIsInputDisplayed(false);
      setInputContent('');
    }
  };

  const cancel = () => {
    setIsInputDisplayed(false);
    setInputContent('');
  };

  useEffect(() => {
    if (isInputDisplayed) {
      inputRef.current?.focus();
    }
  }, [isInputDisplayed]);

  return (
    <div className={classNames('nbShadow', styles.doubleButtonInputGlobalContainer)}>
      <div
        className={styles.animatedContainer}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            validate();
          } else if (e.key === 'Escape') {
            cancel();
          }
        }}
      >
        <input
          className={classNames(styles.shelfCreationInput, isInputDisplayed && styles.visible)}
          placeholder={t('create-shelf-name-input-placeholder')}
          disabled={!isInputDisplayed}
          type={'text'}
          name={'shelf-name'}
          value={inputContent}
          onChange={(e) => setInputContent(e.target.value)}
          ref={inputRef}
        />
      </div>
      <div className={styles.animatedContainer}>
        {isInputDisplayed ? (
          <>
            <button className={styles.validateShelfCreationButton} disabled={!isInputDisplayed} onClick={validate}>
              <Check className={styles.validateShelfCreationImage} />
            </button>
            <button className={styles.validateShelfCreationButton} disabled={!isInputDisplayed} onClick={cancel}>
              <X className={styles.validateShelfCreationImage} />
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              if (!isInputDisplayed) {
                setIsInputDisplayed(true);
              }
            }}
            className={classNames(styles.firstButton, !isInputDisplayed && styles.visible)}
            disabled={isInputDisplayed}
          >
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
}
