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
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import { useQuery } from "@apollo/client";
import { GET_BADGE_VERSIONS } from "../../queries/BadgesQueries";
const BadgesVersions = () => {
  const [openStates, setOpenStates] = useState({});

  const { data } = useQuery(GET_BADGE_VERSIONS);

  const handleOpenRequirements = (badgeId) => {
    setOpenStates((prevOpenStates) => ({
      ...prevOpenStates,
      [badgeId]: !prevOpenStates[badgeId]
    }));
  };

  return (
    <div>
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => handleOpenRequirements(1)}
            >
              {openStates[1] ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            Versioni{" "}
          </TableCell>
          <TableCell align="center">Verison</TableCell>
          <TableCell align="center">Created At</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={openStates[1]} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Table size="small" aria-label="requirements">
                  <TableHead>
                    <TableRow>
                      <TableCell>Versions</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Requirements</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>TAble caell</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    </div>
  );
};

export default BadgesVersions;
