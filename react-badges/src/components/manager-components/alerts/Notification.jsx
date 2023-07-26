import * as React from "react";
import Alert from "@mui/material/Alert";
import { Snackbar } from "@mui/material";

export default function Notification({ notify, setNotify }) {
  const handleClose = (event, reason) => {
    setNotify({
      ...notify,
      isOpen: false
    });
  };
  return (
    <Snackbar
      open={notify.isOpen}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={handleClose}
    >
      <Alert severity={notify.type} onClose={handleClose}>
        {notify.message}
      </Alert>
    </Snackbar>
  );
}
