import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_BADGES } from "../../queries/BadgesQueries";
import BadgeTable from "./BadgeTable";
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
const BadgeDisplay = () => {
  const { data } = useQuery(GET_BADGES);

  console.log(data);
  return (
    <div>
      <Container maxWidth="md" sx={{ margin: "40px auto" }} component={Paper}>
        <TableContainer>
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
                data.badges_versions_last.map((row) => (
                  <BadgeTable key={row.id} row={row} data={data} />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default BadgeDisplay;
