import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { Link, useLocation } from "react-router-dom";
import { GET_BADGES } from "../../../queries/BadgesQueries";
import LoadingSpinner from "../../spinner/LoadingSpinner";
import BadgeTable from "./BadgeTable";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  Paper
} from "@mui/material";
import BadgeAlerts from "../../alerts/BadgeAlerts";
const BadgeDisplay = ({ search }) => {
  const location = useLocation();
  window.history.replaceState({}, document.title);
  const [showAlert, setShowAlert] = useState(location.state?.showAlert || 0);
  const { data, loading, error, refetch } = useQuery(GET_BADGES, {
    variables: {
      search: `%${search}%`
    }
  });

  useEffect(() => {
    refetch();
  }, [search]);

  if (loading)
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <LoadingSpinner />
      </div>
    );
  if (error) return `Loading error! ${error.message}`;

  return (
    <div>
      <div
        style={{
          display: "flex",
          float: "right",
          marginTop: "-60px",
          marginRight: "16px"
        }}
      >
        <Link to="/badges/create">
          <Button variant="outlined" sx={{ padding: "10px" }}>
            CREATE NEW BADGE
          </Button>
        </Link>
      </div>
      <Box
        sx={{
          m: 1,
          display: "flex",
          justifyContent: "center",
          marginTop: "-10px"
        }}
      >
        <TableContainer sx={{ m: 1 }} component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Badges</TableCell>
                <TableCell align="center">Edit</TableCell>
                <TableCell align="center">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.badges_versions_last.map((data, index) => (
                  <BadgeTable
                    search={search}
                    setShowAlert={setShowAlert}
                    key={index}
                    data={data}
                    loading={loading}
                    error={error}
                  />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {showAlert !== 0 && (
        <BadgeAlerts select={showAlert} setShowAlert={setShowAlert} />
      )}
    </div>
  );
};

export default BadgeDisplay;
