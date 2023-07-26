import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import EngineersList from "../../containers/engineer/EngineersList";
import { Search } from "@mui/icons-material";

const EngineerPage = () => {
  const [filter, setFilter] = useState("");
  
  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <TextField
          value={filter}
          label="Search Engineer"
          onChange={(e) => setFilter(e.target.value)}
          sx={{ display: "flex", maxWidth: "40ch", m: 2, marginBottom: 0 }}
          InputProps={{
            startAdornment: <Search />
          }}
        />
        <Link to="/engineer/create">
          <Button
            variant="outlined"
            sx={{
              padding: 1.5,
              m: 2,
              marginBottom: 0
            }}
          >
            Add New Engineer
          </Button>
        </Link>
      </div>
      <EngineersList filter={filter} />
    </>
  );
};

export default EngineerPage;
