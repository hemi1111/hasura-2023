import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container
} from "@mui/material";
import TableRowComp from "./TableRowComp";
import { DELETE_MANAGER, GET_MANAGERS } from "../../queries/ManagerQueries";
import { useMutation } from "@apollo/client";

const TableComp = ({ r1 }) => {
  const [deleteManager] = useMutation(DELETE_MANAGER, {
    refetchQueries: [
      {
        query: GET_MANAGERS
      }
    ]
  });
  return (
    <Container maxWidth="md" sx={{ margin: "40px auto" }} component={Paper}>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} size="small">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Managers</TableCell>
              <TableCell align="center">Edit</TableCell>
              <TableCell align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {r1?.managers.map((row) => (
              <TableRowComp
                key={row.id}
                row={row}
                deleteManager={deleteManager}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default TableComp;
