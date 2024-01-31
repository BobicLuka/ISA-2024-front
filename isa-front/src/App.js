import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Companies from "./components/Companies";
import ViewCompany from "./components/ViewCompany";
import AllEquipment from "./components/Equipment";
import FreeAppointments from "./components/FreeAppointments";
import ThankYouMessage from "./components/ThankYouMessage";
import MyAppointments from "./components/MyAppointments";
import CreateComplaint from "./components/CreateComplaint";
import MyComplaints from "./components/MyComplaints";
import CreateComplaintResponse from "./components/CreateComplaintResponse";
import ComplaintsToRespond from "./components/ComplaintsToRespond";
import MyProfile from "./components/MyProfile";

function App() {
  const [selectedFuel, setSelectedFuel] = useState({});
  const [selectedVehicle, setSelectedVehicle] = useState({});

  return (
    <Router>
      <Routes>
        <Route index path="/" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/equipment" element={<AllEquipment />} />
        <Route path="/viewCompany" element={<ViewCompany />} />
        <Route path="/freeAppointments" element={<FreeAppointments />} />
        <Route path="/thankYouMessage" element={<ThankYouMessage />} />
        <Route path="/myAppointments" element={<MyAppointments />} />
        <Route path="/createComplaint" element={<CreateComplaint />} />
        <Route path="/myComplaints" element={<MyComplaints />} />
        <Route path="/complaintsToRespond" element={<ComplaintsToRespond />} />
        <Route path="/createComplaintResponse" element={<CreateComplaintResponse />} />
        <Route path="/myProfile" element={<MyProfile />} />
      </Routes>
    </Router>
  );
}

export default App;