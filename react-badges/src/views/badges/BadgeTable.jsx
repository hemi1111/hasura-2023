import React, { useState } from "react";
import {
  TableRow,
  TableCell,
  Collapse,
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  Button,
  TextField
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Delete, Edit } from "@mui/icons-material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function BadgeTable(props) {
  const { row, data } = props;
  const [openStates, setOpenStates] = useState({});

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
            onClick={() => handleOpenRequirements(row.id)}
          >
            {openStates[row.id] ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.title}
        </TableCell>
        <TableCell align="center">
          <Button size="small">
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
          <Collapse in={openStates[row.id]} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="requirements">
                <TableHead>
                  <TableRow>
                    <TableCell>Requirement</TableCell>
                    <TableCell>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.requirements.map((requirement, index) => (
                    <TableRow key={index}>
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
    </React.Fragment>
  );
}

export default BadgeTable;
