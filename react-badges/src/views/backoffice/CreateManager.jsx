import React, { useState } from "react";
import ManagerNavbar from "../../components/ManagerNavbar";
import { TextField, Button, Typography, Grid } from "@mui/material";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { CREATE_MANAGER, GET_MANAGERS } from "../../queries/ManagerQueries";
import { useNavigate } from "react-router-dom";

const CreateManager = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm();
  const [createManager, { loading, error, data }] = useMutation(
    CREATE_MANAGER,
    {
      refetchQueries: [
        {
          query: GET_MANAGERS
        }
      ]
    }
  );
  const styleForm = {
    display: "flex",
    justifyContent: "center",
    // height: "80%",
    alignItems: "center",
    width: "clamp(450px,30px,430px)",
    margin: "0 auto",
    border: "1px solid #ccc",
    borderRadius: "0.35rem",
    padding: "1.5rem",
    flexDirection: "column",
    gap: "1rem"
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   createManager({
  //     variables: { name }
  //   });
  //   setName("");
  //   console.log(data);
  // };
  const onSubmit = (data) => {
    console.log(data);
    const { name } = data;
    createManager({
      variables: { name }
    });
    reset();
    navigate("/managers");
  };

  if (loading) return <p>Loading...</p>;
  if (error) throw error;
  return (
    <>
      <ManagerNavbar />
      <div style={{ height: "100%", display: "grid", placeItems: "center" }}>
        <form onSubmit={handleSubmit(onSubmit)} style={styleForm}>
          <Typography>Create Manager</Typography>
          <TextField
            sx={{ width: "100%" }}
            label="Name"
            {...register("name", {
              required: {
                value: true,
                message: "Field required"
              },
              minLength: {
                value: 2,
                message: "Mininmum characters is 2"
              },
              pattern: {
                value: /^[A-Z][a-z0-9_-]/,
                message: "Should start with upper case"
              }
            })}
            error={!!errors.name}
            helperText={errors.name && errors.name.message}
          />

          <Button type="submit" variant="outlined" sx={{ width: "50%" }}>
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};

export default CreateManager;
