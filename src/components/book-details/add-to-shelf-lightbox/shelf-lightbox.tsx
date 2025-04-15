import GenericLightbox from '@/components/generic/lightbox/lightbox';
import React from 'react';
import ShelfLightboxContent from '@/components/book-details/add-to-shelf-lightbox/shelf-lightbox-content';

export default function ShelfLightbox({
  isLightboxOpened,
  closeLightbox,
  bookId,
}: {
  isLightboxOpened: boolean;
  closeLightbox: () => void;
  bookId: number;
}) {
  return (
    <GenericLightbox isLightboxOpened={isLightboxOpened} closeLightbox={closeLightbox}>
      <ShelfLightboxContent closeLightbox={closeLightbox} bookId={bookId} />
    </GenericLightbox>
  );
}
