'use client';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import classNames from 'classnames';
import styles from './navigation-bar.module.css';

type NavLink = {
  key: string;
  path: string;
};

const navLinks: NavLink[] = [
  { key: 'main-title', path: '/' },
  { key: 'books', path: '/books' },
  { key: 'user', path: '/user' },
];

export default function NavigationBar() {
  const t = useTranslations('header');
  const activePage = usePathname();
  return (
    <nav className={styles.nav}>
      <ul>
        {navLinks.map((navLink) => (
          <li key={navLink.key}>
            <Link className={classNames(activePage === navLink.path && styles.activeLink)} href={navLink.path}>
              <span>{t(navLink.key).toUpperCase()}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
