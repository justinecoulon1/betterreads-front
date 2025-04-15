import { SmallShelfDto } from '@/utils/dto/shelf.dto';
import styles from '@/components/book-details/add-to-shelf-lightbox/shelf-lightbox-content.module.css';

export default function ShelfLightboxShelfNameInput({ shelf, checked }: { shelf: SmallShelfDto; checked?: boolean }) {
  return (
    <div className={styles.addToShelfLbShelveNameContainer}>
      <input
        id={shelf.id.toString()}
        className={styles.addToShelfLbShelveNameCheckbox}
        type="checkbox"
        defaultChecked={checked}
        name={shelf.id.toString()}
      />
      <label className={styles.addToShelfLbShelveName} htmlFor={shelf.id.toString()}>
        {shelf.name}
      </label>
    </div>
  );
}
