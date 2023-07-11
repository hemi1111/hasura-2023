import React from "react";
import BasicPage from "../../layouts/BasicPage/BasicPage";
import { Typography,Button } from "@mui/material";
const BadgesPage = () => {
  return (
    <div>
        <div
      position="static"
      style={{
        height: "fit-content",
        display: "flex",
        flexDirection: "row",
        padding: "10px",
        justifyContent: "space-evenly"
      }}
    >
      <Button color="inherit">Show All Badges</Button>
      <Button color="inherit">Create New Badge</Button>
    </div>
    </div>
  );
};

export default BadgesPage;
