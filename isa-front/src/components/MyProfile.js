import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const MyProfile = () => {
  // State to store user profile data
  
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    
    const token = localStorage.getItem("token");
    if (token === null) {
        navigate("/");
    }

    const fetchUserProfile = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/whoami", {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user profile:", error.message);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div>
        <Navbar></Navbar>
      <h2>User Profile</h2>
      {userData ? (
        <div>
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Username:</strong> {userData.username}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Role:</strong> {userData.role}</p>
          <p><strong>City:</strong> {userData.city}</p>
          <p><strong>Country:</strong> {userData.country}</p>
          <p><strong>Phone Number:</strong> {userData.phoneNumber}</p>
          <p><strong>Profession:</strong> {userData.profession}</p>
          <p><strong>Penalty Points:</strong> {userData.penaltyPoints}</p>
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
};

export default MyProfile;