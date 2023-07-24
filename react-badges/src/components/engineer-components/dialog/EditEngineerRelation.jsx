import { Dialog, DialogTitle } from "@mui/material";
import EngineerManagers from "../form/EngineerManagers";

const EditEngineerRelation = ({
  open,
  onEdit,
  engineer,
  manager,
  onClose,
  unassignedManagers
}) => {
  const oldManager = manager.id;
  const handleEdit = ({ manager }) => {
    onEdit({ oldManager, newManager: manager });
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Edit {engineer} - {manager.name} relation:
      </DialogTitle>
      <EngineerManagers
        onClose={onClose}
        edit={true}
        managers={unassignedManagers}
        onAdd={handleEdit}
      />
    </Dialog>
  );
};
export default EditEngineerRelation;
