import { InputLabel, TextField, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import {
  CREATE_BADGE,
  CREATE_BADGE_VERSION,
  GET_BADGES
} from "../../queries/BadgesQueries";
import { useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import BadgesNavbar from "../../components/BadgesNavbar";
const CreateBadge = () => {
  const [insert_badges_definitions, { loading, error, data }] = useMutation(
    CREATE_BADGE,
    { refetchQueries: [{ query: GET_BADGES }] }
  );
  const [create_badges_version] = useMutation(CREATE_BADGE_VERSION, {
    refetchQueries: [{ query: GET_BADGES }]
  });

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      requirements: [{ title: "", description: "" }]
    }
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "requirements"
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      create_badges_version({
        variables: {
          id: data?.insert_badges_definitions?.returning[0]?.id
        }
      });
      navigate("/badges");
    }
  }, [data]);

  const onSubmit = (formData) => {
    const { title, description, requirements } = formData;
    insert_badges_definitions({
      variables: {
        title: title,
        description: description,
        requirements: requirements.map((requirement) => ({
          title: requirement.title,
          description: requirement.description
        }))
      }
    });
  };
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  console.log();
  return (
    <div>
      <BadgesNavbar />
      <div style={{ margin: "auto" }}>
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
              label="Description"
              name="description"
              {...register("description", {
                required: true
              })}
            />

            <InputLabel>Requirements</InputLabel>
            {fields.map((field, index) => (
              <div key={field.id}>
                <TextField
                  label="Requirement Title"
                  name={`requirements.${index}.title`}
                  {...register(`requirements.${index}.title`, {
                    required: true
                  })}
                />
                <TextField
                  label="Requirement Description"
                  name={`requirements.${index}.description`}
                  {...register(`requirements.${index}.description`, {
                    required: true
                  })}
                />
                <IconButton onClick={() => remove(index)}>Remove</IconButton>
              </div>
            ))}
            <IconButton onClick={() => append({ title: "", description: "" })}>
              Add
            </IconButton>
          </div>
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
};

export default CreateBadge;
