import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/form.css";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";

const CreateComplaintResponse = () => {
    const navigate = useNavigate();
  
    const [complaintResponse, setComplaintResponse] = useState({
        response: "",
        complaintId: localStorage.getItem("selectedComplaintId"),
    });
    const token = localStorage.getItem("token");
    
    useEffect(() => {
      const loggedRole = localStorage.getItem("loggedRole");
      if (loggedRole !== 'ROLE_SYSTEM_ADMIN') {
        navigate("/");
      }
  }, []);

    const handleChange = (event) => {
        setComplaintResponse({
        ...complaintResponse,
        [event.target.name]: event.target.value,
        });
    };

    const onCreateSubmit = async (event) => {
      event.preventDefault();
      fetch("http://localhost:8080/api/complaint/response", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: token
         },
        body: JSON.stringify(complaintResponse),
      })
        .then((response) => {
          if (response.status === 400) {
            return window.alert("You are not allowed to respond on this complaint.");
          }
  
          window.alert("Sent.");
          return navigate("/complaintsToRespond");
        })
        .catch((error) => {
          console.error(error);
          window.alert("An error occurred during complaint responding.");
        });
    };
   

  

    return (
      <div>
        <Navbar></Navbar>
        <div className="registration-form-container">
          <div className="registration-form-wrapper">
            <form className="registration-form" onSubmit={onCreateSubmit}>
              <div className="input-group">
                <label htmlFor="text" className="item">
                  Response
                </label>
                <textarea
                  onChange={handleChange}
                  name="response"
                  rows="10" // Specify the number of rows you want to display
                  required
                />
              </div>

              <div className="button-group">
                <button className="item" type="submit">
                  Submit
                </button>
                
              </div>
            </form>
          </div>
        </div>
      </div>
    );
};

export default CreateComplaintResponse;
