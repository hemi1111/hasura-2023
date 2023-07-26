import { useState } from "react";
import { TextField, Button, Alert } from "@mui/material";
import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import {
  CREATE_BADGE,
  CREATE_BADGE_VERSION,
  GET_BADGES
} from "../../queries/BadgesQueries";
import LoadingSpinner from "../../components/spinner/LoadingSpinner";
import { useNavigate, Link } from "react-router-dom";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { AddBox, RemoveCircle, ArrowBackIos } from "@mui/icons-material";
const CreateBadge = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [requirementCount, setRequirementCount] = useState(1);
  const navigate = useNavigate();

  const [insert_badges_definitions, { loading, error, data }] = useMutation(
    CREATE_BADGE,
    { refetchQueries: [{ query: GET_BADGES }] }
  );
  const [create_badges_version] = useMutation(CREATE_BADGE_VERSION, {
    refetchQueries: [{ query: GET_BADGES }],
    onCompleted: () => navigate("/badges", { state: { showAlert: 2 } }),
    onError: () => navigate("/badges", { state: { showAlert: -2 } })
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "requirements"
  });

  useEffect(() => {
    if (data) {
      create_badges_version({
        variables: {
          id: data?.insert_badges_definitions?.returning[0]?.id
        }
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
      console.log("Badge created succesfully");
      setShowAlert(false);
    } catch (error) {
      console.log("Error creating badge", error);
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
          width: "60%",
          margin: "auto",
          marginTop: "20px"
        }}
      >
        {showAlert && requirementCount < 3 ? (
          <Alert severity="info">
            A Badge must have at least 3 requirements !
          </Alert>
        ) : null}
      </div>
      <Link to="/badges">
        <Button variant="outlined" sx={{ marginLeft: "20px", padding: "10px" }}>
          <ArrowBackIos fontSize="small" />
          BACK TO BADGES
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
                required: "Badge must have a title",
                minLength: { value: 3, message: "Min length is 3" },
                maxLength: { value: 40, message: "Max length is 40" }
              })}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
            <br />
            <TextField
              sx={{ marginBottom: "20px", minWidth: "400px" }}
              multiline={true}
              label="Description"
              name="description"
              {...register("description", {
                required: "Badge must have a description",
                minLength: { value: 3, message: "Min length is 3" }
              })}
              error={!!errors.description}
              helperText={errors.desccription?.message}
            />
            <p>Requirements</p>
            <AddBox
              sx={{ cursor: "pointer", marginBottom: "10px" }}
              onClick={() => append({ title: "", description: "" })}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                flexWrap: "wrap"
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
                        multiline={true}
                        sx={{ marginBottom: "10px", minWidth: "400px" }}
                        label={`Requirement Title ${index + 1}`}
                        error={!!errors?.requirements?.[index]?.title}
                        helperText={
                          errors?.requirements?.[index]?.title?.message
                        }
                        {...field}
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
                        sx={{ marginBottom: "25px", minWidth: "400px" }}
                        multiline={true}
                        label={`Requirement Description ${index + 1}`}
                        error={!!errors?.requirements?.[index]?.description}
                        helperText={
                          errors?.requirements?.[index]?.description?.message
                        }
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
          </div>
          <Button
            type="submit"
            variant="outlined"
            sx={{ marginTop: "10px", padding: "10px" }}
          >
            Create Badge
          </Button>
        </form>
      </div>
    </div>
  );
};
export default CreateBadge;
