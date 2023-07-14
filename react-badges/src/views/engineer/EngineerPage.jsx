import React from "react";
import EngineerList from "../../components/engineer-components/EngineerList";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const EngineerPage = () => {
  return (
    <div>
      <div className="navbar-style">
        <Link to="/engineer/create">
          <Button>Add New Engineer</Button>
        </Link>
      </div>
      <EngineerList />
    </div>
  );
};

export default EngineerPage;
