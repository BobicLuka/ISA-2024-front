import React from "react";
import { Link } from "react-router-dom";
import "../css/navbar.css";

const Navbar = () => {

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">Login</Link>
        </li>
        <li>
          <Link to="/companies">All companies</Link>
        </li>
        <li>
          <Link to="/myProfile">Profile</Link>
        </li>
        <li>
          <Link to="/myProfile">Profile</Link>
        </li>
        <li>
          <Link to="/myProfile">Profile</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
