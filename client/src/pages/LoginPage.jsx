import axios from "axios";

export default function LoginPage() {
  const LoginUser = async () => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/v1/accounts/login`,
      );

      console.log(response.data);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };
  LoginUser();

  return (
    <>
      <h1>Login</h1>
    </>
  );
}
