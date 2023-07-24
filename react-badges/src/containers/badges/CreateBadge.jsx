import { TextField, Button } from "@mui/material";
import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import {
  CREATE_BADGE,
  CREATE_BADGE_VERSION,
  GET_BADGES
} from "../../queries/BadgesQueries";
import { useNavigate, Link } from "react-router-dom";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { AddBox, RemoveCircle } from "@mui/icons-material";
const CreateBadge = () => {
  const [insert_badges_definitions, { loading, error, data }] = useMutation(
    CREATE_BADGE,
    { refetchQueries: [{ query: GET_BADGES }] }
  );
  const [create_badges_version] = useMutation(CREATE_BADGE_VERSION, {
    refetchQueries: [{ query: GET_BADGES }],
    onCompleted: () => navigate("/badges", { state: { showAlert: 2 } }),
    onError: () => navigate("/badges", { state: { showAlert: -2 } })
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
      <div style={{ marginTop: "50px", textAlign: "center" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <TextField
              multiline={true}
              sx={{ marginBottom: "10px", minWidth: "400px" }}
              label="Title"
              name="title"
              {...register("title", {
                required: true
              })}
            />
            <br />
            <TextField
              sx={{ marginBottom: "20px", minWidth: "400px" }}
              multiline={true}
              label="Description"
              name="description"
              {...register("description", {
                required: true
              })}
            />
            <p>Requirements</p>
            <AddBox
              sx={{ cursor: "pointer", marginBottom: "10px" }}
              onClick={() => append({ title: "", description: "" })}
            />
            {fields.map((field, index) => (
              <div key={field.id}>
                <Controller
                  name={`requirements.${index}.title`}
                  control={control}
                  defaultValue={field.title}
                  render={({ field }) => (
                    <TextField
                      multiline={true}
                      sx={{ marginBottom: "10px", minWidth: "400px" }}
                      label={`Requirement Title ${index + 1}`}
                      {...field}
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
                      sx={{ marginBottom: "25px", minWidth: "400px" }}
                      multiline={true}
                      label={`Requirement Description ${index + 1}`}
                      {...field}
                    />
                  )}
                />
                <br />
                <RemoveCircle
                  sx={{
                    cursor: "pointer",
                    marginTop: "-50px",
                    marginLeft: "5px"
                  }}
                  onClick={() => remove(index)}
                />
              </div>
            ))}
          </div>
          <Button type="submit">Create Badge</Button>
        </form>
      </div>
    </div>
  );
};

export default CreateBadge;
