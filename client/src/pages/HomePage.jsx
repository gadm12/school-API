import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";

export default function HomePage() {
  const [students, setStudents] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getStudentData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/v1/students/`,
        );

        setStudents(response.data);
        console.log("Students response:", response.data);
      } catch (error) {
        console.error(error.response?.data || error.message);
      }
    };

    getStudentData();
  }, []);
  const createStudent = async () => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/v1/students/`,
        {
          name: "Robert J. Miller",
          student_email: "robert@school.com",
          personal_email: "robert@gmail.com",
          locker_number: 63,
        },
      );

      setStudents((currentStudents) => [...currentStudents, response.data]);
      console.log(response.data);
    } catch (error) {
      console.error(error.response?.data || error.message);
      setError("Could not update the student.");
    }
  };


  if (error) {
    return <p>{error}</p>;
  }

  if (!students) {
    return <span>spinning</span>;
  }

  return (
    <>
      <div className="mx-auto mt-10 max-w-2xl px-4">
        <Button onClick={createStudent}>create Student</Button>

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
