import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [students, setStudents] = useState(null);

  useEffect(() => {
    const getStudentData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8001/api/v1/students/`,
        );

        setStudents(response.data);
        console.log("Students response:", response.data);
      } catch (error) {
        console.error(error.response?.data || error.message);
      }
    };

    getStudentData();
  }, []);

  if (!students) {
    return <span>spinning</span>;
  }

  return (
    <>
      <div className="mx-auto mt-10 max-w-2xl px-4">
        <h1 className="mb-8 text-center text-4xl font-bold text-gray-800">
          Code Platoon School API
        </h1>

        <ul className="space-y-3">
          {students.map((item) => (
            <li
              key={item.id}
              className="rounded-lg border border-gray-300 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <Link
                to={`/students/${item.id}`}
                className="flex items-center justify-between px-5 py-4 font-semibold text-gray-800 hover:text-blue-600"
              >
                <span>{item.name}</span>

                
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
