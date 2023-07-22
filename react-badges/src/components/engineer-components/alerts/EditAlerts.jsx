import CustomAlert from "../../alerts/CustomAlert";

const EditAlerts = ({ select, setShowAlert }) => {
  return (
    <>
      {select === 1 && (
        <CustomAlert
          onClose={setShowAlert}
          severity="success"
          message={"Manager deleted successfully!"}
        />
      )}
      {select === -1 && (
        <CustomAlert
          onClose={setShowAlert}
          severity="error"
          message={"Error deleting manager!"}
        />
      )}
      {select === 2 && (
        <CustomAlert
          onClose={setShowAlert}
          severity="success"
          message={"Relation updated succesfully!"}
        />
      )}
      {select === -2 && (
        <CustomAlert
          onClose={setShowAlert}
          severity="error"
          message={"Error updating relation!"}
        />
      )}
      {select === 3 && (
        <CustomAlert
          onClose={setShowAlert}
          severity="success"
          message={"Manager added successfully!"}
        />
      )}
      {select === -3 && (
        <CustomAlert
          onClose={setShowAlert}
          severity="error"
          message={"Error adding manager!"}
        />
      )}
      {select === 4 && (
        <CustomAlert
          onClose={setShowAlert}
          severity="success"
          message={"Name changed succesfully!"}
        />
      )}
      {select === -4 && (
        <CustomAlert
          onClose={setShowAlert}
          severity="error"
          message={"Error changing name!"}
        />
      )}
    </>
  );
};

export default EditAlerts;
