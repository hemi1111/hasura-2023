import { Button, Dialog, DialogTitle, List, ListItem } from "@mui/material";

const EditEngineerRelation = ({ open, onClick, name, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit {name} ?</DialogTitle>
      <div style={{ display: "flex" }}>
        <Button sx={{ width: "50%" }} onClick={onClose}>
          Cancel
        </Button>
        <Button color="success" sx={{ width: "50%" }} onClick={onClick}>
          Confirm
        </Button>
      </div>
    </Dialog>
  );
};
export default EditEngineerRelation;
