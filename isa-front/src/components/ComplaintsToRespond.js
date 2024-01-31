import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/table.css"

const ComplaintsToRespond = () => {
    const [complaints, setComplaints] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchComplaints();
    }, []);
    
    const fetchComplaints = async () => {
        try {
          const response = await fetch("http://localhost:8080/api/complaint/withoutResponse", {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: token
            },
          });
          const data = await response.json();
          setComplaints(data);
        } catch (error) {
          console.log("Error fetching complaints:", error);
        }
    };

    const complaintSelectClickHandler = (complaint) => {
        localStorage.setItem("selectedComplaintId", complaint.id);
        navigate("/createComplaintResponse");
    };
      

    return (
    <div>
        <div className="game-history-container">
        <div className="game-history-table-container">
            <table className="game-history-table">
            <thead>
                <tr>
                <th>Text</th>
                <th>Admin name</th>
                <th>Company Name</th>
                <th>Complainant Name</th>
                </tr>
            </thead>
            <tbody>
                {complaints.map((complaint) => (
                    <tr onClick={() => complaintSelectClickHandler(complaint)} key={complaint.id}>
                    <td>{complaint.text }</td>
                    <td>{complaint.adminName}</td>
                    <td>{complaint.companyName}</td>
                    <td>{complaint.complainantName}</td>
                    </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    </div>
    );
}

export default ComplaintsToRespond;