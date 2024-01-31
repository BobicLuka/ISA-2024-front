import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/table.css"

const Companies = () => {
    const token = localStorage.getItem("token");
    const [companies, setCompanies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchCompanies();
    }, []);
    
    const fetchCompanies = async () => {
        try {
          const response = await fetch("http://localhost:8080/api/company", {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
          });
          const data = await response.json();
          setCompanies(data);
        } catch (error) {
          console.log("Error fetching comapnies:", error);
        }
    };

      

    
    const fuelSelectClickHandler = (company) => {
        localStorage.setItem("selectedCompany", JSON.stringify(company));
        navigate("/viewCompany");
    };

    const handleSearch = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/company/search/?name=" + searchQuery, {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
              },
            });
            const data = await response.json();
            setCompanies(data);
          } catch (error) {
            console.log("Error fetching comapnies:", error);
          }
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
                <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {companies.map((company) => (
                    <tr onClick={() => fuelSelectClickHandler(company)} key={company.id}>
                    <td>{company.name }</td>
                    <td>{company.description}</td>
                    
                    </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    </div>
    );
}

export default Companies;