import React, { useState } from "react";
import BadgeDisplay from "../../components/badges-components/table/BadgeDisplay";
import { TextField } from "@mui/material";
const BadgesPage = () => {
  const [searchBar, setSearchBar] = useState("");

  return (
    <div>
      <TextField
        sx={{ margin: "1em" }}
        label="Search..."
        variant="outlined"
        value={searchBar}
        onChange={(e) => setSearchBar(e.target.value)}
      />
      <BadgeDisplay search={searchBar} />
    </div>
  );
};

export default BadgesPage;
