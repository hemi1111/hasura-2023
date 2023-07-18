import { Button, Dialog, DialogTitle } from "@mui/material";
import EngineerManagers from "../form/EngineerManagers";

const EditEngineerRelation = ({
  open,
  onEdit,
  engineer,
  manager,
  onClose,
  notRelatedManagers
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
        managers={notRelatedManagers}
        onAdd={handleEdit}
      />
    </Dialog>
  );
};
export default EditEngineerRelation;
