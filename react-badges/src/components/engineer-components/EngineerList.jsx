import { useQuery } from "@apollo/client";
import { GET_ENGINEERS } from "../../queries/EngineerQueries";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Row from "./Row";

const EngineerList = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_ENGINEERS);
  if (loading) return "Loading...";
  if (error) return `Loading error! ${error.message}`;
  return (
    <Box sx={{ m: 2 }}>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell width="50px" />
              <TableCell width="300px" align="left">
                Name
              </TableCell>
              <TableCell align="left">Managers</TableCell>
              <TableCell align="center">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.engineers.map((engineer, index) => (
                <Row
                  navigate={navigate}
                  key={index}
                  index={index}
                  row={engineer}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default EngineerList;
