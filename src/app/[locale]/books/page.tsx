import SearchBar from '@/components/books/search-bar/search-bar';
import AddBookLink from '@/components/books/add-book-button/add-book-link';

export default async function BooksPage() {
  return (
    <div>
      <SearchBar />
      <AddBookLink />
    </div>
  );
}
