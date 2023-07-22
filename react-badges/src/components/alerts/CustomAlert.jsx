import { useState } from "react";
import { Alert, Snackbar, Stack } from "@mui/material";

const CustomAlert = ({ message, severity, onClose }) => {
  const [open, setOpen] = useState(true);

  const handleClose = (event, reason) => {
    onClose && onClose(0);
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};
export default CustomAlert;
