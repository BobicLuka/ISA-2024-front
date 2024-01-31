import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/table.css"

const ViewCompany = () => {
    const company = JSON.parse(localStorage.getItem("selectedCompany"));
    const [equipment, setEquipment] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchEquipment();
    }, []);
    
    const fetchEquipment = async () => {
        try {
          const response = await fetch("http://localhost:8080/api/equipment/search/?companyId=" + company.id + "&name=" + searchQuery, {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
          });
          const data = await response.json();
          setEquipment(data);
        } catch (error) {
          console.log("Error fetching comapnies:", error);
        }
    };

      

    
    const fuelSelectClickHandler = (selectedEquipment) => {
        localStorage.setItem("selectedEquipmentId", selectedEquipment.id);
        navigate("/freeAppointments");
    };

    const handleSearch = async () => {
        fetchEquipment();
      };


    return (
    <div>
        <div className="game-history-container">
        <div className="game-history-table-container">
            <div className="search-container">
                <input
                type="text"
                placeholder="Search companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <table className="game-history-table">
            <thead>
                <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Company Name</th>
                </tr>
            </thead>
            <tbody>
                {equipment.map((eq) => (
                    <tr onClick={() => fuelSelectClickHandler(eq)} key={eq.id}>
                    <td>{eq.name }</td>
                    <td>{eq.price}</td>
                    <td>{eq.companyName}</td>
                    
                    </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    </div>
    );
}

export default ViewCompany;