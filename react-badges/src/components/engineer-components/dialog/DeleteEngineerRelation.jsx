import { Button, Dialog, DialogTitle, List, ListItem } from "@mui/material";

const DeleteEngineerRelation = ({ open, onClick, name, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Are you sure you want to delete {name}?</DialogTitle>
      <div style={{ display: "flex" }}>
        <Button sx={{ width: "50%" }} onClick={onClose}>
          Cancel
        </Button>
        <Button color="error" sx={{ width: "50%" }} onClick={onClick}>
          Delete
        </Button>
      </div>
    </Dialog>
  );
};
export default DeleteEngineerRelation;
