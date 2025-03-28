import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { useNavigate } from "react-router-dom";

function BooksList({ selectedCategories }: { selectedCategories: string[] }) {
  const [Books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalBooks, setTotalBooks] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortByTitle, setSortByTitle] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      const categoryParams = selectedCategories
        .map((cat) => `bookTypes=${encodeURIComponent(cat)}`)
        .join('&');

      const response = await fetch(
        `https://localhost:7072/Books?pageNum=${pageNum}&pageSize=${pageSize}&sort=${sortByTitle}${selectedCategories.length ? `&${categoryParams}` : ''}`
      );
      const data = await response.json();
      setBooks(data.books);
      setTotalBooks(data.total);
      setTotalPages(Math.ceil(totalBooks / pageSize));
    };
    fetchBook();
  }, [pageSize, pageNum, sortByTitle, totalBooks, selectedCategories]);

  return (
    <>
      <h1>Book List</h1>

      <br />
      <button onClick={() => setSortByTitle(!sortByTitle)}>
        {sortByTitle ? "Unsort by Title" : "Sort by Title"}
      </button>
      <br />

      {Books.map((b) => (
        <div id="bookID" className="card" key={b.bookID}>
          <h3 className="card-title">{b.title}</h3>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <strong>Author: </strong>
                {b.author}
              </li>
              <li>
                <strong>Publisher: </strong>
                {b.publisher}
              </li>
              <li>
                <strong>ISBN: </strong>
                {b.isbn}
              </li>
              <li>
                <strong>Classification: </strong>
                {b.classification}
              </li>
              <li>
                <strong>Category: </strong>
                {b.category}
              </li>
              <li>
                <strong>Page Count: </strong>
                {b.pageCount}
              </li>
              <li>
                <strong>Price: </strong>
                {b.price}
              </li>
            </ul>

            <button
              className="btn btn-success"
              onClick={() =>
                navigate(`/purchase/${b.title}/${b.bookID}`)
              }
            >
              Purchase
            </button>
          </div>
        </div>
      ))}

      <br />

      <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>
        Previous
      </button>

      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i + 1}
          onClick={() => setPageNum(i + 1)}
          disabled={pageNum === i + 1}
        >
          {i + 1}
        </button>
      ))}

      <button
        disabled={pageNum === totalPages}
        onClick={() => setPageNum(pageNum + 1)}
      >
        Next
      </button>

      <br />

      <label>
        Results per page:
        <select
          value={pageSize}
          onChange={(p) => {
            setPageSize(Number(p.target.value));
            setPageNum(1);
          }}
        >
          <option value="2">2</option>
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
      </label>
    </>
  );
}

export default BooksList;
