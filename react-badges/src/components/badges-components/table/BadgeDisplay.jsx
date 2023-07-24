import React from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { GET_BADGES } from "../../../queries/BadgesQueries";
import BadgeTable from "./BadgeTable";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box
} from "@mui/material";
const BadgeDisplay = () => {
  const { data } = useQuery(GET_BADGES);

  return (
    <div>
      <Link to="/badges/create">
        <Button
          variant="outlined"
          sx={{ marginTop: "20px", marginLeft: "40%" }}
        >
          CREATE NEW BADGE
        </Button>
      </Link>
      <Box sx={{ m: 1, display: "flex", justifyContent: "center" }}>
        <TableContainer sx={{ m: 1 }}>
          <Table sx={{ minWidth: 650 }} size="small">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Badges</TableCell>
                <TableCell align="center">Delete</TableCell>
                <TableCell align="center">Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.badges_versions_last.map((data, index) => (
                  <BadgeTable key={index} data={data} />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default BadgeDisplay;
