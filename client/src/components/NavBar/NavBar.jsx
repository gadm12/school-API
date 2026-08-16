import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Button";
import { userLogOut } from "../../Users/AccountApi";
import clsx from "clsx";

export default function NavBar({ user, setUser }) {
  const [searchStudent, setSearchStudent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!searchStudent.trim()) return;
    navigate(`/students/${searchStudent}`);
    setSearchStudent("");
  };

  const handleLogOut = async () => {
    setUser(await userLogOut());
    navigate("/");
  };
  const name = user?.split("@")[0];
  console.log("NAV USER:", user);

  return (
    <>
      <div
        className={clsx(
          "mx-auto mt-2 mb-8 flex max-w-4xl items-center rounded-lg border border-black-300 bg-white p-4 shadow",
          !user && "justify-center",
        )}
      >
        <h3 className="text-2xl font-bold text-gray-800">
          School API
        </h3>

        {user && (
          <>
            <nav className="ml-6 flex gap-2">
              <Link to="/home">
                <Button>Home</Button>
              </Link>

              <Link to="/book">
                <Button>Books</Button>
              </Link>

              <Link to="/subjects">
                <Button>Subjects</Button>
              </Link>
            </nav>

            <form
              onSubmit={handleSubmit}
              className="ml-auto flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Search student..."
                value={searchStudent}
                onChange={(e) =>
                  setSearchStudent(e.target.value)
                }
                className="rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              />

              <Button
                type="submit"
                className="rounded-md bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
              >
                Search
              </Button>
            </form>

            <div className="ml-4 font-semibold text-gray-700">
              Hi{" "}
              <span className="text-blue-600">{name}</span>
            </div>

            <button
              onClick={handleLogOut}
              className="ml-3 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </>
  );
}
