import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [students, setStudents] = useState(null);

  useEffect(() => {
    const getSchoolData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8001/api/v1/students/",
        );

        setStudents(response.data);
        console.log(response.data);
        console.log(response.data.name);
      } catch (error) {
        console.error(error.response?.data || error.message);
      }
    };

    getSchoolData();
  }, []);

  if (!students) {
    return <p>Spinner</p>;
  }

  return (
    <>
      <h1>All Students</h1>

      {students.map((student) => (
        <div key={student.student_email}>
          <h3>{student.name}</h3>
          <p>{student.student_email}</p>
          <p>Locker: {student.locker_number}</p>
        </div>
      ))}
    </>
  );
}

export default App;
