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
import CustomAlert from "../../alerts/CustomAlert";
import { useState } from "react";

const EngineersTable = ({ navigate, data, filter }) => {
  const [showAlert, setShowAlert] = useState(0);
  return (
    <>
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
                <Row
                  filter={filter}
                  key={index}
                  navigate={navigate}
                  index={index}
                  row={row}
                  showAlert={showAlert}
                  setShowAlert={setShowAlert}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {showAlert === 1 && (
        <CustomAlert
          onClose={setShowAlert}
          severity="success"
          message={"Engineer deleted successfully!"}
        />
      )}
      {showAlert === -1 && (
        <CustomAlert
          onClose={setShowAlert}
          severity="error"
          message={"Error deleting engineer!"}
        />
      )}
    </>
  );
};
export default EngineersTable;
