import React from "react";
import "./navStyle.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const ManagerNavbar = () => {
  const navigate = useNavigate();
  const handleShowConnection = () => {
    navigate("/managers");
  };
  const handleCreateConnection = () => {
    navigate("/managers/create");
  };
  return (
    <div className="navbar-style">
      <Button color="inherit" onClick={handleShowConnection}>
        Show All Connections
      </Button>
      <Button color="inherit" onClick={handleCreateConnection}>
        Create New Connection
      </Button>
    </div>
  );
};

export default ManagerNavbar;
