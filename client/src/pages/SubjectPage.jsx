import axios from "axios";
import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

export default function SubjectPage() {
  const [subjects, setSubjects] = useState(null);

  const { subject } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getSubjectsData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8001/api/v1/subjects/${subject}`,
        );

        setSubjects(response.data);
      } catch (error) {
        console.error(error.response?.data || error.message);
      }
    };

    getSubjectsData();
  }, [subject]);

  return <>//? html</>;
}
