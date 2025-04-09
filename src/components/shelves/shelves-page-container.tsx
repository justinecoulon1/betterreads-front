import { ShelfDto } from '@/utils/dto/shelf.dto';
import ShelfCard from '@/components/profile/profile-section/shelves/shelf-card';
import styles from './shelves-page-container.module.css';

export default function ShelvesPageContainer({ shelves }: { shelves: ShelfDto[] }) {
  return (
    <div className={styles.shelvesPageContainer}>
      <h2>My shelves</h2>
      <div className={styles.shelvesCardContainer}>
        {shelves.map((shelf) => (
          <ShelfCard key={`shelf-card-${shelf.id}`} shelf={shelf} />
        ))}
      </div>
    </div>
  );
}
