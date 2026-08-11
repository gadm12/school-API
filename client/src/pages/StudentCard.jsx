import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import StudentEditForm from "../components/StudentEditForm";
import StudentInfo from "../components/StudentInfo";
import SubjectList from "../components/SubjectList";
import { account } from "../Users/AccountApi";

const emptyForm = {
  name: "",
  student_email: "",
  personal_email: "",
  locker_number: "",
  locker_combination: "",
  good_student: false,
};

export default function StudentCard() {
  const [student, setStudent] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getStudentInfo = async () => {
      try {
        const response = await account.get(
          `students/${id}/`,
        );

        const studentData = response.data;

        setStudent(studentData);
        setFormData({
          name: studentData.name,
          student_email: studentData.student_email,
          personal_email: studentData.personal_email ?? "",
          locker_number: studentData.locker_number,
          locker_combination:
            studentData.locker_combination,
          good_student: studentData.good_student,
        });
      } catch (error) {
        console.error(
          error.response?.data || error.message,
        );
        setError("Could not load the student.");
      }
    };

    getStudentInfo();
  }, [id]);

  const updateStudent = async (updatedFormData) => {
    try {
      const response = await account.put(
        `students/${student.id}/`,
        {
          ...updatedFormData,
          locker_number: Number(
            updatedFormData.locker_number,
          ),
          personal_email:
            updatedFormData.personal_email || null,
        },
      );

      setStudent(response.data);
      setFormData({
        name: response.data.name,
        student_email: response.data.student_email,
        personal_email: response.data.personal_email ?? "",
        locker_number: response.data.locker_number,
        locker_combination:
          response.data.locker_combination,
        good_student: response.data.good_student,
      });
    } catch (error) {
      console.error(error.response?.data || error.message);
      setError("Could not update the student.");
    }
  };

  const deleteStudent = async () => {
    try {
      await account.delete(`students/${student.id}/`);

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
      <StudentInfo student={student} />

      <SubjectList subjects={student.subjects} />

      <StudentEditForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={updateStudent}
      />

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
