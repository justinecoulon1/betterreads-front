'use client';

import { useEffect, useRef, useState } from 'react';
import BookListCard from '@/components/global/books/book-list-card/book-list-card';
import { SmallBookDto } from '@/utils/dto/book.dto';
import styles from './carousel.module.css';
import classNames from 'classnames';

const CARD_WIDTH_REM = 12;
const GAP_REM = 1;

export default function Carousel({ books }: { books: SmallBookDto[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardsPerPage, setCardsPerPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const updateCardsPerPage = () => {
      if (!containerRef.current) return;
      const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
      const containerWidth = containerRef.current.offsetWidth;
      const cardWithGap = (CARD_WIDTH_REM + GAP_REM) * rem;
      const count = Math.floor(containerWidth / cardWithGap) || 1;
      setCardsPerPage(count);
      setCurrentPage(0);
    };

    updateCardsPerPage();
    window.addEventListener('resize', updateCardsPerPage);
    return () => window.removeEventListener('resize', updateCardsPerPage);
  }, []);

  const totalPages = Math.ceil(books.length / cardsPerPage);
  const maxPage = totalPages - 1;

  const nextPage = () => {
    if (currentPage < maxPage) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const offset = (CARD_WIDTH_REM + GAP_REM) * currentPage * cardsPerPage;

  return (
    <div className={styles.carouselWrapper}>
      <button
        onClick={prevPage}
        disabled={currentPage === 0}
        className={classNames('nbShadow', styles.carouselButton, styles.left)}
      >
        ‹
      </button>

      <div className={styles.carouselContainer} ref={containerRef}>
        <div
          className={styles.carouselTrack}
          style={{
            transform: `translateX(-${offset}rem)`,
          }}
        >
          {books.map((book) => (
            <div className={styles.cardWrapper} key={book.id}>
              <BookListCard book={book} hasButton={false} onBookRemoved={() => {}} />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={nextPage}
        disabled={currentPage === maxPage}
        className={classNames('nbShadow', styles.carouselButton, styles.right)}
      >
        ›
      </button>
    </div>
  );
}
