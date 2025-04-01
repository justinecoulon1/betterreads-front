import { BookListDto } from '@/utils/dto/book.dto';
import styles from './book-list-card.module.css';
import classNames from 'classnames';

export default function BookListCard({ book }: { book: BookListDto }) {
  return <div className={classNames(styles.bookListCardContainer)}>{book.title}</div>;
}
