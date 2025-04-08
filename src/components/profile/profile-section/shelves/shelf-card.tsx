'use client';

import { ShelfDto } from '@/utils/dto/shelf.dto';
import styles from './shelf-card.module.css';
import classNames from 'classnames';

export default function ShelfCard({ shelf }: { shelf: ShelfDto }) {
  return <div className={classNames(styles.shelfCardContainer, 'nbShadow')}>shelf card: {shelf.name}</div>;
}
