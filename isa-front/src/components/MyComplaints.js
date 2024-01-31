import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/table.css"
import Navbar from "./Navbar";

const MyComplaints = () => {
    const [complaints, setComplaints] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
      const loggedRole = localStorage.getItem("loggedRole");
      if (loggedRole !== 'ROLE_USER') {
        navigate("/");
      }
        fetchComplaints();
    }, []);
    
    const fetchComplaints = async () => {
        try {
          const response = await fetch("http://localhost:8080/api/complaint/forUser", {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: token
            },
          });
          const data = await response.json();
          setComplaints(data);
        } catch (error) {
          console.log("Error fetching comapnies:", error);
        }
    };
      

    


    return (
    <div>
      <Navbar></Navbar>
        <div className="game-history-container">
        <div className="game-history-table-container">
            <table className="game-history-table">
            <thead>
                <tr>
                <th>Text</th>
                <th>Admin name</th>
                <th>Company Name</th>
                <th>Response</th>
                <th>Who responded</th>
                </tr>
            </thead>
            <tbody>
                {complaints.map((complaint) => (
                    <tr key={complaint.id}>
                    <td>{complaint.text }</td>
                    <td>{complaint.adminName}</td>
                    <td>{complaint.companyName}</td>
                    <td>{complaint.response}</td>
                    <td>{complaint.adminWhoRespondedName}</td>
                    </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    </div>
    );
}

export default MyComplaints;