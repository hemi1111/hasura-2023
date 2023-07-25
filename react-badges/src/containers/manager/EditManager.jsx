import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import Notification from "../../views/backoffice/Notification";
import {
  ADD_RELATION,
  DELETE_RELATION,
  GET_ENGINEERS_BY_MANAGER,
  GET_MANAGER,
  GET_UNASSIGNED_ENGINEERS,
  UPDATE_MANAGER
} from "../../queries/ManagerQueries";
import { Box, Button, Typography } from "@mui/material";
import EngineerManagers from "../../components/engineer-components/form/EngineerManagers";
import EngineerRelations from "../../components/engineer-components/form/EngineerRelations";
import UserForm from "../../components/UserForm";
const EditManager = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [notify, setNotify] = useState({
    isOpen: false,
    type: "",
    message: ""
  });
  const { data, loading, error } = useQuery(GET_MANAGER, {
    variables: { id }
  });

  const [getUnassignedEngr, { data: engineers }] = useMutation(
    GET_UNASSIGNED_ENGINEERS
  );

  const [
    getEngineerByMngr,
    { data: dataEngr, loading: loadingEngr, error: errorEngr }
  ] = useMutation(GET_ENGINEERS_BY_MANAGER);

  const [addRelation, { error: relationError }] = useMutation(ADD_RELATION, {
    onCompleted: () => {
      getEngineerByMngr({
        variables: { id }
      });
      getUnassignedEngr({
        variables: { manager: id }
      });
    }
  });

  const [updateManager] = useMutation(UPDATE_MANAGER, {
    refetchQueries: [{ query: GET_MANAGER, variables: { id } }]
  });

  const [deleteRelation] = useMutation(DELETE_RELATION, {
    onCompleted: () => {
      getEngineerByMngr({
        variables: { id }
      });
      getUnassignedEngr({
        variables: { manager: id }
      });
    }
  });

  useEffect(() => {
    const manager = parseInt(id);
    getUnassignedEngr({
      variables: { manager }
    });
    getEngineerByMngr({
      variables: { id: manager }
    });
  }, [data]);

  const handleDelete = (engrId) => {
    deleteRelation({
      variables: { manager_id: id, engineer_id: engrId }
    });

  };

  const createRelation = ({ engineer }) => {
    const manager = parseInt(id);
    addRelation({
      variables: { manager, engineer }
    });
    if (!relationError) {
      setNotify({
        isOpen: true,
        message: "Relation created successfuly",
        type: "success"
      });
    } else {
      setNotify({
        isOpen: true,
        message: "Relation not created",
        type: "error"
      });
    }
  };
  const handleName = (e) => {
    const { name } = e;
    updateManager({
      variables: { id, name }
    });
    setNotify({
      isOpen: true,
      message: "Updated successfuly",
      type: "success"
    });
  };
  const managerName = data?.managers[0].name;

  return (
    <>
      <Box
        sx={{
          m: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Typography variant="h4" sx={{ m: 2 }}>
          Edit Engineers for {managerName}:
        </Typography>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap"
          }}
        >
          {managerName && (
            <UserForm name={managerName} onSubmit={handleName} manager={true} />
          )}
          <EngineerManagers
            onAdd={createRelation}
            managers={engineers?.get_unassigned_engineers}
            manager={true}
          />
        </div>
        <div
          style={{
            width: "100%",
            maxWidth: "82ch"
          }}
        >
          <EngineerRelations
            name={data?.managers?.name}
            onDelete={handleDelete}
            onEdit={() => {
              console.log(data);
            }}
            notRelatedManagers={engineers}
            managers={dataEngr?.get_engineers_by_manager}
            manager={true}
          />
        </div>

        <Button
          sx={{ padding: 1.5, m: 1, width: "40ch" }}
          variant="outlined"
          onClick={() => navigate("/managers")}
        >
          Go Back
        </Button>
      </Box>
      {notify.isOpen && <Notification notify={notify} setNotify={setNotify} />}
    </>
  );
};

export default EditManager;
