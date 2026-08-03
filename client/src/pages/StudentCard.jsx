import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function StudentCard() {
  const [student, setStudent] = useState(null);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const getStudentInfo = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8001/api/v1/students/${id}/`,
        );

        setStudent(response.data);
      } catch (error) {
        console.error(error.response?.data || error.message);
        setError("Could not load the student.");
      }
    };

    getStudentInfo();
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!student) {
    return <p>Spinner</p>;
  }

  return (
    <>
      <div className="mx-auto mt-8 w-80 rounded-lg border bg-white p-6 shadow">
        <h2 className="mb-4 text-center text-2xl font-bold">{student.name}</h2>

        <p className="mb-2">
          <strong>Student Email:</strong> {student.student_email}
        </p>

        <p className="mb-4">
          <strong>Locker Number:</strong> {student.locker_number}
        </p>

        <h3 className="mb-3 text-lg font-semibold">Subjects</h3>

        <div className="space-y-3">
          {student.subjects.map((subject) => (
            <div
              key={subject.subject_name}
              className="rounded-md border border-black p-3 shadow-sm"
            >
              <p>
                <strong>{subject.subject_name}</strong>
              </p>

              <p>Professor: {subject.professor}</p>

              <p>Students: {subject.students}</p>

              <p>Grade Average: {subject.grade_average}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
