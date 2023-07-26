import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  InputLabel,
  Typography,
  Alert
} from "@mui/material";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_SINGLE_INFO,
  EDIT_BADGE,
  GET_BADGES
} from "../../queries/BadgesQueries";
import {
  RemoveCircle,
  AddBox,
  ArrowBackIos,
  Menu,
  Visibility
} from "@mui/icons-material";
import LoadingSpinner from "../../components/spinner/LoadingSpinner";
const EditBadge = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [requirementCount, setRequirementCount] = useState(1);
  const navigate = useNavigate();
  const { id } = useParams();
  const [editBadge] = useMutation(EDIT_BADGE, {
    refetchQueries: [{ query: GET_BADGES }],
    onCompleted: () => navigate("/badges", { state: { showAlert: 3 } }),
    onError: () => navigate("/badges", { state: { showAlert: -3 } })
  });

  const { data, loading, error, refetch } = useQuery(GET_SINGLE_INFO, {
    variables: {
      id
    }
  });

  useEffect(() => {
    refetch();
  }, []);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors }
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "requirements"
  });

  useEffect(() => {
    if (data && data.badges_versions_last[0]) {
      const { title, description, requirements } = data.badges_versions_last[0];
      setValue("title", title);
      setValue("description", description);
      requirements.forEach((requirement, index) => {
        setValue(`requirements.${index}.title`, requirement.title);
        setValue(`requirements.${index}.description`, requirement.description);
        setValue(`requirements.${index}.id`, requirement.id);
      });
    }
  }, [data]);

  useEffect(() => {
    setRequirementCount(fields.length);
  }, [fields]);

  const onSubmit = (formData) => {
    const { title, description, requirements } = formData;

    if (requirementCount < 3) {
      setShowAlert(true);
      return;
    }

    try {
      editBadge({
        variables: {
          id: id,
          title: title,
          description: description,
          requirements: requirements.map((requirement) => ({
            title: requirement.title,
            description: requirement.description
          }))
        }
      });
      setShowAlert(false);

      console.log("Badge updated successfully", formData);
    } catch (error) {
      console.log("Couldn't get updated", error);
    }
  };

  if (loading)
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <LoadingSpinner />
      </div>
    );
  if (error) return `Loading error! ${error.message}`;

  return (
    <div>
      <div
        style={{
          width: "50%",
          margin: "auto",
          marginTop: "20px"
        }}
      >
        {showAlert && requirementCount == 0 ? ( 
          <Alert severity="info">
            Please click on Show Requirements and then proceed !
          </Alert>
        ) : showAlert && requirementCount < 3 ? (
          <Alert severity="info">
            A Badge must have at least 3 requirements !
          </Alert>
        ) : null}
      </div>
      <Link to="/badges">
        <Button variant="outlined" sx={{ marginLeft: "20px", padding: "10px" }}>
          <ArrowBackIos fontSize="small" /> BACK TO BADGES
        </Button>
      </Link>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginTop: "50px", textAlign: "center" }}>
          <TextField
            sx={{ marginBottom: "10px", minWidth: "600px" }}
            label="Title"
            name="title"
            {...register("title", {
              required: "This field is required",
              minLength: { value: 2, message: "Min length is 2" },
              maxLength: { value: 30, message: "Max length is 30" },
              pattern: {
                value: /^[A-Za-z ]*$/,
                message: "Title must contain only letters"
              }
            })}
            error={!!errors.title}
            helperText={errors.title?.message}
          />
          <br />
          <TextField
            sx={{ minWidth: "600px", marginBottom: "20px" }}
            multiline
            label="Description"
            name="description"
            {...register("description", {
              required: "This field is required"
            })}
            error={!!errors.description}
            helperText={errors.description?.message}
          />
          <br />

          {fields.length === 0 ? null : (
            <InputLabel sx={{ marginBottom: "10px" }}>
              <Menu sx={{ marginBottom: "-4px" }} fontSize="small" />{" "}
              Requirements
            </InputLabel>
          )}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              gap: "20px"
            }}
          >
            {fields.map((field, index) => (
              <div key={field.id}>
                <Controller
                  name={`requirements.${index}.title`}
                  control={control}
                  defaultValue={field.title}
                  rules={{ required: "Requirement Title is required" }}
                  render={({ field }) => (
                    <TextField
                      multiline
                      sx={{ minWidth: "500px", marginBottom: "10px" }}
                      error={!!errors?.requirements?.[index]?.title}
                      helperText={errors?.requirements?.[index]?.title?.message}
                      {...field}
                      label={`Requirement Title ${index + 1}`}
                    />
                  )}
                />
                <br />
                <Controller
                  name={`requirements.${index}.description`}
                  control={control}
                  defaultValue={field.description}
                  rules={{ required: "Requirement Description is required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      multiline
                      sx={{ minWidth: "500px", marginBottom: "30px" }}
                      minRows={2}
                      error={!!errors?.requirements?.[index]?.description}
                      helperText={
                        errors?.requirements?.[index]?.description?.message
                      }
                      label={`Requirement Description ${index + 1}`}
                    />
                  )}
                />
                <br />
                <RemoveCircle
                  sx={{
                    cursor: "pointer",
                    marginBottom: "15px"
                  }}
                  onClick={() => {
                    remove(index);
                  }}
                />
              </div>
            ))}
          </div>
          {fields.length === 0 ? (
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "bold",
                margin: "auto",
                width: "fit-content",
                cursor: "pointer"
              }}
              onClick={() => {
                append({});
                remove(fields.length - 1);
              }}
            >
              Show Requirements &nbsp;
              <Visibility sx={{ marginBottom: "-4px" }} fontSize="small" />
            </Typography>
          ) : (
            <Typography
              variant="h4"
              sx={{
                margin: "auto",
                marginTop: "-10px",
                width: "fit-content",
                cursor: "pointer"
              }}
              onClick={() => append({ title: "", description: "" })}
            >
              Add Requirement <AddBox sx={{ marginBottom: "-5px" }} />
            </Typography>
          )}
          <br />
          <Button type="submit">Confirm</Button>
        </div>
      </form>
    </div>
  );
};

export default EditBadge;
