import { useQuery } from "@apollo/client";
import { GET_ENGINEERS } from "../../queries/EngineerQueries";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Typography
} from "@mui/material";
import { Delete, Edit, Person } from "@mui/icons-material";
import DeleteEngineerDialog from "./DeleteEngineerDialog";
import { useEffect, useState } from "react";

const EngineerList = () => {
  const [open, setOpen] = useState(-1);
  const { data, loading, error } = useQuery(GET_ENGINEERS);
  if (loading) return "Loading...";
  if (error) return `Loading error! ${error.message}`;
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {data &&
        data.engineers.map((engineer, index) => {
          return (
            <Card
              key={index}
              sx={{
                m: 1,
                textAlign: "center",
                width: "30ch"
              }}
            >
              <CardContent>
                <Avatar
                  sx={{
                    m: 2,
                    width: "10ch",
                    height: "10ch",
                    margin: "auto",
                    marginBottom: 1
                  }}
                >
                  <Person sx={{ width: "5ch", height: "5ch" }} />
                </Avatar>
                {index === open && (
                  <DeleteEngineerDialog
                    name={engineer.name}
                    id={engineer.id}
                    onClose={() => setOpen(-1)}
                    open={open === index}
                  />
                )}
                <Typography variant="h4">{engineer.name}</Typography>
                <div>
                  <Button onClick={() => setOpen(index)} color="error">
                    <Delete />
                    &nbsp; Delete
                  </Button>
                  <Button>
                    <Edit />
                    &nbsp; Update
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
    </Box>
  );
};
export default EngineerList;
