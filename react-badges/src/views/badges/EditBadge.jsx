import React, { useEffect } from "react";
import BadgesNavbar from "../../components/BadgesNavbar";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { TextField, Button, InputLabel, IconButton } from "@mui/material";
import { useQuery, useMutation } from "@apollo/client";
import { GET_SINGLE_INFO, EDIT_BADGE } from "../../queries/BadgesQueries";

const EditBadge = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [editBadge] = useMutation(EDIT_BADGE);
  const { data, loading, error } = useQuery(GET_SINGLE_INFO, {
    variables: {
      id
    }
  });
  const { register, handleSubmit, control, setValue } = useForm();

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
      });
    }
  }, [data, setValue]);

  const onSubmit = (formData) => {
    const { title, description, requirements } = formData;
    editBadge({
      variables: {
        id: parseInt(id),
        title: title,
        description: description,
        requirements: requirements.map((requirement) => ({
          title: requirement.title,
          description: requirement.description
        }))
      }
    });
    navigate("/badges");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <BadgesNavbar />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TextField
            label="Title"
            name="title"
            {...register("title", {
              required: true
            })}
          />
          <br />
          <TextField
            sx={{ minWidth: "600px" }}
            multiline
            minRows={5}
            label="Description"
            name="description"
            {...register("description")}
          />
          <br />
          <InputLabel>Requirements</InputLabel>
          {fields.map((field, index) => (
            <div key={field.id}>
              <Controller
                name={`requirements.${index}.title`}
                control={control}
                defaultValue={field.title}
                render={({ field }) => (
                  <TextField
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
                    sx={{ minWidth: "600px" }}
                    minRows={2}
                    label={`Requirement Description ${index + 1}`}
                  />
                )}
              />
              <br />
              <IconButton onClick={() => remove(index)}>Remove Req</IconButton>
            </div>
          ))}
          <IconButton onClick={() => append({ title: "", description: "" })}>
            Add Req
          </IconButton>
        </div>
        <Button type="submit">Confirm</Button>
      </form>
    </div>
  );
};

export default EditBadge;
