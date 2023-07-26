import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import EngineersList from "../../containers/engineer/EngineersList";

const EngineerPage = () => {
  const [filter, setFilter] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);

  const handleSearch = (value) => {
    setFilter(value);
    searchTimeout && clearTimeout(searchTimeout);
    setSearchTimeout(setTimeout(() => {}, 1000));
  };
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
          label="Search..."
          onChange={(e) => handleSearch(e.target.value)}
          sx={{ display: "flex", maxWidth: "40ch", m: 2, marginBottom: 0 }}
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
