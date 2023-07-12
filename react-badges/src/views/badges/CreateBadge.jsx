import React from "react";
import BadgesNavbar from "../../components/BadgesNavbar";
import { useForm } from "react-hook-form";
import { TextField, Button } from "@mui/material";

const CreateBadge = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <BadgesNavbar />
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register("title", {
              required: "This field is required",
              minLength: { value: 2, message: "Min length is 2" },
              maxLength: { value: 20, message: "Max length is 20" },
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: "Name must contain only letters A-Z"
              }
            })}
            required
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            type="text"
            label="Badge Title"
            name="title"
            variant="outlined"
          />
          <br />
          <TextField
            {...register("description", {
              required: "This field is required",
              minLength: { value: 2, message: "Min length is 2" },
              maxLength: { value: 20, message: "Max length is 20" },
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: "Name must contain only letters A-Z"
              }
            })}
            required
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            type="text"
            label="Badge Description"
            name="description"
            variant="outlined"
          />
          <br />
          <TextField
            {...register("image", {
              required: "This field is required",
              minLength: { value: 2, message: "Min length is 2" },
              maxLength: { value: 20, message: "Max length is 20" },
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: "Name must contain only letters A-Z"
              }
            })}
            required
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            type="text"
            label="Badge Image"
            name="image"
            variant="outlined"
          />
          <Button type="submit">Add</Button>
        </form>
      </div>
    </div>
  );
};

export default CreateBadge;
