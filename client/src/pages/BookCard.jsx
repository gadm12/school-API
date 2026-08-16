// BookCard.jsx

import { Link, useLocation } from "react-router-dom";

export default function BookCard() {
  const location = useLocation();

  const book = location.state?.book;

  if (!book) {
    return (
      <main className="mx-auto mt-8 max-w-3xl px-4">
        <p>Book information could not be loaded.</p>

        <Link
          to="/books"
          className="mt-4 inline-block underline"
        >
          Back to books
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto mt-8 max-w-3xl px-4">
      <div className="rounded-lg border border-gray-300 bg-white p-6 shadow-sm">
        {book.thumbnail && (
          <img
            src={book.thumbnail}
            alt={book.title}
            className="mb-4 h-48 object-cover"
          />
        )}

        <h1 className="mb-2 text-3xl font-bold">
          {book.title}
        </h1>

        <p className="mb-4">
          Author:{" "}
          {book.authors?.join(", ") || "Unknown author"}
        </p>

        {book.description && (
          <p className="mb-4">{book.description}</p>
        )}

        {book.preview_link && (
          <a
            href={book.preview_link}
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            Preview Book
          </a>
        )}
      </div>
    </main>
  );
}
