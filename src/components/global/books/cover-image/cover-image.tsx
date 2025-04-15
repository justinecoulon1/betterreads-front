import React from 'react';
import classNames from 'classnames';
import styles from './cover-image.module.css';

export default function CoverImage({ isbn, className }: { isbn: string; className?: string }) {
  return (
    <img
      className={classNames(styles.basicCoverImage, className)}
      src={process.env.NEXT_PUBLIC_COVER_IMAGE_URL + isbn}
      alt={'Book cover'}
    />
  );
}
