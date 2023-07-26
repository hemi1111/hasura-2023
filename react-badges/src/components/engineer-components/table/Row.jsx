import React, { useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import DeleteEngineer from "../../../containers/engineer/DeleteEngineer";

const Row = (props) => {
  const { index, row, navigate, setShowAlert, filter } = props;
  const [open, setOpen] = useState(false);
  const { id, name, managers } = row;
  const managersList = managers?.map((manager) => manager.name).join(", ");

  return (
    <>
      <TableRow hover sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>{`${index + 1}. `}</TableCell>
        <TableCell component="th" scope="row">
          {name}
        </TableCell>
        <TableCell>{managersList}</TableCell>
        <TableCell>
          <IconButton
            color="primary"
            onClick={() => navigate(`/engineer/edit/${id}`)}
          >
            <Edit fontSize="small" />
          </IconButton>
        </TableCell>

        <TableCell>
          {open && (
            <DeleteEngineer
              filter={filter}
              name={name}
              id={id}
              onClose={(e) => {
                setOpen(false);
                setShowAlert(e);
              }}
              open={open}
            />
          )}
          <IconButton
            onClick={(e) => {
              setOpen(true);
              setShowAlert(e);
            }}
            color="error"
          >
            <Delete />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
};

export default Row;
