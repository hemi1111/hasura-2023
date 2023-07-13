import React from "react";
import BadgesNavbar from "../../components/BadgesNavbar";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Avatar,
  Typography,
  CardHeader,
  CardMedia,
  autocompleteClasses
} from "@mui/material";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_BADGES, GET_BADGES } from "../../queries/BadgesQueries";

const CreateBadge = () => {
  const { data } = useQuery(GET_BADGES);
  const [addBadges] = useMutation(ADD_BADGES, {
    refetchQueries: [{ query: GET_BADGES }]
  });

  const {
    register,
    watch,
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
    <div id="create-container">
      <BadgesNavbar />
      <span
        style={{
          margin: "auto",
          marginTop: "10vh",
          width: "80%",
          display: "flex",
          justifyContent: "space-around"
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            style={{ minWidth: "500px" }}
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
            style={{ minWidth: "500px" }}
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
            style={{ minWidth: "500px" }}
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
            style={{ minWidth: "500px" }}
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
          <TextField
            style={{ minWidth: "500px" }}
            {...register("badgeImage", {
              required: "This field is required",
              minLength: { value: 2, message: "Min length is 2" }
            })}
            required
            error={!!errors.reqDescription}
            helperText={errors.reqDescription?.message}
            type="text"
            label="badgeImage"
            name="badgeImage"
            variant="outlined"
          />
          <Button type="submit">Add</Button>
        </form>
        <Card sx={{ minWidth: 400, minHeight: 300, margin: "auto" }}>
          <span>
            <CardHeader title={watch("badgeTitle")} />
          </span>
          <Avatar sx={{ width: 150, height: 150, margin: "auto" }}>
            <CardMedia
              component="img"
              image={watch("badgeImage")}
              alt="Badges"
            />
          </Avatar>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {watch("badgeDescription")}
            </Typography>
          </CardContent>
        </Card>
      </span>
    </div>
  );
};

export default CreateBadge;
