import { Button, Dialog, DialogTitle, List, ListItem } from "@mui/material";

const DeleteDialog = ({ open, onClick, name, onClose, list }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Are you sure you want to delete {name}?</DialogTitle>
      {list?.length > 0 && (
        <List sx={{ marginLeft: "1ch" }}>
          {name} is also manager to:
          {list?.map((item, index) => {
            return <ListItem key={index}>{item.name}</ListItem>;
          })}
        </List>
      )}
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
export default DeleteDialog;
