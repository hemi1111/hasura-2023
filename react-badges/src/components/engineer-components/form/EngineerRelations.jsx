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
import DeleteEngineerRelation from "../dialog/DeleteEngineerRelation";
import EditEngineerRelation from "../dialog/EditEngineerRelation";

const EngineerRelations = ({
  name,
  managers,
  onDelete,
  onEdit,
  notRelatedManagers
}) => {
  const [open, setOpen] = useState({ edit: -1, delete: -1 });
  const handleDelete = (id) => {
    onDelete(id);
    setOpen((old) => ({ ...old, delete: -1 }));
  };
  const handleEdit = (data) => {
    console.log(data);
    onEdit(data);
    setOpen((old) => ({ ...old, edit: -1 }));
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: "40ch" }} size="small">
        <TableHead>
          <TableRow>
            <TableCell>Manager</TableCell>
            <TableCell>Update</TableCell>
            <TableCell>Delete</TableCell>
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
                <DeleteEngineerRelation
                  name={relation.name}
                  open={index === open.delete}
                  onClose={() => setOpen((old) => ({ ...old, delete: -1 }))}
                  onClick={(e) => handleDelete(e)}
                />
              )}
              {index === open.edit && (
                <EditEngineerRelation
                  engineer={name}
                  manager={relation}
                  notRelatedManagers={notRelatedManagers}
                  open={index === open.edit}
                  onClose={() => setOpen((old) => ({ ...old, edit: -1 }))}
                  onEdit={handleEdit}
                />
              )}
              <TableCell>
                <Button
                  onClick={() => setOpen((old) => ({ ...old, edit: index }))}
                >
                  <Edit />
                </Button>
              </TableCell>
              <TableCell>
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
