import styles from './navigation-bar.module.css';
import NavigationBarLink from '@/components/global/header/navigation/navigation-bar-link';
import { JSX } from 'react';
import { Book, Home, Library, NotepadText, User } from 'lucide-react';
import { ShelfWithLastBookDto } from '@/utils/dto/shelf.dto';
import NavigationBarSubLink from '@/components/global/header/navigation/navigation-bar-sub-link';

type NavLink = {
  key: string;
  path: string;
  icon: JSX.Element;
  requiresAuth?: boolean;
};

const navLinks: NavLink[] = [
  { key: 'main-title', path: '/', icon: <Home /> },
  { key: 'books', path: '/books', icon: <Book /> },
  { key: 'add-book', path: '/books/add', icon: <NotepadText />, requiresAuth: true },
  { key: 'profile', path: '/profile', icon: <User />, requiresAuth: true },
  { key: 'shelves', path: '/profile/shelves', icon: <Library />, requiresAuth: true },
  { key: 'history', path: '/profile/history', icon: <NotepadText />, requiresAuth: true },
  { key: 'reviews', path: '/profile/reviews', icon: <NotepadText />, requiresAuth: true },
];

export default function NavigationBar({
  isLoggedIn,
  closeMenuLightbox,
  userShelves,
}: {
  isLoggedIn: boolean;
  closeMenuLightbox: () => void;
  userShelves: ShelfWithLastBookDto[];
}) {
  return (
    <nav className={styles.nav}>
      <ul>
        {navLinks
          .filter((navLink) => !navLink.requiresAuth || isLoggedIn)
          .map((navLink) => {
            if (navLink.key === 'shelves') {
              return (
                <>
                  <li key={navLink.key}>
                    <NavigationBarLink
                      path={navLink.path}
                      translationKey={navLink.key}
                      closeMenuLightbox={closeMenuLightbox}
                    />
                  </li>
                  {userShelves.map((shelf) => (
                    <li key={shelf.id} className={styles.subMenu}>
                      <NavigationBarSubLink
                        path={`/profile/shelves/${shelf.id}`}
                        translationKey={shelf.type}
                        closeMenuLightbox={closeMenuLightbox}
                      />
                    </li>
                  ))}
                </>
              );
            }
            return (
              <li key={navLink.key}>
                <NavigationBarLink
                  path={navLink.path}
                  translationKey={navLink.key}
                  closeMenuLightbox={closeMenuLightbox}
                />
              </li>
            );
          })}
      </ul>
    </nav>
  );
}
