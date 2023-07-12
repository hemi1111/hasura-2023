import { ADD_ENGINEER } from "../../queries/EngineerQueries";
import { Box, Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";

const CreateEngineer = () => {
  const navigate = useNavigate();
  const [addEngineer, { loading, error }] = useMutation(ADD_ENGINEER);
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "30px"
      }}
    >
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": {
            m: 1,
            display: "flex",
            flexDirection: "column",
            width: "40ch"
          }
        }}
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <>
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
          <Button sx={{ marginLeft: "20ch" }} variant="contained" type="submit">
            Save
          </Button>
        </>
      </Box>
    </div>
  );
};
export default CreateEngineer;
