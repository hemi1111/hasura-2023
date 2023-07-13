import React, { useState } from "react";
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
  CardMedia
} from "@mui/material";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_BADGES, GET_BADGES } from "../../queries/BadgesQueries";
import { useNavigate } from "react-router-dom";

const CreateBadge = () => {
  const [requirements, setRequirements] = useState([]);
  const addRequirement = () => {
    const newRequirement = {
      reqTitle: "",
      reqDescription: ""
    };
    setRequirements([...requirements, newRequirement]);
  };

  const handleRequirementChange = (index, field, value) => {
    const updatedRequirements = [...requirements];
    updatedRequirements[index][field] = value;
    setRequirements(updatedRequirements);
  };

  const removeRequirement = (index) => {
    const updatedRequirements = [...requirements];
    updatedRequirements.splice(index, 1);
    setRequirements(updatedRequirements);
  };
  const { loading, error } = useQuery(GET_BADGES);
  const [addBadges] = useMutation(ADD_BADGES, {
    refetchQueries: [{ query: GET_BADGES }]
  });

  const navigate = useNavigate();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    const { badgeTitle, badgeDescription } = data;

    try {
      addBadges({
        variables: {
          title: badgeTitle,
          description: badgeDescription,
          requirements: requirements.map((req) => ({
            title: req.reqTitle,
            description: req.reqDescription
          }))
        }
      });
      navigate("/badges");
      console.log("Badge added successfully!");
    } catch (error) {
      console.error("Error adding badge:", error);
    }
  };

  if (loading) return "Loading...";
  if (error) return "Error";
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
            style={{ minWidth: "500px", marginBottom: "15px" }}
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
            style={{ minWidth: "500px", marginBottom: "15px" }}
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
            style={{ minWidth: "500px", marginBottom: "15px" }}
            {...register("badgeImage", {
              required: "This field is required",
              minLength: { value: 2, message: "Min length is 2" }
            })}
            error={!!errors.reqDescription}
            helperText={errors.reqDescription?.message}
            type="text"
            label="Badge Logo"
            name="badgeImage"
            variant="outlined"
          />
          <br />
          {requirements.map((req, index) => (
            <div key={index}>
              <TextField
                style={{ minWidth: "500px", marginBottom: "15px" }}
                value={req.reqTitle}
                onChange={(e) =>
                  handleRequirementChange(index, "reqTitle", e.target.value)
                }
                required
                type="text"
                label={`Requirement Title ${index + 1}`}
                name={`reqTitle${index}`}
                variant="outlined"
              />
              <br />
              <TextField
                style={{ minWidth: "500px", marginBottom: "15px" }}
                value={req.reqDescription}
                onChange={(e) =>
                  handleRequirementChange(
                    index,
                    "reqDescription",
                    e.target.value
                  )
                }
                required
                type="text"
                label={`Requirement Description ${index + 1}`}
                name={`reqDescription${index}`}
                variant="outlined"
              />
              <br />
              <Button onClick={() => removeRequirement(index)}>Remove</Button>
            </div>
          ))}
          <Button onClick={addRequirement}>Add More Requirements</Button>
          <br />
          <Button type="submit">Add</Button>
        </form>
        <Card sx={{ minWidth: 400, minHeight: 350, margin: "auto" }}>
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
