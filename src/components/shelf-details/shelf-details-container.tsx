import BookListCard from '@/components/global/books/book-list-card';
import { ShelfDto } from '@/utils/dto/smallShelfDto';
import styles from './shelf-details-container.module.css';

export default function ShelfDetailsContainer({ shelf }: { shelf: ShelfDto }) {
  return (
    <div className={styles.shelfDetailsContainer}>
      <div className={styles.shelfDetailsContainerHeader}>
        <h2>{shelf.name}</h2>
      </div>
      <div className={styles.shelfBookListContainer}>
        {shelf.books.map((book) => (
          <BookListCard key={`shelf-book-list-card-${book.id}}`} book={book} />
        ))}
      </div>
    </div>
  );
}
