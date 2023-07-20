import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import EngineersList from "../../containers/engineer/EngineersList";

const EngineerPage = () => {
  return (
    <>
      <Link to="/engineer/create">
        <Button
          variant="outlined"
          sx={{ padding: 1.5, m: 2, float: "right", marginBottom: 0 }}
        >
          Add New Engineer
        </Button>
      </Link>
      <EngineersList />
    </>
  );
};

export default EngineerPage;
