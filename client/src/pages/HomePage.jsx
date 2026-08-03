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
      <h1>Code platoon</h1>
      <ul>
  {students.map((item) => (
    <li key={item.student_email}>
      <Link to={`/students/${item.id}`}>{item.name}</Link>
    </li>
  ))}
</ul>
    </>
  );
}
