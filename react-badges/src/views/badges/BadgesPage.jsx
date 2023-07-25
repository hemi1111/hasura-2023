import React, { useState } from "react";
import BadgeDisplay from "../../components/badges-components/table/BadgeDisplay";
import { TextField } from "@mui/material";
import { Search } from "@mui/icons-material";

const BadgesPage = () => {
  const [searchBar, setSearchBar] = useState("");

  return (
    <div>
      <TextField
        sx={{ margin: "1em", width: "250px" }}
        label="Search for Badge..."
        variant="outlined"
        value={searchBar}
        onChange={(e) => setSearchBar(e.target.value)}
        InputProps={{
          startAdornment: <Search />
        }}
      />
      <BadgeDisplay search={searchBar} />
    </div>
  );
};

export default BadgesPage;
