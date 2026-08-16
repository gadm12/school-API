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
import {
  redirectIfLoggedIn,
  requireLogin,
  userConfirmation,
} from "./Users/AccountApi";
import BooksPage from "./pages/BookPage";
import BookCard from "./pages/BookCard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: userConfirmation,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <AuthForm />,
        loader: redirectIfLoggedIn,
      },
      {
        path: "home",
        element: <HomePage />,
        loader: requireLogin,
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
      {
        path: "book",
        element: <BooksPage />,
      },
      {
        path: "/books/:id",
        element: <BookCard />,
      },
      //   {
      //     path: "*",
      //     element: <NotFoundPage />,
      //   },
    ],
  },
]);

export default router;
