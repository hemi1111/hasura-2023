import React from "react";
import { Dialog, DialogTitle, Button } from "@mui/material";
import { useMutation } from "@apollo/client";
import { DELETE_BADGE, GET_BADGES } from "../../queries/BadgesQueries";
const DeleteBadge = ({ open, setOpen, data }) => {
  const onClose = () => {
    setOpen(false);
  };

  const [deleteBadge] = useMutation(DELETE_BADGE, {
    refetchQueries: [{ query: GET_BADGES }]
  });

  

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>
          Are you sure you want to delete badge <br />
          <center>
            <strong>{data.title}</strong> ?
          </center>
        </DialogTitle>
        <div style={{ display: "flex" }}>
          <Button sx={{ width: "50%" }} onClick={onClose}>
            Cancel
          </Button>
          <Button
            color="error"
            sx={{ width: "50%" }}
            onClick={() => handleDeleteBadge(data.id)}
          >
            Delete
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default DeleteBadge;
