import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/form.css";
import { useState, useEffect } from "react";

const CreateComplaint = () => {
    const navigate = useNavigate();
  
    const [complaint, setComplaint] = useState({
        text: "",
        adminId: 0,
        companyId: 0,
    });
    const token = localStorage.getItem("token");
    const [admins, setAdmins] = useState([]);
    const [companies, setCompanies] = useState([]);

    const [complaintType, setComplaintType] = useState('type1'); 
  

    useEffect(() => {
        fetchAdmins();
        fetchCompanies();
    }, []);

    const fetchAdmins = async () => {
        try {
          const response = await fetch("http://localhost:8080/api/user/allAdmins", {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: token
            },
          });
          const data = await response.json();
          setAdmins(data);
        } catch (error) {
          console.log("Error fetching comapnies:", error);
        }
    };
    const fetchCompanies = async () => {
        try {
          const response = await fetch("http://localhost:8080/api/company", {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: token
            },
          });
          const data = await response.json();
          setCompanies(data);
        } catch (error) {
          console.log("Error fetching comapnies:", error);
        }
    };

    const handleChange = (event) => {
        setComplaint({
        ...complaint,
        [event.target.name]: event.target.value,
        });
    };
    const handleComplaintTypeChange = (event) => {
        setComplaintType(event.target.value);
        setComplaint({
          ...complaint,
          ['adminId']: 0,
          ['companyId']: 0,
          });
      };

    const onCreateSubmit = async (event) => {
      fetch("http://localhost:8080/api/complaint", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: token
         },
        body: JSON.stringify(complaint),
      })
        .then((response) => {
          if (response.status === 400) {
            return window.alert("You are not allowed to make this complaint! Are you sure you had appointment with selected admin/company?");
          }
  
          window.alert("Thank you for helping us to improve our service.");
          return navigate("/");
        })
        .catch((error) => {
          console.error(error);
          window.alert("An error occurred during complaint making.");
        });
    };
    const onCancelClickHandler = () => {
        return navigate("/home");
      };

  

    return (
      <div className="registration-form-container">
        <div className="registration-form-wrapper">
          <form className="registration-form" onSubmit={onCreateSubmit}>
            <div className="radio-group">
              <label className="item">
                <input
                  type="radio"
                  name="complaintType"
                  value="type1"
                  checked={complaintType === "type1"}
                  onChange={handleComplaintTypeChange}
                />
                On company admin
              </label>
              <label className="item">
                <input
                  type="radio"
                  name="complaintType"
                  value="type2"
                  checked={complaintType === "type2"}
                  onChange={handleComplaintTypeChange}
                />
                On company
              </label>
            </div>

            {complaintType === "type1" ? (
              <div className="select-group">
                <label htmlFor="adminId" className="item">
                  Select Admin
                </label>
                <select
                  name="adminId"
                  value={complaint.adminId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select an Admin</option>
                  {admins.map((admin) => (
                    <option key={admin.id} value={admin.id}>
                      {admin.name}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="select-group">
                <label htmlFor="companyId" className="item">
                  Select Company
                </label>
                <select
                  name="companyId"
                  value={complaint.companyId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Company</option>
                  {companies.map((company) => (
                    <option key={company.id} value={company.id}>
                      {company.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="input-group">
              <label htmlFor="text" className="item">
                Text
              </label>
              <textarea
                onChange={handleChange}
                name="text"
                rows="4" // Specify the number of rows you want to display
                required
              />
            </div>

            <div className="button-group">
              <button className="item" type="submit">
                Submit
              </button>
              <button type="button" onClick={onCancelClickHandler}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
};

export default CreateComplaint;
