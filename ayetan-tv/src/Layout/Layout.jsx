import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Home from "../pages/Home";

function Layout() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Navbar />
   
      <div style={{ display: "flex", flex: 1 }}>
        {/* <Sidebar /> */}
        <div style={{ flex: 1,}}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;

