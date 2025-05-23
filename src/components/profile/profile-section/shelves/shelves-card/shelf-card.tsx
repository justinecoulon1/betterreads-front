import { ShelfType, ShelfWithLastBookDto, SmallShelfDto } from '@/utils/dto/shelf.dto';
import styles from './shelf-card.module.css';
import classNames from 'classnames';
import React from 'react';
import { X } from 'lucide-react';
import ShelfService from '@/utils/api/shelf.service';
import ShelfLink from '@/components/profile/profile-section/shelves/shelves-card/shelf-link';

export default function ShelfCard({
  shelf,
  hasButton,
  onShelfDelete,
  className,
}: {
  shelf: ShelfWithLastBookDto;
  hasButton: boolean;
  onShelfDelete: (shelf: SmallShelfDto) => void;
  className?: string;
}) {
  const isDeletable =
    hasButton && shelf.type !== ShelfType.READ && shelf.type !== ShelfType.READING && shelf.type !== ShelfType.TO_READ;
  return (
    <div className={styles.buttonContainer}>
      {isDeletable && (
        <button
          className={classNames(styles.shelfDeleteButton, 'nbShadow')}
          onClick={async () => {
            await ShelfService.deleteShelf(shelf.id);
            onShelfDelete(shelf);
          }}
        >
          <X className={styles.shelfDeleteButtonImage} />
        </button>
      )}
      <ShelfLink shelf={shelf} className={className} />
    </div>
  );
}
