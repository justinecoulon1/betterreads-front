import React from 'react';

export default function CoverImage({ isbn, className }: { isbn: string; className?: string }) {
  return <img className={className} src={process.env.NEXT_PUBLIC_COVER_IMAGE_URL + isbn} alt={'Book cover'} />;
}
