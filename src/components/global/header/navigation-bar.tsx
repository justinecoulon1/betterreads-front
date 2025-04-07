'use server';
import styles from './navigation-bar.module.css';
import NavigationBarLink from '@/components/global/header/navigation-bar-link';
import { getSession } from '@/utils/action/auth/get-session.action';

type NavLink = {
  key: string;
  path: string;
  requiresAuth?: boolean;
};

const navLinks: NavLink[] = [
  { key: 'main-title', path: '/' },
  { key: 'books', path: '/books' },
  { key: 'profile', path: '/profile', requiresAuth: true },
];

export default async function NavigationBar() {
  const session = await getSession();
  const isLoggedIn = !!session.accessToken;
  return (
    <nav className={styles.nav}>
      <ul>
        {navLinks
          .filter((navLink) => !navLink.requiresAuth || isLoggedIn)
          .map((navLink) => (
            <li key={navLink.key}>
              <NavigationBarLink path={navLink.path} translationKey={navLink.key} />
            </li>
          ))}
      </ul>
    </nav>
  );
}
