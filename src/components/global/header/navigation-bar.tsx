'use server';
import styles from './navigation-bar.module.css';
import NavigationBarLink from '@/components/global/header/navigation-bar-link';
import { getSession } from '@/utils/action/auth/get-session.action';
import { JSX } from 'react';
import { Book, Home, NotepadText, User } from 'lucide-react';

type NavLink = {
  key: string;
  path: string;
  icon: JSX.Element;
  requiresAuth?: boolean;
};

const navLinks: NavLink[] = [
  { key: 'main-title', path: '/', icon: <Home /> },
  { key: 'books', path: '/books', icon: <Book /> },
  { key: 'profile', path: '/profile', icon: <User />, requiresAuth: true },
  { key: 'add-book', path: '/books/add', icon: <NotepadText />, requiresAuth: true },
  { key: 'shelves', path: '/profile/shelves', icon: <NotepadText />, requiresAuth: true },
  { key: 'history', path: '/profile/history', icon: <NotepadText />, requiresAuth: true },
  { key: 'reviews', path: '/profile/reviews', icon: <NotepadText />, requiresAuth: true },
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
