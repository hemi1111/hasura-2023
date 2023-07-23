import React, { useState, useEffect } from "react";
import CustomAlert from "../../alerts/CustomAlert";

const EditAlerts = ({ select, setShowAlert }) => {
  const [alert, setAlert] = useState({ m: "Unknown alert!", s: "info" });

  useEffect(() => {
    switch (select) {
      case 1:
        setAlert({ m: "Manager deleted successfully!", s: "success" });
        break;
      case -1:
        setAlert({ m: "Error deleting manager!", s: "error" });
        break;
      case 2:
        setAlert({ m: "Relation updated successfully!", s: "success" });
        break;
      case -2:
        setAlert({ m: "Error updating relation!", s: "error" });
        break;
      case 3:
        setAlert({ m: "Manager added successfully!", s: "success" });
        break;
      case -3:
        setAlert({ m: "Error adding manager!", s: "error" });
        break;
      case 4:
        setAlert({ m: "Name changed successfully!", s: "success" });
        break;
      case -4:
        setAlert({ m: "Error changing name!", s: "error" });
        break;
      default:
    }
  }, []);

  return (
    <CustomAlert onClose={setShowAlert} severity={alert.s} message={alert.m} />
  );
};

export default EditAlerts;
