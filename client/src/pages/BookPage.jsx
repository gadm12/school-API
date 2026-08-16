// BookPage.jsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBooks } from "../ServerApi/serverSide";

export default function BookPage() {
  const [books, setBooks] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await getBooks();
        setBooks(data.books);
      } catch (error) {
        console.error(error);
        setError("Could not load books.");
      }
    };

    loadBooks();
  }, []);

  if (error) return <p>{error}</p>;
  if (!books) return <p>Spinner</p>;

  return (
    <main className="mx-auto mt-8 max-w-3xl px-4">
      <h1 className="text-3xl font-bold">Books</h1>

      <hr className="my-4" />

      <ul className="space-y-3">
        {books.map((book) => (
          <li
            key={book.google_id}
            className="rounded-lg border border-gray-300 bg-white shadow-sm"
          >
            <Link
              to={`/books/${book.google_id}`}
              state={{ book }}
              className="flex gap-4 p-4"
            >
              {book.thumbnail && (
                <img
                  src={book.thumbnail}
                  alt={book.title}
                  className="h-28 w-20 object-cover"
                />
              )}

              <div>
                <h2 className="font-semibold">
                  {book.title}
                </h2>

                <p className="text-sm text-gray-600">
                  {book.authors?.join(", ") ||
                    "Unknown author"}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
