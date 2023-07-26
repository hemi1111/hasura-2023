import React, { useState,useEffect } from "react";
import {
  TableRow,
  TableCell,
  Collapse,
  Box,
  Typography,
  Table,
  TableBody,
  Button,
  TextField
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Delete, Edit } from "@mui/icons-material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useMutation } from "@apollo/client";
import { GET_ENGINEERS_BY_MANAGER } from "../../../queries/ManagerQueries";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../spinner/LoadingSpinner";
import DeleteDialog from "../../dialogs/DeleteDialog";
function TableRowComp(props) {
  const { row, deleteManager } = props;

  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [edit, setEdit] = useState(true);
  const [managerName, setManagerName] = useState(row.name);
  const { id } = row;
  const [getEngineerByMngr, { data, loading, error }] = useMutation(
    GET_ENGINEERS_BY_MANAGER
  );
  const handleCollapse = (id) => {
    getEngineerByMngr({
      variables: { id: id }
    });
    setOpen(!open);
  };

  useEffect(() => {
    getEngineerByMngr({
      variables: { id: id }
    });
  }, []);
  // if (loading) return;
  if (error) return;
  const engineersByManager = data?.get_engineers_by_manager;
  const arr = data ? [...data.get_engineers_by_manager] : null;
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => handleCollapse(id)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {edit ? (
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
        ) : (
          <TableCell>
            <TextField
              type="text"
              variant="outlined"
              onChange={(e) => {
                setManagerName(e.target.value);
              }}
            />
          </TableCell>
        )}
        <TableCell align="center">
          <Button component={Link} to={`/managers/edit/${id}`} size="small">
            <Edit fontSize="small" />
          </Button>
        </TableCell>
        <TableCell align="center">
          <Button size="small" onClick={() => setOpenDialog(true)}>
            <Delete fontSize="small" color="error" />
          </Button>
          <DeleteDialog
            onClose={() => setOpenDialog(false)}
            open={openDialog}
            manager={true}
            list={engineersByManager}
            onClick={() => {
              deleteManager({
                variables: { id }
              });
              setOpenDialog(false);
            }}
            name={managerName}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Engineers
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableBody>
                  <TableRow>
                    {loading ? (
                      <td style={{ display: "grid", placeItems: "center" }}>
                        <LoadingSpinner />
                      </td>
                    ) : (
                      arr?.map((engineer) => (
                        <TableCell key={engineer.id}>{engineer.name}</TableCell>
                      ))
                    )}
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default TableRowComp;
