import { useEffect } from "react";
import { useQuery } from "@apollo/client";

import { GET_MANAGERS } from "../../queries/ManagerQueries";
import TableComp from "../../components/manager-components/table/TableComp";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const ManagerEngineer = () => {
  const { loading, data, error, refetch } = useQuery(GET_MANAGERS);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          margin: "20px 0"
        }}
      >
        <Link to="/managers/create">
          <Button variant="outlined">Add New Manager</Button>
        </Link>
      </div>
      <TableComp r1={data} />
    </>
  );
};

export default ManagerEngineer;
