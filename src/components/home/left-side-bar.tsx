import styles from './left-side-bar.module.css';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { SmallShelfDto } from '@/utils/dto/shelf.dto';

type LeftSideBarSectionInfo = {
  titleKey: string;
  content: {
    textKey: string;
    link: string;
  }[];
};

export default function LeftSideBar({ userStatusShelves }: { userStatusShelves: SmallShelfDto[] }) {
  const leftSideBarSectionInfo: LeftSideBarSectionInfo[] = [
    {
      titleKey: 'books-title',
      content: [
        {
          textKey: 'books-add-text',
          link: '/books/add',
        },
      ],
    },
    {
      titleKey: 'shelf-title',
      content: [
        {
          textKey: 'shelf-create',
          link: '/profile/shelves',
        },
        {
          textKey: 'shelf-text',
          link: '/profile/shelves',
        },
        ...userStatusShelves.map((shelf) => ({
          textKey: `${shelf.type}`,
          link: `/profile/shelves/${shelf.id}`,
        })),
      ],
    },
  ];
  return (
    <div className={styles.leftSideBarContainer}>
      {leftSideBarSectionInfo.map((info) => (
        <LeftSideBarSection key={`left-side-bar-${info.titleKey}`} leftSideBarSectionInfo={info} />
      ))}
    </div>
  );
}

function LeftSideBarSection({ leftSideBarSectionInfo }: { leftSideBarSectionInfo: LeftSideBarSectionInfo }) {
  const t = useTranslations('left-side-bar');
  return (
    <div className={styles.leftSideBarContainerSection}>
      <h3>{t(leftSideBarSectionInfo.titleKey)}</h3>
      {leftSideBarSectionInfo.content.map((content) => (
        <p key={`left-side-bar-section-${content.link}`}>
          {t.rich(`${content.textKey}`, {
            link: (chunks) => (
              <Link className={styles.link} href={content.link}>
                {chunks}
              </Link>
            ),
          })}
        </p>
      ))}
    </div>
  );
}
