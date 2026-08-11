import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import StudentCard from "./pages/StudentCard";
import SubjectPage from "./pages/SubjectPage";
import SubjectCard from "./pages/SubjectCard";
// import RegisterPage from "./pages/RegisterPage";
import AuthForm from "./components/AuthForm/AuthForm";
// import NotFoundPage from "./Pages/NotFoundPage";
// import AboutPage from "./Pages/AboutPage";
import ErrorPage from "./pages/ErrorPage";
import { userConfirmation } from "./Users/AccountApi";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: userConfirmation,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <AuthForm/>,
      },
      {
        path: "home",
        element: <HomePage />,
      },
      // {
      //   path: "register",
      //   element: <RegisterPage />,
      // },

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
