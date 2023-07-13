import { useEffect, useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import BasicPage from "../../layouts/BasicPage/BasicPage";
import FakeContent from "../../components/FakeContent";
import { Button, Typography } from "@mui/material";
import ManagerNavbar from "../../components/ManagerNavbar";
import {
  ADD_RELATION,
  GET_ENGINEERS_BY_MANAGER,
  GET_MANAGERS
} from "../../queries/ManagerQueries";
import TableComp from "./TableComp";

const ManagerEngineer = () => {
  const [manager, setManager] = useState(null);
  const [engineer, setEngineer] = useState(null);
  const [getEngineerByMngr, { loading: loadingEngByMngr }] = useMutation(
    GET_ENGINEERS_BY_MANAGER
  );

  const { loading, data, error } = useQuery(GET_MANAGERS, {
    refetchQueries: () => {
      query: GET_MANAGERS;
    }
  });

  const [addRelation, r2] = useMutation(ADD_RELATION);

  const dothis = () => {
    addRelation({
      variables: { manager, engineer }
    });
  };
  console.log(data);
  if (loading) return "loading...";
  if (error) throw r1.error;

  return (
    <div>
      <ManagerNavbar />
      <Typography variant="h6" sx={{ marginTop: "20px", marginBottom: "5px" }}>
        Manager-Engineer Connection
      </Typography>
      {manager} - {engineer}
      <div>
        <h4>Managers</h4>
        <select onChange={(e) => setManager(e.target.value)}>
          {data.managers.map((record) => (
            <option key={record.id} value={record.id} defaultValue={record}>
              {record.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h4>Engineers</h4>
        <select onChange={(e) => setEngineer(e.target.value)}>
          {data.engineers.map((record) => (
            <option key={record.id} value={record.id}>
              {record.name}
            </option>
          ))}
        </select>
      </div>
      <Button onClick={dothis}>Add</Button>
      <hr></hr>
      {data.managers.map((manager) => {
        return <li>{manager.name}</li>;
      })}
      <hr></hr>
      <TableComp r1={data} />
    </div>
  );
};

export default ManagerEngineer;
