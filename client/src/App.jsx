import NavBar from "./components/NavBar/NavBar";
import "./index.css";
import { Outlet, useLoaderData } from "react-router-dom";
import { useState } from "react";

function App() {
  const loaderUser = useLoaderData();
  const [user, setUser] = useState(loaderUser);
  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <Outlet context={{ user, setUser }} />
    </>
  );
}

export default App;
