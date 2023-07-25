import React, { useEffect } from "react";
import {
  TableRow,
  TableCell,
  Table,
  TableHead,
  TableBody,
  Paper,
  Button,
  TableContainer,
  Box
} from "@mui/material";
import LoadingSpinner from "../../spinner/LoadingSpinner";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_BADGE_VERSIONS } from "../../../queries/BadgesQueries";
import BadgesVersionsRow from "./BadgesVersionsRow";
import { useParams } from "react-router-dom";
import { ArrowBackIos } from "@mui/icons-material";

const BadgesVersions = () => {
  const { id } = useParams();
  const { data, refetch, loading, error } = useQuery(GET_BADGE_VERSIONS, {
    variables: {
      id
    }
  });

  useEffect(() => {
    refetch();
  }, []);

  if (loading)
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <LoadingSpinner />
      </div>
    );
  if (error) return `Loading error! ${error.message}`;

  return (
    <div>
      <Link to="/badges">
        <Button
          variant="outlined"
          sx={{ m: 2, marginLeft: "20px", padding: "10px" }}
        >
          <ArrowBackIos fontSize="small" /> BACK TO BADGES
        </Button>
      </Link>
      <Box sx={{ m: 1, display: "flex", justifyContent: "center" }}>
        <TableContainer component={Paper}>
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
                <BadgesVersionsRow
                  key={index}
                  data={data}
                  index={index}
                  loading={loading}
                  error={error}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default BadgesVersions;
