import React from "react";
import {
  TableRow,
  TableCell,
  Table,
  TableHead,
  TableBody,
  Container,
  Paper,
  TableContainer
} from "@mui/material";
import { useQuery } from "@apollo/client";
import BadgesNavbar from "../../BadgesNavbar";
import { GET_BADGE_VERSIONS } from "../../../queries/BadgesQueries";
import BadgesVersionsRow from "./BadgesVersionsRow";
import { useParams } from "react-router-dom";
const BadgesVersions = () => {
  const { id } = useParams();
  const { data } = useQuery(GET_BADGE_VERSIONS, {
    variables: {
      id
    }
  });

  if (!data) {
    return <p>Loading...</p>;
  }

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
              {data.badges_versions.map((data, index) => (
                <BadgesVersionsRow key={data.id} data={data} index={index} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

export default BadgesVersions;
