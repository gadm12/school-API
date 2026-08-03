import { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";


// import NavBar from "./components/NavBar/NavBar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      {/* <NavBar /> */}
      <Outlet />
    </>
  );
}

export default App;
