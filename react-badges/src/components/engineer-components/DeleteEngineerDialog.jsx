import { Button, Dialog, DialogTitle } from "@mui/material";
import { DELETE_ENGINEER, GET_ENGINEERS } from "../../queries/EngineerQueries";
import { useMutation } from "@apollo/client";

const DeleteEngineerDialog = ({ open, id, name, onClose}) => {
  const [deleteEngineer, { loading, error }] = useMutation(DELETE_ENGINEER, {
    refetchQueries: [{ query: GET_ENGINEERS }]
  });
  const handleClick = () => {
    deleteEngineer({ variables: { id: id } });
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
