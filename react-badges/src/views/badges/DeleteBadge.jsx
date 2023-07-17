import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogTitle, Button } from "@mui/material";
const DeleteBadge = () => {
  const [open, setOpen] = useState(true);

  const onClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();
  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Are you sure you want to delete ?</DialogTitle>
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
