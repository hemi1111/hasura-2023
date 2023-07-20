import React, { useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { TextField, Button, InputLabel, Typography } from "@mui/material";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_SINGLE_INFO,
  EDIT_BADGE,
  GET_BADGES
} from "../../queries/BadgesQueries";
import { RemoveCircle, AddBox } from "@mui/icons-material";

const EditBadge = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [editBadge] = useMutation(EDIT_BADGE, {
    refetchQueries: [{ query: GET_BADGES }]
  });
  const { data, loading, error, refetch } = useQuery(GET_SINGLE_INFO, {
    variables: {
      id
    }
  });

  useEffect(() => {
    refetch();
  }, [data]);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
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

  const onSubmit = (formData) => {
    const { title, description } = formData;
    try {
      const requirements = fields.map((requirement, index) => ({
        where: {
          id: {
            _eq: getValues(`requirements.${index}.id`)
          }
        },
        _set: {
          title: getValues(`requirements.${index}.title`),
          description: getValues(`requirements.${index}.description`)
        }
      }));
      const newReq = { ...requirements };
      // newReq.requirements[4].id = 22;
      console.log(newReq);

      editBadge({
        variables: {
          id,
          title: title,
          description: description,
          requirements: requirements
        }
      });

      console.log("Badge updated successfully", formData);
      navigate("/badges");
    } catch (error) {
      console.log("Couldn't get updated", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <Link to="/badges">
        <Button
          variant="outlined"
          sx={{ marginTop: "20px", marginLeft: "45%" }}
        >
          GO TO BADGES
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
            <InputLabel sx={{ fontSize: "1.2em", marginBottom: "10px" }}>
              Requirements
            </InputLabel>
          )}
          {fields.map((field, index) => (
            <div key={field.id}>
              <Controller
                name={`requirements.${index}.title`}
                control={control}
                defaultValue={field.title}
                render={({ field }) => (
                  <TextField
                    multiline
                    sx={{ minWidth: "600px", marginBottom: "10px" }}
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
                render={({ field }) => (
                  <TextField
                    {...field}
                    multiline
                    sx={{ minWidth: "600px", marginBottom: "30px" }}
                    minRows={2}
                    label={`Requirement Description ${index + 1}`}
                  />
                )}
              />
              <RemoveCircle
                sx={{
                  marginRight: "-35px",
                  marginLeft: "10px",
                  marginTop: "7px",
                  cursor: "pointer"
                }}
                onClick={() => remove(index)}
              />
            </div>
          ))}
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
              Show Requirements
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
              onClick={() => append({})}
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
