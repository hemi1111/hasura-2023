import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
const UserForm = ({ name, onSubmit, manager }) => {
  const navigate = useNavigate();
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit
  } = useForm();
  useEffect(() => {
    setValue("name", name);
  }, [name]);

  return (
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
      {!name && (
        <Typography
          variant="h3"
          sx={{ m: 2, marginLeft: "auto", marginRight: "auto" }}
        >
          Add {manager ? "Manager" : "Engineer"}:
        </Typography>
      )}
      <TextField
        required
        autoFocus={!name}
        label="Name"
        {...register("name", {
          pattern: {
            value: /^[A-Za-z\s-]+$/,
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
      {name ? (
        <Button sx={{ width: "100%" }} type="submit">
          Edit
        </Button>
      ) : (
        <div style={{ width: "100%" }}>
          <Button
            sx={{ width: "50%" }}
            onClick={() => navigate(manager ? "/managers" : "/engineers")}
          >
            Cancel
          </Button>
          <Button color="success" sx={{ width: "50%" }} type="submit">
            Save
          </Button>
        </div>
      )}
    </Box>
  );
};
export default UserForm;
