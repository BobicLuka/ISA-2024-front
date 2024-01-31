import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/table.css"

const MyAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchAppointments();
    }, []);
    
    const fetchAppointments = async () => {
        try {
          const response = await fetch("http://localhost:8080/api/appointment/allFutureForUser", {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: token
            },
          });
          const data = await response.json();
          
          setAppointments(data);
        } catch (error) {
          console.log("Error fetching comapnies:", error);
        }
    };

      

    
    const cancelAppointment = async (appointment) => {
        const response = await fetch("http://localhost:8080/api/appointment/cancel/" + appointment.id, {
        method: "PUT", 
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token
        },
        });
        if(response.status === 400){
            return window.alert("Cant cancel your appointment!")
        }
        const data = await response.json();


        fetchAppointments();
       
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
        <div className="game-history-container">
        <div className="game-history-table-container">
           
            <table className="game-history-table">
            <thead>
                <tr>
                <th>Start Date</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Equipment Name</th>
                <th>Employee name</th>
                <th>Cancel</th>
                </tr>
            </thead>
            <tbody>
                {appointments.map((appoint) => (
                    <tr key={appoint.id}>
                    <td>{formatDate(appoint.startDate) }</td>
                    <td>{appoint.duration}</td>
                    <td>{appoint.status}</td>
                    <td>{appoint.equipmentName}</td>
                    <td>{appoint.administratorName}</td>
                    <td>
                        {appoint.status !== 'TAKEN' ? null : (
                            <button onClick={() => cancelAppointment(appoint)}>Cancel</button>
                        )}
                    </td>
                    </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    </div>
    );
}

export default MyAppointments;