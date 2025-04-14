import styles from './author-details-page.module.css';
import AuthorService from '@/utils/api/author.service';
import AuthorDetailsContent from '@/components/author/author-details-content';

export default async function AuthorDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const author = await AuthorService.getAuthorBySlug(slug);
  return (
    <div className={styles.authorDetailsPageContainer}>
      <AuthorDetailsContent author={author} />
    </div>
  );
}
