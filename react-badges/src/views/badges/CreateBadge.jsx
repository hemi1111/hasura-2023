import React from "react";
import BadgesNavbar from "../../components/BadgesNavbar";
import { useForm } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import { useMutation } from "@apollo/client";
import { ADD_BADGES } from "../../queries/BadgesQueries";

const CreateBadge = () => {
  const [addBadges] = useMutation(ADD_BADGES);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    const { badgeTitle, badgeDescription, reqTitle, reqDescription } = data;

    try {
      addBadges({
        variables: {
          title: badgeTitle,
          description: badgeDescription,
          req_title: reqTitle,
          req_description: reqDescription
        }
      });

      console.log("Badge added successfully!");
    } catch (error) {
      console.error("Error adding badge:", error);
    }
  };

  return (
    <div>
      <BadgesNavbar />
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register("badgeTitle", {
              required: "This field is required",
              minLength: { value: 2, message: "Min length is 2" }
            })}
            required
            error={!!errors.badgeTitle}
            helperText={errors.badgeTitle?.message}
            type="text"
            label="Badge Title"
            name="badgeTitle"
            variant="outlined"
          />
          <br />
          <TextField
            {...register("badgeDescription", {
              required: "This field is required",
              minLength: { value: 2, message: "Min length is 2" }
            })}
            required
            error={!!errors.badgeDescription}
            helperText={errors.badgeDescription?.message}
            type="text"
            label="Badge Description"
            name="badgeDescription"
            variant="outlined"
          />
          <br />
          <TextField
            {...register("reqTitle", {
              required: "This field is required",
              minLength: { value: 2, message: "Min length is 2" }
            })}
            required
            error={!!errors.reqTitle}
            helperText={errors.reqTitle?.message}
            type="text"
            label="Requirement Title"
            name="reqTitle"
            variant="outlined"
          />
          <br />
          <TextField
            {...register("reqDescription", {
              required: "This field is required",
              minLength: { value: 2, message: "Min length is 2" }
            })}
            required
            error={!!errors.reqDescription}
            helperText={errors.reqDescription?.message}
            type="text"
            label="Requirement Description"
            name="reqDescription"
            variant="outlined"
          />
          <Button type="submit">Add</Button>
        </form>
      </div>
    </div>
  );
};

export default CreateBadge;
