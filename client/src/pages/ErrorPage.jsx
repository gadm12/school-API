import { useRouteError, Link } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error.response?.data || error.message);

  return (
    <>
      <h1>Something went wrong!</h1>
      <p>{error?.message ?? "Unknown Error"}</p>
      <Link to="/">Back to the login page</Link>
    </>
  );
};

export default ErrorPage;
