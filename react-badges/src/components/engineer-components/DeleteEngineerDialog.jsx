import {
  Button,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  Typography
} from "@mui/material";
import {
  DELETE_ENGINEER,
  GET_ENGINEERS,
  GET_ENGINEER_BY_MANAGER
} from "../../queries/EngineerQueries";
import { useMutation } from "@apollo/client";
import { useEffect } from "react";

const DeleteEngineerDialog = ({ open, id, name, onClose }) => {
  const [deleteEngineer, { loading, error }] = useMutation(DELETE_ENGINEER, {
    refetchQueries: [{ query: GET_ENGINEERS }]
  });
  const [getEngineers, { data }] = useMutation(GET_ENGINEER_BY_MANAGER);
  const handleClick = () => {
    deleteEngineer({ variables: { id: id } });
    onClose();
  };
  useEffect(() => {
    getEngineers({
      variables: { id: id }
    });
  }, []);
  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Are you sure you want to delete {name}?</DialogTitle>
      {data && data.get_engineers_by_manager.length > 0 && (
        <List sx={{ marginLeft: "1ch" }}>
          {name} is also manager to:
          {data &&
            data.get_engineers_by_manager.map((item, index) => {
              return <ListItem key={index}>{item.name}</ListItem>;
            })}
        </List>
      )}
      <div style={{ display: "flex" }}>
        <Button sx={{ width: "50%" }} onClick={onClose}>
          Cancel
        </Button>
        <Button color="error" sx={{ width: "50%" }} onClick={handleClick}>
          Delete
        </Button>
      </div>
    </Dialog>
  );
};
export default DeleteEngineerDialog;
