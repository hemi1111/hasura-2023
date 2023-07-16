import { InputLabel, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import {
  CREATE_BADGE_MUTATION,
  CREATE_BADGE_VERSION,
  GET_BADGES
} from "../../queries/BadgesQueries";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const CreateBadge = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const navigate = useNavigate();
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

  const onSubmit = (formData) => {
    const { title, description, id } = formData;
    insert_badges_definitions({
      variables: {
        title: title,
        description: description,
        id: id
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
          <button type="submit">Add</button>
        </div>
      </form>
    </>
  );
};
export default CreateBadge;
