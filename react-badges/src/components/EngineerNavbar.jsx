import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./navStyle.css";
const EngineerNavbar = () => {
  return (
    <div className="navbar-style">
      <Link to="/engineers">
        <Button>Show All Engineers</Button>
      </Link>
      <Link to="/engineer/create">
        <Button>Add New Engineer</Button>
      </Link>
    </div>
  );
};

export default EngineerNavbar;
