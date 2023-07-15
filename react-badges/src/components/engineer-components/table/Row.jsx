import React, { useEffect, useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Button, IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import DeleteEngineerDialog from "../../../containers/engineer/DeleteEngineerDialog";

const Row = (props) => {
  const { index, row, navigate } = props;
  const [open, setOpen] = useState(false);
  const { id, name, managers } = row;
  const managersList = managers?.map((manager) => manager.name).join(", ");

  return (
    <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
      <TableCell>{`${index + 1}. `}</TableCell>
      <TableCell align="center" component="th" scope="row">
        {name}
        <IconButton
          color="primary"
          onClick={() => navigate(`/engineer/edit/${id}`)}
        >
          <Edit fontSize="small" />
        </IconButton>
      </TableCell>
      <TableCell align="center">
        {managersList}
        <IconButton
          color="primary"
          onClick={() => navigate(`/engineer-manager/edit/${id}`)}
        >
          <Edit fontSize="small" />
        </IconButton>
      </TableCell>
      <TableCell align="center">
        {open && (
          <DeleteEngineerDialog
            name={name}
            id={id}
            onClose={() => setOpen(false)}
            open={open}
          />
        )}
        <Button onClick={() => setOpen(true)} color="error">
          <Delete />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default Row;
