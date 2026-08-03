import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
// import NavBar from "./components/NavBar/NavBar";
import { Outlet } from "react-router-dom";

function App() {


  // const [students, setStudents] = useState(null);
  // const [subjects, setSubjects] = useState(null);

  // useEffect(() => {
  //   const getSchoolData = async () => {
  //     try {
  //       const [studentsResponse, subjectsResponse] = await Promise.all([
  //         axios.get("http://127.0.0.1:8001/api/v1/students/"),
  //         axios.get("http://127.0.0.1:8001/api/v1/subjects/"),
  //       ]);

  //       setStudents(studentsResponse.data);
  //       setSubjects(subjectsResponse.data);

  //       console.log("Students:", studentsResponse.data);
  //       console.log("Subjects:", subjectsResponse.data);
  //     } catch (error) {
  //       console.error(error.response?.data || error.message);
  //     }
  //   };

  //   getSchoolData();
  // }, []);

  // if (!students || !subjects) {
  //   return <p>Spinner</p>;
  // }

  return (
    <>
      {/* <NavBar /> */}
      <Outlet />

      {/* <h1>All Students</h1>

      {students.map((student) => (
        <div key={student.student_email}>
          <h3>{student.name}</h3>
          <p>{student.student_email}</p>
          <p>Locker: {student.locker_number}</p>
        </div>
      ))}

      <hr />

      <h1>All Subjects</h1>

      {subjects.map((subject) => (
        <div key={subject.subject_name}>
          <h3>{subject.subject_name}</h3>
          <p>{subject.professor}</p>
        </div>
      ))} */}
    </>
  );
}

export default App;
