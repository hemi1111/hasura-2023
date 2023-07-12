import React from "react";
import BadgesNavbar from "../../components/BadgesNavbar";
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";

const CreateBadge = () => {
  // const {
  //   register,
  //   submit,
  //   formState: { errors },
  //   watch
  // } = useForm();

  // const onSubmit = (data) => {
  //   console.log(data);
  // };
  return (
    <div>
      <BadgesNavbar />
      <h1>asdas</h1>
      {/* <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register(
              ("name",
              {
                required: "This field is required",
                minLength: { value: 2, message: "Min length is 2" },
                maxLength: { value: 20, message: "Max length is 20" },
                pattern: {
                  value: /^[A-Za-z]+$/i,
                  message: "Name must contain only letters A-Z"
                }
              })
            )}
            required
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            type="text"
            label="Badge Name"
            name="name"
            variant="outlined"
          />
          <Button type="submit">Add</Button>
        </form>
      </div> */}
    </div>
  );
};

export default CreateBadge;
