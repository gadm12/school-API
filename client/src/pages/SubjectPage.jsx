import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function SubjectPage() {
  const [subjects, setSubjects] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSubjectsData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/v1/subjects/",
        );

        setSubjects(response.data);
      } catch (error) {
        console.error(
          error.response?.data || error.message,
        );
        setError("Could not load the subjects.");
      }
    };

    getSubjectsData();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (!subjects) {
    return <p>Spinner</p>;
  }

  return (
    <main className="mx-auto mt-8 max-w-3xl px-4">
      <h1 className="text-3xl font-bold">Subjects</h1>

      <hr className="my-4" />

      <ul className="space-y-3">
        {subjects.map((item) => (
          <li
            key={item.id}
            className="rounded-lg border border-gray-300 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <Link
              to={`/subjects/${item.id}`}
              className="block px-4 py-3"
            >
              {item.subject_name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
