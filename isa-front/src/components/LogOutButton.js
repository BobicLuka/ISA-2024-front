import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/table.css"
import "../css/homePage.css"

const LogOutButton = () => {
    const navigate = useNavigate()


  const logoutClickHandler = () => {
    localStorage.clear()
    navigate('/')
  }

  return (
    <div>
        <button className="button-right_bottom" onClick={logoutClickHandler}> LogOut</button>
    </div>
  )

}

export default LogOutButton