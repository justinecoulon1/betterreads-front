import classNames from 'classnames';
import { Search } from 'lucide-react';
import React from 'react';
import { useTranslations } from 'next-intl';
import styles from './search-bar.module.css';

export default function SearchBar({ className }: { className?: string }) {
  const t = useTranslations('search-bar');
  const disabled = false;
  return (
    <div className={classNames(styles.searchBookInputDiv, disabled ? 'nbShadowDisabled' : 'nbShadow', className)}>
      <input
        className={classNames(styles.searchBookInput, disabled && styles.inputDisabled)}
        id={'search-book-input'}
        name={'search-book-input'}
        type="text"
        placeholder={t('search-book-input-placeholder')}
      />
      <button type="submit" className={styles.searchBookButton}>
        <Search className={styles.searchIcon} />
      </button>
    </div>
  );
}
