'use client';

import { ShelfDto } from '@/utils/dto/shelf.dto';
import styles from './shelf-card.module.css';
import classNames from 'classnames';
import { Link } from '@/i18n/routing';

export default function ShelfCard({ shelf }: { shelf: ShelfDto }) {
  return (
    <Link href={`/profile/shelves/${shelf.id}`} className={classNames(styles.shelfCardContainer, 'nbShadow')}>
      shelf card: {shelf.name}
    </Link>
  );
}
