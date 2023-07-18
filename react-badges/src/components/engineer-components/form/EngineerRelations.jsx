import {
  Button,
  List,
  ListItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const EngineerRelations = ({ managers }) => {
  // return (
  //   <List>
  //     {managers?.map((relation, index) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: "40ch" }} size="small">
        <TableHead>
          <TableRow>
            <TableCell>Manager</TableCell>
            <TableCell>Update</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {managers?.map((relation, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {relation.name}
              </TableCell>
              <TableCell>
                <Button>
                  <Edit />
                </Button>
              </TableCell>
              <TableCell>
                <Button color="error">
                  <Delete />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    // <ListItem dense key={index}>
    //   {relation.name}
    // <Button>
    //   <Edit />
    // </Button>
    // <Button color="error">
    //   <Delete />
    // </Button>
    // </ListItem>
  );
  //     })}
  //   </List>
  // );
};

export default EngineerRelations;
