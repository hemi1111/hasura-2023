import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useState } from "react";
import EditEngineerRelation from "../dialog/EditEngineerRelation";
import DeleteDialog from "../../dialogs/DeleteDialog";

const EngineerRelations = ({
  manager,
  name,
  managers,
  onDelete,
  onEdit,
  unassignedManagers
}) => {
  const [open, setOpen] = useState({ edit: -1, delete: -1 });
  const handleDelete = (id) => {
    onDelete(id);
    setOpen((old) => ({ ...old, delete: -1 }));
  };
  const handleEdit = (data) => {
    onEdit(data);
    setOpen((old) => ({ ...old, edit: -1 }));
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: "40ch" }} size="small">
        <TableHead>
          <TableRow>
            <TableCell>{manager ? "Engineers" : "Managers"}</TableCell>
            {!manager && <TableCell align="center">Update</TableCell>}
            <TableCell align="center">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {managers?.map((relation, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {relation.name}
              </TableCell>
              {index === open.delete && (
                <DeleteDialog
                  name={relation.name}
                  open={index === open.delete}
                  onClose={() => setOpen((old) => ({ ...old, delete: -1 }))}
                  onClick={() => handleDelete(relation.id)}
                />
              )}
              {index === open.edit && (
                <EditEngineerRelation
                  engineer={name}
                  manager={relation}
                  unassignedManagers={unassignedManagers}
                  open={index === open.edit}
                  onClose={() => setOpen((old) => ({ ...old, edit: -1 }))}
                  onEdit={handleEdit}
                />
              )}
              {!manager && (
                <TableCell align="center">
                  <Button
                    onClick={() => setOpen((old) => ({ ...old, edit: index }))}
                  >
                    <Edit />
                  </Button>
                </TableCell>
              )}
              <TableCell align="center">
                <Button
                  onClick={() => setOpen((old) => ({ ...old, delete: index }))}
                  color="error"
                >
                  <Delete />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EngineerRelations;
