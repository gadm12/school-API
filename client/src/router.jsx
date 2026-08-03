import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
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
    //   {
    //     path: "about",
    //     element: <AboutPage />,
    //   },
    //   {
    //     path: "*",
    //     element: <NotFoundPage />,
    //   },
    ],
  },
]);

export default router;