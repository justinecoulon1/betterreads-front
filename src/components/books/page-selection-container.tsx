import { Link } from '@/i18n/routing';
import styles from './page-selection-container.module.css';
import classNames from 'classnames';

type PageComponent = number | 'blank';

export default function PageSelectionContainer({
  currentPage,
  totalPages,
  getPageHref,
}: {
  currentPage: number;
  totalPages: number;
  getPageHref: (page: number) => string;
}) {
  const accessiblePages = Array.from(
    new Set(
      [1, 2, totalPages, totalPages - 1, currentPage, currentPage - 1, currentPage + 1]
        .filter((p) => p >= 1 && p <= totalPages)
        .sort(),
    ),
  );
  const pageComponents: PageComponent[] = [];
  for (let i = 0; i < accessiblePages.length - 1; i++) {
    pageComponents.push(accessiblePages[i]);
    if (accessiblePages[i + 1] - accessiblePages[i] > 1) {
      pageComponents.push('blank');
    }
  }
  pageComponents.push(accessiblePages[accessiblePages.length - 1]);
  return (
    <div className={styles.pageSelectionContainer}>
      {pageComponents.map((pageComponent, index) => {
        if (pageComponent === 'blank') {
          return <p key={`${index}-${pageComponent}`}>...</p>;
        } else {
          return (
            <Link
              className={classNames('nbShadow', styles.pageLink)}
              key={`${index}-${pageComponent}`}
              href={getPageHref(pageComponent)}
            >
              {pageComponent}
            </Link>
          );
        }
      })}
    </div>
  );
}
