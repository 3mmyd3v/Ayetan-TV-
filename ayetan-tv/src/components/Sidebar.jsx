import { Link } from "react-router-dom";

function Navbar({ toggleSidebar }) {
  return (
    <div
      style={{
        background: "#111",
        color: "white",
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
      {/* Left: Hamburger + Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {/* Hamburger button */}
        <button
          onClick={toggleSidebar}
          style={{
            background: "transparent",
            border: "none",
            color: "white",
            fontSize: "24px",
            cursor: "pointer",
            display: "none", // show only on mobile with media queries
          }}
          className="hamburger-btn">
          &#9776;
        </button>

        {/* Logo */}
        <Link
          to="/"
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "20px",
          }}>
          AYETAN TV
        </Link>
      </div>

      {/* Right: Sign In */}
      <Link
        to="/login"
        style={{
          background: "#f1c40f",
          color: "#111",
          padding: "5px 12px",
          borderRadius: "5px",
          fontWeight: "bold",
          textDecoration: "none",
        }}>
        Sign In
      </Link>
    </div>
  );
}

export default Navbar;
