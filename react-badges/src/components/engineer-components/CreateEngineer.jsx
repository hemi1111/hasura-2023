import { ADD_ENGINEER, GET_ENGINEERS } from "../../queries/EngineerQueries";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";

const CreateEngineer = () => {
  const navigate = useNavigate();
  const [addEngineer, { loading, error }] = useMutation(ADD_ENGINEER, {
    refetchQueries: [{ query: GET_ENGINEERS }]
  });
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm({
    mode: "onChange"
  });
  const handleFormSubmit = (formData) => {
    addEngineer({ variables: { name: formData.name } });
    navigate("/engineers");
  };

  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;

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
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <Typography
          variant="h3"
          sx={{ m: 2, marginLeft: "auto", marginRight: "auto" }}
        >
          Add Engineer:
        </Typography>
        <TextField
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
export default CreateEngineer;
