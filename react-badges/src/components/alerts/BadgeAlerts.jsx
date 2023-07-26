import React, { useState, useEffect } from "react";
import CustomAlert from "./CustomAlert";

const BadgeAlerts = ({ select, setShowAlert }) => {
  const [alert, setAlert] = useState({ m: "Unknown alert!", s: "info" });

  useEffect(() => {
    switch (select) {
      case 1:
        setAlert({ m: "Badge deleted successfully!", s: "success" });
        break;
      case -1:
        setAlert({ m: "Error deleting badge!", s: "error" });
        break;
      case 2:
        setAlert({ m: "Badge created successfully!", s: "success" });
        break;
      case -2:
        setAlert({ m: "Error adding badge!", s: "error" });
        break;
      case 3:
        setAlert({ m: "Badge updated successfully!", s: "success" });
        break;
      case -3:
        setAlert({ m: "Error updating badge!", s: "error" });
        break;
      default:
    }
  }, []);

  return (
    <CustomAlert onClose={setShowAlert} severity={alert.s} message={alert.m} />
  );
};

export default BadgeAlerts;
