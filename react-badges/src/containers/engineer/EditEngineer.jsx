import { useMutation, useQuery } from "@apollo/client";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import {
  ADD_ENGINEER_MANAGER_RELATION,
  DELETE_ENGINEER_MANAGER_RELATION,
  GET_ENGINEER_MANAGERS_RELATION,
  GET_MANAGER_WITHOUT_RELATION,
  UPDATE_ENGINEER,
  UPDATE_ENGINEER_MANAGER_RELATION
} from "../../queries/EngineerQueries";
import { useEffect, useState } from "react";
import EngineerRelations from "../../components/engineer-components/form/EngineerRelations";
import EngineerManagers from "../../components/engineer-components/form/EngineerManagers";
import UserForm from "../../components/UserForm";
import EditAlerts from "../../components/engineer-components/alerts/EditAlerts";

const EditEngineer = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showAlert, setShowAlert] = useState(0);

  const { data: relations, refetch } = useQuery(
    GET_ENGINEER_MANAGERS_RELATION,
    { variables: { id } }
  );

  const [getUnassignedManagers, { data }] = useMutation(
    GET_MANAGER_WITHOUT_RELATION,
    { variables: { id } }
  );

  const [updateEngineerName] = useMutation(UPDATE_ENGINEER, {
    onCompleted: () => {
      refetch();
      setShowAlert(4);
    },
    onError: () => setShowAlert(-4)
  });

  const [addRelation] = useMutation(ADD_ENGINEER_MANAGER_RELATION, {
    onCompleted: () => {
      refetch();
      getUnassignedManagers();
      setShowAlert(3);
    },
    onError: () => setShowAlert(-3)
  });

  const [deleteRelation] = useMutation(DELETE_ENGINEER_MANAGER_RELATION, {
    onCompleted: () => {
      refetch();
      getUnassignedManagers();
      setShowAlert(1);
    },
    onError: () => setShowAlert(-1)
  });
  const [updateRelation] = useMutation(UPDATE_ENGINEER_MANAGER_RELATION, {
    onCompleted: () => {
      refetch();
      getUnassignedManagers();
      setShowAlert(2);
    },
    onError: () => setShowAlert(-2)
  });

  useEffect(() => {
    getUnassignedManagers();
  }, []);

  const engineerRelations = relations?.engineers_with_managers[0];
  const unassignedManagers = data?.get_managers_without_relation;

  return (
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
        Edit managers for {engineerRelations?.name}:
      </Typography>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap"
        }}
      >
        {engineerRelations?.name && (
          <UserForm
            name={engineerRelations?.name}
            onSubmit={(data) =>
              updateEngineerName({ variables: { id, name: data.name } })
            }
          />
        )}
        <EngineerManagers
          onAdd={({ manager }) =>
            addRelation({ variables: { engineer: id, manager } })
          }
          managers={unassignedManagers}
        />
      </div>
      <div
        style={{
          width: "100%",
          maxWidth: "82ch"
        }}
      >
        <EngineerRelations
          name={engineerRelations?.name}
          onDelete={(manager) =>
            deleteRelation({ variables: { engineer: id, manager } })
          }
          onEdit={({ oldManager, newManager }) =>
            updateRelation({ variables: { id, oldManager, newManager } })
          }
          unassignedManagers={unassignedManagers}
          managers={engineerRelations?.managers}
        />
      </div>

      <Button
        sx={{ padding: 1.5, m: 1, width: "40ch" }}
        variant="outlined"
        onClick={() => navigate("/engineers")}
      >
        GO BACK
      </Button>
      {showAlert !== 0 && (
        <EditAlerts setShowAlert={setShowAlert} select={showAlert} />
      )}
    </Box>
  );
};
export default EditEngineer;
