import GenericLightbox from '@/components/generic/lightbox/lightbox';
import React from 'react';
import AddToShelfLightboxContent from '@/components/book-details/add-to-shelf-lightbox/add-to-shelf-lightbox-content';
import { SmallShelfDto } from '@/utils/dto/smallShelfDto';

export default function AddToShelfLightbox({
  isLightboxOpened,
  closeLightbox,
  shelves,
  isbn,
}: {
  isLightboxOpened: boolean;
  closeLightbox: () => void;
  shelves: SmallShelfDto[];
  isbn: string;
}) {
  return (
    <GenericLightbox isLightboxOpened={isLightboxOpened} closeLightbox={closeLightbox}>
      <AddToShelfLightboxContent shelves={shelves} closeLightbox={closeLightbox} isbn={isbn} />
    </GenericLightbox>
  );
}
