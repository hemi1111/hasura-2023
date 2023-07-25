import React, { useState } from "react";
import { Alert } from "@mui/material";

const RequirementAlert = () => {

    const [showReqAlert,setShowReqAlert] = useState()

    const openAlert = () => {{
        setShowReqAlert(true)
    }}
  const handleCloseAlert = () => {
    setShowReqAlert(false);
  };

  return (
    <div>
      <Alert severity="info" open={openAlert} onClose={handleCloseAlert}>
        A Badge must have at least 3 requirements
      </Alert>
    </div>
  );
};

export default RequirementAlert;
