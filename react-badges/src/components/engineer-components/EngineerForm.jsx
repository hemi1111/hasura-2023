import { useQuery } from "@apollo/client";
import { GET_ENGINEERS } from "../../queries/EngineerQueries";
import { Box, Button, TextField } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";

const EngineerForm = () => {
  const { data } = useQuery(GET_ENGINEERS);
  const { pathname } = useLocation();
  console.log(data);
  console.log(pathname);
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm({
    mode: "onChange"
  });

  const handleFormSubmit = (formData) => {
    console.log(formData);
  };

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
          {/* <div style={{ width: "40ch", textAlign: "center" }}> */}
          <Button variant="contained" type="submit">
            Save
          </Button>
          {/* </div> */}
        </>
      </Box>
    </div>
  );
};
export default EngineerForm;
