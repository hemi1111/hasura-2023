import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

const EditManagersEngineer = ({ user, onSubmit }) => {
  const name = user && user[0]?.name;
  const navigate = useNavigate();
  const {
    register,
    setValue,
    handleSubmit
  } = useForm();

  useEffect(() => {
    setValue("name", user && user[0]?.name);
  }, [user]);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Box
        component="form"
        sx={{
          m: 1,
          display: "flex",
          flexDirection: "column",
          width: "40ch"
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography
          variant="h3"
          sx={{ m: 2, marginLeft: "auto", marginRight: "auto" }}
        >
          Add Engineer:
        </Typography>
        <TextField
          focused
          required
          label="Name"
          {...register("name", {
            pattern: {
              value: /^[A-Za-z\s]+$/,
              message: "Name should contain only characters!"
            },
            required: { value: true, message: "Field is required!" },
            minLength: {
              value: 2,
              message: "Name should contain more than 2 characters!"
            },
            maxLength: {
              value: 20,
              message: "Name should contain less than 20 characters!"
            }
          })}
          error={!!errors?.name}
          helperText={errors?.name?.message}
        />
        <div style={{ margin: "auto", marginTop: "2ch" }}>
          <Button variant="contained" onClick={() => navigate("/engineers")}>
            Cancel
          </Button>
          <Button
            color="success"
            sx={{ marginLeft: "2ch" }}
            variant="contained"
            type="submit"
          >
            Save
          </Button>
        </div>
      </Box>
    </div>
  );
};
export default EditManagersEngineer;
