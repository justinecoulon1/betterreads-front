import styles from './banner-container.module.css';
import Image from 'next/image';
import React from 'react';
import classNames from 'classnames';

export default function BannerContainer({
  path,
  imageAlt,
  imageClassName,
}: {
  path: string;
  imageAlt: string;
  imageClassName?: string;
}) {
  return (
    <div className={styles.bannerContainer}>
      <Image
        className={classNames(styles.bannerImage, imageClassName)}
        src={path}
        alt={imageAlt}
        width={3024}
        height={4032}
      />
    </div>
  );
}
