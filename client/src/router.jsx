import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import StudentCard from "./pages/StudentCard";
import SubjectPage from "./pages/SubjectPage";
import SubjectCard from "./pages/SubjectCard";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
// import NotFoundPage from "./Pages/NotFoundPage";
// import AboutPage from "./Pages/AboutPage";
// import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },

      {
        path: "students/:id",
        element: <StudentCard />,
      },
      {
        path: "subjects",
        element: <SubjectPage />,
      },
      {
        path: "subjects/:id",
        element: <SubjectCard />,
      },
      //   {
      //     path: "*",
      //     element: <NotFoundPage />,
      //   },
    ],
  },
]);

export default router;
