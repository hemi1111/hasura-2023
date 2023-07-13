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
  const [deleteManager, { loading, data, error }] = useMutation(
    DELETE_MANAGER,
    {
      refetchQueries: [
        {
          query: GET_MANAGERS
        }
      ]
    }
  );
  return (
    <Container maxWidth="md" sx={{ margin: "40px auto" }} component={Paper}>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} size="small">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Managers</TableCell>
              <TableCell align="center">Delete</TableCell>
              <TableCell align="center">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {r1.managers.map((row) => (
              <TableRowComp
                key={row.id}
                row={row}
                deleteManager={deleteManager}
              />
            ))}
          </TableBody>
          {/* <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={3}
              ></TablePagination>
            </TableRow>
          </TableFooter> */}
          {/* <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page"
                  },
                  native: true
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter> */}
        </Table>
      </TableContainer>
    </Container>
  );
};

export default TableComp;
