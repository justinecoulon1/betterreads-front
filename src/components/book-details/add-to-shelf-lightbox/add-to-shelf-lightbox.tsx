import GenericLightbox from '@/components/generic/lightbox/lightbox';
import React from 'react';
import AddToShelfLightboxContent from '@/components/book-details/add-to-shelf-lightbox/add-to-shelf-lightbox-content';

export default function AddToShelfLightbox({
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
      <AddToShelfLightboxContent closeLightbox={closeLightbox} bookId={bookId} />
    </GenericLightbox>
  );
}
