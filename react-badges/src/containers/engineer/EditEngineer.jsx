import { useMutation, useQuery } from "@apollo/client";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import {
  ADD_ENGINEER_MANAGER_RELATION,
  DELETE_ENGINEER_MANAGER_RELATION,
  GET_ENGINEERS,
  GET_ENGINEER_MANAGERS_RELATION,
  GET_MANAGER_WITHOUT_RELATION,
  UPDATE_ENGINEER,
  UPDATE_ENGINEER_MANAGER_RELATION
} from "../../queries/EngineerQueries";
import { useEffect } from "react";
import EngineerRelations from "../../components/engineer-components/form/EngineerRelations";
import EngineerForm from "../../components/engineer-components/form/EngineerForm";
import EngineerManagers from "../../components/engineer-components/form/EngineerManagers";

const EditEngineer = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [updateEngineer] = useMutation(UPDATE_ENGINEER, {
    refetchQueries: [{ query: GET_ENGINEERS }]
  });

  const relations = useQuery(GET_ENGINEER_MANAGERS_RELATION, {
    variables: { id }
  });

  const [noRelationManagers, { data }] = useMutation(
    GET_MANAGER_WITHOUT_RELATION
  );

  const [addRelation] = useMutation(ADD_ENGINEER_MANAGER_RELATION, {
    refetchQueries: [
      { query: GET_ENGINEER_MANAGERS_RELATION },
      { query: GET_ENGINEERS }
    ],
    onCompleted: () => {
      noRelationManagers({
        variables: { id }
      });
    }
  });
  const [deleteRelation] = useMutation(DELETE_ENGINEER_MANAGER_RELATION, {
    refetchQueries: [
      { query: GET_ENGINEER_MANAGERS_RELATION },
      { query: GET_ENGINEERS }
    ],
    onCompleted: () => {
      noRelationManagers({
        variables: { id }
      });
    }
  });
  const [updateRelation] = useMutation(UPDATE_ENGINEER_MANAGER_RELATION, {
    refetchQueries: [
      { query: GET_ENGINEER_MANAGERS_RELATION },
      { query: GET_ENGINEERS }
    ],
    onCompleted: () => {
      noRelationManagers({
        variables: { id }
      });
    }
  });

  useEffect(() => {
    noRelationManagers({
      variables: { id }
    });
  }, []);

  const handleDelete = (manager) => {
    deleteRelation({ variables: { engineer: id, manager } });
  };
  const handleEdit = ({ oldManager, newManager }) => {
    updateRelation({ variables: { id, oldManager, newManager } });
  };
  const handleAdd = ({ manager }) => {
    addRelation({ variables: { engineer: id, manager } });
  };
  const handleNameChange = (data) => {
    updateEngineer({ variables: { id: id, name: data.name } });
  };

  const engineerRelations = relations?.data?.engineers_with_managers[0];
  const notRelatedManagers = data?.get_managers_without_relation;

  return (
    <Box
      sx={{
        m: 1,
        display: "box"
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
        <EngineerForm
          name={engineerRelations?.name}
          onSubmit={handleNameChange}
        />
        <EngineerManagers onAdd={handleAdd} managers={notRelatedManagers} />
      </div>

      <div style={{ width: "auto" }}>
        <EngineerRelations
          name={engineerRelations?.name}
          onDelete={handleDelete}
          onEdit={handleEdit}
          notRelatedManagers={notRelatedManagers}
          managers={engineerRelations?.managers}
        />
      </div>
      <Button
        sx={{
          m: 2,
          width: "20ch",
          marginLeft: "auto",
          marginRight: "auto"
        }}
        color="success"
        variant="outlined"
        onClick={() => navigate("/engineers")}
      >
        Done
      </Button>
    </Box>
  );
};
export default EditEngineer;
