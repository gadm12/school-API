import NavBar from "./components/NavBar/NavBar";
import "./index.css";
import { Outlet } from "react-router-dom";
import { account } from "./Users/AccountApi";

function App() {
  return (
    <>
      <NavBar />
      <Outlet />
      
    </>
  );
}

export default App;
