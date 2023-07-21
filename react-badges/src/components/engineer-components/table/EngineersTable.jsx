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
import Row from "./Row";

const EngineersTable = ({ navigate, data }) => {
  return (
    <Box sx={{ m: 1, display: "flex", justifyContent: "center" }}>
      <TableContainer sx={{ m: 1 }} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Name</TableCell>
              <TableCell>Managers</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.engineers_with_managers?.map((row, index) => (
              <Row key={index} navigate={navigate} index={index} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default EngineersTable;
