import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import { account } from "../Users/AccountApi";

const emptyForm = {
  subject_name: "",
  professor: "",
  grade_average: "",
};

export default function SubjectCard() {
  const [subject, setSubject] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getSubjectData = async () => {
      try {
        const response = await account.get(
          `subjects/${id}/`,
        );

        const subjectData = response.data;

        setSubject(subjectData);

        setFormData({
          subject_name: subjectData.subject_name,
          professor: subjectData.professor,
          grade_average: subjectData.grade_average,
        });
      } catch (error) {
        console.error(
          error.response?.data || error.message,
        );
        setError("Could not load the subject.");
      }
    };

    getSubjectData();
  }, [id]);

  const updateSubject = async (updatedFormData) => {
    try {
      const response = await account.put(
        `subjects/${subject.id}/`,
        updatedFormData,
      );

      setSubject(response.data);

      setFormData({
        subject_name: response.data.subject_name,
        professor: response.data.professor,
        grade_average: response.data.grade_average,
      });
    } catch (error) {
      console.error(error.response?.data || error.message);
      setError("Could not update the subject.");
    }
  };

  const deleteSubject = async () => {
    try {
      await account.delete(`subjects/${subject.id}/`);

      navigate("/");
    } catch (error) {
      console.error(error.response?.data || error.message);
      setError("Could not delete the subject.");
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!subject) {
    return <p>Spinner</p>;
  }

  return (
    <>
      <div className="mx-auto mt-8 w-80 rounded-md border border-black p-4 shadow-sm">
        <h3 className="mb-3 text-lg font-semibold">
          {subject.subject_name}
        </h3>

        <p>Professor: {subject.professor}</p>
        <p>Students: {subject.students}</p>
        <p>Grade Average: {subject.grade_average}</p>
      </div>

      <div className="mx-auto mt-4 flex max-w-md justify-center">
        <Button
          type="button"
          onClick={deleteSubject}
          className="rounded bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700"
        >
          Delete Subject
        </Button>
      </div>
    </>
  );
}
