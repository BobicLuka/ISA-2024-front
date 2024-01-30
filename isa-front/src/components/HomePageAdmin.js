import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/table.css"
import LogOutButton from "./LogOutButton";

const HomePageAdmin = () => {
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate()
  
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("https://localhost:7220/api/user/", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: token,
        },
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  const handleBlock = async (userID) => {
    try {
      const response = await fetch(`https://localhost:7220/api/user/blockUser/${userID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: token
        },
      })
      fetchUsers()
    } catch (error) {
      console.log(`Error blocking user ${userID}:`, error);
    }
  };


  return (
    <div>
      <div className="game-history-container">
        <div className="game-history-table-container">
          <table className="game-history-table">
            <thead>
              <tr>
                <th>Blocked</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Name</th>
                <th>Surname</th>
                <th>User Type</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.blocked ? "Yes" : "No"}</td>
                  <td>{user.email}</td>
                  <td>{user.gender === 0 ? "Male" : "Female"}</td>
                  <td>{user.name}</td>
                  <td>{user.surname}</td>
                  <td>
                    {user.userType === 0
                      ? "User"
                      : user.userType === 1
                      ? "Manager"
                      : user.userType === 2 ? "Admin" : 
                      user.userType === 3 ? "Driver" : 
                      user.userType === 4 ? "ProductionManager" : 
                      user.userType === 5 ? "ProductionWorker" : 
                      user.userType === 6 ? "SalesDirector" :  "SalesWorker"
                    }
                  </td>
                  <td>
              <button onClick={() => handleBlock(user.id)} disabled={user.blocked}>
                {user.blocked ? "Blocked" : "Block"}
              </button>
            </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <LogOutButton></LogOutButton>
    </div>
  );
};

export default HomePageAdmin;
