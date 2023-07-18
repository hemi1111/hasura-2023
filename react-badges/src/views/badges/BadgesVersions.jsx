import React, { useState } from "react";
import {
  TableRow,
  TableCell,
  Collapse,
  Box,
  Table,
  TableHead,
  TableBody,
  Button,
  Container,
  Paper,
  TableContainer
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import { useQuery } from "@apollo/client";
import BadgesNavbar from "../../components/BadgesNavbar";
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
      <BadgesNavbar />
      <Container sx={{ m: "auto" }} component={Paper}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} size="small">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Badge</TableCell>
                <TableCell align="center">Version</TableCell>
                <TableCell align="center">Created At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Badge Name</TableCell>
                <TableCell>Version</TableCell>
                <TableCell>Timestamp</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default BadgesVersions;
