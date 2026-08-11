import { useState } from "react";
import { userAuth } from "../../Users/AccountApi";
import { useNavigate } from "react-router-dom";

const AuthForm = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const loggedInUser = await userAuth(email, password, register);
    if (!loggedInUser) return;
    setUser(loggedInUser);
    setRegister(true);
    setEmail("");
    setPassword("");
    navigate("/home");
  };

  return (
  
      <div className="mx-auto mt-10 max-w-md rounded-lg bg-white p-6 shadow">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-800">
          {register ? "Register" : "Login"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1 block font-semibold text-gray-700"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block font-semibold text-gray-700"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
          >
            {register ? "Register" : "Login"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => setRegister(!register)}
          className="mt-4 w-full text-sm font-semibold text-blue-600 hover:underline"
        >
          {register
            ? "Already have an account? Login"
            : "Don't have an account? Register"}
        </button>
      </div>
    
  );
};
export default AuthForm;

