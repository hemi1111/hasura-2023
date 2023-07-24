import { useEffect } from "react";
import { useQuery } from "@apollo/client";

import { GET_MANAGERS } from "../../queries/ManagerQueries";
import TableComp from "./TableComp";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const ManagerEngineer = () => {
  const { loading, data, error, refetch } = useQuery(GET_MANAGERS);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      <Link to="/managers/create">
        <Button variant="outlined" sx={{ padding: 1.5, m: 2, float: "right" }}>
          Add New Manager
        </Button>
      </Link>
      <TableComp r1={data} />
    </>
  );
};

export default ManagerEngineer;
