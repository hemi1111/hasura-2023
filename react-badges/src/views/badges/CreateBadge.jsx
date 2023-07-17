import { InputLabel, TextField, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import {
  CREATE_BADGE_MUTATION,
  CREATE_BADGE_VERSION,
  GET_BADGES
} from "../../queries/BadgesQueries";
import { useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const CreateBadge = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm();

  const navigate = useNavigate();
  const [requirements, setRequirements] = useState([]); // State variable for requirements

  const [insert_badges_definitions, { loading, error, data }] = useMutation(
    CREATE_BADGE_MUTATION,
    { refetchQueries: [{ query: GET_BADGES }] }
  );
  const [create_badges_version] = useMutation(CREATE_BADGE_VERSION, {
    refetchQueries: [{ query: GET_BADGES }]
  });

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

  const { fields, append, remove } = useFieldArray({
    control,
    name: "requirements",
    defaultValue: requirements // Set the default value to the state variable
  });

  const onSubmit = (formData) => {
    const { title, description, id } = formData;
    insert_badges_definitions({
      variables: {
        title: title,
        description: description,
        id: id,
        req_title: req_title, // pass in value for req_title
        req_description: req_description, // pass in value for req_description
        requirements: requirements.map((requirement) => ({
          req_title: requirement.req_title,
          req_description: requirement.req_description
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

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TextField
            label="Title"
            name="title"
            {...register("title", {
              required: true
            })}
          />
          <TextField
            label="Description"
            name="description"
            {...register("description", {
              required: true
            })}
          />
          <TextField
            name="id"
            label="Id"
            type="number"
            {...register("id", { required: true })}
          />
          <InputLabel>Requirements</InputLabel>
          {fields.map((requirement, index) => (
            <div key={requirement.id}>
              <TextField
                label="Requirement Title"
                name={`requirements[${index}].req_title`}
                {...register(`requirements.${index}.req_title`, {
                  required: true
                })}
              />
              <TextField
                label="Requirement Description"
                name={`requirements[${index}].req_description`}
                {...register(`requirements.${index}.req_description`, {
                  required: true
                })}
              />
              <IconButton onClick={() => remove(index)}>
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
          <IconButton
            onClick={() => {
              append({ req_title: "", req_description: "" });
              setRequirements([
                ...requirements,
                { req_title: "", req_description: "" }
              ]); // Update the state when adding a new requirement
            }}
          >
            <AddIcon />
          </IconButton>
          <button type="submit">Add</button>
        </div>
      </form>
    </>
  );
};

export default CreateBadge;
