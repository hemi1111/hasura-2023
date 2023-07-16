import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const EditManagersEngineer = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          m: 1,
          display: "flex",
          flexDirection: "column",
          width: "40ch"
        }}
      >
        <Typography
          variant="h3"
          sx={{ m: 2, marginLeft: "auto", marginRight: "auto" }}
        >
          Edit Engineer to Manager relations:
        </Typography>

        <div style={{ margin: "auto", marginTop: "2ch" }}>
          <Button
            color="success"
            variant="contained"
            onClick={() => navigate("/engineers")}
          >
            Done
          </Button>
        </div>
      </Box>
    </div>
  );
};
export default EditManagersEngineer;
