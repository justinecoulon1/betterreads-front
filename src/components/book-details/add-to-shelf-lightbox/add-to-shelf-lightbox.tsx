import GenericLightbox from '@/components/generic/lightbox/lightbox';
import React from 'react';
import AddToShelfLightboxContent from '@/components/book-details/add-to-shelf-lightbox/add-to-shelf-lightbox-content';
import { SmallShelfDto } from '@/utils/dto/smallShelfDto';

export default function AddToShelfLightbox({
  isLightboxOpened,
  closeLightbox,
  shelves,
}: {
  isLightboxOpened: boolean;
  closeLightbox: () => void;
  shelves: SmallShelfDto[];
}) {
  return (
    <GenericLightbox isLightboxOpened={isLightboxOpened} closeLightbox={closeLightbox}>
      <AddToShelfLightboxContent shelves={shelves} closeLightbox={closeLightbox} />
    </GenericLightbox>
  );
}
