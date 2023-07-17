import React, { useState } from "react";
import { Dialog, DialogTitle, Button } from "@mui/material";
const DeleteBadge = ({ open, setOpen, data }) => {
  const onClose = () => {
    setOpen(false);
  };
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
          <Button color="error" sx={{ width: "50%" }}>
            Delete
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default DeleteBadge;
