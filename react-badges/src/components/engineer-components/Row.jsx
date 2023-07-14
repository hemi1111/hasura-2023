import React, { useEffect, useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import DeleteEngineerDialog from "./DeleteEngineerDialog";
import { useMutation } from "@apollo/client";
import { GET_MANAGERS_BY_ENGINEER } from "../../queries/EngineerQueries";

const Row = (props) => {
  const { index, row, navigate } = props;
  const [open, setOpen] = useState(false);
  const [getData, { data, loading, error }] = useMutation(
    GET_MANAGERS_BY_ENGINEER
  );
  useEffect(() => {
    getData({
      variables: { id: row.id }
    });
  }, []);
  console.log(data);
  if (loading) return "Loading...";
  if (error) return `Loading error! ${error.message}`;
  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>{`${index + 1}. `}</TableCell>
        <TableCell component="th" scope="row">
          {row.name} &nbsp;
          <Button onClick={() => navigate(`/engineer/edit/${row.id}`)}>
            <Edit fontSize="small" />
          </Button>
        </TableCell>
        <TableCell align="left">
          {data &&
            data.get_manager_by_engineers.map((manager) => {
              return (
                <span>
                  {manager.name}
                  {", "}
                </span>
              );
            })}
        </TableCell>
        <TableCell align="center">
          <DeleteEngineerDialog
            name={row.name}
            id={row.id}
            onClose={() => setOpen(false)}
            open={open}
          />
          <Button onClick={() => setOpen(true)} color="error">
            <Delete />
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
};

export default Row;
