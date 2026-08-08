import axios from "axios";

export default function RegisterPage() {
  const registerUser = async () => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/v1/accounts/register`,
      );

      console.log(response.data);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };
  registerUser();

  return (
    <>
      <h1>Register</h1>
    </>
  );
}
