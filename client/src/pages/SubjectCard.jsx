import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function SubjectCard() {
  const [subjectData, setSubjectData] = useState(null);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const getSubjectData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/v1/subjects/${id}/`,
        );

        setSubjectData(response.data);
      } catch (error) {
        console.error(error.response?.data || error.message);
        setError("Could not load the subject.");
      }
    };

    getSubjectData();
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!subjectData) {
    return <p>Spinner</p>;
  }

  return (
    <div className="mx-auto mt-8 w-80 rounded-md border border-black p-4 shadow-sm">
      <h3 className="mb-3 text-lg font-semibold">{subjectData.subject_name}</h3>

      <p>Professor: {subjectData.professor}</p>
      <p>Students: {subjectData.students}</p>
      <p>Grade Average: {subjectData.grade_average}</p>
    </div>
  );
}
