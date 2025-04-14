import classNames from 'classnames';
import { Search } from 'lucide-react';
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from './search-bar.module.css';
import { Link, useRouter } from '@/i18n/routing';

export default function SearchBar({
  className,
  getSearchHref,
  initialText,
  disabled = false,
}: {
  className?: string;
  getSearchHref: (searchText: string) => string;
  initialText: string;
  disabled?: boolean;
}) {
  const t = useTranslations('search-bar');
  const [searchText, setSearchText] = useState(initialText);
  const isSearchDisabled = disabled || searchText.length < 2;
  const router = useRouter();

  return (
    <div className={classNames(styles.searchBookInputDiv, disabled ? 'nbShadowDisabled' : 'nbShadow', className)}>
      <input
        className={classNames(styles.searchBookInput, disabled && styles.inputDisabled)}
        id={'search-book-input'}
        name={'search-book-input'}
        type="text"
        autoComplete={'off'}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder={t('search-book-input-placeholder')}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !isSearchDisabled) {
            router.push(getSearchHref(searchText));
          }
        }}
      />
      <Link
        href={getSearchHref(searchText)}
        className={classNames(styles.searchBookButton, isSearchDisabled && styles.disabled)}
      >
        <Search className={styles.searchIcon} />
      </Link>
    </div>
  );
}
