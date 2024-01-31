import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Companies from "./components/Companies";
import ViewCompany from "./components/ViewCompany";
import AllEquipment from "./components/Equipment";

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
      </Routes>
    </Router>
  );
}

export default App;