import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";

import { GET_MANAGERS } from "../../queries/ManagerQueries";
import TableComp from "../../components/manager-components/table/TableComp";
import { Link } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";

const ManagerEngineer = () => {
  const [search, setSearch] = useState("");
  const { loading, data, error, refetch } = useQuery(GET_MANAGERS, {
    variables: {
      name: `%${search}%`
    }
  });
  useEffect(() => {
    refetch();
  }, [search]);

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
          value={search}
          label="Search Manager"
          onChange={(e) => setSearch(e.target.value)}
          sx={{ display: "flex", maxWidth: "40ch", m: 2, marginBottom: 0 }}
          InputProps={{
            startAdornment: <Search />
          }}
        />
        <Link to="/managers/create">
          <Button variant="outlined" sx={{ m: 2, padding: "10px" }}>
            Add New Manager
          </Button>
        </Link>
      </div>
      <TableComp r1={data} search={search} />
    </>
  );
};

export default ManagerEngineer;
