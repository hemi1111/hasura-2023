import { Button, Dialog, DialogTitle } from "@mui/material";
import { DELETE_ENGINEER } from "../../queries/EngineerQueries";
import { useMutation } from "@apollo/client";

const DeleteEngineerDialog = ({ open, id, name, onClose, onDelete }) => {
  const [deleteEngineer, { loading, error }] = useMutation(DELETE_ENGINEER);
  const handleClick = () => {
    deleteEngineer({ variables: { id: id } });
    onDelete(id);
    onClose();
  };

  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Are you sure you want to delete {name}?</DialogTitle>
      <Button color="error" onClick={handleClick}>
        Delete
      </Button>
    </Dialog>
  );
};
export default DeleteEngineerDialog;
