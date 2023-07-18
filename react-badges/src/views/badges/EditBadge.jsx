import React from "react";
import BadgesNavbar from "../../components/BadgesNavbar";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import { useQuery } from "@apollo/client";
import { GET_SINGLE_INFO } from "../../queries/BadgesQueries";

const EditBadge = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_SINGLE_INFO, {
    variables: {
      id
    }
  });
  const { register, handleSubmit } = useForm();

  const onSubmit = (formData) => {
    // Handle form submission here
  };

  console.log(data?.badges_versions_last[0]);

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
            defaultValue={data?.badges_versions_last[0].title || ""}
            {...register("title")}
          />
          <br />
          <TextField
            sx={{ minWidth: "600px" }}
            multiline
            minRows={5}
            label="Description"
            name="description"
            defaultValue={data?.badges_versions_last[0].description || ""}
            {...register("description")}
          />
          <br />
          {data?.badges_versions_last[0].requirements?.map(
            (requirement, index) => (
              <div key={requirement.id}>
                <TextField
                  label={`Requirement Title ${index + 1}`}
                  name={`requirements[${index}].title`}
                  defaultValue={requirement.title}
                  {...register(`requirements[${index}].title`)}
                />
                <br />
                <TextField
                  multiline
                  sx={{ minWidth: "600px" }}
                  minRows={2}
                  label={`Requirement Description ${index + 1}`}
                  name={`requirements[${index}].description`}
                  defaultValue={requirement.description}
                  {...register(`requirements[${index}].description`)}
                />
                <br />
              </div>
            )
          )}
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default EditBadge;
