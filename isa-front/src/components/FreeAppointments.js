import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/table.css"
import Navbar from "./Navbar";

const FreeAppointments = () => {
    const company = JSON.parse(localStorage.getItem("selectedCompany"));
    const [appointments, setAppointments] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        const loggedRole = localStorage.getItem("loggedRole");
        if (loggedRole !== 'ROLE_USER') {
          navigate("/");
        }
        fetchAppointments();
    }, []);
    
    const fetchAppointments = async () => {
        try {
          const response = await fetch("http://localhost:8080/api/appointment/available/" + company.id, {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: token
            },
          });
          const data = await response.json();
          const sortedDates = data.sort((a, b) => dateForSort(a.startDate) - dateForSort(b.startDate));
          setAppointments(sortedDates);
        } catch (error) {
          console.log("Error fetching comapnies:", error);
        }
    };
    const dateForSort = (dateString) => {
        const year = dateString[0];
        const month = dateString[1];
        const day = dateString[2];
        const hours = dateString[3];
    
        // Create a new Date object using the parsed components
        const formattedDate = new Date(year, month - 1, day, hours, 0, 0);
    
       
        return formattedDate;
    };
      

    
    const fuelSelectClickHandler = async (appointment) => {
        const selectedEquipmentId = localStorage.getItem("selectedEquipmentId");
        const response = await fetch("http://localhost:8080/api/appointment/take/" + appointment.id + "/" + selectedEquipmentId, {
            method: "PUT", 
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: token
            },
        });
        if(response.status === 400){
            return window.alert("Cant make apoointment!")
        }
        
        const data = await response.json();
        navigate("/thankYouMessage");
    };

    
    const formatDate = (dateString) => {
        const year = dateString[0];
        const month = dateString[1];
        const day = dateString[2];
        const hours = dateString[3];
    
        // Create a new Date object using the parsed components
        const formattedDate = new Date(year, month - 1, day, hours, 0, 0);
    
        // Format the date to a string in your desired format
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return formattedDate.toLocaleDateString('en-US', options);
    };
    


    return (
    <div>
        <Navbar></Navbar>
        <div className="game-history-container">
        <div className="game-history-table-container">
           
            <table className="game-history-table">
            <thead>
                <tr>
                <th>Start Date</th>
                <th>Duration</th>
                <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {appointments.map((appoint) => (
                    <tr onClick={() => fuelSelectClickHandler(appoint)} key={appoint.id}>
                    <td>{formatDate(appoint.startDate) }</td>
                    <td>{appoint.duration}</td>
                    <td>{appoint.status}</td>
                    </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    </div>
    );
}

export default FreeAppointments;