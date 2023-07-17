import React, { useState } from "react";
import {
  TableRow,
  TableCell,
  Collapse,
  Box,
  Table,
  TableHead,
  TableBody,
  Button
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Delete, Edit } from "@mui/icons-material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DeleteBadge from "./DeleteBadge";

function BadgeTable(props) {
  const { data } = props;
  const [openStates, setOpenStates] = useState({});
  const [open, setOpen] = useState();

  const handleDeleteClick = () => {
    setOpen(true);
  };

  const handleOpenRequirements = (badgeId) => {
    setOpenStates((prevOpenStates) => ({
      ...prevOpenStates,
      [badgeId]: !prevOpenStates[badgeId]
    }));
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => handleOpenRequirements(data.id)}
          >
            {openStates[data.id] ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {data.title}
        </TableCell>
        <TableCell align="center">
          <Button size="small" onClick={handleDeleteClick}>
            <Delete color="error" fontSize="medium" />
          </Button>
        </TableCell>
        <TableCell align="center">
          <Button size="small">
            <Edit fontSize="medium" />
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={openStates[data.id]} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="requirements">
                <TableHead>
                  <TableRow>
                    <TableCell>{data.description}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Requirements</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.requirements.map((requirement, index) => (
                    <TableRow key={index} style={{ maxWidth: "80%" }}>
                      <TableCell>{requirement.title}</TableCell>
                      <TableCell>{requirement.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <DeleteBadge open={open} setOpen={setOpen} data={data} />
    </React.Fragment>
  );
}

export default BadgeTable;
