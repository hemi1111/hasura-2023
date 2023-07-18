import React, { useEffect, useState } from "react";
import ManagerNavbar from "../../components/ManagerNavbar";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_MANAGER,
  GET_MANAGERS,
  UPDATE_MANAGER
} from "../../queries/ManagerQueries";
import { Button, FilledInput } from "@mui/material";
const EditManager = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_MANAGER, {
    variables: { id }
  });
  const [updateManager] = useMutation(UPDATE_MANAGER, {
    refetchQueries: [
      {
        query: GET_MANAGERS
      }
    ]
  });

  const [managerName, setManagerName] = useState();
  useEffect(() => {
    if (data) setManagerName(data.managers[0].name);
  }, [data]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = managerName;
    if (name)
      updateManager({
        variables: { id, name }
      });
    console.log("updated");
  };

  if (loading) return <p>Loadin...</p>;
  if (error) throw error;
  return (
    <div>
      <ManagerNavbar />
      <form onSubmit={handleSubmit}>
        <FilledInput
          value={managerName}
          onChange={(e) => {
            setManagerName(e.target.value);
          }}
        />
        <Button variant="outlined" type="submit">
          Save
        </Button>
      </form>
    </div>
  );
};

export default EditManager;
