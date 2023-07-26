import React, { useState } from "react";
import {
  TableRow,
  TableCell,
  Collapse,
  Box,
  Table,
  TableHead,
  TableBody,
  Button
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useMutation } from "@apollo/client";
import { Delete, Edit } from "@mui/icons-material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useNavigate } from "react-router-dom";
import DeleteDialog from "../../dialogs/DeleteDialog";
import LoadingSpinner from "../../spinner/LoadingSpinner";
import { DELETE_BADGE, GET_BADGES } from "../../../queries/BadgesQueries";
function BadgeTable(props) {
  const navigate = useNavigate();
  const { data, search, setShowAlert, loading, error } = props;
  const [openStates, setOpenStates] = useState({});
  const [open, setOpen] = useState(false);
  const [deleteBadge] = useMutation(DELETE_BADGE, {
    refetchQueries: [
      {
        query: GET_BADGES,
        variables: {
          search: `%${search}%`
        }
      }
    ],
    onCompleted: () => setShowAlert(1),
    onError: () => setShowAlert(-1)
  });

  const handleDeleteClick = () => {
    setOpen(true);
  };

  const handleDeleteBadge = (badge_id) => {
    try {
      deleteBadge({
        variables: {
          badge_def_id: badge_id
        }
      });
      console.log(
        `Badge '${data.title}' with id ${data.id} deleted succesfully`
      );
      setOpen(false);
    } catch (error) {
      console.log("Error deleting badge", error);
    }
  };

  const handleVersions = (version_badge_id, version_id) => {
    navigate(`/badges/versions/${version_badge_id}/${version_id}`);
  };

  const handleOpenRequirements = (badgeId) => {
    setOpenStates((prevOpenStates) => ({
      ...prevOpenStates,
      [badgeId]: !prevOpenStates[badgeId]
    }));
  };

  const handleEditClick = (edit_badge_id) => {
    navigate(`/badges/edit/${edit_badge_id}`);
  };

  if (loading)
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <LoadingSpinner />
      </div>
    );
  if (error) return `Loading error! ${error.message}`;

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => handleOpenRequirements(data.id)}
          >
            {openStates[data.id] ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {data.title}
        </TableCell>
        <TableCell align="center">
          <Button size="small" onClick={() => handleEditClick(data.id)}>
            <Edit />
          </Button>
        </TableCell>
        <TableCell align="center">
          <Button size="small" onClick={handleDeleteClick}>
            <Delete color="error" />
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={openStates[data.id]} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="requirements">
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        whiteSpace: "normal",
                        wordWrap: "break-word",
                        fontSize: "1.1em",
                        maxWidth: "70%"
                      }}
                    >
                      {data.description}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        sx={{
                          position: "sticky",
                          float: "right",
                          padding: "10px"
                        }}
                        onClick={() => handleVersions(data.title, data.id)}
                      >
                        Show All Versions
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ fontSize: "1.2em" }}>
                      Requirement
                    </TableCell>
                    <TableCell sx={{ fontSize: "1.2em" }}>
                      Requirement Description
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.requirements.map((requirement, index) => (
                    <TableRow key={index} style={{ maxWidth: "80%" }}>
                      <TableCell>
                        {index + 1}.{requirement.title}
                      </TableCell>
                      <TableCell>{requirement.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <DeleteDialog
        open={open}
        onClose={() => setOpen(false)}
        name={data.title}
        onClick={() => handleDeleteBadge(data.id)}
      />
    </>
  );
}
export default BadgeTable;
