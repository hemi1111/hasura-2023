import { useEffect } from "react";
import { useQuery } from "@apollo/client";

import { GET_MANAGERS } from "../../queries/ManagerQueries";
import TableComp from "./TableComp";

const ManagerEngineer = () => {
  const { loading, data, error, refetch } = useQuery(GET_MANAGERS);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div>
      <TableComp r1={data} />
    </div>
  );
};

export default ManagerEngineer;
