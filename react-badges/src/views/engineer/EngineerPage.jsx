import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import EngineersList from "../../containers/engineer/EngineersList";

const EngineerPage = () => {
  return (
    <div>
      <div className="navbar-style">
        <Link to="/engineer/create">
          <Button>Add New Engineer</Button>
        </Link>
      </div>
      <EngineersList />
    </div>
  );
};

export default EngineerPage;
