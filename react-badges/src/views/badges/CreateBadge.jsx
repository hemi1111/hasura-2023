import { InputLabel, TextField, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import {
  CREATE_BADGE,
  CREATE_BADGE_VERSION,
  GET_BADGES
} from "../../queries/BadgesQueries";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import BadgesNavbar from "../../components/BadgesNavbar";
const CreateBadge = () => {
  const [insert_badges_definitions, { loading, error, data }] = useMutation(
    CREATE_BADGE,
    { refetchQueries: [{ query: GET_BADGES }] }
  );
  const [create_badges_version] = useMutation(CREATE_BADGE_VERSION, {
    refetchQueries: [{ query: GET_BADGES }]
  });

  const { register, handleSubmit } = useForm();
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
    const {
      title,
      description,
      id,
      requirement_title,
      requirement_description
    } = formData;
    insert_badges_definitions({
      variables: {
        title: title,
        description: description,
        id: id,
        req_title: requirement_title,
        req_description: requirement_description
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
            <TextField
              label="Requirement Title"
              name={"requirement_title"}
              {...register("requirement_title", {
                required: true
              })}
            />
            <TextField
              label="Requirement Description"
              name={"requirement_description"}
              {...register("requirement_description", {
                required: true
              })}
            />
          </div>
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
};

export default CreateBadge;
