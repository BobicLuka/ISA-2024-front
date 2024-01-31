import React from "react";
import Navbar from "./Navbar";

const ThankYouMessage = () => {
  return (
    <div>
      <Navbar></Navbar>
      <h2>Thank you for making an appointment!</h2>
      <p>Your appointment has been successfully scheduled.</p>
    </div>
  );
};

export default ThankYouMessage;
