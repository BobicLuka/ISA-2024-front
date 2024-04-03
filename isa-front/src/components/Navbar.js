import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../css/navbar.css";

const Navbar = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("loggedRole");
    const navigate = useNavigate();


    const logoutClickHandler = () => {
        localStorage.clear()
        navigate('/')
    }
  return (
    <nav className="navbar">
      <ul>
      {role === "ROLE_USER" && (
        <>
          <li>
            <Link to="/companies">All companies</Link>
          </li>
          <li>
            <Link to="/myAppointments">My appointments</Link>
          </li>
          <li>
            <Link to="/createComplaint">Create Complaint</Link>
          </li>
          <li>
            <Link to="/myComplaints">My complaints</Link>
          </li>
          <li>
            <Link to="/myProfile">Profile</Link>
          </li>
        </>
      )}

      {role === "ROLE_SYSTEM_ADMIN" && (
        <>
          <li>
            <Link to="/complaintsToRespond">Complaints to respond</Link>
          </li>
          <li>
            <Link to="/myProfile">My profile</Link>
          </li>
        </>
      )}

      {role === "ROLE_ADMIN" && (
        <>
          <li>
            <Link to="/myProfile">My profile</Link>
          </li>
        </>
      )}

      <li>
        <button onClick={logoutClickHandler}>Log out</button>
      </li>
    
    </ul>
      
     
    </nav>
  );
};

export default Navbar;
