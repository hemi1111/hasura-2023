import { Person } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader
} from "@mui/material";

const DeleteDialog = ({ open, onClick, name, onClose, list }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      {!(list?.length > 0) && (
        <DialogTitle>Are you sure you want to delete {name}?</DialogTitle>
      )}
      {list?.length > 0 && (
        <List
          sx={{ width: "40ch", bgcolor: "background.paper" }}
          component="nav"
          subheader={<ListSubheader>{name} is also manager to:</ListSubheader>}
        >
          {list?.map((item, index) => {
            return (
              <ListItem key={index}>
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItem>
            );
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
