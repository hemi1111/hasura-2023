import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box
} from "@mui/material";
import TableRowComp from "./TableRowComp";
import { DELETE_MANAGER, GET_MANAGERS } from "../../../queries/ManagerQueries";
import { useMutation } from "@apollo/client";
import Notification from "../alerts/Notification";
import { useLocation } from "react-router-dom";
const TableComp = ({ r1, search }) => {
  const { state } = useLocation();
  const [notify, setNotify] = useState({
    isOpen: false,
    type: "",
    message: ""
  });
  const [deleteManager, { data: deletedMngr }] = useMutation(DELETE_MANAGER, {
    refetchQueries: [
      {
        query: GET_MANAGERS,
        variables: {
          name: `%${search}%`
        }
      }
    ],
    onError: () => {
      setNotify({
        isOpen: true,
        message: "Manager not deleted",
        type: "error"
      });
    }
  });

  useEffect(() => {
    if (deletedMngr?.update_valid_users?.affected_rows === 1) {
      setNotify({
        isOpen: true,
        type: "success",
        message: "Deleted successfully"
      });
    } else if (state) {
      setNotify({ ...state.createNotify });
    }
  }, [deletedMngr]);
  return (
    <>
      <Box sx={{ m: 1, display: "flex", justifyContent: "center" }}>
        <TableContainer sx={{ m: 1 }} component={Paper}>
          <Table sx={{ minWidth: 650 }} size="medium">
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
      </Box>
      {notify.isOpen && <Notification notify={notify} setNotify={setNotify} />}
    </>
  );
};

export default TableComp;
