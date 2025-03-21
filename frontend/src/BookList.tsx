import { useEffect, useState } from 'react';
import { Book } from './types/Book';

function BooksList() {
  const [Books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBook = async () => {
      const response = await fetch('https://localhost:7072/Books');
      const data = await response.json();
      setBooks(data);
    };
    fetchBook();
  }, []);

  return (
    <>
      <h1>Books List</h1>
      <table>
        <thead>
          <th>Title</th>
          <th>Author</th>
          <th>Publisher</th>
          <th>ISBN</th>
          <th>Classification</th>
          <th>Category</th>
          <th>PageCount</th>
          <th>Price</th>
        </thead>
        <tbody>
          {Books.map((b) => (
            <tr key={b.bookID}>
              <td>
                {b.title}
              </td>
              <td>{b.author}</td>
              <td>{b.publisher}</td>
              <td>{b.isbn}</td>
              <td>{b.classification}</td>
              <td>{b.category}</td>
              <td>{b.pageCount}</td>
              <td>{b.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default BooksList;
