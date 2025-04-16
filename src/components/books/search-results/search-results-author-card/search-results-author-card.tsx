import { AuthorDto } from '@/utils/dto/author.dto';
import { Link } from '@/i18n/routing';
import classNames from 'classnames';
import styles from './search-results-author-card.module.css';
import Image from 'next/image';

export default function SearchResultsAuthorCard({ author }: { author: AuthorDto }) {
  return (
    <Link href={`/author/${author.slug}`} className={classNames(styles.searchResultsAuthorCard, 'nbShadow')}>
      <div className={styles.searchResultsAuthorCardImageContainer}>
        <Image
          className={styles.searchResultsAuthorCardImage}
          src={'/icons/author_icon_dark.png'}
          height={512}
          width={512}
          alt={'author icon'}
        />
      </div>
      <div className={styles.searchResultsAuthorCardInfoContainer}>
        <p className={styles.searchResultsAuthorCardAuthorName}>{author.name}</p>
      </div>
    </Link>
  );
}
