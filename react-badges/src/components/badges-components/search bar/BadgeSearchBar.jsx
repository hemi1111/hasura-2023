import React from "react";
import { TextField } from "@mui/material";
import { Search } from "@mui/icons-material";

const BadgeSearchBar = ({ searchBar, setSearchBar }) => {
  return (
    <div>
      <TextField
        sx={{ margin: "1em", width: "250px" }}
        label="Search Badge"
        variant="outlined"
        value={searchBar}
        onChange={(e) => setSearchBar(e.target.value)}
        InputProps={{
          startAdornment: <Search />
        }}
      />
    </div>
  );
};

export default BadgeSearchBar;
