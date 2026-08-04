import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "../components /Button";

export default function StudentCard() {
  const [student, setStudent] = useState(null);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    student_email: "",
    personal_email: "",
    locker_number: "",
    locker_combination: "",
    good_student: false,
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getStudentInfo = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8001/api/v1/students/${id}/`,
        );

        const studentData = response.data;

        setStudent(studentData);

        setFormData({
          name: studentData.name,
          student_email: studentData.student_email,
          personal_email: studentData.personal_email ?? "",
          locker_number: studentData.locker_number,
          locker_combination: studentData.locker_combination,
          good_student: studentData.good_student,
        });
      } catch (error) {
        console.error(error.response?.data || error.message);
        setError("Could not load the student.");
      }
    };

    getStudentInfo();
  }, [id]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(
        `http://127.0.0.1:8001/api/v1/students/${student.id}/`,
        {
          ...formData,
          locker_number: Number(formData.locker_number),
          personal_email: formData.personal_email || null,
        },
      );

      setStudent(response.data);

      setFormData({
        name: response.data.name,
        student_email: response.data.student_email,
        personal_email: response.data.personal_email ?? "",
        locker_number: response.data.locker_number,
        locker_combination: response.data.locker_combination,
        good_student: response.data.good_student,
      });
    } catch (error) {
      console.error(error.response?.data || error.message);
      setError("Could not update the student.");
    }
  };

  const deleteStudent = async () => {
    try {
      await axios.delete(
        `http://127.0.0.1:8001/api/v1/students/${student.id}/`,
      );

      navigate("/");
    } catch (error) {
      console.error(error.response?.data || error.message);
      setError("Could not delete the student.");
    }
  };

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

      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-6 max-w-md space-y-4 rounded-lg border bg-white p-6 shadow"
      >
        <h3 className="text-xl font-bold">Edit Student</h3>

        <div>
          <label htmlFor="name" className="mb-1 block font-semibold">
            Name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="student_email" className="mb-1 block font-semibold">
            Student Email
          </label>

          <input
            id="student_email"
            name="student_email"
            type="email"
            value={formData.student_email}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="personal_email" className="mb-1 block font-semibold">
            Personal Email
          </label>

          <input
            id="personal_email"
            name="personal_email"
            type="email"
            value={formData.personal_email}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="locker_number" className="mb-1 block font-semibold">
            Locker Number
          </label>

          <input
            id="locker_number"
            name="locker_number"
            type="number"
            value={formData.locker_number}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2"
          />
        </div>

        <div>
          <label
            htmlFor="locker_combination"
            className="mb-1 block font-semibold"
          >
            Locker Combination
          </label>

          <input
            id="locker_combination"
            name="locker_combination"
            type="text"
            value={formData.locker_combination}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2"
          />
        </div>

        <label className="flex items-center gap-2">
          <input
            name="good_student"
            type="checkbox"
            checked={formData.good_student}
            onChange={handleChange}
          />
          Good Student
        </label>

        <Button
          type="submit"
          className="w-full rounded bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
        >
          Save Changes
        </Button>
      </form>

      <div className="mx-auto mt-4 flex max-w-md justify-center">
        <Button
          type="button"
          onClick={deleteStudent}
          className="rounded bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
        >
          Delete Student
        </Button>
      </div>
    </>
  );
}
