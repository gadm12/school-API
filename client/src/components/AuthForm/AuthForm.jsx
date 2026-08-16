import clsx from "clsx";
import { useState } from "react";
import {
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import { userAuth } from "../../Users/AccountApi";

const AuthForm = () => {
  const { setUser } = useOutletContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMsg("");

    const result = await userAuth(
      email,
      password,
      register,
    );

    const { user: loggedInUser, error } = result;

    if (error) {
      setErrorMsg(error);
      return;
    }
    if (register) {
      setRegister(false);
      setPassword("");
      setErrorMsg("");
      return;
    }

    setUser(loggedInUser);
    setEmail("");
    setPassword("");
    navigate("/home");
  };

  return (
    <div className="mx-auto mt-10 max-w-md rounded-lg bg-white p-6 shadow">
      <div className="mb-6 flex justify-center gap-3">
        <button
          type="button"
          onClick={() => {
            setRegister(false);
            setErrorMsg("");
          }}
          className={clsx(
            "rounded-lg px-6 py-2 font-semibold transition",
            !register
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-500",
          )}
        >
          Login
        </button>

        <button
          type="button"
          onClick={() => {
            setRegister(true);
            setErrorMsg("");
          }}
          className={clsx(
            "rounded-lg px-6 py-2 font-semibold transition",
            register
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-500",
          )}
        >
          Sign Up
        </button>
      </div>

      <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
        {register ? "Create Account" : "Login"}
      </h1>

      {errorMsg && (
        <div className="mb-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">
          {errorMsg}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="space-y-4"
      >
        <div>
          <label
            htmlFor="school-email"
            className="mb-1 block font-semibold text-gray-700"
          >
            Email
          </label>

          <input
            id="school-email"
            name="school-demo-email"
            type="email"
            autoComplete="new-email"
            value={email}
            onChange={(event) =>
              setEmail(event.target.value)
            }
            placeholder="Enter your email"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <label
            htmlFor="school-password"
            className="mb-1 block font-semibold text-gray-700"
          >
            Password
          </label>

          <input
            id="school-password"
            name="school-demo-password"
            type="password"
            autoComplete={
              register ? "new-password" : "new-password"
            }
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            placeholder="Enter your password"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
        >
          {register ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
